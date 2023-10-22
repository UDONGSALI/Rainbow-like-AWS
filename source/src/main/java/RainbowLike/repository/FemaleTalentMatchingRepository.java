package RainbowLike.repository;

import RainbowLike.entity.FemaleTalentMatching;
import RainbowLike.entity.FtConsumer;
import RainbowLike.entity.FtWorker;
import RainbowLike.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FemaleTalentMatchingRepository extends JpaRepository<FemaleTalentMatching, Long>{
    List<FemaleTalentMatching> findByFtConsumer(FtConsumer ftc);
//    List<FemaleTalentMatching> findByMember(Member member);

    @Modifying
    @Query("SELECT m.tel FROM FemaleTalentMatching f JOIN f.ftWorker w JOIN w.member m WHERE f.ftConsumer.ftConsumerNum = :ftcNum")
    List<String> findWorkerTelByConsumerNum(Long ftcNum);

    @Modifying
    @Query("SELECT m.tel FROM FemaleTalentMatching f JOIN f.ftConsumer c JOIN c.member m WHERE f.ftConsumer.ftConsumerNum = :ftcNum")
    List<String> findConsumerTelByConsumerNum(Long ftcNum);

}
