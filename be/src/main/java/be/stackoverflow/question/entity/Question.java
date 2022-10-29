package be.stackoverflow.question.entity;

import be.stackoverflow.answer.entity.Answer;
import be.stackoverflow.audit.TimeAudit;
import be.stackoverflow.audit.WriterAudit;
import be.stackoverflow.tags.entity.Tags;
import be.stackoverflow.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "QUESTIONS")
public class Question extends WriterAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(nullable = false)
    private String questionTitle;
    @Column(nullable = false)
    private String questionBody;
    @Column(nullable = false)
    private int questionVote = 0;
    @Column(nullable = false)
    private Boolean questionStatus = true; //삭제시 false로 처리
    @Column(nullable = false)
    private int questionViewCount = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "question", cascade = CascadeType.PERSIST)
    private List<Answer> answers = new ArrayList<>();

    @OneToMany(mappedBy = "question", cascade = CascadeType.PERSIST)
    private List<TagsQuestion> tagsQuestions = new ArrayList<>();

    //양방향 연관관계 편의 메서드
    public void setUser(User user) {
        this.user = user;
        user.getQuestions().add(this);
    }

}
