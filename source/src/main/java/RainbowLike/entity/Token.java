package RainbowLike.entity;

import RainbowLike.constant.DelYN;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tokenNum;
    private String jti;
    private Long memNum;
    private String memId;
    private String role;
    private Date expirationDate;
    private DelYN delYN;
}
