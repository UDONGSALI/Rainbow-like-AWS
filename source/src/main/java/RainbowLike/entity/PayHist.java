package RainbowLike.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PayHist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long payHistNum;

    @ManyToOne
    @JsonManagedReference(value="rentHist-payHists")
    @JoinColumn(name = "rent_hist_num")
    private RentHist rentHist;

    @Column(nullable = false)
    private int fee;

    @Column(nullable = false)
    private LocalDateTime payDate;

    @PrePersist
    protected void onCreate() {
        payDate = LocalDateTime.now();
    }

}
