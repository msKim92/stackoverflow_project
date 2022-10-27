package be.stackoverflow.user.entity;

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

    @Enumerated(value = EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user",cascade = CascadeType.PERSIST)
    private List<Question> questions = new ArrayList<>();

    public enum Role{
        // USER, ADMIN, BASIC 이면 될것 같은데, 차후 협의 필요
        USER, ADMIN, BASIC;
    }


    public User(Long userId, String userName, String userEmail, String password) {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.password = password;
    }
}
