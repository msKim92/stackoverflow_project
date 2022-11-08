package be.stackoverflow.answer.repository;

import be.stackoverflow.answer.entity.Answer;
import be.stackoverflow.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer,Long> {
}
