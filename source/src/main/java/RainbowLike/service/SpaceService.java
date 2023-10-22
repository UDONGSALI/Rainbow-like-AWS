package RainbowLike.service;

import RainbowLike.dto.SpaceDto;
import RainbowLike.entity.Space;
import RainbowLike.repository.SpaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;


@Service
@Transactional
@RequiredArgsConstructor
public class SpaceService {
    private final ModelMapper mapper;
    private final SpaceRepository spaceRepository;

    public void createSpaces(ArrayList<SpaceDto> spaceList){
        for(SpaceDto spaceDto : spaceList){
            Space space=mapper.map(spaceDto, Space.class);
            spaceRepository.save(space);
        }
    }

}
