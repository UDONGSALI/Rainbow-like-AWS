package RainbowLike.controller;

import RainbowLike.dto.ChatDto;
import RainbowLike.dto.ChatRoomDto;
import RainbowLike.entity.Chat;
import RainbowLike.entity.ChatRoom;
import RainbowLike.entity.Member;
import RainbowLike.repository.ChatRepository;
import RainbowLike.repository.ChatRoomRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequiredArgsConstructor

public class ChatController {

    @Autowired
    ChatRoomRepository chatRoomRepository;
    @Autowired
    ChatRepository chatRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    ChatService chatService;

    @Autowired
    private ChatRoomDto chatRoomDto;


    @GetMapping("/chatroom")
    public Iterable<ChatRoom> getChatRooms(){
       return chatRoomRepository.findAll();
    }

    @GetMapping("/chat")
    public Iterable<Chat> getChats(){return chatRepository.findAll();}

    @GetMapping("/chatroom/{memNum}")
    public Iterable<ChatRoom> findRoomByMemNum(@PathVariable Long memNum){
        Member member = memberRepository.findByMemNum(memNum);
        return chatRoomRepository.findByMember(member);
    }
    @GetMapping("/chat/{id}")
    public Optional<Chat> getChat(@PathVariable Long id){
        return chatRepository.findById(id);
    }

    @GetMapping("/findchatbyroom/{roomNum}")
    public Iterable<Chat> getChatByRoomNum(@PathVariable Long roomNum){
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setChatRoomId(roomNum);
        return chatRepository.findByChatRoom(chatRoom);
    }
    @GetMapping("/findchatbymem/{memNum}")
    public Iterable<Chat> getChatByMemNum(@PathVariable Long memNum){
        return chatRepository.findByChatRoomMemberMemNumOrderByChatNumAsc(memNum);
    }

    @RequestMapping("/chatroom/new")
    public ResponseEntity<ChatRoom> createChatRoom(@RequestBody ChatRoomDto roomDto) {

        ChatRoom savedRoom = chatService.createChatRoom(roomDto);

        return ResponseEntity.ok(savedRoom);
    }

    @RequestMapping("/chatroom/edit/{roomId}")
    public ResponseEntity<ChatRoom> editChatRoom (@PathVariable Long roomId, @RequestBody ChatRoomDto roomDto) {
        ChatRoom savedRoom = chatService.editChatRoom(roomId, roomDto);

        return ResponseEntity.ok(savedRoom);
    }

    @RequestMapping("/chat/new")
    public ResponseEntity<Chat> createChat(@RequestBody ChatDto chatDto) {
        Chat savedChat = chatService.createChat(chatDto);
        return ResponseEntity.ok(savedChat);
    }

    public void createTestChat () {
        ArrayList<ChatRoomDto> chatRoomList = chatRoomDto.createTestChatRoom();
        chatService.createTestChatRoom(chatRoomList);
        ArrayList<ChatDto> chatList = ChatDto.createTestChat();
        chatService.createTestChat(chatList);


    }
}
