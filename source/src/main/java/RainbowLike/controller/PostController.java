package RainbowLike.controller;

import RainbowLike.constant.Status;
import RainbowLike.dto.PostFormDto;
import RainbowLike.entity.Board;
import RainbowLike.entity.Post;
import RainbowLike.repository.BoardRepository;
import RainbowLike.repository.PostRepository;
import RainbowLike.service.PostService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class PostController {

    private final PostRepository postRepository;
    private final BoardRepository boardRepository;
    private final PostService postService;
    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    @GetMapping
    public Iterable<Post> getPosts() {
        return postRepository.findAll();
    }

    @GetMapping("/{postNum}")
    public ResponseEntity<Post> getPost(@PathVariable Long postNum) {
        Post post = postRepository.findByPostNum(postNum);
        return ResponseEntity.ok(post);
    }

    // 게시판 넘버로 게시물을 검색
    @GetMapping("/board/{boardNum}")
    public Iterable<Post> getPostsByBoardNum(@PathVariable Long boardNum) {
        return postRepository.findByBoard(boardRepository.findByBoardNum(boardNum));
    }

    @GetMapping("/search/{option}/{value}")
    public ResponseEntity<Iterable<Post>> searchPost(@PathVariable String option, @PathVariable String value) {
        Iterable<Post> posts = postService.searchPostsByOptionAndValue(option, value);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{boardNum}/search/{option}/{value}")
    public ResponseEntity<Iterable<Post>> searchBoardPost(@PathVariable Long boardNum, @PathVariable String option, @PathVariable String value) {
        Iterable<Post> posts = postService.searchPostsByBoardNumAndOptionAndValue(boardNum, option, value);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/lastPostNum")
    public ResponseEntity<Long> getLastPostNum() {
        Post lastPost = postRepository.findTopByOrderByPostNumDesc();
        logger.info("Last Post: " + lastPost);
        if (lastPost != null) {
            return ResponseEntity.ok().body(lastPost.getPostNum());
        }
        return ResponseEntity.ok().body(0L);  // 0을 반환하거나 다른 기본값을 반환할 수 있습니다.
    }


    // 다음 게시글 가져오기
    @GetMapping("/{boardNum}/next/{postNum}")
    public ResponseEntity<Post> getNextPost(@PathVariable Long boardNum, @PathVariable Long postNum) {
        List<Post> nextPosts = postRepository.findByBoardAndPostNumGreaterThanOrderByPostNumAsc(boardRepository.findByBoardNum(boardNum), postNum);
        if (!nextPosts.isEmpty()) {
            return ResponseEntity.ok(nextPosts.get(0));
        }
        return ResponseEntity.notFound().build();
    }

    // 이전 게시글 가져오기
    @GetMapping("/{boardNum}/prev/{postNum}")
    public ResponseEntity<Post> getPrevPost(@PathVariable Long boardNum, @PathVariable Long postNum) {
        List<Post> prevPosts = postRepository.findByBoardAndPostNumLessThanOrderByPostNumDesc(boardRepository.findByBoardNum(boardNum), postNum);
        if (!prevPosts.isEmpty()) {
            return ResponseEntity.ok(prevPosts.get(0));
        }
        return ResponseEntity.notFound().build();
    }


    // 회원 번호로 멤버별 클럽의 게시글 요청
    @GetMapping("/memberClub/{memNum}")
    public Iterable<Post> getClubPostsByMember(@PathVariable Long memNum) {

        Board clubNumBoard = boardRepository.findByBoardNum(9L);
        return postRepository.findByBoardAndMemberMemNum(clubNumBoard, memNum);
    }

    // 회원 번호로 멤버별 상담(온라인상담,노무상담게시판)의 게시글 요청
    @GetMapping("/memberCounsel/{memNum}")
    public List<Post> getCounselByMember(@PathVariable Long memNum) {
        return postService.getCounselPostsByMember(memNum);
    }

    @PostMapping("/new")
    public ResponseEntity<Post> createPost(@RequestBody PostFormDto postFormDto) {
        Post savedPost = postService.createPost(postFormDto);
        return ResponseEntity.ok(savedPost);
    }

    @PostMapping("/{id}/increase-view")
    public ResponseEntity<Void> increasePageView(@PathVariable Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));

        // 조회수를 1 증가시킵니다.
        post.setPageView(post.getPageView() + 1);
        postRepository.save(post);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/edit/{postId}")
    public ResponseEntity<Post> editPost(@PathVariable Long postId, @RequestBody PostFormDto postFormDto) {

        Post updatedPost = postService.editPost(postId, postFormDto);
        return ResponseEntity.ok(updatedPost);
    }

    @PatchMapping("/patch/{postNum}")
    public ResponseEntity<?> updatePost(@PathVariable Long postNum, @RequestBody Map<String, String> body) {
        String action = body.get("action");

        try {
            Optional<Post> updatedPost;
            switch (action) {
                case "status":
                    Status status = Status.valueOf(body.get("status").toUpperCase());
                    updatedPost = postService.updateStatus(postNum, status);
                    break;
                case "labor":
                    String memId = body.get("laborId");
                    updatedPost = postService.updateLabor(postNum, memId);
                    break;
                case "cancelLabor":
                    updatedPost = Optional.ofNullable(postService.cancelLabor(postNum));
                    break;
                default:
                    return ResponseEntity.badRequest().body("Invalid action");
            }
            if (updatedPost.isPresent()) {
                return ResponseEntity.ok(updatedPost.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid input value");
        }
    }

    @DeleteMapping("/{postNum}")
    public ResponseEntity<?> deletePost(@PathVariable Long postNum) {
        try {
            postService.deletePost(postNum);
            return ResponseEntity.ok("Post and related posts deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error occurred while deleting post and related posts: " + e.getMessage());
        }
    }
}
