package RainbowLike.repository;

import RainbowLike.entity.Space;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpaceRepository extends JpaRepository<Space, Long> {

    Space findBySpaceNum(Long sapceNum);

    List<Space> findBySpaceNameContaining(String name);

    Space findTopByOrderBySpaceNumDesc();
}
