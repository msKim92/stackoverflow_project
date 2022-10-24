package be.stackoverflow.member.service;

import be.stackoverflow.member.entity.Member;
import be.stackoverflow.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private MemberRepository memberRepository;
    public Member createMember(Member member) {
        log.info("member = {}",member.getEmail());
        verifyExistsEmail(member.getEmail());

        Member savedMember = memberRepository.save(member);
        log.info("savedMember = {}",savedMember.getName());
        return savedMember;
    }

    public Member findMember(Long memberId) {
        return findVerifiedMember(memberId);
    }

    public List<Member> findUserAll() {
        List<Member> memberAll = memberRepository.findAll();
        return memberAll;
    }

    // ACCESS와 MEMBERSTATUS는 설정하고, 바꾸는 권한은 뒤에 admin 완성시 구성 예정 / 상태 : undo
    public Member updateMember(Long memberId, Member member) {
        Member chosenMember = this.findMember(memberId);

        Optional.ofNullable(member.getName()).ifPresent(name -> chosenMember.setName(name));
        Optional.ofNullable(member.getEmail()).ifPresent(email -> chosenMember.setEmail(email));
        Optional.ofNullable(member.getPassword()).ifPresent(password -> chosenMember.setPassword(password));

        return memberRepository.save(chosenMember);
    }

    public void deleteMember(Long memberId) {
        Member chosenMember = findVerifiedMember(memberId);

        memberRepository.delete(chosenMember);
    }

    public Member findVerifiedMember(Long userId) {
        Optional<Member> optionalUser = memberRepository.findById(userId);
        Member findMember = optionalUser.orElseThrow(() -> new RuntimeException("회원을 조회할 수 없습니다"));
        return findMember;
    }
    public void verifyExistsEmail(String email) {
        log.info("디비진입전");
        Optional<Member> member = memberRepository.findByEmail(email);
        log.info("검증전");
        if (member.isPresent()) {
            throw new RuntimeException("회원이 이미 있습니다.");
        }
        log.info("검증완료");
    }



}
