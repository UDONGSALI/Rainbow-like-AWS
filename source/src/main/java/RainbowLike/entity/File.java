package RainbowLike.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long fileNum;

    @ManyToOne
    @JsonManagedReference(value = "post-files")
    @JoinColumn(name = "post_num", nullable=true)
    private Post post;

    @ManyToOne
    @JsonManagedReference(value="edu-files")
    @JoinColumn(name = "edu_num")
    private Edu edu;

    @ManyToOne
    @JsonManagedReference(value="eduHist-files")
    @JoinColumn(name = "eduHist_num")
    private EduHist eduHist;

    @ManyToOne
    @JsonManagedReference(value="space-files")
    @JoinColumn(name = "space_num")
    private Space space;

    @ManyToOne
    @JsonManagedReference(value="member-files")
    @JoinColumn(name = "mem_num")
    private Member member;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String fileOriName;

    @Column(nullable = false)
    private String  fileUri;
}
