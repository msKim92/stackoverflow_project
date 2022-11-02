/*
package be.stackoverflow.question;

import be.stackoverflow.answer.controller.AnswerController;
import be.stackoverflow.answer.dto.AnswerDto;
import be.stackoverflow.answer.entity.Answer;
import be.stackoverflow.question.controller.questionController;
import be.stackoverflow.question.dto.questionDto;
import be.stackoverflow.question.entity.Question;
import be.stackoverflow.question.mapper.questionMapper;
import be.stackoverflow.question.service.questionService;
import be.stackoverflow.security.JwtTokenizer;
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
import org.springframework.mock.web.MockHttpServletRequest;
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
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(questionController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureMockMvc(addFilters = false)
@AutoConfigureRestDocs
public class QuestionControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private questionService questionService;

    @MockBean
    private UserService userService;

    @MockBean
    private questionMapper mapper;

    @MockBean
    private JwtTokenizer jwtTokenizer;


    */
/* 주소 : GET v1/questions/{questionId}
     * Feature : 리스트에 있는 질문 클릭시 질문 내용 및 답변들이 있는 상세 페이지가 나타난다.
     * Scenario : 원하는 질문 식별자를 파라미터로 전달하면 해당 질문에 상세 페이지가 반환 된다.
     * Given : questionDto.questionDetailResponse, questionDto.QuestionAnswerResponseDto, 질문식별자 파라미터로 전달, question 객체, user객체
     * When : 원하는 질문 식별자를 기입하면
     * Then : 식별자에 해당하는 질문에 대한 데이터가 반환된다.
     *//*

    @Test
    void getQuestionTest() throws Exception {
        // given
        long questionId = 1L;

        List<questionDto.QuestionAnswerResponseDto> answers = new ArrayList<>();
        answers.add(new questionDto.QuestionAnswerResponseDto(1L,"답변1",0,
                LocalDateTime.now(),LocalDateTime.now(),"userName3","userName4",2));
        answers.add(new questionDto.QuestionAnswerResponseDto(2L,"답변2",0,
                LocalDateTime.now(),LocalDateTime.now(),"userName5","userName6",2));

        questionDto.questionDetailResponse response = new questionDto.questionDetailResponse(1L,"질문1","질문1 해결해주실분?",
                "tags",0,true,0,
                LocalDateTime.now(),LocalDateTime.now(),"userName1","userName2",answers);

        //Stubbing by Mockito
        given(questionService.findQuestion(Mockito.anyLong())).willReturn(new Question());
        given(mapper.questionToDetailResponse(Mockito.any(Question.class))).willReturn(response);

        //when
        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/v1/questions/{questionId}", questionId)
                                .accept(MediaType.APPLICATION_JSON));

        //then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.questionId").value(questionId))
                .andExpect(jsonPath("$.data.questionTitle").value(response.getQuestionTitle()))
                .andDo(
                        document("get-question",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        Arrays.asList(parameterWithName("questionId").description("질문 식별자 ID"))
                                ),
                                responseFields(
                                        Arrays.asList(
                                                fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터").optional(),
                                                fieldWithPath("data.questionId").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                                fieldWithPath("data.questionTitle").type(JsonFieldType.STRING).description("질문 제목"),
                                                fieldWithPath("data.questionBody").type(JsonFieldType.STRING).description("질문 내용"),
                                                fieldWithPath("data.tags").type(JsonFieldType.STRING).description("추가된 태그"),
                                                fieldWithPath("data.questionViewCount").type(JsonFieldType.NUMBER).description("조회 수"),
                                                fieldWithPath("data.questionStatus").type(JsonFieldType.BOOLEAN).description("질문 상태"),
                                                fieldWithPath("data.questionVote").type(JsonFieldType.NUMBER).description("질문 좋아요 개수"),
                                                fieldWithPath("data.created_at").type(JsonFieldType.STRING).description("생성 시간"),
                                                fieldWithPath("data.updated_at").type(JsonFieldType.STRING).description("수정 시간"),
                                                fieldWithPath("data.create_by_user").type(JsonFieldType.STRING).description("생성자"),
                                                fieldWithPath("data.updated_by_user").type(JsonFieldType.STRING).description("수정자"),
                                                fieldWithPath("data.answers").type(JsonFieldType.ARRAY).description("질문 데이터").optional(),
                                                fieldWithPath("data.answers[].answerId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                                fieldWithPath("data.answers[].answerBody").type(JsonFieldType.STRING).description("댓글 내용"),
                                                fieldWithPath("data.answers[].answerVote").type(JsonFieldType.NUMBER).description("댓글 좋아요수"),
                                                fieldWithPath("data.answers[].created_at").type(JsonFieldType.STRING).description("생성 시간"),
                                                fieldWithPath("data.answers[].updated_at").type(JsonFieldType.STRING).description("수정 시간"),
                                                fieldWithPath("data.answers[].create_by_user").type(JsonFieldType.STRING).description("생성자"),
                                                fieldWithPath("data.answers[].updated_by_user").type(JsonFieldType.STRING).description("수정자"),
                                                fieldWithPath("data.answers[].answerSize").type(JsonFieldType.NUMBER).description("질문개수")
                                        )
                                )
                        ));

    }

    */
