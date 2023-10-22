package RainbowLike.repository;

import RainbowLike.constant.Gender;
import RainbowLike.constant.Type;
import RainbowLike.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByMemId(String memId);
    List<Member> findByMemIdContaining(String memId);
    List<Member> findByType(Type type);
    List<Member> findByNameContaining(String name);
    List<Member> findByAddrContaining(String addr);
    List<Member> findByGender(Gender gender);
    Member findByEmail(String email);
    Member findByTel(String tel);

    Member findByMemNum(Long memNum);

    Member findTopByOrderByMemNumDesc();



    @Query("SELECT m.tel FROM Member m")
    List<String> findAllTels();
}


