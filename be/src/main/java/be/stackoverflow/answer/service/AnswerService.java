package be.stackoverflow.answer.service;

import be.stackoverflow.answer.entity.Answer;
import be.stackoverflow.answer.repository.AnswerRepository;
import be.stackoverflow.exception.BusinessLogicException;
import be.stackoverflow.exception.ExceptionCode;
import be.stackoverflow.question.entity.Question;
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
public class AnswerService {

    private final AnswerRepository answerRepository;
    public Answer createAnswer(Answer answer) {
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

    private Answer verifyAnswer(Long answerId){
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer answer = optionalAnswer.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        return answer;
    }

    public void deleteAllAnswer() {
        answerRepository.deleteAll();
    }

    public Answer updateAnswer(long answerId, Answer answer) {

        Answer chosenUser = this.findAnswer(answerId);

        Optional.ofNullable(answer.getAnswerBody())
                .ifPresent(new_body -> chosenUser.setAnswerBody(new_body));
        Optional.ofNullable(answer.getAnswerVote())
                .ifPresent(new_vote->chosenUser.setAnswerVote(new_vote));

        return answerRepository.save(chosenUser);
    }

    private Answer findAnswer(long answerId) {
        return verifyAnswer(answerId);
    }
}
