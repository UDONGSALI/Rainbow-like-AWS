package RainbowLike.repository;

import RainbowLike.entity.Comment;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository <Comment, Long> {

    Comment findByCommNum(Long commNum);

    Comment findTopByOrderByCommNumDesc();
    void deleteByMember(Member member);
    Iterable<Comment> findByPost(Post postNum);
     Iterable<Comment> findByMember(Member MemberNum);

    @Transactional
    @Modifying
    @Query("delete from Comment p where p.member.memId = :memId")
    void deleteByMember_MemId(@Param("memId") String memId);

    boolean existsByMember_MemId(String memId);

}


