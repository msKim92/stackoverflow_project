package be.stackoverflow.member.controller;


import be.stackoverflow.member.entity.Member;
//import be.stackoverflow.user.mapper.UserMapper;
import be.stackoverflow.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping
public class MemberController {

    private final MemberService memberService;

//    private final UserMapper userMapper;

    /**
     * 파라미터에 유효성 적용 예정 : @Valid / 상태: undo
     * Dto로 갈아끼울 예정 / 상태: undo
     */
    @PostMapping
    public ResponseEntity postMember(@RequestBody Member member) {
        log.info("user.email = {}",member.getEmail());
        Member createdMember = memberService.createMember(member);

        return new ResponseEntity<>(createdMember,HttpStatus.CREATED);
    }

    /**
     * @GetMapping url 생성후 기입 / 상태: undo
     * 이 부분은 테스트시 사용자 조회용으로 사용될 예정 / 상태: undo
     * Dto로 갈아끼울 예정 / 상태: undo
     */
    @GetMapping("/{memberId}")
    public ResponseEntity getMember(@PathVariable("memberId") Long memberId) {
        Member chosenMember = memberService.findMember(memberId);

        return new ResponseEntity<>(chosenMember, HttpStatus.OK);
    }

    /**
     * @GetMapping url 생성후 기입 / 상태: undo
     * Dto로 갈아끼울 예정 / 상태: undo
     */
    @GetMapping
    public ResponseEntity getUsers() {
        List<Member> memberAll = memberService.findUserAll();
        return new ResponseEntity<>(memberAll, HttpStatus.OK);
    }

    /**
     * @PatchMapping url 생성후 기입 / 상태: undo
     * Dto로 갈아끼울 예정 / 상태: undo
     */
    @PatchMapping("/{memberId}")
    public ResponseEntity patchMember(@PathVariable("memberId") Long memberId, @RequestBody Member member) {
        Member updateMember = memberService.updateMember(memberId, member);

        return new ResponseEntity<>(updateMember, HttpStatus.UPGRADE_REQUIRED);
    }

    /**
     * @DeleteMapping url 생성후 기입 / 상태: undo
     * Dto로 갈아끼울 예정 / 상태: undo
     */
    @DeleteMapping("/{memberId}")
    public ResponseEntity deleteOne(@PathVariable("memberId") Long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
