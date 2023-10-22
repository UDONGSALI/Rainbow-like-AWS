package RainbowLike.controller;

import RainbowLike.component.MemberNotFoundException;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import RainbowLike.repository.PostRepository;
import RainbowLike.service.PostByMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostByMemberController {
    @Autowired
    private PostByMemberService postByMemberService;

    @Autowired
    private PostRepository postRepository;


    @GetMapping("/posts/member/{memNum}")
    public List<Post> getPostsByMember(@PathVariable Long memNum) {
        Member member = postByMemberService.getMemberByMemNum(memNum);
        if (member != null) {
            return postRepository.findByMember(member);

        } else {
            throw new MemberNotFoundException("Member not found with id : " + memNum);
        }
    }

    // MemberNotFoundException을 처리하는 핸들러 추가
    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<String> handleMemberNotFoundException(MemberNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
