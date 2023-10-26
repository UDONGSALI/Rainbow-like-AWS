package RainbowLike.dto;

import RainbowLike.constant.DelYN;
import RainbowLike.constant.Status;
import RainbowLike.entity.Board;
import RainbowLike.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
public class PostFormDto {

    private Long postNum;
    private Long memNum;
    @JsonIgnore
    private Member member;
    @JsonIgnore
    private Member labor;
    private Long boardNum;
    @JsonIgnore
    private Board board;
    private String title;
    private String content;
    private LocalDateTime writeDate;
    private LocalDateTime editDate;
    private int pageView;
    private Status conselStatus;
    private Long parentsNum;
    private Status clubAllowStatus;
    private String clubRecuStatus;
    private DelYN delYN;


    public PostFormDto(){
    }

    static public ArrayList<PostFormDto> createTestPost() {
        ArrayList<PostFormDto> postList = new ArrayList<>();
        Board board1 = new Board();
        Board board2 = new Board();
        Board board3 = new Board();
        Board board4 = new Board();
        Board board5 = new Board();
        Board board6 = new Board();
        Board board7 = new Board();
        Board board8 = new Board();
        Board board9 = new Board();

        board1.setBoardNum(9L);
        board2.setBoardNum(8L);
        board3.setBoardNum(1L);
        board4.setBoardNum(3L);
        board5.setBoardNum(7L);
        board6.setBoardNum(2L);
        board7.setBoardNum(6L);
        board8.setBoardNum(4L);
        board9.setBoardNum(5L);



        Member member1 = new Member();
        Member member2 = new Member();
        Member member3 = new Member();
        Member member4 = new Member();
        Member member5 = new Member();
        Member member6 = new Member();

        member1.setMemNum(1L);
        member2.setMemNum(2L);
        member3.setMemNum(3L);
        member4.setMemNum(6L);
        member5.setMemNum(7L);
        member6.setMemNum(8L);



        PostFormDto post1 = new PostFormDto();
        post1.setBoard(board1);
        post1.setMember(member1);
        post1.setTitle("테스트 게시글 1");
        post1.setContent("테스트 게시글 본문 1");
        post1.setPageView(0);
        post1.setClubAllowStatus(Status.APPROVE);
        post1.setClubRecuStatus("모집중");
        post1.setDelYN(DelYN.N);
        postList.add(post1);

        PostFormDto post2 = new PostFormDto();
        post2.setBoard(board1);
        post2.setMember(member1);
        post2.setTitle("테스트 게시글 2");
        post2.setContent("테스트 게시글 본문 2");
        post2.setWriteDate(LocalDateTime.now());
        post2.setPageView(0);
        post2.setClubAllowStatus(Status.APPROVE);
        post2.setClubRecuStatus("진행중");
        post2.setDelYN(DelYN.Y);
        postList.add(post2);

        PostFormDto post3 = new PostFormDto();
        post3.setBoard(board1);
        post3.setMember(member2);
        post3.setTitle("테스트 게시글 3");
        post3.setContent("테스트 게시글 본문 3");
        post3.setWriteDate(LocalDateTime.now());
        post3.setPageView(0);
        post3.setClubAllowStatus(Status.REJECT);
        post3.setClubRecuStatus("거부");
        post3.setDelYN(DelYN.N);
        postList.add(post3);


        PostFormDto post4 = new PostFormDto();
        post4.setBoard(board2);
        post4.setMember(member4);
        post4.setTitle("상담 테스트 게시글 1");
        post4.setContent("상담 테스트 게시글 본문 1");
        post4.setWriteDate(LocalDateTime.now());
        post4.setPageView(0);
        post4.setConselStatus(Status.WAIT);
        post4.setDelYN(DelYN.N);
        postList.add(post4);

        PostFormDto post5 = new PostFormDto();
        post5.setBoard(board2);
        post5.setMember(member6);
        post5.setTitle("상담 테스트 게시글 2");
        post5.setContent("상담 테스트 게시글 본문 2");
        post5.setWriteDate(LocalDateTime.now());
        post5.setPageView(0);
        post5.setConselStatus(Status.WAIT);
        post5.setDelYN(DelYN.Y);
        postList.add(post5);

        PostFormDto post6 = new PostFormDto();
        post6.setBoard(board3);
        post6.setMember(member1);
        post6.setTitle("공지사항 첫 글입니다.");
        post6.setContent("공지사항 테스트 글 입니다.");
        post6.setWriteDate(LocalDateTime.now());
        post6.setPageView(0);

        postList.add(post6);

        PostFormDto post7 = new PostFormDto();
        post7.setBoard(board3);
        post7.setMember(member1);
        post7.setTitle("공지사항 두 번째 글 입니다.");
        post7.setContent("공지사항 테스트 글 두 번째에요.<br> 안녕하세영");
        post7.setWriteDate(LocalDateTime.now());
        post7.setPageView(0);

        postList.add(post7);

        PostFormDto post8 = new PostFormDto();
        post8.setBoard(board3);
        post8.setMember(member1);
        post8.setTitle("공지사항 세 번째 글 입니다.");
        post8.setContent("공지사항 테스트 글 세 번째에요.<br>" +
                "본문의 길이를 늘려서 써본 테스트 글 입니다.<br> 오늘도 행복한 하루 되세요.<br>" );

        post8.setWriteDate(LocalDateTime.now());
        post8.setPageView(0);

        postList.add(post8);

        PostFormDto post9 = new PostFormDto();
        post9.setBoard(board3);
        post9.setMember(member1);
        post9.setTitle("공지사항 네 번째 글 입니다.");
        post9.setContent("공지사항 테스트 글 네 번째에요. 안녕하세영");
        post9.setWriteDate(LocalDateTime.now());
        post9.setPageView(0);

        postList.add(post9);

        PostFormDto post10 = new PostFormDto();
        post10.setBoard(board3);
        post10.setMember(member1);
        post10.setTitle("공지사항 다섯 번째 글 입니다.");
        post10.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/10/notice2.png\"></p><p><img src=\"https://storage.googleapis.com/rainbow_like/post/10/notice3.png\"></p><p><br></p><p>공지사항 테스트 글 다섯 번째에요. </p><p><br></p><p>글 목록을 늘려보려고 합니다.</p><p><br></p>");
        post10.setWriteDate(LocalDateTime.now());
        post10.setPageView(0);

