package be.stackoverflow.answer.mapper;

import be.stackoverflow.answer.dto.AnswerDto;
import be.stackoverflow.answer.entity.Answer;
import be.stackoverflow.user.dto.UserDto;
import be.stackoverflow.user.entity.User;
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

        return answerResponse;
    }


}
