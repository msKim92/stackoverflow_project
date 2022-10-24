package be.stackoverflow.user.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "User_Table")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String email;

    private String password;

    // erd 현재 memberStatus -> userStatus 수정 필요
    private boolean userStatus;

    public enum role{
        // USER, ADMIN, BASIC 이면 될것 같은데, 차후 협의 필요
        USER, ADMIN, BASIC
    }

    protected User() {
    }

    public User(Long id, String name, String email, String password, boolean userStatus) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.userStatus = userStatus;
    }
}
