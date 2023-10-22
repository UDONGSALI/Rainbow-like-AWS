package RainbowLike.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;


@Getter
@Setter
public class BoardDto {


    @NotNull
    private String boardName;

    @NotBlank
    private boolean readRole;

    @NotBlank
    private boolean writeRole;


    @NotBlank
    private boolean commAllowYn;


    static public ArrayList<BoardDto> createBoards() {
        ArrayList<BoardDto> boardList = new ArrayList<BoardDto>();

        BoardDto board1 = new BoardDto();
        board1.setBoardName("공지사항");
        board1.setReadRole(true);
        board1.setWriteRole(false);
        board1.setCommAllowYn(false);

        boardList.add(board1);

        BoardDto board2 = new BoardDto();
        board2.setBoardName("언론 보도");
        board2.setReadRole(true);
        board2.setWriteRole(false);
        board2.setCommAllowYn(false);

        boardList.add(board2);

        BoardDto board3 = new BoardDto();
        board3.setBoardName("세종시 기관 및 단체 소식");
        board3.setReadRole(true);
        board3.setWriteRole(false);
        board3.setCommAllowYn(false);

        boardList.add(board3);

        BoardDto board4 = new BoardDto();
        board4.setBoardName("여플 소식");
        board4.setReadRole(true);
        board4.setWriteRole(false);
        board4.setCommAllowYn(false);

        boardList.add(board4);

        BoardDto board5 = new BoardDto();
        board5.setBoardName("뉴스레터");
        board5.setReadRole(true);
        board5.setWriteRole(false);
        board5.setCommAllowYn(false);

        boardList.add(board5);

        BoardDto board6 = new BoardDto();
        board6.setBoardName("대관 이용 후기");
        board6.setReadRole(true);
        board6.setWriteRole(false);
        board6.setCommAllowYn(false);

        boardList.add(board6);

        BoardDto board7 = new BoardDto();
        board7.setBoardName("노무 상담 게시판");
        board7.setReadRole(true);
        board7.setWriteRole(false);
        board7.setCommAllowYn(false);

        boardList.add(board7);

        BoardDto board8 = new BoardDto();
        board8.setBoardName("온라인 상담");
        board8.setReadRole(true);
        board8.setWriteRole(false);
        board8.setCommAllowYn(false);

        boardList.add(board8);

        BoardDto board9 = new BoardDto();
        board9.setBoardName("모임 페이지");
        board9.setReadRole(true);
        board9.setWriteRole(false);
        board9.setCommAllowYn(true);

        boardList.add(board9);

        return boardList;
    }
}
