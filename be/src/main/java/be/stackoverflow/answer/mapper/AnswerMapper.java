package be.stackoverflow.answer.mapper;

import be.stackoverflow.answer.dto.AnswerDto;
import be.stackoverflow.answer.entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {
    List<AnswerDto.Response> answersToAnswerReponses(List<Answer> answers);
    default Answer answerPostToAnswer(AnswerDto.Post requestBody) {
        Answer answer = new Answer();
        answer.setAnswerBody(requestBody.getAnswerBody());

        return answer;
    }

    default Answer answerPatchToAnswer(AnswerDto.Patch requestBody) {
        Answer answer = new Answer();
        answer.setAnswerBody(requestBody.getAnswerBody());

        return answer;
    }

    default AnswerDto.Response answerToAnswerResponse(Answer answer) {
        AnswerDto.Response answerResponse = new AnswerDto.Response();

        answerResponse.setAnswerId(answer.getAnswerId());
        answerResponse.setAnswerBody(answer.getAnswerBody());
        answerResponse.setAnswerVote(answer.getAnswerVote());
        answerResponse.setCreated_at(answer.getCreated_at());
        answerResponse.setUpdated_at(answer.getUpdated_at());
        answerResponse.setCreate_by_user(answer.getCreate_by_user());
        answerResponse.setUpdated_by_user(answer.getUpdated_by_user());

        return answerResponse;
    }


}
