package be.stackoverflow.question.repository;

import be.stackoverflow.question.entity.Question;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static be.stackoverflow.question.entity.QQuestion.question;

@Repository
public class questionRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public questionRepositorySupport(JPAQueryFactory queryFactory) {
        super(Question.class);
        this.queryFactory = queryFactory;
    }

    public List<Question> findByTitle(String title) {
        return queryFactory
                .selectFrom(question)
                .where(question.questionTitle.contains(title))// like %title%
                .fetch();
    }
}
