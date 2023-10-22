package RainbowLike.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long orgNum;

    @Column(nullable = false)
    private String name;

    private String url;

    @Column(nullable = false, length = 30)
    private String tel;

    @Column(nullable = false)
    private String addr;

    private String addrDtl;

    private String addrPost;
}
