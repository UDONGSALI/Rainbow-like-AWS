package RainbowLike.repository;

import RainbowLike.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository <Board, Long> {

    Board findByBoardNum(Long boardNum);

    List<Board> findByBoardNameContaining(String boardName);
}
