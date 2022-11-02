package be.stackoverflow.user.entity;

import be.stackoverflow.answer.entity.Answer;
import be.stackoverflow.audit.TimeAudit;
import be.stackoverflow.question.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "User_Table")
public class User extends TimeAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;

    private String userName;

    private String userEmail;

    private String password;

    private boolean userStatus;

    /**
     * 보안코드상에서 이미 ROLE_USER or ROLE_ADMIN으로 저장됨
     */
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();


    @OneToMany(mappedBy = "user",cascade = CascadeType.PERSIST)
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
    private List<Answer> answers = new ArrayList<>();

    public User(Long userId, String userName, String userEmail, String password, boolean userStatus, List<String> roles) {

        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.password = password;
        this.userStatus = userStatus;
        this.roles = roles;

    }
}
