package RainbowLike.repository;

import RainbowLike.entity.Edu;
import RainbowLike.entity.File;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {

    List<File> findByMember(Member member);
    List<File> findByEdu(Edu edu);
    List<File> findByPost(Post post);
    List<File> findByPostPostNum(Long postNum);
    List<File> findByPostIsNotNull();
    List<File> findByEduIsNotNull();
    List<File> findByEduHistIsNotNull();
    List<File> findByMemberIsNotNull();
    List<File> findBySpaceIsNotNull();
}
