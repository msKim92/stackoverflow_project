package be.stackoverflow.member.repository;

import be.stackoverflow.member.entity.Member;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {
    // 중복 회원가입인지 확인하는 용도
//    Optional<User> findByUsername(String userName);

    // 회원을 조회하는 용도
    Optional<Member> findByEmail(String email);
}
