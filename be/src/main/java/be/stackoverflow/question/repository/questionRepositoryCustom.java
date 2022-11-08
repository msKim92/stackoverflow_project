package be.stackoverflow.question.repository;

import be.stackoverflow.question.entity.Question;
import com.querydsl.core.QueryResults;
import org.springframework.data.domain.Page;

import java.util.List;

public interface questionRepositoryCustom {
    List<Question> findByTitle(String title);
}
