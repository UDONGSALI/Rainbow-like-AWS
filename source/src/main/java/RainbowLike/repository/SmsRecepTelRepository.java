package RainbowLike.repository;

import RainbowLike.entity.SmsHist;
import RainbowLike.entity.SmsRecepTel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SmsRecepTelRepository extends JpaRepository <SmsRecepTel, Long> {
    Iterable<SmsRecepTel> findBySmsHist(SmsHist smsHist);


    @Modifying
    @Query("SELECT r.recepTel FROM SmsRecepTel r JOIN r.smsHist h WHERE h.smsHistNum = :histNum")
    List<String> findRecepTelBySmsHistNum(Long histNum);

}
