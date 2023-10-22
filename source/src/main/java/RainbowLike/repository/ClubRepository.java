package RainbowLike.repository;

import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClubRepository extends CrudRepository<Post, Long> {


//    Iterable<Post> findById(Long id);
//    @Query("select p from post as p where p.board_num = 10")
//    Iterable<Post> findByClubs();

}

