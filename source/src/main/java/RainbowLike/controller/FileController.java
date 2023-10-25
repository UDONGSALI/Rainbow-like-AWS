package RainbowLike.controller;

import RainbowLike.entity.File;
import RainbowLike.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
public class FileController {
    private final FileService fileService;

    @GetMapping
    public ResponseEntity<Iterable<File>> getFiles() {
        return ResponseEntity.ok(fileService.findAllFiles());
    }

    @GetMapping("/{table}/{num}")
    public ResponseEntity<Iterable<File>> getFilesByTypeAndId(@PathVariable String table, @PathVariable Long num) {
        return ResponseEntity.ok(fileService.findFilesByTypeAndId(table, num));
    }

    @GetMapping("/table/{name}")
    public ResponseEntity<Iterable<File>> getFindByTableName(@PathVariable String name) {
        return ResponseEntity.ok(fileService.findByTableName(name));
    }

    @DeleteMapping("/eduNum/{eduNum}")
    public ResponseEntity<Void> deleteFilesByEduNum(@PathVariable Long eduNum) {
        fileService.deleteFilesByEduNum(eduNum);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<String> uploadFiles(@RequestParam("file") List<MultipartFile> files, @RequestParam("tableName") String tableName, @RequestParam("number") Long number) {
        try {
            fileService.uploadToCloudAndGetFileNums(files, tableName, number);
            return ResponseEntity.ok("파일 업로드 성공");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PostMapping("/FileNums")
    public ResponseEntity<List<Long>> uploadAndGetFileNums(@RequestParam("file") List<MultipartFile> files, @RequestParam("tableName") String tableName, @RequestParam("number") Long number) {
        try {
            List<Long> fileNums = fileService.uploadToCloudAndGetFileNums(files, tableName, number);
            return ResponseEntity.ok(fileNums);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @Transactional
    @PatchMapping("/edit")
    public ResponseEntity<Map<String, String>> editFiles(@RequestBody List<Long> fileNumbersWithPostNum) {
        if (fileNumbersWithPostNum.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "File numbers list is empty");
            return ResponseEntity.badRequest().body(response);
        }

        Long postNum = fileNumbersWithPostNum.get(fileNumbersWithPostNum.size() - 1);
        List<Long> fileNumsExcludingPostNum = fileNumbersWithPostNum.subList(0, fileNumbersWithPostNum.size() - 1);

        try {
            fileService.updatePostNumForFiles(fileNumsExcludingPostNum, postNum);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Files updated successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
    // 게시글 번호에 따른 파일들 삭제
    @DeleteMapping("/post/{postNum}")
    public ResponseEntity<?> deleteFilesByPostNum(@PathVariable Long postNum) {
        try {
            fileService.deleteFilesByPostNum(postNum); // 여기서 Long 타입 변환을 제거했습니다.
            return ResponseEntity.ok("Files deleted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error occurred while deleting files: " + e.getMessage());
        }
    }
}
