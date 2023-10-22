package RainbowLike.dto;

import RainbowLike.entity.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class FTInfo {
    private FtWorker ftw;
    private FtConsumer ftc;
    private FemaleTalentMatching ftm;
    private Member member;
    public FTInfo(FtWorker ftw, Member member) {
        this.ftw = ftw;
        this.member = member;
    }

    public FTInfo(FtConsumer ftc, Member member) {
        this.ftc = ftc;
        this.member = member;
    }

    public FTInfo(FemaleTalentMatching ftm, FtWorker ftw, FtConsumer ftc) {
        this.ftm = ftm;
        this.ftw = ftw;
        this.ftc = ftc;
    }
}
