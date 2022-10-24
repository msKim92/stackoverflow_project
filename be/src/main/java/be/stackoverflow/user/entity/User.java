package be.stackoverflow.user.entity;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@RequiredArgsConstructor
public class User {

    @Id
    @GeneratedValue
    private Long userId;

    private String userName;

    private String email;

    private String password;

    // erd 현재 memberStatus -> userStatus 수정 필요
    private boolean userStatus;

    public enum role{
        // USER, ADMIN, BASIC 이면 될것 같은데, 차후 협의 필요
        USER, ADMIN, BASIC
    }
}
