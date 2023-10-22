package RainbowLike.service;

import RainbowLike.constant.Status;
import RainbowLike.dto.PostFormDto;
import RainbowLike.entity.Board;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import RainbowLike.repository.BoardRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    private final PostRepository postRepository;
    private final SmsService smsService;
    private final ModelMapper mapper;

    public void createDefaultPosts() {
        ArrayList<PostFormDto> postDtoList = PostFormDto.createTestPost();
        for (PostFormDto postFormDto : postDtoList) {
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            Post post = mapper.map(postFormDto, Post.class);

            postRepository.save(post);
        }
    }

    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    public Post createPost(PostFormDto postFormDto) {
        Post newPost = mapper.map(postFormDto, Post.class);

        Board board = new Board();
        board.setBoardNum(postFormDto.getBoardNum());
        newPost.setBoard(board);
        if (board.getBoardNum() == 7L || board.getBoardNum() == 8L) {
            newPost.setConselStatus(Status.WAIT);
        }

        if (newPost.getParentsNum() != null) {
            Post parenstsPost = postRepository.findByPostNum(newPost.getParentsNum());
            parenstsPost.setConselStatus(Status.COMPLETE);
            savePost(parenstsPost);
            newPost.setConselStatus(null);
        }

        Member member = new Member();
        member.setMemNum(postFormDto.getMemNum());
        newPost.setMember(member);

        return savePost(newPost);
    }

    public Post editPost(Long postId, PostFormDto postFormDto) {
        Optional<Post> optionalPost = postRepository.findById(postId);

        if (!optionalPost.isPresent()) {
            // 여기에서 적절한 예외를 던질 수 있습니다.
            throw new EntityNotFoundException("Post with id " + postId + " not found");
        }

        Post existingPost = optionalPost.get();

        mapper.map(postFormDto, existingPost);

        existingPost.setBoard(boardRepository.findByBoardNum(postFormDto.getBoardNum()));

        existingPost.setMember(memberRepository.findByMemNum(postFormDto.getMemNum()));

        return savePost(existingPost);
    }

    public Iterable<Post> searchPostsByOptionAndValue(String option, String value) {
        switch (option.toLowerCase()) {
            case "title":
                return postRepository.findByTitleContaining(value);
            case "content":
                return postRepository.findByContentContaining(value);
            case "member":
                return postRepository.findByMemberIn(memberRepository.findByMemIdContaining(value));
            default:
                return Collections.emptyList();
        }
    }

    public List<Post> getCounselPostsByMember(Long memNum) {
        List<Board> councelBoard = boardRepository.findByBoardNameContaining("상담");
        List<Post> posts = postRepository.findByBoardInAndMemberMemNum(councelBoard, memNum);
        List<Long> parentsNums = new ArrayList<>();

        for (Post post : posts) {
            parentsNums.add(post.getPostNum());
        }

        posts.addAll(postRepository.findByParentsNumIn(parentsNums));
        return posts;
    }

    public Iterable<Post> searchPostsByBoardNumAndOptionAndValue(Long boardNum, String option, String value) {

        Board board = boardRepository.findByBoardNum(boardNum);

        switch (option.toLowerCase()) {
            case "title":
                return postRepository.findByBoardAndTitleContaining(board, value);
            case "content":
                return postRepository.findByBoardAndContentContaining(board, value);
            case "member":
                return postRepository.findByBoardAndMemberIn(board, memberRepository.findByMemIdContaining(value));
            default:
                return Collections.emptyList();
        }
    }

    @Transactional
    public Optional<Post> updateStatus(Long postNum, Status status) {
        Optional<Post> optionalPost = postRepository.findById(postNum);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setClubAllowStatus(status);
            return Optional.of(postRepository.save(post));
        }
        return Optional.empty();
    }

    @Transactional
    public Optional<Post> updateLabor(Long postNum, String memId) {
        Optional<Post> optionalPost = postRepository.findById(postNum);
        smsService.updateLaborSms(postNum, true);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setLabor(memberRepository.findByMemId(memId));
            post.setConselStatus(Status.APPROVE);
            return Optional.of(postRepository.save(post));
        }
        return Optional.empty();
    }

    @Transactional
    public Post cancelLabor(Long postNum) {
        Optional<Post> optionalPost = postRepository.findById(postNum);
        smsService.updateLaborSms(postNum, false);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setLabor(null);
            post.setConselStatus(Status.WAIT);
            return postRepository.save(post);
        }
        return null;
    }

    @Transactional
    public void deletePost(Long postNum) {
        Post post = postRepository.findByPostNum(postNum);
        Optional.ofNullable(post.getParentsNum())
                .ifPresent(parentsNum -> {
                    Post parentsPost = postRepository.findByPostNum(parentsNum);
                    if (parentsPost.getBoard().getBoardNum() == 7L) {
                        parentsPost.setConselStatus(Status.APPROVE);
                    } else {
                        parentsPost.setConselStatus(Status.WAIT);
                    }
                });
        postRepository.delete(post);
    }


    public void deletePostAndRelated(Long postNum) {
        // 현재 게시글을 삭제하기 전에 parentsNum과 일치하는 게시글들을 삭제
        postRepository.deleteByParentsNum(postNum);
        postRepository.deleteById(postNum);
    }
}