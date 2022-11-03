package be.stackoverflow.security.filter;

import be.stackoverflow.security.JwtTokenizer;
import be.stackoverflow.security.utils.CustomAuthorityUtils;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Configuration
@Slf4j
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter { // 동일한 request안에서 한번만 필터링을 할 수 있게 w줌

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims); //시큐어 컨텍스트에 권한 객체를 저장하기위한 메서드 유효기간내에 있으면 반납한다.

        } catch (SignatureException signatureException) {
            request.setAttribute("exception", signatureException); // 토큰 자체가 이상하면 호출되는 메서드
        }
        catch (ExpiredJwtException expiredJwtException) {
//            String refreshTokeen = request.getHeader("Refresh");
//            Jws<Claims> claimsJws = jwtTokenizer.verifySignature(refreshTokeen);
//            int exp = (int) claimsJws.getBody().get("exp");
//

            request.setAttribute("exception", expiredJwtException);
             }
        catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String userEmail = (String) claims.get("userEmail");
        List<GrantedAuthority> roles = authorityUtils.DependsRole((List) claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(userEmail, null, roles);  // 토큰에다가 유저 이메일과 권한정보를 넣는다 비번은 뺌.
        SecurityContextHolder.getContext().setAuthentication(authentication); // 시큐어컨텍스트에 권한 객체를 저장
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", ""); // jwt 서명받으면 jws
        String base64EncodedSecretKey = jwtTokenizer.makingSecretKey(jwtTokenizer.getSecretKey()); // jwt 서명을 검증하기 위한 비밀키( jwt 자체의 비밀키)
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();   // 검증받은 내용과 jws를 파싱함.

        return claims;
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
