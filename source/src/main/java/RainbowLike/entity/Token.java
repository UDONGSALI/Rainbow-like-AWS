package RainbowLike.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tokenNum;
    @Column(nullable = false)
    private String jti;
    @Column(nullable = false)
    private Long memNum;
    @Column(nullable = false)
    private String memId;
    @Column(nullable = false)
    private String role;
    @Column(nullable = false)
    private Date expirationDate;
}