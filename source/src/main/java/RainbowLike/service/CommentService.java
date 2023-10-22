package RainbowLike.service;

import RainbowLike.dto.CommentFormDto;
import RainbowLike.entity.Comment;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import RainbowLike.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
@RequiredArgsConstructor

public class CommentService {
    @Autowired
    CommentRepository commentRepository;
    private final ModelMapper mapper;

public void saveComment(Comment comment) {

        commentRepository.save(comment);
}

    public Comment createComment(CommentFormDto commentFormDto) {
        Comment newComm = new Comment();

        Post post = new Post();
        post.setPostNum(commentFormDto.getPostNum());
        newComm.setPost(post);
        Member member = new Member();
        member.setMemNum(commentFormDto.getMemNum());
        newComm.setMember(member);

        newComm.setContent(commentFormDto.getContent());
        newComm.setParentNum(commentFormDto.getParentNum());
        newComm.setDelYN(commentFormDto.getDelYN());

        return commentRepository.save(newComm);
    }

    public Comment editComm (Long commId, CommentFormDto commentFormDto) {
        Comment editComm = new Comment();
        editComm.setCommNum(commId);

        Post post = new Post();
        post.setPostNum(commentFormDto.getPostNum());
        editComm.setPost(post);
        Member member = new Member();
        member.setMemNum(commentFormDto.getMemNum());
        editComm.setMember(member);

        editComm.setContent(commentFormDto.getContent());
        editComm.setParentNum(commentFormDto.getParentNum());
        editComm.setDelYN(commentFormDto.getDelYN());

        return commentRepository.save(editComm);
    }

    public void createcomments(ArrayList<CommentFormDto> commentList){
        for(CommentFormDto commentFormDto : commentList){
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            Comment comment = mapper.map(commentFormDto, Comment.class);

            commentRepository.save(comment);
        }
    }

}