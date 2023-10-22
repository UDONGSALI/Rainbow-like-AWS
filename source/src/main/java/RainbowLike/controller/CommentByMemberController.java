package RainbowLike.controller;


import RainbowLike.component.CommentNotFoundException;
import RainbowLike.component.MemberNotFoundException;
import RainbowLike.entity.Comment;
import RainbowLike.entity.Member;
import RainbowLike.repository.CommentRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.service.CommentByMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;



@RestController
public class CommentByMemberController {
    @Autowired
    private CommentByMemberService commentByMemberService;

    @Autowired
    private CommentRepository commentRepository;


    @GetMapping("/comments/member/{memNum}")
    public Iterable<Comment> getCommentsByMember(@PathVariable Long memNum) {
       Member member = commentByMemberService.getMemberByMemNum(memNum);
        if (member != null) {
            // 댓글을 작성한 회원(Member)을 가져오는 로직을 작성
            return commentRepository.findByMember(member);
        } else {
            throw new CommentNotFoundException("Comment not found with CommentNum: " + memNum);
        }
    }

}