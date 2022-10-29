package be.stackoverflow.answer.service;

import be.stackoverflow.answer.entity.Answer;
import be.stackoverflow.answer.repository.AnswerRepository;
import be.stackoverflow.exception.BusinessLogicException;
import be.stackoverflow.exception.ExceptionCode;
import be.stackoverflow.question.entity.Question;
import be.stackoverflow.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnswerService  {

    private final AnswerRepository answerRepository;
    public Answer createAnswer(Answer answer, User user,Question question) {

        answer.setCreate_by_user(user.getUserName());
        answer.setUpdated_by_user(user.getUserName());
        answer.setUser(user);

        answer.setQuestion(question);

        return answerRepository.save(answer);
    }


    public Page<Answer> findAllAnswer(int page, int size) {
        return answerRepository.findAll(PageRequest.of(page, size,
                Sort.by("answerId").descending()));
    }

    public void deleteAnswer(long answerId) {
        Answer verifiedAnswer = verifyAnswer(answerId);
        answerRepository.delete(verifiedAnswer);

    }

    public void deleteAllAnswer() {
        answerRepository.deleteAll();
    }

    public Answer updateAnswer(long answerId, Answer answer,User user) {

        Answer chosenAnswer = this.findAnswer(answerId);

        chosenAnswer.setUpdated_by_user(user.getUserName());

        Optional.ofNullable(answer.getAnswerBody())
                .ifPresent(new_body -> chosenAnswer.setAnswerBody(new_body));
        log.info("패치 서비스");
        return answerRepository.save(chosenAnswer);
    }

    private Answer findAnswer(long answerId) {
        return verifyAnswer(answerId);
    }

    private Answer verifyAnswer(Long answerId){
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer answer = optionalAnswer.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        return answer;
    }
}