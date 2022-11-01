package be.stackoverflow.user;

import be.stackoverflow.security.filter.JwtAuthenticationFilter;
import be.stackoverflow.user.controller.UserController;
import be.stackoverflow.user.dto.UserDto;
import be.stackoverflow.user.entity.User;
import be.stackoverflow.user.mapper.UserMapper;
import be.stackoverflow.user.service.UserService;
import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureMockMvc(addFilters = false)
@AutoConfigureRestDocs
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private UserService userService;

    @MockBean
    private UserMapper mapper;

    /**
     * 주소 : POST v1/sign
     * Feature : 새로운 회원의 정보를 기입받아 UserRepository에 저장한다.
     * Scenario : 기입받은 회원의 정보가 서비스 단을 거쳐 나올 시 기입한 내용과 일치하는가를 파악한다.
     * Given : UserDto.Post 객체, UserDto.Response 객체에 임의의 회원정보 기입 및 그 정보를
     * Mockito로 User객체, createUser, UserResponseDto stubbing
     * When : UserDto.Post 객체의 Json 정보로 회원이 가입을 시도하는 상황 가정
     * Then : Json으로 받은 user정보와 처음 등록할때 기입받은 정보가 일치해야 한다.
     */
    @Test
    void postUserTest() throws Exception {
        //given
        UserDto.Post post = new UserDto.Post("username","useremail@gmail.com","123456k*");
        String content = gson.toJson(post);
        UserDto.Response response = new UserDto.Response(1L,"username", "useremail@gmail.com",
                "123456k*", true, Arrays.asList("USER"),
                LocalDateTime.now(), LocalDateTime.now()
                );

        //Stubbing by Mockito
        given(mapper.userPostToUser(Mockito.any(UserDto.Post.class))).willReturn(new User());
        given(userService.createUser(Mockito.any(User.class))).willReturn(new User());
        given(mapper.userToUserResponse(Mockito.any(User.class))).willReturn(response);



        //when
        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.post("/v1/sign")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content));

        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.userName").value(post.getUserName()))
                .andExpect(jsonPath("$.data.userEmail").value(post.getUserEmail()))
                .andExpect(jsonPath("$.data.password").value(post.getPassword()))
                .andDo(document("post-user",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("userName").type(JsonFieldType.STRING).description("회원 이름"),
                                        fieldWithPath("userEmail").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("패스워드")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터").optional(),
                                        fieldWithPath("data.userId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("data.userName").type(JsonFieldType.STRING).description("회원 이름"),
                                        fieldWithPath("data.userEmail").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("data.password").type(JsonFieldType.STRING).description("비밀번호"),
                                        fieldWithPath("data.userStatus").type(JsonFieldType.BOOLEAN).description("회원 상태"),
                                        fieldWithPath("data.roles").type(JsonFieldType.ARRAY).description("회원역할"),
                                        fieldWithPath("data.created_at").type(JsonFieldType.STRING).description("생성 시간"),
                                        fieldWithPath("data.updated_at").type(JsonFieldType.STRING).description("수정 시간")
                                )
                        )
                ));
    }
    /**
     * 주소 : GET v1/{userId}
     * Feature : 회원의 기본키(userId)를 파라미터로 입력받아 해당 회원 정보를 가져온다.
     * Scenario : 등록한 회원 정보를 조회할 시 해당 회원 아이디로 등록된 회원과 일치하는가를 파악한다.
     * Given : UserDto.Response 객체에 임의의 회원정보 기입 및 그 정보를
     * Mockito로 User객체, getUser, UserResponseDto stubbing
     * When : 회원의 기본키(userId)로 조회된 회원이 있을때,
     * Then : Json으로 받은 user정보와 조회된 정보가 일치해야 한다.
     */
    @Test
    void getUserTest() throws Exception {
        // given
        long userId =1L;
        UserDto.Response response = new UserDto.Response(1L,"userName", "userEmail@gmail.com",
                "123456k*", true, Arrays.asList("USER"),
                LocalDateTime.now(), LocalDateTime.now());

        //Stubbing by Mockito
        given(userService.findUser(Mockito.anyLong())).willReturn(new User());
        given(mapper.userToUserResponse(Mockito.any(User.class))).willReturn(response);

        // when
        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/v1/{userId}", userId)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.userId").value(userId))
                .andExpect(jsonPath("$.data.userName").value(response.getUserName()))
                .andDo(
                        document("get-user",
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        Arrays.asList(parameterWithName("userId").description("회원 식별자 ID"))
                                ),
                                responseFields(
                                        List.of(
                                                fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터").optional(),
                                                fieldWithPath("data.userId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                                fieldWithPath("data.userName").type(JsonFieldType.STRING).description("회원 이름"),
                                                fieldWithPath("data.userEmail").type(JsonFieldType.STRING).description("이메일"),
                                                fieldWithPath("data.password").type(JsonFieldType.STRING).description("비밀번호"),
                                                fieldWithPath("data.userStatus").type(JsonFieldType.BOOLEAN).description("회원 상태"),
                                                fieldWithPath("data.roles").type(JsonFieldType.ARRAY).description("회원역할"),
                                                fieldWithPath("data.created_at").type(JsonFieldType.STRING).description("생성 시간"),
                                                fieldWithPath("data.updated_at").type(JsonFieldType.STRING).description("수정 시간")
                                        )
                                )
                        ));
    }
    /**
     * 주소 : GET v1/
     * Feature : 저장된 회원 전체를 조회한다.
     * Scenario : 원하는 page, size를 요청파라미터로 전달시 page와 size에 맞게 최신 회원 가입 순으로 회원들이 조회된다.
     * Given : UserDto.Response, page, size, 회원 객체들
     * Mockito로 User객체, getUser, UserResponseDto stubbing
     * When : 원하는 page, size를 기입할때,
     * Then : 범위 내에 회원이 모두 조회되어야 한다.
     */
    @Test
    void getUsersTest() throws Exception {
        //given
        String page = "1";
        String size = "10";

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", page);
        queryParams.add("size", size);

        User user1 = new User(1L,"userName1","userEamil1@gmail.com","123456k*",true,
                Arrays.asList("USER"));

        User user2 = new User(2L,"userName2","userEamil2@gmail.com","123456k*",true,
                Arrays.asList("USER"));

        Page<User> users = new PageImpl<>(List.of(user1, user2),
                PageRequest.of(0, 10, Sort.by("userId").descending()), 2);
        List<UserDto.Response> responses = new ArrayList<>();
        responses.add(new UserDto.Response(1L,"userName1", "userEamil1@gmail.com", "123456k*",
                true, Arrays.asList("USER"), LocalDateTime.now(), LocalDateTime.now()));

        responses.add(new UserDto.Response(2L,"userName2", "userEamil2@gmail.com", "123456k*",
                true, Arrays.asList("USER"), LocalDateTime.now(), LocalDateTime.now()));

        given(userService.findUserAll(Mockito.anyInt(),Mockito.anyInt())).willReturn(users);
        given(mapper.usersToUserReponses(Mockito.anyList())).willReturn(responses);

        //when
        ResultActions actions = mockMvc.perform(
                get("/v1")
                        .params(queryParams)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        MvcResult result =
                actions
                        .andExpect(status().isOk())
                        .andDo(
                                document(
                                        "get-users",
                                        preprocessRequest(prettyPrint()),
                                        preprocessResponse(prettyPrint()),
                                        requestParameters(
                                                List.of(
                                                parameterWithName("page").description("page 번호"),
                                                parameterWithName("size").description("page 크기")
                                                )
                                        ),
                                        responseFields(
                                                Arrays.asList(
                                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터").optional(),
                                                        fieldWithPath("data[].userId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                                        fieldWithPath("data[].userName").type(JsonFieldType.STRING).description("회원 이름"),
                                                        fieldWithPath("data[].userEmail").type(JsonFieldType.STRING).description("이메일"),
                                                        fieldWithPath("data[].password").type(JsonFieldType.STRING).description("비밀번호"),
                                                        fieldWithPath("data[].userStatus").type(JsonFieldType.BOOLEAN).description("회원 상태"),
                                                        fieldWithPath("data[].roles").type(JsonFieldType.ARRAY).description("회원역할"),
                                                        fieldWithPath("data[].created_at").type(JsonFieldType.STRING).description("생성 시간"),
                                                        fieldWithPath("data[].updated_at").type(JsonFieldType.STRING).description("수정 시간"),
                                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보").optional(),
                                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 번호").optional(),
                                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 사이즈").optional(),
                                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("전체 건 수").optional(),
                                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 수").optional()
                                                )
                                        )
                                )
                        ).andReturn();
        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$.data");
        assertThat(list.size()).isEqualTo(2);
    }
}
