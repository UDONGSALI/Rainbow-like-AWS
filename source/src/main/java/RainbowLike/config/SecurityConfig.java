package RainbowLike.config;

import RainbowLike.component.AuthEntryPoint;
import RainbowLike.component.AuthenticationFilter;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.SpaceRepository;
import RainbowLike.service.MemberService;
import RainbowLike.service.SpaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final  AuthEntryPoint exceptionHandler;
    private final  AuthenticationFilter authenticationFilter;

    @Autowired
    SpaceService spaceService;
    @Autowired
    SpaceRepository spaceRepository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        // CSRF 보호 비활성화, CORS 활성화 및 세션 관리를 STATELESS로 설정
        http.csrf().disable().cors().and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                // 접근 권한을 모두 허용
                .antMatchers("/**").permitAll()
                // "/admin" 엔드포인트에 대한 접근 권한을 "ADMIN" 역할을 가진 사용자로 설정
//                 .antMatchers("/admin").hasRole("ADMIN")
                // 모든 다른 요청은 인증된 사용자만 접근 가능
                .anyRequest().authenticated().and()
                .exceptionHandling()
                .authenticationEntryPoint(exceptionHandler).and()
                // AuthenticationFilter를 UsernamePasswordAuthenticationFilter 앞에 추가
                .addFilterBefore(authenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);

    }

    @Bean
// CORS (Cross-Origin Resource Sharing) 구성을 정의하는 메서드입니다.
    CorsConfigurationSource corsConfigurationSource() {
        // URL 기반의 CORS 구성 소스를 생성합니다.
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        // CORS 구성을 생성하고 특정 origin (http://localhost:3000)으로부터의 요청을 허용합니다.
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("*"));

        // 모든 HTTP 메서드를 허용합니다.
        config.setAllowedMethods(Arrays.asList("*"));

        // 모든 HTTP 헤더를 허용합니다.
        config.setAllowedHeaders(Arrays.asList("*"));

        // 자격 증명 (Credentials)을 허용하지 않습니다.
        config.setAllowCredentials(false);

        // 기본 CORS 규칙을 적용합니다.
        config.applyPermitDefaultValues();

        // 모든 경로 (/**)에 대해 이 CORS 구성을 등록합니다.
        source.registerCorsConfiguration("/**", config);

        // CORS 구성 소스를 반환합니다.
        return source;
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth)
            throws Exception {
        // 사용자 정보를 가져오는 UserDetailsService와 비밀번호 인코더 설정
        auth.userDetailsService(memberService).passwordEncoder(passwordEncoder);
    }

    @Bean
    public AuthenticationManager getAuthenticationManager() throws
            Exception {
        return authenticationManager();
    }
}
