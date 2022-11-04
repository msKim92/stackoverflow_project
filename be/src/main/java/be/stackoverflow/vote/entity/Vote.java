package be.stackoverflow.vote.entity;

import be.stackoverflow.answer.entity.Answer;
import be.stackoverflow.question.entity.Question;
import be.stackoverflow.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Table(name = "Vote_Table")
@Entity
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voteId;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY)
    private Answer answer;
    public Vote(User user, Question question) {
        this.user = user;
        this.question = question;
    }

    public Vote(User user, Answer answer) {
        this.user = user;
        this.answer = answer;
    }
}
