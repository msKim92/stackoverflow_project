package be.stackoverflow.security.filter;

import be.stackoverflow.security.JwtTokenizer;
import be.stackoverflow.security.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
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
import java.util.List;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter { // 동일한 request안에서 한번만 필터링을 할 수 있게 w줌

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims); //시큐어 컨텍스트에 권한 객체를 저장하기위한 메서드

        } catch (SignatureException signatureException) { //import 잘하세요~
            request.setAttribute("exception", signatureException);
        } catch (ExpiredJwtException expiredJwtException) {
            request.setAttribute("exception", expiredJwtException);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String userEmail = (String) claims.get("userEmail");
        List<GrantedAuthority> roles = authorityUtils.createRoleDependsRole((List) claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(userEmail, null, roles);  // 토큰에다가 유저 이메일과 권한정보를 넣는다 비번은 뺌.
        SecurityContextHolder.getContext().setAuthentication(authentication); // 시큐어컨텍스트에 권한 객체를 저장
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", ""); // jwt 서명받으면 jws
        String base64EncodedSecretKey = jwtTokenizer.makingSecretKey(jwtTokenizer.getSecretKey()); // jwt 서명을 검증하기 위한 비밀키( jwt 자체의 비밀키)
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();   // 검증받은 내용과 jws를 파싱함.

        return claims;
    }
}
