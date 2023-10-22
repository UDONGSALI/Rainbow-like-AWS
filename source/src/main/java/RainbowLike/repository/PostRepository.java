package RainbowLike.repository;

import RainbowLike.entity.Board;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    Post findByPostNum(Long postNum);

    Post findTopByOrderByPostNumDesc();

    Iterable<Post> findByBoard(Board clubBoard);

    Iterable<Post> findByBoardAndTitleContaining(Board board, String title);

    Iterable<Post> findByTitleContaining(String title);

    Iterable<Post> findByBoardAndContentContaining(Board board, String content);

    Iterable<Post> findByContentContaining(String content);

    Iterable<Post> findByBoardAndMemberIn(Board board, List<Member> members);

    Iterable<Post> findByMemberIn(List<Member> members);

    List<Post> findByBoardAndPostNumGreaterThanOrderByPostNumAsc(Board board, Long postNum);

    List<Post> findByBoardAndPostNumLessThanOrderByPostNumDesc(Board board, Long postNum);

    List<Post> findByParentsNum(Long parentsNum);
    List<Post> findByParentsNumIn(List<Long> parentsNums);

    @Modifying
    @Query("update Post p set p.pageView = p.pageView + 1 where p.postNum = :id")
    int updateView(Long id);

    //멤버별 게시글 찾기
    List<Post> findByMember(Member member);

    List<Post> findByBoardAndMemberMemNum(Board board, Long memNum);

    // 게시글 번호와 게시판 번호로 게시글 찾기
    Post findByPostNumAndBoard_BoardNum(Long postNum, Long boardNum);

    // 게시판과 멤버를 이용하여 게시글 찾기
    List<Post> findByBoardInAndMemberMemNum(List<Board> boards, Long memNum);


    List<Post> findByPostNumIn(List<Long> postNums);


    @Transactional
    @Modifying //데이터베이스에서 연관된 게시글들을 찾아 삭제하는 기능
    @Query("delete from Post p where p.parentsNum = ?1")
    void deleteByParentsNum(Long parentsNum);

    void deleteByMember(Member member);


    void deleteByLabor(Member member);
}
