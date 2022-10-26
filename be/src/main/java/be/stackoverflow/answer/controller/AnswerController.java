package be.stackoverflow.answer.controller;


import be.stackoverflow.answer.dto.AnswerAddRequestDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@Slf4j // 로그 작성
@RestController // URL들은 모두 REST API
@RequiredArgsConstructor // 의존성 주입
@RequestMapping("/v1/answer") // API URL중 상위 부분
public class AnswerController {
    //C ( POST ) R ( GET ) U ( PATCH ) D ( DELETE )
@PostMapping("/addAnswer")
public ResponseEntity postAnwer(@RequestBody AnswerAddRequestDTO dto) {
    // 1. 답글 본문
    // 2. 사용자 ID
    // 3. 질문글 ID
    // 4. 답글 번호 - 화면에서 받지 않고 내부적으로 순차적인 번호를 부여
    //Todo dto에 담겨있는 것들을 가지고 답글을 등록해준다
    return new ResponseEntity(HttpStatus.OK);
}

@GetMapping("/getAnswer/{question-Id}")
public ResponseEntity getAnwer(@PathVariable("questionId") @Positive Long questionId) {
    // 1. 사용자 ID
    // 2. 질문글 ID
    // 3. 답글 ID
    // 4. 본문 내용
    // 5. 좋아요
    //Todo questionID 를 가지고 그에 맞는 답글을 반환

    return new ResponseEntity(HttpStatus.OK);
}
@PatchMapping("/patchAnswer")
public ResponseEntity patchAnwser() {
    // 1. 사용자 ID
    // 2. 답글 ID
    // 3. 수정된 내용
    // 4. 질문글 ID

    return new ResponseEntity(HttpStatus.OK);
}





}
