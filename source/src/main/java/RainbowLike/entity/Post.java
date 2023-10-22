package RainbowLike.entity;

import RainbowLike.constant.DelYN;
import RainbowLike.constant.Status;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.repository.Modifying;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long postNum;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonManagedReference(value="member-posts")
    @JoinColumn(name = "mem_num")
    private Member member;

    @OneToOne(fetch = FetchType.EAGER)
    @JsonManagedReference(value="member-posts")
    @JoinColumn(name = "mem_id")
    private Member labor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonManagedReference(value="board-posts")
    @JoinColumn(name = "board_num")
    private Board board;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Lob
    private String content;

    @Column(nullable = false)
    private int pageView;

    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private Status conselStatus;

    @Column
    private Long parentsNum;

    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private Status clubAllowStatus;

    @Column(length = 50)
    private String clubRecuStatus;


    @Column
    private DelYN delYN;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    @JsonBackReference(value = "post-files")
    private List<File> files = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    @JsonBackReference(value = "post-comments")
    private List<Comment> comments = new ArrayList<>();



}