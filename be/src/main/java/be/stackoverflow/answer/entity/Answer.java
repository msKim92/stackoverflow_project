package be.stackoverflow.answer.entity;

import be.stackoverflow.audit.WriterAudit;
import be.stackoverflow.question.entity.Question;
import be.stackoverflow.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "ANSWER")
public class Answer extends WriterAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(nullable = false)
    private String answerBody;

    private int answerVote=0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="question_id")
    private Question question;

    public void setUser(User user) {
        this.user = user;
        user.getAnswers().add(this);
    }
    public void setQuestion(Question question) {
        this.question = question;
        user.getAnswers().add(this);
    }
}
