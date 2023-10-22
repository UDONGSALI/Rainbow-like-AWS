package RainbowLike.controller;

import RainbowLike.dto.CommentFormDto;
import RainbowLike.entity.Comment;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import RainbowLike.repository.CommentRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.PostRepository;
import RainbowLike.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class CommentController {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private CommentService commentService;

    @RequestMapping("/comments")
    public Iterable<Comment> getComments() {
        // comment 정보 전체 찾기
        return commentRepository.findAll();
    }


    @RequestMapping("/postnumcomm/{id}")
    public Iterable<Comment> getPostNumComm(@PathVariable Long id) {
        //게시글 넘버 조회
        Post post = postRepository.findByPostNum(id);

        return commentRepository.findByPost(post);
    }




    @RequestMapping("/membernumcomm/{id}")
    public Iterable<Comment> getMemberNumComm(@PathVariable Long id) {
        //멤버 넘버 조회
        Member member = memberRepository.findByMemNum(id);

        return commentRepository.findByMember(member);
    }




@PostMapping("/comments/new")
    public ResponseEntity<Comment> createComment(@RequestBody CommentFormDto commentFormDto) {
        Comment savedComment = commentService.createComment(commentFormDto);

        return ResponseEntity.ok(savedComment);
    }

    @RequestMapping("/comm/{commId}")
    public ResponseEntity<Comment> editComm (@PathVariable Long commId, @RequestBody CommentFormDto commentFormDto) {
        Comment savedComment = commentService.editComm(commId, commentFormDto);

        return ResponseEntity.ok(savedComment);
    }

    public void createComms(){
        ArrayList<CommentFormDto> commentDtoList = CommentFormDto.createTestComments();
        commentService.createcomments(commentDtoList);
    }




}
