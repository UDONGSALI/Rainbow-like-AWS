package RainbowLike.repository;

import RainbowLike.entity.PayHist;
import RainbowLike.entity.RentHist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PayHistRepository extends JpaRepository<PayHist, Long> {

    Iterable<PayHist> findByRentHist(RentHist rentHist);

    Iterable<PayHist> findByRentHistIn(List<RentHist> rentHists);
}
