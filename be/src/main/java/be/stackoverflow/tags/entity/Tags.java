package be.stackoverflow.tags.entity;

import be.stackoverflow.question.entity.Question;
import be.stackoverflow.question.entity.TagsQuestion;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Tags {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    @Column(nullable = false)
    private String tagName;

    @Column(nullable = false)
    private String tagDetail;


    //Question과 TagsQuestion 사이에 있는 일을 몰라도 될까 같아서 단반향
    @OneToMany(mappedBy = "tags", cascade = CascadeType.PERSIST)
    private List<TagsQuestion> tagsQuestions = new ArrayList<>();

    public Tags() {
    }

    public Tags(String tagName, String tagDetail) {
        this.tagName = tagName;
        this.tagDetail = tagDetail;
    }

    public Tags(Long tagId, String tagName, String tagDetail) {
        this.tagId = tagId;
        this.tagName = tagName;
        this.tagDetail = tagDetail;
    }
    /**
     * 여기말고 tag_question 엔티티에 있어야 할듯
     * 연관관계 매핑 후 구현
     */

//    @Column(nullable = false)
//    private boolean tagStatus = false;

}
