package RainbowLike.dto;

import RainbowLike.entity.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PathAndEntities {

    String midPath;
    Member member;
    Space space;
    Edu edu;
    EduHist eduHist;
    Post post;
}
