package RainbowLike.service;

import RainbowLike.dto.ChatDto;
import RainbowLike.dto.ChatRoomDto;
import RainbowLike.entity.Chat;
import RainbowLike.entity.ChatRoom;
import RainbowLike.entity.Member;
import RainbowLike.repository.ChatRepository;
import RainbowLike.repository.ChatRoomRepository;
import RainbowLike.repository.MemberRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;


@Service

public class ChatService {
    @Autowired
    ModelMapper mapper;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    ChatRoomRepository chatRoomRepository;
    @Autowired
    ChatRepository chatRepository;


    public ChatRoom createChatRoom(ChatRoomDto roomDto) {
        ChatRoom room = mapper.map(roomDto, ChatRoom.class);

        Member member = new Member();
        member.setMemNum(roomDto.getMemNum());
        room.setMember(member);
        room.setAnswerYN(roomDto.getAnswerYN());

        ChatRoom savedRoom = chatRoomRepository.save(room);

        return savedRoom;
    }


    public ChatRoom editChatRoom (Long roomId, ChatRoomDto roomDto) {
        ChatRoom editRoom = new ChatRoom();
        editRoom.setChatRoomId(roomId);

        Member member = new Member();
        member.setMemNum(roomDto.getMemNum());
        editRoom.setMember(member);
        editRoom.setAnswerYN(roomDto.getAnswerYN());

        ChatRoom savedRoom = chatRoomRepository.save(editRoom);

        return savedRoom;
    }

    public Chat createChat(ChatDto chatDto) {
        Chat newChat = new Chat();
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setChatRoomId(chatDto.getChatRoomId());
        newChat.setChatRoom(chatRoom);
        Member member = new Member();
        member.setMemNum(chatDto.getMemNum());
        newChat.setMember(member);
        newChat.setContent(chatDto.getContent());
        newChat.setWriteDate(LocalDateTime.now());

        Chat savedChat = chatRepository.save(newChat);

        return savedChat;
    }


    public void createTestChatRoom(ArrayList<ChatRoomDto> chatRoomList) {
        for (ChatRoomDto chatRoomDto : chatRoomList) {
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            ChatRoom chatRoom = mapper.map(chatRoomDto, ChatRoom.class);

            chatRoomRepository.save(chatRoom);
        }

    }

    public void createTestChat(ArrayList<ChatDto> chatList) {
        for (ChatDto chatDto : chatList) {
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            Chat chat = mapper.map(chatDto, Chat.class);

            chatRepository.save(chat);
        }

    }
}