/* 주소 : GET v1/questions
     * Feature : 메인 페이지에서 볼수 있는 질문에 전체 리스트가 나온다.
     * Scenario : 원하는 page, size를 요청파라미터로 전달시 page와 size에 맞게 최신 질문 등록 순으로 조회된다.
     * Given : questionDto.questionFrontResponse, page, size, 회원 객체들
     * When : 원하는 page, size를 기입할때,
     * Then : 범위 내에 질문이 모두 조회되어야 한다.
     *//*


    @Test
    void getQuestionsTest() throws Exception {
        //given
        String page = "1";
        String size = "10";

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", page);
        queryParams.add("size", size);

        Question question1 = new Question(1L,"질문1","질문1을 해결해주세요",0,true,0);
        question1.setUser(new User(1L,"username1","useremail1","123456k*",true,Arrays.asList("USER")));
        Question question2 = new Question(2L,"질문2","질문2을 해결해주세요",0,true,0);
        question2.setUser(new User(2L,"username2","useremail2","123456k*",true,Arrays.asList("USER")));

        Page<Question> questions = new PageImpl<>(List.of(question1, question2),
                PageRequest.of(0, 10, Sort.by("questionId").descending()), 2);
        List<questionDto.questionFrontResponse> responses = new ArrayList<>();
        responses.add(new questionDto.questionFrontResponse(1L, "질문1", "tags1", 0, true,
                0, LocalDateTime.now(), LocalDateTime.now(),
                question1.getUser().getUserName(), question1.getUser().getUserName()));
        responses.add(new questionDto.questionFrontResponse(2L, "질문2", "tags2", 0, true,
                0, LocalDateTime.now(), LocalDateTime.now(),
                question2.getUser().getUserName(), question2.getUser().getUserName()));

        given(questionService.findAllQuestion(Mockito.anyInt(),Mockito.anyInt())).willReturn(questions);
        given(mapper.questionListResponse(Mockito.anyList())).willReturn(responses);

        //when
        ResultActions actions = mockMvc.perform(
                get("/v1/questions")
                        .params(queryParams)
                        .accept(MediaType.APPLICATION_JSON)
        );

        //then
        MvcResult result =
                actions
                        .andExpect(status().isOk())
                        .andDo(
                                document(
                                        "get-questions",
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
                                                        fieldWithPath("data[].questionId").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                                        fieldWithPath("data[].questionTitle").type(JsonFieldType.STRING).description("질문 제목"),
                                                        fieldWithPath("data[].tags").type(JsonFieldType.STRING).description("추가된 태그"),
                                                        fieldWithPath("data[].questionViewCount").type(JsonFieldType.NUMBER).description("조회 수"),
                                                        fieldWithPath("data[].questionStatus").type(JsonFieldType.BOOLEAN).description("질문 상태"),
                                                        fieldWithPath("data[].questionVote").type(JsonFieldType.NUMBER).description("질문 좋아요 개수"),
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

    */
/*
     * 주소 : DELETE v1/question/{questionId}
     * Feature : 작성자가 자신의 질문을 지우고 싶을때 사용하는 요청
     * Scenario : 원하는 questionId를 입력시 해당 질문을 데이터베이스에서 지운다.
     * Given : questionId
     * When : 원하는 questionId가 주어질떄,
     * Then : questionId의 댓글이 삭제 된다.
     *//*

    @Test
    void deleteQuestionTest() throws Exception{
        //given
        long questionId = 1L;
        doNothing().when(questionService).deleteQuestion(Mockito.anyLong());

        //when
        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders
                        .delete("/v1/questions/{questionId}", questionId));

        //then
        actions.andExpect(status().isNoContent())
                .andDo(
                        document(
                                "delete-question",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        Arrays.asList(parameterWithName("questionId").description("질문 식별자 ID"))
                                )
                        )
                );
    }
}
*/
