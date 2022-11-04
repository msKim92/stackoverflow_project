package be.stackoverflow.vote.repository;

import be.stackoverflow.answer.entity.Answer;
import be.stackoverflow.question.entity.Question;
import be.stackoverflow.user.entity.User;
import be.stackoverflow.vote.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote,Long> {
    Optional<Vote> findByUserAndQuestion(User user, Question question);
    Optional<Vote> findByUserAndAnswer(User user, Answer answer);
}
