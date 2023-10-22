package RainbowLike.service;

import RainbowLike.constant.EduType;
import RainbowLike.constant.RecuMethod;
import RainbowLike.constant.Status;
import RainbowLike.dto.EduDto;
import RainbowLike.entity.Edu;
import RainbowLike.repository.EduHistRepository;
import RainbowLike.repository.EduRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class EduService {

    private final EduRepository eduRepository;
    private final EduHistRepository eduHistRepository;
    private final ModelMapper mapper;

    public Iterable<Edu> findAll() {
        return eduRepository.findAll();
    }
    public Edu saveEdu(Edu edu) {
        return eduRepository.save(edu);
    }
    public Iterable<Edu> searchByOptionAndValue(String option, String value) {
        Iterable<Edu> result;
        switch (option) {
            case "eduName":
                result = eduRepository.findByEduNameContaining(value);
                break;
            case "content":
                result = eduRepository.findByContentContaining(value);
                break;
            case "type":
                EduType type = EduType.valueOf(value);
                result = eduRepository.findByType(type);
                break;
            case "recuMethod":
                RecuMethod recuMethod = RecuMethod.valueOf(value);
                result = eduRepository.findByRecuMethod(recuMethod);
                break;
            default:
                result = new ArrayList<>();
        }
        return result;
    }
    public void updateRecuPerson(Long eduNum) {
        Long count = eduHistRepository.countByEduAndStatus(eduNum, Status.APPROVE, Status.COMPLETE);
        Edu edu = eduRepository.findByEduNum(eduNum);
        edu.setRecuPerson(count.intValue());
        eduRepository.save(edu);
    }

//    @PostConstruct
    private void createDefaultEdus() {
        ArrayList<EduDto> eduDtos = EduDto.createDefaultEdu();
        for (EduDto eduDto: eduDtos) {
            Edu edu = mapper.map(eduDto, Edu.class);
            saveEdu(edu);
        }
    }
}