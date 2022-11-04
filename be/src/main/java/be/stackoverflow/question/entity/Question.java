package be.stackoverflow.question.entity;

import be.stackoverflow.answer.entity.Answer;
import be.stackoverflow.audit.WriterAudit;
import be.stackoverflow.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Question_Table")
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

    @Column(nullable = true)
    private String tags;

    @Transient
    private HashMap<String,Integer> voteList=new HashMap<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "question", cascade = CascadeType.PERSIST)
    private List<Answer> answers = new ArrayList<>();

    //양방향 연관관계 편의 메서드
    public void setUser(User user) {
        this.user = user;
        user.getQuestions().add(this);
    }

    public Question(Long questionId) {
        this.questionId = questionId;
    }

    public Question(Long questionId, String questionTitle, String questionBody, int questionVote, Boolean questionStatus, int questionViewCount, String tags) {
        this.questionId = questionId;
        this.questionTitle = questionTitle;
        this.questionBody = questionBody;
        this.questionVote = questionVote;
        this.questionStatus = questionStatus;
        this.questionViewCount = questionViewCount;
        this.tags = tags;
    }
}
