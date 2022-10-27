package be.stackoverflow.answer.controller;


import be.stackoverflow.answer.dto.AnswerDto;
import be.stackoverflow.answer.entity.Answer;
import be.stackoverflow.answer.mapper.AnswerMapper;
import be.stackoverflow.answer.service.AnswerService;
import be.stackoverflow.dto.MultiResponseDto;
import be.stackoverflow.dto.SingleResponseDto;
import be.stackoverflow.question.entity.Question;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j // 로그 작성
@RestController // URL들은 모두 REST API
@RequiredArgsConstructor // 의존성 주입
@RequestMapping("/v1/answer") // API URL중 상위 부분
@Validated
public class AnswerController {
    //C ( POST ) R ( GET ) U ( PATCH ) D ( DELETE )

    private final AnswerService answerService;

    private final AnswerMapper answerMapper;

    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerDto.Post postData) {

        Answer answer = answerMapper.answerPostToAnswer(postData);

        Answer savedAnswer = answerService.createAnswer(answer);

        return new ResponseEntity(
                new SingleResponseDto<>(answerMapper.answerToAnswerResponse(savedAnswer)),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAnswers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {

        Page<Answer> pageInformation = answerService.findAllAnswer(page - 1, size);
        List<Answer> allAnswers = pageInformation.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(answerMapper.answersToAnswerReponses(allAnswers), pageInformation), HttpStatus.OK);
    }
    @PatchMapping("/{answerId}")
    public ResponseEntity patchAnswer(@PathVariable("answerId") @Positive long answerId,
                                      @Valid @RequestBody AnswerDto.Patch patchData) {

        Answer answer = answerService.updateAnswer(answerId, answerMapper.answerPatchToAnswer(patchData));

        return new ResponseEntity(
                new SingleResponseDto<>(answerMapper.answerToAnswerResponse(answer)),HttpStatus.OK);
    }
    @DeleteMapping("/{answerId}")
    public ResponseEntity deleteAnswer(@PathVariable("answerId") @Positive long answerId) {

        answerService.deleteAnswer(answerId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity deleteAnswers() {

        answerService.deleteAllAnswer();

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
