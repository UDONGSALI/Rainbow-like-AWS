package RainbowLike.entity;

import RainbowLike.constant.Status;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class RentHist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long rentHistNum;

    @ManyToOne
    @JsonManagedReference(value="member-rentHists")
    @JoinColumn(name = "mem_num", nullable = false)
    private Member member;

    @ManyToOne
    @JsonManagedReference(value="space-rentHists")
    @JoinColumn(name = "space_num", nullable = false)
    private Space space;

    @Column(nullable = false)
    private LocalDateTime rentStdt;

    @Column(nullable = false)
    private LocalDateTime rentEddt;

    @Column(nullable = false)
    private LocalDateTime applyDate;

    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private Status applyStatus;

    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private Status payStatus;

    @OneToMany(mappedBy = "rentHist", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="rentHist-payHists")
    private List<PayHist> payHists = new ArrayList<>();
}