        postList.add(post10);

        PostFormDto post11 = new PostFormDto();
        post11.setBoard(board4);
        post11.setMember(member1);
        post11.setTitle("썸네일 게시판 첫 글");
        post11.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/11/notice4.png\"></p><p><br></p><p>썸네일 게시판 입니다.</p><p><br></p>");
        post11.setWriteDate(LocalDateTime.now());
        post11.setPageView(0);

        postList.add(post11);

        PostFormDto post12 = new PostFormDto();
        post12.setBoard(board4);
        post12.setMember(member1);
        post12.setTitle("썸네일 게시판 두 번째 글");
        post12.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/12/notice1.jpg\"></p><p><br></p><p>썸네일 게시판 두 번째 글 입니다.</p><p><br></p>");
        post12.setWriteDate(LocalDateTime.now());
        post12.setPageView(0);

        postList.add(post12);

        PostFormDto post13 = new PostFormDto();
        post13.setBoard(board4);
        post13.setMember(member1);
        post13.setTitle("썸네일 게시판 세 번쨰 글");
        post13.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/13/sj2.png\"></p><p><br></p><p>썸네일 게시판 세 번째 글 입니다.333</p><p><br></p>");
        post13.setWriteDate(LocalDateTime.now());
        post13.setPageView(0);

        postList.add(post13);

        PostFormDto post14 = new PostFormDto();
        post14.setBoard(board4);
        post14.setMember(member1);
        post14.setTitle("썸네일 게시판 네 번째에뇸");
        post14.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/14/sj3.jpg\"></p><p><br></p>썸네일 게시판 입니다.<p><br></p><p>444</p>");
        post14.setWriteDate(LocalDateTime.now());
        post14.setPageView(0);

        postList.add(post14);

        PostFormDto post15 = new PostFormDto();
        post15.setBoard(board4);
        post15.setMember(member1);
        post15.setTitle("썸네일 게시판 다섯 번째 글");
        post15.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/15/sj4.jpg\"></p><p><br></p><p>썸네일 게시판 다섯 번째 글 입니다.</p><p><br></p>");
        post15.setWriteDate(LocalDateTime.now());
        post15.setPageView(0);

        postList.add(post15);

        PostFormDto post16 = new PostFormDto();
        post16.setBoard(board4);
        post16.setMember(member1);
        post16.setTitle("썸네일 게시판 여섯 번째 글");
        post16.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/16/sj5_1.jpg\"></p><p><img src=\"https://storage.googleapis.com/rainbow_like/post/16/sj5_2.jpg\"></p><p><img src=\"https://storage.googleapis.com/rainbow_like/post/16/sj5_3.jpg\"></p><p><br></p><p>썸네일 게시판 여섯 번째 글 입니당구리 6</p><p><br></p>");
        post16.setWriteDate(LocalDateTime.now());
        post16.setPageView(0);

        postList.add(post16);

        PostFormDto post17 = new PostFormDto();
        post17.setBoard(board4);
        post17.setMember(member1);
        post17.setTitle("썸네일 게시판 일곱 번째 글");
        post17.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/17/sj6.jpg\"></p><p><br></p><p>썸네일 게시판 일곱 번째글 입니다.</p><p><br></p>");
        post17.setWriteDate(LocalDateTime.now());
        post17.setPageView(0);

        postList.add(post17);

        PostFormDto post18 = new PostFormDto();
        post18.setBoard(board5);
        post18.setMember(member4);
        post18.setTitle("노무사 게시판 유저 글1 입니다.");
        post18.setLabor(member3);
        post18.setContent("노무사 게시판 내용 입니다.");
        post18.setConselStatus(Status.COMPLETE);
        post18.setWriteDate(LocalDateTime.now());
        post18.setPageView(0);

        postList.add(post18);

        PostFormDto post19 = new PostFormDto();
        post19.setBoard(board5);
        post19.setMember(member5);
        post19.setTitle("노무사 게시판 유저 글2 입니다.");
        post19.setContent("노무사 게시판 내용2 입니다.");
        post19.setConselStatus(Status.WAIT);
        post19.setWriteDate(LocalDateTime.now());
        post19.setPageView(0);

        postList.add(post19);

        PostFormDto post20 = new PostFormDto();
        post20.setBoard(board5);
        post20.setMember(member3);
        post20.setParentsNum(18L);
        post20.setTitle("노무사 게시판  답글.");
        post20.setContent("노무사 게시판  답글 입니다.");
        post20.setWriteDate(LocalDateTime.now());
        post20.setPageView(0);

        postList.add(post20);

        for (int i = 1; i <= 11; i++) {
            PostFormDto post = new PostFormDto();
            post.setBoard(board6);
            post.setMember(member1);
            post.setTitle("언론보도 테스트 글" + i);
            post.setContent("언론보도 테스트 글 입니다." + i);
            post.setWriteDate(LocalDateTime.now());
            post.setPageView(0);
            postList.add(post);
        }

        PostFormDto post21 = new PostFormDto();
        post21.setBoard(board7);
        post21.setMember(member2);
        post21.setTitle("[반짝]스터디카페가 갈 필요 있나요?");
        post21.setContent("제곧내 진짜 스터디 카페가지 말고 여기로 오세요. 무료인데 시간도 널널해서 공부하기 딱입니다");
        post21.setWriteDate(LocalDateTime.now());
        post21.setPageView(0);

        postList.add(post21);

        PostFormDto post22 = new PostFormDto();
        post22.setBoard(board7);
        post22.setMember(member2);
        post22.setTitle("[혜윰]정말 잘 이용했습니다.");
        post22.setContent("장비들이 너무 잘 구비되어 있어서 강의할 때 정말 유용했습니다. 다음번에도 또 부탁드립니다.");
        post22.setWriteDate(LocalDateTime.now());
        post22.setPageView(0);

        postList.add(post22);

        PostFormDto post23 = new PostFormDto();
        post23.setBoard(board7);
        post23.setMember(member2);
        post23.setTitle("[활짝]스터디모임하기 딱입니다.");
        post23.setContent("스터디모임할 때는 역시 여기가 최고임.");
        post23.setWriteDate(LocalDateTime.now());
        post23.setPageView(0);

        postList.add(post23);

        PostFormDto post24 = new PostFormDto();
        post24.setBoard(board8);
        post24.setMember(member1);
        post24.setTitle("여플소식 게시판1");
        post24.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/35/ple1.png\"></p><p>여플소식 내용 입니다. 1</p>");
        post24.setWriteDate(LocalDateTime.now());
        post24.setPageView(0);

        postList.add(post24);

        PostFormDto post25 = new PostFormDto();
        post25.setBoard(board8);
        post25.setMember(member1);
        post25.setTitle("여플소식 게시판2");
        post25.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/36/ple2.png\"></p><p>여플소식 내용 입니다. 2</p>");
        post25.setWriteDate(LocalDateTime.now());
        post25.setPageView(0);

        postList.add(post25);

        PostFormDto post26 = new PostFormDto();
        post26.setBoard(board8);
        post26.setMember(member1);
        post26.setTitle("여플소식 게시판3");
        post26.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/37/ple7.png\"></p><p>여플소식 내용 입니다. 3</p>");
        post26.setWriteDate(LocalDateTime.now());
        post26.setPageView(0);

        postList.add(post26);

        PostFormDto post27 = new PostFormDto();
        post27.setBoard(board8);
        post27.setMember(member1);
        post27.setTitle("여플소식 게시판4");
        post27.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/38/ple4.png\"></p><p>여플소식 내용 입니다. 4</p>");
        post27.setWriteDate(LocalDateTime.now());
        post27.setPageView(0);

        postList.add(post27);

        PostFormDto post28 = new PostFormDto();
        post28.setBoard(board8);
        post28.setMember(member1);
        post28.setTitle("여플소식 게시판5");
        post28.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/39/ple5.png\"></p><p>여플소식 내용 입니다. 5</p>");
        post28.setWriteDate(LocalDateTime.now());
        post28.setPageView(0);

        postList.add(post28);

        PostFormDto post29 = new PostFormDto();
        post29.setBoard(board8);
        post29.setMember(member1);
        post29.setTitle("여플소식 게시판6");
        post29.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/40/ple6.png\"></p><p>여플소식 내용 입니다. 6</p>");
        post29.setWriteDate(LocalDateTime.now());
        post29.setPageView(0);

        postList.add(post29);

        PostFormDto post30 = new PostFormDto();
        post30.setBoard(board9);
        post30.setMember(member1);
        post30.setTitle("뉴스레터 1");
        post30.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/41/newLetter.png\"></p><p>뉴스레터 게시판 입니다. 1</p>");
        post30.setWriteDate(LocalDateTime.now());
        post30.setPageView(0);

        postList.add(post30);

        PostFormDto post31 = new PostFormDto();
        post31.setBoard(board9);
        post31.setMember(member1);
        post31.setTitle("뉴스레터 2");
        post31.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/42/newLetter.png\"></p><p>뉴스레터 게시판 입니다. 2</p>");
        post31.setWriteDate(LocalDateTime.now());
        post31.setPageView(0);

        postList.add(post31);

        PostFormDto post32 = new PostFormDto();
        post32.setBoard(board9);
        post32.setMember(member1);
        post32.setTitle("뉴스레터 3");
        post32.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/43/newLetter.png\"></p><p>뉴스레터 게시판 입니다. 2</p>");
        post32.setWriteDate(LocalDateTime.now());
        post32.setPageView(0);

        postList.add(post32);

        PostFormDto post33 = new PostFormDto();
        post33.setBoard(board9);
        post33.setMember(member1);
        post33.setTitle("뉴스레터 4");
        post33.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/44/newLetter.png\"></p><p>뉴스레터 게시판 입니다. 4</p>");
        post33.setWriteDate(LocalDateTime.now());
        post33.setPageView(0);

        postList.add(post33);

        PostFormDto post34 = new PostFormDto();
        post34.setBoard(board9);
        post34.setMember(member1);
        post34.setTitle("뉴스레터 5");
        post34.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/45/newLetter.png\"></p><p>뉴스레터 게시판 입니다. 5</p>");
        post34.setWriteDate(LocalDateTime.now());
        post34.setPageView(0);

        postList.add(post34);

        PostFormDto post35 = new PostFormDto();
        post35.setBoard(board9);
        post35.setMember(member1);
        post35.setTitle("뉴스레터 6");
        post35.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/46/newLetter.png\"></p><p>뉴스레터 게시판 입니다. 6</p>");
        post35.setWriteDate(LocalDateTime.now());
        post35.setPageView(0);

        postList.add(post35);

        PostFormDto post36 = new PostFormDto();
        post36.setBoard(board5);
        post36.setMember(member4);
        post36.setTitle("노무사 게시판 이미지 있는 글 입니다.");
        post36.setContent("<p><img src=\"https://storage.googleapis.com/rainbow_like/post/47/KakaoTalk_20231011_182459375.jpg\"></p><p><br></p><p>노무사 게시판 이미지 있는 게시글 이에영</p>");
        post36.setConselStatus(Status.WAIT);
        post36.setWriteDate(LocalDateTime.now());
        post36.setPageView(0);

        postList.add(post36);

        return postList;
    }

}