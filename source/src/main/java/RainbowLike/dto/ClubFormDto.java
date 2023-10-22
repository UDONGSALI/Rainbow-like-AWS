package RainbowLike.dto;

import RainbowLike.entity.Board;
import RainbowLike.entity.Member;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ClubFormDto {

    private Long memNum;
    private Long boardNum;
    private String title;
    private String content;
    private LocalDateTime writeDate;
    private int pageView;
    private String clubAllowStatus;
    private String clubRecuStatus;

    public ClubFormDto(Long postNum, String title){

    }

    public ClubFormDto(String title, String content, LocalDateTime writeDate, int pageView, String clubAllowStatus, String clubRecuStatus){
        this.title = title;
        this.content = content;
        this.writeDate = writeDate;
        this.pageView = pageView;
        this.clubAllowStatus = clubAllowStatus;
        this.clubRecuStatus = clubRecuStatus;
    }

    public ClubFormDto(String title, String content, LocalDateTime writeDate, int pageView, String clubAllowStatus, String clubRecuStatus, Long memNum, Long boardNum) {
        Board board = new Board();
        Member member = new Member();

        this.title = title;
        this.content = content;
        this.writeDate = writeDate;
        this.pageView = pageView;
        this.clubAllowStatus = clubAllowStatus;
        this.clubRecuStatus = clubRecuStatus;
        this.boardNum = boardNum;
        board.setBoardNum(boardNum);
        this.memNum = memNum;
        member.setMemNum(memNum);

    }


}
