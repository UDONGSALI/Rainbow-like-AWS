package RainbowLike.service;

import RainbowLike.dto.CBotDto;
import RainbowLike.entity.CbotRes;
import RainbowLike.repository.CbotResRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor

public class CbotService {
    @Autowired
    ModelMapper mapper;

    @Autowired
    CbotResRepository cbotRepository;
    public void createQna(ArrayList<CBotDto> qnaList) {
        for (CBotDto cbotDto : qnaList) {
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            CbotRes cbotRes = mapper.map(cbotDto, CbotRes.class);

            cbotRepository.save(cbotRes);
        }

    }

}
