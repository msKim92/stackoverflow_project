package be.stackoverflow.question.entity;

import be.stackoverflow.audit.WriterAudit;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    
}
