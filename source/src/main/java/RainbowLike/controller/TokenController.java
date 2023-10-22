package RainbowLike.controller;

import RainbowLike.entity.Token;
import RainbowLike.repository.TokenRepository;
import RainbowLike.service.JwtService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/token")
@RequiredArgsConstructor
public class TokenController {

    private final JwtService jwtService;
    private final TokenRepository tokenRepository;

    @GetMapping
    private Iterable<Token> getTokens() {
        return jwtService.findAll();
    }

    @GetMapping("/search/{option}/{value}")
    public ResponseEntity<Iterable<Token>> searchMember(@PathVariable String option, @PathVariable String value) {
        return ResponseEntity.ok(jwtService.searchToken(option, value));
    }
    @GetMapping("/{jti}")
    private ResponseEntity<String> checkTokenStatus(@PathVariable String jti) {
        Token token = jwtService.findByJti(jti);
        if(token != null) {
            return ResponseEntity.ok(token.getDelYN().name());
        } else {
            return ResponseEntity.ok(null);
        }
    }

    @GetMapping("/refresh")
    public ResponseEntity<Map<String, String>> refreshToken(HttpServletRequest request) {
        Claims claims = jwtService.getAuthUser(request);

        if (claims == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String memId = claims.getSubject();
        String role = claims.get("role", String.class);
        Long memNum = claims.get("memNum", Long.class);
        String jti = claims.get("jti", String.class);

        // 기존 토큰 삭제
        jwtService.deleteTokenByJti(jti);

        // 새로운 토큰 발급
        String newToken = jwtService.getToken(memId, role, memNum);

        Map<String, String> response = new HashMap<>();
        response.put("token", newToken);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{jti}")
    public ResponseEntity<String> deleteToken(@PathVariable String jti) {
        jwtService.deleteTokenByJti(jti);
        return ResponseEntity.ok("Token successfully deleted");
    }
}
