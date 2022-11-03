package be.stackoverflow.security.filter;


import be.stackoverflow.security.JwtTokenizer;
import be.stackoverflow.security.dto.LoginDto;
import be.stackoverflow.user.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;

/**
 * JWT를 이용한 로그인 인증을 요청하는 필터
 * attemptAuthentication >> 로그인 시도 호출되는 메서드
 * successfulAuthentication >> 로그인 성공시 엑세스랑 리프레쉬 토큰 발급
 */

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager; //인증도우미
    private final JwtTokenizer jwtTokenizer; //jwt토큰 생성규칙


    /**
     * 로그인을 시도할떄 서블릿으로부터 값을 전해받음
     * @param request from which to extract parameters and perform the authentication
     * @param response the response, which may be needed if the implementation has to do a
     * redirect as part of a multi-stage authentication process (such as OpenID).
     * @return
     * @throws AuthenticationException
     */

    @SneakyThrows // inputstream에서 오류가 터졌을때 원래는 try catch, throws 대신 예외클래스를 파라미터로 받는다.
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response){
        // 1. 역직렬화를 위해서 빈객체를 만든다
        ObjectMapper objectMapper = new ObjectMapper();
        // 2. LoginDto를 통해 위에서 만든 객체를 넣는다.
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        // 3. 데이터를 토큰해 넣는다.
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUserEmail(), loginDto.getPassword());

        // 4. 만든 토큰을 이제 인증도우미에게 전달함.
        return authenticationManager.authenticate(authenticationToken);

    }

    /**
     * 인증 성공시
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain chain, Authentication authResult) throws IOException {
        // 1. 인증된 결과를 받아와서 USER entity가 설정한 원칙에 맞게 저장한다.
        User user = (User) authResult.getPrincipal();

        // 2. 엑세스 토큰과 리프레쉬 토큰을 발급한다.
        String accessToken = makeAccessToken(user);
        String refreshToken = makeRefreshToken(user);

        //3. jwt의 요구한 구조에 맞게 헤더를 변경한다.
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

        JsonBodyMessage(response, "로그인 성공");
    }

    /*
     * 인증 실패시 비번을 틀리거나 아이디가 틀렸을떄...
     */
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        JsonBodyMessage(response, failed.getMessage());
    }




    private String makeRefreshToken(User user) {
        //1. 검증수단을 확인
        String subject = user.getUserEmail();
        //2. 만료된 기한을 yml 파일에서 지정한 시간만큼 업데이트 하고 비번도 재 암호화
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshToken());
        String secretKey = jwtTokenizer.makingSecretKey(jwtTokenizer.getSecretKey());
        //3. 합치기
        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, secretKey);

        return refreshToken;

    }

    /**
     * 엑세스 토큰 만들기
     * @param user
     * @return
     */
    private String makeAccessToken(User user) {
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("userEmail", user.getUserEmail());
        claims.put("roles", user.getRoles());

        String subject = user.getUserEmail();
        //1. jwt에 설정한 시간을 여기에 적용해서 저장
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessToken());
        //2. jwt에 설정한 비번을 암호화
        String secretKey = jwtTokenizer.makingSecretKey(jwtTokenizer.getSecretKey());
        //3. 설정한 값들을 accessToken에 넣기
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, secretKey);

        return accessToken;
    }

    private static void JsonBodyMessage(HttpServletResponse response, String content) throws IOException {
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("message", content);

        String json = new Gson().toJson(jsonObject);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }

}
