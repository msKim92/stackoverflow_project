package be.stackoverflow.user.entity;

import be.stackoverflow.audit.TimeAudit;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    // erd 현재 memberStatus -> userStatus 수정 필요
    private boolean userStatus;

    /**
     * 보안코드상에서 이미 ROLE_USER or ROLE_ADMIN으로 저장됨
     */
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

//    @Enumerated(value = EnumType.STRING)
//    private Role role;
//
//    public enum Role{
//        // USER, ADMIN, BASIC 이면 될것 같은데, 차후 협의 필요
//        USER, ADMIN, BASIC;
//    }

    protected User() {
    }

    public User(Long userId, String userName, String userEmail, String password, boolean userStatus, List<String> roles) {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.password = password;
        this.userStatus = userStatus;
        this.roles = roles;
    }
}
