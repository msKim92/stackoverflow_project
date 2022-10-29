package be.stackoverflow.question.entity;

import be.stackoverflow.audit.TimeAudit;
import be.stackoverflow.tags.entity.Tags;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class TagsQuestion extends TimeAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagsQuestionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="questionId")
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="tagId")
    private Tags tags;

    public void setQuestion(Question question) {
        this.question = question;
        question.getTagsQuestions().add(this);
    }

    public void setTags(Tags tags) {
        this.tags = tags;
        tags.getTagsQuestions().add(this);
    }
}
