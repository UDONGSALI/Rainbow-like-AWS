package RainbowLike.entity;


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
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long chatNum;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonManagedReference(value="chatRoom-chats")
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonManagedReference(value="member-chats")
    @JoinColumn(name = "mem_num")
    private Member member;

    @Column
    @Lob
    private String content;

    private LocalDateTime writeDate;
}
