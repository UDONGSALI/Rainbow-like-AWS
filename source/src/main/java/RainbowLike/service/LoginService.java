package RainbowLike.service;


import RainbowLike.config.AccountCredentials;
import RainbowLike.constant.DelYN;
import RainbowLike.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import RainbowLike.repository.MemberRepository;


@Service
@RequiredArgsConstructor
public class LoginService {

    private final MemberRepository memberRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;  // PasswordEncoder 주입

    public String generateToken(AccountCredentials credentials) {
        Member member = memberRepository.findByMemId(credentials.getUsername());
        if (member == null) {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
        }
        if (member.getDelYN() == DelYN.Y){
            throw new BadCredentialsException("탈퇴한 사용자 입니다.");
        }
        if (!passwordEncoder.matches(credentials.getPassword(), member.getPwd())) {
            throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
        }
        return jwtService.getToken(member.getMemId(), member.getType().toString(), member.getMemNum());
    }
}
