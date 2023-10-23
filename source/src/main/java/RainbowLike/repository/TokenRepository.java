package RainbowLike.repository;

import RainbowLike.constant.DelYN;
import RainbowLike.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {

    Optional<Token> findByMemId(String memId);
    List<Token> findByMemIdContaining(String memId);
    List<Token> findByRole(String role);
    Token findByJti(String jti);
    void deleteByJti(String jti);
    void deleteByTokenNum(Long tokenNum);
    void deleteAllByExpirationDateBefore(Date date);

}
