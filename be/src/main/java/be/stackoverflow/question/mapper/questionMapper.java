package be.stackoverflow.question.mapper;

import be.stackoverflow.question.dto.questionDto;
import be.stackoverflow.question.entity.Question;
import be.stackoverflow.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface questionMapper {

    List<questionDto.questionFrontResponse> questionListResponse(List<Question> questionList);
    Question questionPatchToQuestion(questionDto.questionPatch patchToEntity); //patchDto 데이터를 Question entity화
    default Question questionPostToQuestion(questionDto.questionPost postDataToEntity) {
        Question question = new Question();
        User user = new User();
        user.setUserId(postDataToEntity.getUserId());
        question.setUser(user);

        question.setQuestionTitle(postDataToEntity.getQuestionTitle());
        question.setQuestionBody(postDataToEntity.getQuestionBody());

        return question;
    } //postDto 데이터를 Question entity화
    default questionDto.questionFrontResponse questionToFrontResponse(Question question) {
        questionDto.questionFrontResponse questionFrontResponse = new questionDto.questionFrontResponse();

        questionFrontResponse.setQuestionTitle(question.getQuestionTitle());
        questionFrontResponse.setQuestionViewCount(question.getQuestionViewCount());
        questionFrontResponse.setQuestionstatus(question.getQuestionStatus());
        questionFrontResponse.setQuestionVote(question.getQuestionVote());
        questionFrontResponse.setCreated_at(question.getCreated_at());
        questionFrontResponse.setUpdated_at(question.getUpdated_at());
        questionFrontResponse.setUser(question.getUser());

        return questionFrontResponse;
    }//게시판 처음에 쏴줄 데이터들 변환

    default questionDto.questionDetailResponse questionToDeatilResponse(Question question) {
        questionDto.questionDetailResponse questionDetailResponse = new questionDto.questionDetailResponse();

        questionDetailResponse.setQuestionTitle(question.getQuestionTitle());
        questionDetailResponse.setQuestionBody(question.getQuestionBody());
        questionDetailResponse.setQuestionViewCount(question.getQuestionViewCount());
        questionDetailResponse.setQuestionStatus(question.getQuestionStatus());
        questionDetailResponse.setQuestionVote(question.getQuestionVote());
        questionDetailResponse.setCreated_at(question.getCreated_at());
        questionDetailResponse.setUpdated_at(question.getUpdated_at());
        questionDetailResponse.setUser(question.getUser());

        return questionDetailResponse;
    } //상세 게시글에 쏴줄 데이터로 변환



}
