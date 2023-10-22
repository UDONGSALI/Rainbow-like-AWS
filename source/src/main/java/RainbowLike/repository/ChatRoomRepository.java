package RainbowLike.repository;

import RainbowLike.entity.ChatRoom;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface
ChatRoomRepository extends JpaRepository <ChatRoom,Long> {
    Iterable<ChatRoom> findByMember(Member member);
    void deleteByMember(Member member);
}
