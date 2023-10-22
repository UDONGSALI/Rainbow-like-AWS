package RainbowLike.service;

import RainbowLike.entity.Member;
import RainbowLike.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class CommentByMemberService {

@Autowired
private MemberRepository memberRepository;

    public Member getMemberByMemNum(Long memNum) {
        return memberRepository.findByMemNum(memNum);
    }
}
