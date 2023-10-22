package RainbowLike.repository;

import RainbowLike.constant.Status;
import RainbowLike.entity.Member;
import RainbowLike.entity.RentHist;
import RainbowLike.entity.Space;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentHistRepository extends JpaRepository<RentHist, Long> {

    RentHist findByRentHistNum(Long rentHistNum);

    List<RentHist> findByMemberIn(List<Member> members);

    List<RentHist> findBySpaceIn(List<Space> spaces);

    List<RentHist> findByApplyStatus(Status status);

    List<RentHist> findByPayStatus(Status status);

    @Modifying
    @Query("SELECT m.tel, s.spaceName, s.rentFee, r.rentStdt, r.rentEddt FROM RentHist r JOIN r.member m JOIN r.space s WHERE r.rentHistNum = :rentNum")
    List<Object[]> findData(Long rentNum);

    List<RentHist> findByMember(Member member);

    List<RentHist> findByMember_MemNum(Long memNum);

    void deleteByMember(Member member);
}