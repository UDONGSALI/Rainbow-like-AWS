package RainbowLike.repository;

import RainbowLike.constant.EventType;
import RainbowLike.entity.Log;
import RainbowLike.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<Log, Long> {
    Iterable<Log> findByType(EventType type);

    Iterable<Log> findByUrlContaining(String url);

    Iterable<Log> findByMemberIn(List<Member> members);
}
