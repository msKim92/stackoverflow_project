package be.stackoverflow.question.mapper;

import be.stackoverflow.answer.entity.Answer;
import be.stackoverflow.question.dto.questionDto;
import be.stackoverflow.question.entity.Question;
import com.querydsl.core.QueryResults;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface questionMapper {

    List<questionDto.questionFrontResponse> questionListResponse(List<Question> questionList);
    default Question questionPatchToQuestion(questionDto.questionPatch patchToEntity) {
        Question question = new Question();

        question.setQuestionTitle(patchToEntity.getQuestionTitle());
        question.setQuestionBody(patchToEntity.getQuestionBody());

        return question;
    } //patchDto 데이터를 Question entity화
    default Question questionPostToQuestion(questionDto.questionPost postDataToEntity) {
        Question question = new Question();
        question.setQuestionTitle(postDataToEntity.getQuestionTitle());
        question.setQuestionBody(postDataToEntity.getQuestionBody());
        question.setTags(postDataToEntity.getTags());

        return question;
    }
    //postDto 데이터를 Question entity화
    default questionDto.questionFrontResponse questionToFrontResponse(Question question) {
        questionDto.questionFrontResponse questionFrontResponse = new questionDto.questionFrontResponse();

        questionFrontResponse.setQuestionId(question.getQuestionId());
        questionFrontResponse.setQuestionTitle(question.getQuestionTitle());
        questionFrontResponse.setQuestionViewCount(question.getQuestionViewCount());
        questionFrontResponse.setQuestionStatus(question.getQuestionStatus());
        questionFrontResponse.setQuestionVote(question.getQuestionVote());
        questionFrontResponse.setCreated_at(question.getCreated_at());
        questionFrontResponse.setUpdated_at(question.getUpdated_at());
        questionFrontResponse.setCreate_by_user(question.getCreate_by_user());
        questionFrontResponse.setUpdated_by_user(question.getUpdated_by_user());
        String [] tags = question.getTags().split("@");
        List<String> newTags = new ArrayList<>();
        for (String tag : tags) {
            newTags.add(tag.replaceAll("[\\s,./]",""));
        }
        questionFrontResponse.setTags(newTags);

        //댓글 개수 추가
        questionFrontResponse.setAnswerSize(answerToAnswerResponseDto(question.getAnswers()).size());


        return questionFrontResponse;
    }//게시판 처음에 쏴줄 데이터들 변환

    default questionDto.questionDetailResponse questionToDetailResponse(Question question) {
        questionDto.questionDetailResponse questionDetailResponse = new questionDto.questionDetailResponse();

        questionDetailResponse.setQuestionId(question.getQuestionId());
        questionDetailResponse.setQuestionTitle(question.getQuestionTitle());
        questionDetailResponse.setQuestionBody(question.getQuestionBody());
        questionDetailResponse.setQuestionViewCount(question.getQuestionViewCount());
        questionDetailResponse.setQuestionStatus(question.getQuestionStatus());
        questionDetailResponse.setQuestionVote(question.getQuestionVote());
        questionDetailResponse.setCreated_at(question.getCreated_at());
        questionDetailResponse.setUpdated_at(question.getUpdated_at());
        questionDetailResponse.setCreate_by_user(question.getCreate_by_user());
        questionDetailResponse.setUpdated_by_user(question.getUpdated_by_user());
        questionDetailResponse.setAnswers(answerToAnswerResponseDto(question.getAnswers()));
        String [] tags = question.getTags().split("@");
        List<String> newTags = new ArrayList<>();
        for (String tag : tags) {
            newTags.add(tag.replace("[\\s,./]",""));
        }
        questionDetailResponse.setTags(newTags);
        //댓글 개수 추가
        questionDetailResponse.setAnswerSize(answerToAnswerResponseDto(question.getAnswers()).size());
        return questionDetailResponse;
    } //상세 게시글에 쏴줄 데이터로 변환

    default List<questionDto.QuestionAnswerResponseDto> answerToAnswerResponseDto(List<Answer> answers) {
        return answers
                .stream()
                .map(answer-> questionDto.QuestionAnswerResponseDto
                        .builder()
                        .answerId(answer.getAnswerId())
                        .answerBody(answer.getAnswerBody())
                        .answerVote(answer.getAnswerVote())
                        .created_at(answer.getCreated_at())
                        .updated_at(answer.getUpdated_at())
                        .create_by_user(answer.getCreate_by_user())
                        .updated_by_user(answer.getUpdated_by_user())
                        .build())
                .collect(Collectors.toList());
    }


}
