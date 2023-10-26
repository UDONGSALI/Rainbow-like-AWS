package RainbowLike.service;

import RainbowLike.constant.DelYN;
import RainbowLike.constant.Gender;
import RainbowLike.constant.Type;
import RainbowLike.dto.MemberDto;
import RainbowLike.entity.Member;
import RainbowLike.repository.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

    private final ModelMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final RentHistRepository rentHistRepository;
    private final FtWorkerRepository ftWorkerRepository;
    private final CommentRepository commentRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final FtConsumerRepository ftConsumerRepository;
    private final FileService fileService;

    public Member saveMember(MemberDto memberDto) {
        Member member = mapper.map(memberDto, Member.class);
        String encodedPassword = passwordEncoder.encode(member.getPwd());
        member.setPwd(encodedPassword);
        return memberRepository.save(member);
    }

    @Transactional
    public String saveMemberAndFile(String memberDataJson, List<MultipartFile> files, String tableName, Long number) throws IOException {
        MemberDto memberDto;
        try {
            memberDto = new ObjectMapper().readValue(memberDataJson, MemberDto.class);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("멤버 정보 변환에 실패했습니다.", e);
        }
        saveMember(memberDto);

        if (files != null && !files.isEmpty()) {
            fileService.uploadToCloudAndGetFileNums(files, tableName, number);
        }
        return "가입이 완료 되었습니다!";
    }

    public Iterable<Member> findAllMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> findMemberByMemId(String memId) {
        return Optional.ofNullable(memberRepository.findByMemId(memId));
    }

    public Optional<String> findMemIdByTel(String tel) {
        Member member = memberRepository.findByTel(tel);
        return Optional.ofNullable(member.getMemId());
    }

    public Optional<String> findTelByMemId(String memId) {
        Member member = memberRepository.findByMemId(memId);
        return Optional.ofNullable(member.getTel());
    }

    public Iterable<Member> searchMember(String option, String value) {
        switch (option) {
            case "memId":
                return memberRepository.findByMemIdContaining(value);
            case "type":
                Type type = Type.valueOf(value);
                return memberRepository.findByType(type);
            case "name":
                return memberRepository.findByNameContaining(value);
            case "addr":
                return memberRepository.findByAddrContaining(value);
            case "gender":
                Gender gender = Gender.valueOf(value);
                return memberRepository.findByGender(gender);
            default:
                return new ArrayList<>();
        }
    }

    public boolean checkDuplicate(String type, String value) {
        switch (type) {
            case "memId":
                return memberRepository.findByMemId(value) != null;
            case "email":
                return memberRepository.findByEmail(value) != null;
            case "tel":
                return memberRepository.findByTel(value) != null;
            default:
                throw new IllegalArgumentException("Invalid type provided");
        }
    }


    @Override
    public UserDetails loadUserByUsername(String memId) throws UsernameNotFoundException {
        Member member = memberRepository.findByMemId(memId);
        if (member == null) {
            throw new UsernameNotFoundException(memId);
        }
        return User.builder().username(member.getMemId()).password(member.getPwd()).roles(member.getType().toString()).build();
    }

    public Member changePassword(String id, String pwd) {
        Member member = memberRepository.findByMemId(id);
        if (member != null) {
            String encodedPassword = passwordEncoder.encode(pwd);
            member.setPwd(encodedPassword);
            return memberRepository.save(member);
        }
        return null;
    }

    //회원탈퇴
    public void withdrawal(String memId) {
        Member member = memberRepository.findByMemId(memId);
        member.setDelYN(DelYN.Y);
        memberRepository.save(member);
    }

    //멤버삭제
    public void deleteMember(String memId) {
        Member member = memberRepository.findByMemId(memId);
        chatRoomRepository.deleteByMember(member);
        postRepository.deleteByMember(member);
        postRepository.deleteByLabor(member);
        commentRepository.deleteByMember(member);
        rentHistRepository.deleteByMember(member);
        ftWorkerRepository.deleteByMember(member);
        ftConsumerRepository.deleteByMember(member);
        memberRepository.delete(member);
    }

    @PostConstruct
    private void createDefaultMembers() {
        List<MemberDto> memberDtoList = MemberDto.createtestMember();
        for (MemberDto memberDto : memberDtoList) {
            saveMember(memberDto);
        }
    }
}
