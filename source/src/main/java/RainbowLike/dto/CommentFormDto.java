package RainbowLike.dto;

import RainbowLike.constant.DelYN;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
public class CommentFormDto {

    private Long PostNum;
    @JsonIgnore
    private Post post;
    private Long memNum;
    @JsonIgnore
    private Member member;
    private String content;
    private Long parentNum;
    private LocalDateTime writeDate;
    private LocalDateTime editDate;
    private DelYN delYN;

    public CommentFormDto(){

    }

    public CommentFormDto(Long postNum, Long memberNum, String content, Long parentNum, LocalDateTime writeDate, LocalDateTime editDate){
        this.PostNum = postNum;
        this.memNum = memberNum;
        this.content = content;
        this.parentNum = parentNum;
        this.writeDate = writeDate;
        this.editDate = editDate;
    }

    static public ArrayList<CommentFormDto> createTestComments() {
        ArrayList<CommentFormDto> commentList = new ArrayList<>();
        Member member1 = new Member();
        Member member2 = new Member();
        Member member3 = new Member();
        Member member4 = new Member();
        member1.setMemNum(1L);
        member2.setMemNum(2L);
        member3.setMemNum(3L);
        member4.setMemNum(4L);

        Post post1 = new Post();
        Post post2 = new Post();
        Post post3 = new Post();
        post1.setPostNum(1L);
        post2.setPostNum(2L);
        post3.setPostNum(3L);


        CommentFormDto comment1 = new CommentFormDto();
        comment1.setPost(post1);
        comment1.setMember(member1);
        comment1.setContent("댓글1");
        comment1.setParentNum(0L);
        comment1.setDelYN(DelYN.N);
        commentList.add(comment1);

        CommentFormDto comment2 = new CommentFormDto();
        comment2.setPost(post1);
        comment2.setMember(member2);
        comment2.setContent("댓글2(삭제)");
        comment2.setParentNum(0L);
        comment2.setDelYN(DelYN.Y);
        commentList.add(comment2);

        CommentFormDto comment3 = new CommentFormDto();
        comment3.setPost(post1);
        comment3.setMember(member3);
        comment3.setContent("대댓글1(삭제)");
        comment3.setParentNum(1L);
        comment3.setDelYN(DelYN.Y);
        commentList.add(comment3);

        CommentFormDto comment4 = new CommentFormDto();
        comment4.setPost(post1);
        comment4.setMember(member4);
        comment4.setContent("대대댓글1");
        comment4.setParentNum(3L);
        comment4.setDelYN(DelYN.N);
        commentList.add(comment4);

        CommentFormDto comment5 = new CommentFormDto();
        comment5.setPost(post1);
        comment5.setMember(member1);
        comment5.setContent("댓글2의 대댓글1");
        comment5.setParentNum(2L);
        comment5.setDelYN(DelYN.N);
        commentList.add(comment5);

        CommentFormDto comment6 = new CommentFormDto();
        comment6.setPost(post1);
        comment6.setMember(member1);
        comment6.setContent("삭제된 댓글 3");
        comment6.setParentNum(0L);
        comment6.setDelYN(DelYN.Y);
        commentList.add(comment6);


        return commentList;
    }

}
