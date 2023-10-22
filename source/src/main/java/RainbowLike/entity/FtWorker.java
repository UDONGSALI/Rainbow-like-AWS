package RainbowLike.entity;

import RainbowLike.constant.DelYN;
import RainbowLike.constant.LicenseYN;
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
public class FtWorker extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ftWorkerNum;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonManagedReference(value="member-ftWorkers")
    @JoinColumn(name = "mem_num")
    private Member member;

    @Column(length = 50, nullable = false)
    private String speField;

    @Column(nullable = false)
    private LicenseYN licenseYN;

    @Column
    @Lob
    private String licenseDtl;

    @Column(nullable = false)
    private String ftDtl;

    @Column(nullable = false)
    private String ftStatus;

    @Column
    private String statusDtl;

    @Column(nullable = false)
    private DelYN delYN;


    @OneToMany(mappedBy = "ftWorker", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="ftWorker-femaleTalentMatchings")
    private List<FemaleTalentMatching> femaleTalentMatchings = new ArrayList<>();

}

