package RainbowLike.service;

import RainbowLike.dto.PathAndEntities;
import RainbowLike.entity.*;
import RainbowLike.repository.*;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;

    private final EduRepository eduRepository;
    private final MemberRepository memberRepository;
    private final EduHistRepository eduHistRepository;
    private final PostRepository postRepository;
    private final RestTemplate restTemplate;
    private final SpaceRepository spaceRepository;

    @Value("${spring.cloud.gcp.storage.bucket}")
    private String bucketName;

    public Iterable<File> findAllFiles() {
        return fileRepository.findAll();
    }

    public Iterable<File> findFilesByTypeAndId(String type, Long id) {
        switch (type) {
            case "eduNum":
                return findFilesByEduNum(id);
            case "postNum":
                return findFilesByPostNum(id);
            default:
                throw new IllegalArgumentException("Invalid type: " + type);
        }
    }

    public Iterable<File> findFilesByEduNum(Long eduNum) {
        return fileRepository.findByEdu(eduRepository.findByEduNum(eduNum));
    }

    public Iterable<File> findFilesByPostNum(Long postNum) {
        return fileRepository.findByPost(postRepository.findByPostNum(postNum));
    }

    public Iterable<File> findByTableName(String name) {
        switch (name) {
            case "post":
                return fileRepository.findByPostIsNotNull();
            case "edu":
                return fileRepository.findByEduIsNotNull();
            case "eduHist":
                return fileRepository.findByEduHistIsNotNull();
            case "member":
                return fileRepository.findByMemberIsNotNull();
            case "space":
                return fileRepository.findBySpaceIsNotNull();
            default:
                throw new IllegalArgumentException("Invalid table name: " + name);
        }
    }

    public void deleteFilesByEduNum(Long eduNum) {
        Iterable<File> files = findFilesByEduNum(eduNum);
        for (File file : files) {
            String deleteUrl = "http://localhost:8090/api/files/" + file.getFileNum();
            restTemplate.delete(deleteUrl);
        }
    }

    public List<Long> uploadFilesAndGetFileNums(List<MultipartFile> files, String tableName, Long number) throws IOException {
        return uploadToCloudAndGetFileNums(files, tableName, number);
    }

    private List<Long> uploadToCloudAndGetFileNums(List<MultipartFile> files, String tableName, Long number) throws IOException {
        PathAndEntities pathAndEntities = determineMidPath(tableName, number);

        // Set up Google Cloud Storage
        ClassPathResource resource = new ClassPathResource("rainbow-like-6e3171ac1695.json");
        GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());
        String projectId = "rainbow-like";
        Storage storage = StorageOptions.newBuilder()
                .setProjectId(projectId)
                .setCredentials(credentials)
                .build()
                .getService();

        List<Long> uploadedFileNums = new ArrayList<>();

        for (MultipartFile file : files) {
            String newFileName = pathAndEntities.getMidPath() + file.getOriginalFilename();
            String fileUrl = "https://storage.googleapis.com/" + bucketName + "/" + newFileName;
            BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, newFileName).build();
            Blob blob = storage.create(blobInfo, file.getBytes());

            File createfile = new File();
            createfile.setFileOriName(file.getOriginalFilename());
            createfile.setFileName(newFileName);
            createfile.setFileUri(fileUrl);
            createfile.setMember(pathAndEntities.getMember());
            createfile.setSpace(pathAndEntities.getSpace());
            createfile.setEdu(pathAndEntities.getEdu());
            createfile.setPost(pathAndEntities.getPost());
            createfile.setEduHist(pathAndEntities.getEduHist());

            File savedFile = fileRepository.save(createfile);
            uploadedFileNums.add(savedFile.getFileNum());
        }

        return uploadedFileNums;
    }

    private PathAndEntities determineMidPath(String tableName, Long number) {
        PathAndEntities result = new PathAndEntities();

        Member member = null;
        Space space = null;
        Edu edu = null;
        EduHist eduHist = null;
        Post post = null;
        String midPath = "";

        if (number == 0) {
            switch (tableName) {
                case "member":
                    member = memberRepository.findTopByOrderByMemNumDesc();
                    midPath = tableName + "/" + member.getMemNum() + "/";
                    break;
                case "space":
                    space = spaceRepository.findTopByOrderBySpaceNumDesc();
                    midPath = tableName + "/" + space.getSpaceNum() + "/";
                    break;
                case "edu":
                    edu = eduRepository.findTopByOrderByEduNumDesc();
                    midPath = tableName + "/" + edu.getEduNum() + "/";
                    break;
                case "eduHist":
                    eduHist = eduHistRepository.findTopByOrderByEduHistNumDesc();
                    midPath = tableName + "/" + eduHist.getEduHistNum() + "/";
                    break;
                case "post":
                    post = postRepository.findTopByOrderByPostNumDesc();
                    midPath = tableName + "/" + post.getPostNum() + "/";
                    break;
                default:
                    throw new IllegalArgumentException("Invalid table name: " + tableName);
            }
        } else {
            switch (tableName) {
                case "member":
                    member = memberRepository.findByMemNum(number);
                    if (member != null) {
                        midPath = tableName + "/" + member.getMemNum() + "/";
                    }
                    break;
                case "space":
                    space = spaceRepository.findBySpaceNum(number);
                    if (space != null) {
                        midPath = tableName + "/" + space.getSpaceNum() + "/";
                    }
                    break;
                case "edu":
                    edu = eduRepository.findByEduNum(number);
                    if (edu != null) {
                        midPath = tableName + "/" + edu.getEduNum() + "/";
                    }
                    break;
                case "eduHist":
                    eduHist = eduHistRepository.findByEduHistNum(number);
                    if (eduHist != null) {
                        midPath = tableName + "/" + eduHist.getEduHistNum() + "/";
                    }
                    break;
                case "post":
                    post = postRepository.findByPostNum(number);
                        midPath = tableName + "/" + number + "/";
                    break;
                default:
                    throw new IllegalArgumentException("Invalid table name: " + tableName);
            }
        }
        result.setMidPath(midPath);
        result.setMember(member);
        result.setSpace(space);
        result.setEdu(edu);
        result.setEduHist(eduHist);
        result.setPost(post);

        return result;
    }

    public void updatePostNumForFiles(List<Long> fileNumsExcludingPostNum, Long postNum) {
        //파일넘을 업데이트하는 로직
        for (Long fileNum : fileNumsExcludingPostNum) {
            File file = fileRepository.findById(fileNum)
                    .orElseThrow(() -> new RuntimeException("File not found with id: " + fileNum));
            Post post = postRepository.findById(postNum)
                    .orElseThrow(() -> new RuntimeException("Post not found with id: " + postNum));
            file.setPost(post);
            fileRepository.save(file);
        }
    }
    public void deleteFilesByPostNum(Long postNum) {
        List<File> files = fileRepository.findByPostPostNum(postNum); // 여기서도 Long 타입 변환을 제거했습니다.
        for (File file : files) {
            String deleteUrl = "http://localhost:8090/api/files/" + file.getFileNum();
            restTemplate.delete(deleteUrl);
        }
    }
}