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

    Answer answerPostToAnswer(AnswerDto.Post requestBody);

    Answer answerPatchToAnswer(AnswerDto.Patch requestBody);

    AnswerDto.Response answerToAnswerResponse(Answer answer);

    List<AnswerDto.Response> answersToAnswerReponses(List<Answer> answers);
}
