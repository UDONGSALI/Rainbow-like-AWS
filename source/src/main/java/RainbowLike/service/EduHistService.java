package RainbowLike.service;

import RainbowLike.constant.Status;
import RainbowLike.constant.Type;
import RainbowLike.dto.EduHistDto;
import RainbowLike.entity.EduHist;
import RainbowLike.repository.EduHistRepository;
import RainbowLike.repository.EduRepository;
import RainbowLike.repository.MemberRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EduHistService {

    private final EduHistRepository eduHistRepository;
    private final MemberRepository memberRepository;
    private final EduRepository eduRepository;
    private final SmsService smsService;
    private final EduService eduService;
    private final FileService fileService;
    private final ModelMapper mapper;

    public Iterable<EduHist> findAll() {
        return eduHistRepository.findAll();
    }

    @Transactional
    public EduHist saveEduHist(EduHistDto eduHistDto) {
        eduHistDto.setMember(memberRepository.findByMemNum(eduHistDto.getMemNum()));
        eduHistDto.setEdu(eduRepository.findByEduNum(eduHistDto.getEduNum()));

        EduHist eduHist = mapper.map(eduHistDto, EduHist.class);
        eduHistRepository.save(eduHist);

        // EduHist가 저장된 직후에 updateRecuPerson 메서드 호출
        eduService.updateRecuPerson(eduHistDto.getEduNum());

        return eduHist;
    }

    @Transactional
    public String saveEduHistAndFile(String eduHistDataJson, List<MultipartFile> files, String tableName,  Long number) throws IOException {
        EduHistDto eduHistDto;
        try {
            eduHistDto = new ObjectMapper().readValue(eduHistDataJson, EduHistDto.class);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("교육 정보 변환에 실패했습니다.", e);
        }
        // EduHist 정보 저장
        saveEduHist(eduHistDto);

        // 파일이 제공되면 해당 파일도 저장
        if (files != null && !files.isEmpty()) {
            fileService.uploadToCloudAndGetFileNums(files, tableName, number);
        }
        return "신청이 완료 되었습니다!";
    }


    public Iterable<EduHist> searchEduHist(String option, String value, String memId) {
        Iterable<EduHist> result;
        switch (option) {
            case "eduName":
                result = eduHistRepository.findByEduIn(eduRepository.findByEduNameContaining(value));
                break;
            case "memId":
                result = eduHistRepository.findByMemberIn(memberRepository.findByMemIdContaining(value));
                break;
            case "status":
                Status status = Status.valueOf(value);
                result = eduHistRepository.findByStatus(status);
                break;
            default:
                result = new ArrayList<>();
        }
        if (!isAdmin(memId)) {
            List<EduHist> filteredList = new ArrayList<>();
            for (EduHist eduHist : result) {
                if (eduHist.getMember().getMemId().equals(memId)) {
                    filteredList.add(eduHist);
                }
            }
            result = filteredList;
        }
        return result;
    }

    private boolean isAdmin(String memId) {
        return memberRepository.findByMemId(memId).getType() == Type.ADMIN;
    }

    public boolean eduHistCheck(Long memNum, Long eduNum) {
        List<EduHist> eduHists = eduHistRepository.findByMemberAndEdu(memberRepository.findByMemNum(memNum), eduRepository.findByEduNum(eduNum));
        return eduHists.size() >= 1;
    }

    public Optional<EduHist> updateEduHistStatus(Long eduHistnum, Status status) {
        Optional<EduHist> optionalEduHist = eduHistRepository.findById(eduHistnum);

        if (status == Status.APPROVE){
            smsService.eduApplySms(eduHistnum);
        }
        if (optionalEduHist.isPresent()) {
            EduHist eduHist = optionalEduHist.get();
            eduHist.setStatus(status);
            eduService.updateRecuPerson(eduHist.getEdu().getEduNum());
            return Optional.of(eduHistRepository.save(eduHist));
        }
        return Optional.empty();
    }

    public boolean deleteEduHist(Long id) {
        if (eduHistRepository.existsById(id)) {
            eduHistRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public void createDefaultEduHists() {
        List<EduHistDto> eduHistDtos = EduHistDto.createDefaultEduHist();
        for (EduHistDto eduHistDto : eduHistDtos) {
            saveEduHist(eduHistDto);
        }
    }
}