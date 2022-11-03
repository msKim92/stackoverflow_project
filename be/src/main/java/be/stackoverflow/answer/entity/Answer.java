package be.stackoverflow.answer.entity;

import be.stackoverflow.audit.WriterAudit;
import be.stackoverflow.audit.question.entity.Question;
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
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question;

    //양방향 연관관계 편의 메서드
    public void setUser(User user) {
        this.user = user;
        user.getAnswers().add(this);
    }

    public void setQuestion(Question question) {
        this.question = question;
        question.getAnswers().add(this);
    }

    public Answer(Long answerId) {
        this.answerId = answerId;
    }

    public Answer(Long answerId, String answerBody, int answerVote) {
        this.answerId = answerId;
        this.answerBody = answerBody;
        this.answerVote = answerVote;
    }
}
