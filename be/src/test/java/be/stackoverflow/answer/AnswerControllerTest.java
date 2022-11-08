/*
package be.stackoverflow.answer;

import be.stackoverflow.answer.controller.AnswerController;
import be.stackoverflow.answer.dto.AnswerDto;
import be.stackoverflow.answer.entity.Answer;
import be.stackoverflow.answer.mapper.AnswerMapper;
import be.stackoverflow.answer.service.AnswerService;
import be.stackoverflow.question.entity.Question;
import be.stackoverflow.question.service.questionService;
import be.stackoverflow.security.JwtTokenizer;
import be.stackoverflow.user.dto.UserDto;
import be.stackoverflow.user.entity.User;
import be.stackoverflow.user.service.UserService;
import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
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
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AnswerController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureMockMvc(addFilters = false)
@AutoConfigureRestDocs
public class AnswerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private AnswerService answerService;

    @MockBean
    private questionService questionService;

    @MockBean
    private UserService userService;

    @MockBean
    private JwtTokenizer jwtTokenizer;

    @MockBean
    private AnswerMapper mapper;

//     * 주소 : GET v1/answer
//     * Feature : 질문이나 user 쪽에서 조회가 아니라 관리자 입장에서 조회하는 기능이다.
//     * Scenario : 원하는 page, size를 요청파라미터로 전달시 page와 size에 맞게 최신 질문 등록 순으로 조회된다.
//     * Given : AnswerDto.Response, page, size, 회원 객체들
//     * Mockito로 Answer객체, getAnswer, AnswerResponseDto stubbing
//     * When : 원하는 page, size를 기입할때,
//     * Then : 범위 내에 질문이 모두 조회되어야 한다.



    @Test
    void getAnswersTest() throws Exception {
        //given
        String page = "1";
        String size = "10";

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", page);
        queryParams.add("size", size);


        Answer answer1 = new Answer(1L,"답변1",0);

        Answer answer2 = new Answer(2L,"답변2",0);

        Page<Answer> answers = new PageImpl<>(List.of(answer1, answer2),
                PageRequest.of(0, 10, Sort.by("answerId").descending()), 2);
        List<AnswerDto.Response> responses = new ArrayList<>();
        responses.add(new AnswerDto.Response(1L,"답변1", 0, LocalDateTime.now(), LocalDateTime.now(),"userName1","userName1"));
        responses.add(new AnswerDto.Response(2L,"답변2", 0, LocalDateTime.now(), LocalDateTime.now(),"userName2","userName2"));

        given(answerService.findAllAnswer(Mockito.anyInt(),Mockito.anyInt())).willReturn(answers);
        given(mapper.answersToAnswerReponses(Mockito.anyList())).willReturn(responses);

        //when
        ResultActions actions = mockMvc.perform(
                get("/v1/answer")
                        .params(queryParams)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        MvcResult result =
                actions
                        .andExpect(status().isOk())
                        .andDo(
                                document(
                                        "get-answers",
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
                                                        fieldWithPath("data[].answerId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                                        fieldWithPath("data[].answerBody").type(JsonFieldType.STRING).description("댓글 내용"),
                                                        fieldWithPath("data[].answerVote").type(JsonFieldType.NUMBER).description("댓글 좋아요수"),
                                                        fieldWithPath("data[].created_at").type(JsonFieldType.STRING).description("생성 시간"),
                                                        fieldWithPath("data[].updated_at").type(JsonFieldType.STRING).description("수정 시간"),
                                                        fieldWithPath("data[].create_by_user").type(JsonFieldType.STRING).description("생성자"),
                                                        fieldWithPath("data[].updated_by_user").type(JsonFieldType.STRING).description("수정자"),
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
//     * 주소 : DELETE v1/answer/{answerId}
//     * Feature : 작성자가 자신의 댓글을 지우고 싶을때 사용하는 요청
//     * Scenario : 원하는 answerId 입력시 해당 댓글을 데이터베이스에서 지운다.
//     * Given : AnswerDto.Response, answerId
//     * When : 원하는 answerId가 주어질떄,
//     * Then : answerId의 댓글이 삭제 된다.


    @Test
    void deleteAnswerTest() throws Exception{
        //given
        long answerId = 1L;
        doNothing().when(answerService).deleteAnswer(Mockito.anyLong());

        //when
        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders
                        .delete("/v1/answer/{answerId}", answerId));

        //then
        actions.andExpect(status().isNoContent())
                .andDo(
                        document(
                                "delete-answer",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        Arrays.asList(parameterWithName("answerId").description("댓글 식별자 ID"))
                                )
                        )
                );
    }
//     * 주소 : DELETE v1/answer/
//     * Feature : 종속하고 있는 질문이 지워지면 속해있는 댓글을 모두 지운다.
//     * Scenario : 종속하고 있는 질문이 지워지면 속해있는 댓글을 모두 지운다.
//     * Given : AnswerDto.Response
//     * When : 모든 데이터 삭제 요청
//     * Then : 댓글이 삭제 된다.


    @Test
    void deleteAnswersTest() throws Exception{
        //given
        doNothing().when(answerService).deleteAllAnswer();

        //when
        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders
                        .delete("/v1/answer"));

        //then
        actions.andExpect(status().isNoContent())
                .andDo(
                        document(
                                "delete-answers",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint())

                        )
                );
    }
}
*/
