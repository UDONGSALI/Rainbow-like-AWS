package RainbowLike.repository;

import RainbowLike.entity.SmsHist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SmsHistRepository extends JpaRepository <SmsHist, Long> {


}
