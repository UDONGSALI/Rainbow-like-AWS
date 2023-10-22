package RainbowLike.controller;

import RainbowLike.dto.SpaceDto;
import RainbowLike.entity.Space;
import RainbowLike.repository.SpaceRepository;
import RainbowLike.service.SpaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.ArrayList;

@RestController
@RequiredArgsConstructor

public class SpaceController {


    private final SpaceService spaceService;
    private final SpaceRepository spaceRepository;

    @RequestMapping("/spaces")
    private Iterable<Space> getSpaces() {
        return spaceRepository.findAll();
    }

    // 추가된 메서드
    @GetMapping("/spaces/{spaceNum}")
    private Space getSpaceByNum(@PathVariable Long spaceNum) {
        return spaceRepository.findBySpaceNum(spaceNum);
    }

//    @PostConstruct
    private void createSpaces() {
        ArrayList<SpaceDto> spaceDtoList = SpaceDto.createSpaces();
        spaceService.createSpaces(spaceDtoList);
    }
}
