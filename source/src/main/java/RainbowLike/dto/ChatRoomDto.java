package RainbowLike.dto;

import RainbowLike.constant.AnswerYN;
import RainbowLike.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import java.util.ArrayList;


@Component
@Getter
@Setter
@AllArgsConstructor
public class ChatRoomDto {

    @JsonIgnore
    private Member member;
    private AnswerYN answerYN;
    private Long memNum;

    @Autowired
    private EntityManager entityManager; // EntityManager 주입

    public ChatRoomDto() {
    }

    public ChatRoomDto(Member member, Long memNum, AnswerYN answerYN) {
        this.member = member;
        this.memNum = memNum;
        this.answerYN = answerYN;
    }

    public ChatRoomDto(Long memNum, AnswerYN answerYN) {
    }

    public ArrayList<ChatRoomDto> createTestChatRoom() {
        ArrayList<ChatRoomDto> chatRoomList = new ArrayList<>();
        Member member1 = new Member();
        Member member2 = new Member();
        Member member3 = new Member();
        member1.setMemNum(2L);
        member2.setMemNum(3L);
        member3.setMemNum(4L);

        ChatRoomDto chatRoom1 = new ChatRoomDto();
        chatRoom1.setMember(member1);
        chatRoom1.setAnswerYN(AnswerYN.N);
        chatRoomList.add(chatRoom1);


        ChatRoomDto chatRoom2 = new ChatRoomDto();
        chatRoom2.setMember(member2);
        chatRoom2.setAnswerYN(AnswerYN.Y);
        chatRoomList.add(chatRoom2);

        return chatRoomList;
    }
}
