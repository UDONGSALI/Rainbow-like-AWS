package RainbowLike.component;

import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Component
public class AuthEntryPoint implements AuthenticationEntryPoint {
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
						 AuthenticationException authException) throws IOException, ServletException {

		// 클라이언트에게 401 Unauthorized 상태 코드를 반환하고 응답 형식을 JSON으로 설정합니다.
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);

		// 응답 데이터를 작성하기 위한 PrintWriter를 생성합니다.
		PrintWriter writer = response.getWriter();

		// 에러 메시지를 작성하여 클라이언트에게 반환합니다.
		writer.println("Error: " + authException.getMessage());
	}
}