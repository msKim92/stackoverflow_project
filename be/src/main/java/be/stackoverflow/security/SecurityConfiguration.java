package be.stackoverflow.security;

import be.stackoverflow.security.filter.JwtAuthenticationFilter;
import be.stackoverflow.security.handler.UserAuthenticationFailureHandler;
import be.stackoverflow.security.handler.UserAuthenticationSuccessHandler;
import be.stackoverflow.security.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

/**
 * 스프링 시큐리티의 가장 첫단추
 */
@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .headers().frameOptions().sameOrigin() //동일 출처로부터 들어오는 request만 페이지 렌더링을 허용
                .and()
                .csrf().disable() //CSRF 공격 방어 안하겠다~ (로컬환경에서 진행할꺼라, 안하면 403에러 발생함)
                .cors(withDefaults()) // 아래의 corsCofiguartionSource 소환 APP간의 출처가 다른경우 http통신을 통한 리소스 접근이 제한됨
                //cors친구가 다른 스크립트 기반 http통신을 해도 선택적으로 리소스에 접근할 수있는 권한을 부여하도록 브라우저에게 알려줌

                .formLogin().disable() //기본으로 제공하는 form 로그인 인증 기능 안쓰겠다.
                .httpBasic().disable()
                /*추가예정-----예외처리 엔트리포인트ㅡ요청거절 포인트------*/
                .apply(new CustomFilterConfig());
                 /*추가예정-----인가 가능한곳 설정------*/

        return http.build();
    }

    public class CustomFilterConfig extends AbstractHttpConfigurer<CustomFilterConfig, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            //인증도우미 호출!
            AuthenticationManager manager = builder.getSharedObject(AuthenticationManager.class);
            //DI
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(manager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/v1/login"); //로그인주소
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler()); //로그인 성공시 log 출력
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler()); //로그인 실패시 header에 메시지 담아보내기
            /*-----인증끝난뒤에 인가 시작해야함 -----*/
            builder.addFilter(jwtAuthenticationFilter); //시큐러티 필터 체인에 더하기.
        }
    }

    /**
     * 삭제와 생성을 할수있도록 spring bean 등록해야함.
     * bean설정을 따로 해줘야한다. 안하면 service단에서 빈을 자동생성 못함.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    /**
     *  CORS 관련 설정
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        //모든 출처(Origin)에 대해 스크립트 기반의 HTTP 통신을 허용하고 추가적으로 운영 서버 환경에서 요구사항에 맞게 변경이 가능
        configuration.setAllowedOrigins(Arrays.asList("*"));

        //파라미터로 지정한 HTTP Method에 대한 HTTP 통신을 허용
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));

        //터페이스의 구현 클래스인 UrlBasedCorsConfigurationSource 클래스의 객체를 생성
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        //모든 URL에 해당사항 적용하겠다.
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
