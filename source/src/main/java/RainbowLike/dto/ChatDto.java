package RainbowLike.dto;

import RainbowLike.entity.ChatRoom;
import RainbowLike.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;


@Getter
@Setter
@NoArgsConstructor
public class ChatDto {
    @JsonIgnore
    private ChatRoom chatRoom;
    private Long chatRoomId;
    @JsonIgnore
    private Member member;
    private Long memNum;
    private String content;
    private LocalDateTime writeDate;

    public ChatDto(ChatRoom chatRoom, Long chatRoomId, Member member, Long memNum, String content, LocalDateTime writeDate) {
        this.chatRoom = chatRoom;
        this.chatRoomId = chatRoomId;
        this.member = member;
        this.memNum = memNum;
        this.content = content;
    }

    static public ArrayList<ChatDto> createTestChat(){
        ArrayList<ChatDto> chatList = new ArrayList<>();
        ChatRoom room1 = new ChatRoom();
        ChatRoom room2 = new ChatRoom();
        room1.setChatRoomId(1L);
        room2.setChatRoomId(2L);
        Member member1 = new Member();
        Member member2 = new Member();
        Member member3 = new Member();
        Member member4 = new Member();
        member1.setMemNum(1L);
        member2.setMemNum(2L);
        member3.setMemNum(3L);
        member4.setMemNum(4L);

        ChatDto chat1 = new ChatDto();
        chat1.setChatRoom(room1);
        chat1.setMember(member2);
        chat1.setContent("안녕하세요 대관 입금기간 지났는데 어떡하면 될까요?");
        chat1.setWriteDate(LocalDateTime.now());
        chatList.add(chat1);


        ChatDto chat2 = new ChatDto();
        chat2.setChatRoom(room1);
        chat2.setMember(member1);
        chat2.setContent("현재 회원님 기록으로는 무료 사용 가능한 대관실 예약하신 기록밖에 조회가 안 되는데 다른 대관을 하셨을까요?");
        chat2.setWriteDate(LocalDateTime.now());
        chatList.add(chat2);


        ChatDto chat3 = new ChatDto();
        chat3.setChatRoom(room1);
        chat3.setMember(member2);
        chat3.setContent("아니요 저 다른 아이디로 예약했는데 그건 그리로 문의 드려야만 조회 가능한가요?");
        chat3.setWriteDate(LocalDateTime.now());
        chatList.add(chat3);


        ChatDto chat4 = new ChatDto();
        chat4.setChatRoom(room1);
        chat4.setMember(member1);
        chat4.setContent("네. 지금 아이디로 도와드리기는 힘들 것 같습니다.");
        chat4.setWriteDate(LocalDateTime.now());
        chatList.add(chat4);

        ChatDto chat5 = new ChatDto();
        chat5.setChatRoom(room2);
        chat5.setMember(member3);
        chat5.setContent("집에 가고싶어요");
        chat5.setWriteDate(LocalDateTime.now());
        chatList.add(chat5);


        ChatDto chat6 = new ChatDto();
        chat6.setChatRoom(room2);
        chat6.setMember(member1);
        chat6.setContent("저도요");
        chat6.setWriteDate(LocalDateTime.now());
        chatList.add(chat6);


        ChatDto chat7 = new ChatDto();
        chat7.setChatRoom(room2);
        chat7.setMember(member3);
        chat7.setContent("ㅠㅠ...");
        chat7.setWriteDate(LocalDateTime.now());
        chatList.add(chat7);



        return chatList;
    }

}
