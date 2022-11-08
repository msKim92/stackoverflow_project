package be.stackoverflow.login;


import be.stackoverflow.security.JwtTokenizer;
import be.stackoverflow.security.filter.JwtAuthenticationFilter;
import be.stackoverflow.security.utils.CustomAuthorityUtils;
import be.stackoverflow.user.controller.UserController;
import be.stackoverflow.user.entity.User;
import be.stackoverflow.user.repository.UserRepository;
import be.stackoverflow.user.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.HeaderResultMatchers;
import org.springframework.test.web.servlet.result.HeaderResultMatchersDsl;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

//@ContextConfiguration(locations = {"classpath:/be/stackoverflow/user"})
@WebMvcTest(value = UserController.class,
    excludeFilters = {
        @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = WebMvcConfigurer.class)
    })
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureMockMvc(addFilters = false)
@AutoConfigureRestDocs
public class loginTest {

    @MockBean
    UserService userService;

    @MockBean
    UserRepository userRepository;

    @MockBean
    UserController userController;

    @MockBean
    JwtTokenizer jwtTokenizer;

    @MockBean
    CustomAuthorityUtils customAuthorityUtils;

    @MockBean
    JwtAuthenticationFilter filter;

    @Autowired
    private MockMvc mvc;


    @Test
    void signIn() throws Exception {
        //given
        UsernamePasswordAuthenticationToken authentication
                = new UsernamePasswordAuthenticationToken("test@gmail.com", "qwer!Q1111", customAuthorityUtils.createAuthorities("test@gmail.com"));
        Object mock = given(filter.attemptAuthentication(any(), any())).willReturn(authentication).getMock();

        User admin = new User(1L, "admin", "test@gmail.com", "qwer!Q1111", true, customAuthorityUtils.createRolesForDatabase("test@gmail.com"));
        given(userService.createUser(any(User.class))).willReturn(admin);

        //when
        ResultActions actions = mvc.perform(
                RestDocumentationRequestBuilders.get("/v1/login")
                        .header("Authorization","Bearer (accessToken)")
                        .header("Refresh","(refreshToken)")
                        .accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON)
                        .content("{\n" +
                                "    \"userEmail\": \"test@gmail.com\",\n" +
                                "    \"password\" : \"qwer!Q1111\"\n" +
                                "\n" +
                                "}")).andDo(print());


        //then

        actions
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(document("Login",
                        requestHeaders(
                                headerWithName("Authorization").description("Bearer + (로그인 요청 access 토큰)"))
                        , requestHeaders(headerWithName("Refresh").description("(RefreshToken)"))));
    }
}
