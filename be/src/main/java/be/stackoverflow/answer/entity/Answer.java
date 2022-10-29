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
}
