package be.stackoverflow.member.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "member_id")
    private Long id;

    private String name;

    private String email;

    private String password;

    // erd 현재 memberStatus -> userStatus 수정 필요
    private boolean memberStatus;

    public enum role{
        // USER, ADMIN, BASIC 이면 될것 같은데, 차후 협의 필요
        USER, ADMIN, BASIC
    }

    protected Member() {
    }

    public Member(Long id, String name, String email, String password, boolean memberStatus) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.memberStatus = memberStatus;
    }
}
