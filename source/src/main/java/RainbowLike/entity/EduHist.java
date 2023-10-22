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
public class EduHist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long eduHistNum;

    @ManyToOne
    @JsonManagedReference(value="edu-eduHists")
    @JoinColumn(name = "edu_num", nullable = false)
    private Edu edu;

    @ManyToOne
    @JsonManagedReference(value="member-eduHists")
    @JoinColumn(name = "mem_num")
    private Member member;

    private boolean portraitRights;

    @Column(nullable = false)
    private LocalDateTime applyDate;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(mappedBy = "eduHist", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="eduHist-files")
    private List<File> files = new ArrayList<>();
}
