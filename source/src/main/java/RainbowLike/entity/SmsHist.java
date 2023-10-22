package RainbowLike.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class SmsHist {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long smsHistNum;

    @Column(nullable = false,length = 50)
    private String smsType;

    @Column(nullable = false,length = 30)
    private String sendTel;

    @Column(nullable = false)
    @Lob
    private String content;

    @Column(nullable = false)
    private LocalDateTime sendDate;

    @OneToMany(mappedBy = "smsHist", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="smsHist-smsRecepTels")
    private List<SmsRecepTel> smsRecepTels = new ArrayList<>();

}
