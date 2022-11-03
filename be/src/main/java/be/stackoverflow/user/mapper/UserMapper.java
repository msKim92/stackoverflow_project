package be.stackoverflow.user.mapper;

import be.stackoverflow.answer.entity.Answer;
import be.stackoverflow.question.entity.Question;
import be.stackoverflow.user.dto.UserDto;
import be.stackoverflow.user.entity.User;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userPostToUser(UserDto.Post requestBody);

    User userPatchToUser(UserDto.Patch requestBody);

    List<UserDto.Response> usersToUserReponses(List<User> users);

    default UserDto.Response userToUserResponse(User user) {
        UserDto.Response response = new UserDto.Response();
        response.setUserId(user.getUserId());
        response.setUserName(user.getUserName());
        response.setUserEmail(user.getUserEmail());
        response.setPassword(user.getPassword());
        response.setUserStatus(user.isUserStatus());
        response.setRoles(user.getRoles());
        response.setCreated_at(user.getCreated_at());
        response.setUpdated_at(user.getUpdated_at());

        // 여기서 getQuestions()나 getAnswers()를 하면 Question 엔티티나 Answer 엔티티에 있는 양방향 연관관계 편의 메서드에 있는 get으로가서
        // 무한 호출이 성립된다.
//        response.setQuestions(user.getQuestions());
        response.setQuestions(questionToUserResponseDto(user.getQuestions()));
//        response.setAnswers(user.getAnswers());
        response.setAnswers(answerToUserResponseDto(user.getAnswers()));

        return response;
    }
    default List<UserDto.UserQuestionResponseDto> questionToUserResponseDto(List<Question> questions) {
        return questions
                .stream()
                .map(question-> UserDto.UserQuestionResponseDto
                        .builder()
                        .questionId(question.getQuestionId())
                        .questionTitle(question.getQuestionTitle())
                        .build())
                .collect(Collectors.toList());
    }
    default List<UserDto.UserAnswerResponseDto> answerToUserResponseDto(List<Answer> answers) {
        return answers
                .stream()
                .map(answer-> UserDto.UserAnswerResponseDto
                        .builder()
                        .answerId(answer.getAnswerId())
                        .answerBody(answer.getAnswerBody())
                        .build())
                .collect(Collectors.toList());
    }
}
