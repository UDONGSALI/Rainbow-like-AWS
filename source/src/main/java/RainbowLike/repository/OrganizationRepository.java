package RainbowLike.repository;

import RainbowLike.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrganizationRepository  extends JpaRepository<Organization,Long> {

    List<Organization> findByNameContaining(String name);
    List<Organization> findByAddrContaining(String addr);

}
