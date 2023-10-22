package RainbowLike.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long boardNum;

    @Column(length = 50, nullable = false)
    private String boardName;

    @Column( nullable = false)
    private boolean readRole;

    @Column( nullable = false)
    private boolean writeRole;

    @Column(nullable = false)
    private boolean commAllowYn;

    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="board-posts")
    private List<Post> posts = new ArrayList<>();

    public Board(String boardName, boolean readRole, boolean writeRole, boolean commAllowYn) {
        super();
        this.boardName = boardName;
        this.readRole = readRole;
        this.writeRole = writeRole;
        this.commAllowYn = commAllowYn;
    }
}
