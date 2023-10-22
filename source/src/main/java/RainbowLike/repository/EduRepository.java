package RainbowLike.repository;

import RainbowLike.constant.EduType;
import RainbowLike.constant.RecuMethod;
import RainbowLike.entity.Edu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EduRepository extends JpaRepository<Edu, Long> {

    Edu findByEduNum(Long eduNum);
    List<Edu> findByEduNameContaining(String eduName);
    List<Edu> findByContentContaining(String content);
    List<Edu> findByType(EduType type);
    List<Edu> findByRecuMethod(RecuMethod recuMethod);
    Edu findTopByOrderByEduNumDesc();


}
