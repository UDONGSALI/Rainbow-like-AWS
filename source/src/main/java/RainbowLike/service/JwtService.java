package RainbowLike.service;

import RainbowLike.constant.DelYN;
import RainbowLike.constant.Gender;
import RainbowLike.constant.Type;
import RainbowLike.entity.Edu;
import RainbowLike.entity.Member;
import RainbowLike.entity.Token;
import RainbowLike.repository.TokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.*;

@Component
@RequiredArgsConstructor
public class JwtService {

    private final TokenRepository tokenRepository;
    static final long EXPIRATIONTIME = 18000000; // 토큰 만료 시간: 3시간
    static final String PREFIX = "Bearer"; // JWT 토큰의 접두사
    static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // 서명 키 생성

    public String getToken(String memId, String role, Long memNum) {
        Optional<Token> existingTokenOptional = tokenRepository.findByMemId(memId);
        if (existingTokenOptional.isPresent()) {
            Token existingToken = existingTokenOptional.get();
            existingToken.setDelYN(DelYN.Y);
            tokenRepository.save(existingToken);
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        claims.put("memNum", memNum);
        String jti = UUID.randomUUID().toString();
        claims.put("jti", jti);


        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(memId)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(key)
                .compact();
        saveToken(jti, memId, role, memNum);
        return token;
    }

    private void saveToken(String jti, String memId, String role, Long memNum) {
        Token tokenEntity = new Token();
        tokenEntity.setJti(jti);
        tokenEntity.setMemId(memId);
        tokenEntity.setRole(role);
        tokenEntity.setMemNum(memNum);
        tokenEntity.setDelYN(DelYN.N);
        tokenEntity.setExpirationDate(new Date(System.currentTimeMillis() + EXPIRATIONTIME));

        tokenRepository.save(tokenEntity);
    }

    // HTTP 요청의 헤더에서 JWT 토큰을 추출하고, 유효성을 검사하여 사용자 정보(Claims)를 반환합니다.
    public Claims getAuthUser(HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (token != null) {
            // JWT 토큰을 파싱하고 검증합니다.
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.replace(PREFIX, ""));

            Claims body = claims.getBody();

            String bodyJson = body.toString();

            if (body != null)
                return body;
        }
        return null;
    }

    public Iterable<Token> findAll() {
        return tokenRepository.findByDelYN(DelYN.N);
    }
    public Token findByJti(String jti) {
        return tokenRepository.findByJti(jti);
    }

    public Iterable<Token> searchToken(String option, String value) {
        switch (option) {
            case "memId":
                return tokenRepository.findByMemIdContaining(value);
            case "type":
                return tokenRepository.findByRole(value);
            default:
                return new ArrayList<>();
        }
    }

    @Transactional
    public void deleteTokenByJti(String jti) {
        tokenRepository.deleteByJti(jti);
    }
    @Scheduled(fixedRate = 1 * 60 * 1000)
    @Transactional
    public void cleanupExpiredTokens() {
        Date now = new Date();
        tokenRepository.deleteAllByExpirationDateBefore(now);
    }
}