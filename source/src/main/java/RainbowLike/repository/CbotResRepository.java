package RainbowLike.repository;

import RainbowLike.entity.CbotRes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CbotResRepository extends JpaRepository <CbotRes, Long>{

}
