package RainbowLike.component;

import RainbowLike.service.JwtService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        // Authorization 헤더에서 토큰을 가져옴
        String jws = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (jws != null) {

            // 토큰을 확인하고 사용자를 얻음
            Claims user = jwtService.getAuthUser(request);
            String username = user.get("sub", String.class);
            String rolesString = user.get("role", String.class);

            // 역할 정보를 쉼표로 분리하여 리스트로 변환
            List<String> roles = Arrays.asList(rolesString.split(","));

            // 사용자의 역할을 GrantedAuthority로 변환
            List<GrantedAuthority> authorities = roles.stream()
                    .map(role -> new SimpleGrantedAuthority("ROLE_" + role)) // "ROLE_" 접두사를 추가
                    .collect(Collectors.toList());

            // 사용자 정보와 역할 정보를 이용하여 JwtAuthenticationToken을 생성

            // 인증
            Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);

            SecurityContextHolder.getContext().setAuthentication(authentication);

        }
        filterChain.doFilter(request, response);
    }
}