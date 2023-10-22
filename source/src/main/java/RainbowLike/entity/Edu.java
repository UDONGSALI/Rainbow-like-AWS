package RainbowLike.entity;

import RainbowLike.constant.EduType;
import RainbowLike.constant.RecuMethod;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Edu {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long eduNum;

    @Column(length = 50, nullable = false)
    @Enumerated(EnumType.STRING)
    private EduType type;

    @Column(nullable = false)
    private String eduName;

    @Column(nullable = false)
    @Lob
    private String content;

    @Column(nullable = false)
    private LocalDateTime eduStdt;

    @Column(nullable = false)
    private LocalDateTime eduEddt;

    @Column(nullable = false)
    private String eduAddr;

    @Column(nullable = false)
    private String target;

    @Column(nullable = false)
    private LocalDate recuStdt;

    @Column(nullable = false)
    private LocalDate recuEddt;

    @Column(nullable = false)
    private int capacity;

    @Column(nullable = false)
    private int recuPerson;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RecuMethod recuMethod;

    @Column(nullable = false, length = 30)
    private String tel;

    @OneToMany(mappedBy = "edu", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="edu-files")
    private List<File> files = new ArrayList<>();

    @OneToMany(mappedBy = "edu", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="edu-eduHists")
    private List<EduHist> eduHists = new ArrayList<>();

}
