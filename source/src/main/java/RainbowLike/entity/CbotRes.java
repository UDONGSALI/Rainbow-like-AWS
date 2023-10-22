package RainbowLike.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CbotRes {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cbotResNum;

    @Column( nullable = false, length = 50)
    private String resCtgr;

    @Column( nullable = false)
    private String resTitle;

    @Column( nullable = false)
    @Lob
    private String resContnet;

}
