package RainbowLike.repository;

import RainbowLike.entity.FtConsumer;
import RainbowLike.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FtConsumerRepository extends JpaRepository<FtConsumer, Long> {
    List<FtConsumer> findByMember(Member member);

    void deleteByMember(Member member);
}