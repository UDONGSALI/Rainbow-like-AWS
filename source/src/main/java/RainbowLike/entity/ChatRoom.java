package RainbowLike.entity;

import RainbowLike.constant.AnswerYN;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long chatRoomId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonManagedReference(value="member-chatRooms")
    @JoinColumn(name = "mem_num")
    private Member member;

    @Column(name = "answer_yn")
    private AnswerYN answerYN;

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="chatRoom-chats")
    private List<Chat> chats = new ArrayList<>();
}