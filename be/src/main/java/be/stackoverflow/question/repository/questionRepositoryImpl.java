package be.stackoverflow.question.repository;

import be.stackoverflow.question.entity.Question;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.method.P;

import java.util.List;

import static be.stackoverflow.question.entity.QQuestion.question;

@RequiredArgsConstructor
public class questionRepositoryImpl implements questionRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Question> findByTitle(String title) {
        return queryFactory
                .selectFrom(question)
                .where(question.questionTitle.contains(title))// like %title%
                .orderBy(question.created_at.desc())
                .fetch();
    }
}
