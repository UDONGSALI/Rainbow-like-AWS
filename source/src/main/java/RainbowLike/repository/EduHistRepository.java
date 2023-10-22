package RainbowLike.repository;

import RainbowLike.constant.Status;
import RainbowLike.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface EduHistRepository extends JpaRepository <EduHist, Long> {

    EduHist findByEduHistNum(Long eduHist);
    List<EduHist> findByMember(Member member);
    List<EduHist> findByMemberAndEdu(Member member,Edu edu);
    List<EduHist> findByMemberIn(List<Member> members);
    List<EduHist> findByEduIn(List<Edu> edus);
    List<EduHist> findByStatus(Status status);

    EduHist findTopByOrderByEduHistNumDesc();

    @Query("SELECT COUNT(e) FROM EduHist e WHERE e.edu.eduNum = :eduNum AND (e.status = :status1 OR e.status = :status2)")
    Long countByEduAndStatus(Long eduNum, Status status1, Status status2);

    List<EduHist> findByMember_MemNum(Long memNum);
}