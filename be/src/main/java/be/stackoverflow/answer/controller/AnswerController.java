package be.stackoverflow.answer.controller;

import be.stackoverflow.answer.dto.AnswerDto;
import be.stackoverflow.answer.entity.Answer;
import be.stackoverflow.answer.mapper.AnswerMapper;
import be.stackoverflow.answer.service.AnswerService;
import be.stackoverflow.dto.MultiResponseDto;
import be.stackoverflow.dto.SingleResponseDto;
import be.stackoverflow.question.entity.Question;
import be.stackoverflow.question.service.questionService;
import be.stackoverflow.security.JwtTokenizer;
import be.stackoverflow.user.entity.User;
import be.stackoverflow.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
    private final questionService questionService;
    private final UserService userService;
    private final JwtTokenizer jwtTokenizer;
    private final AnswerMapper answerMapper;


    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerDto.Post postData, HttpServletRequest request) {

        String emailWithToken = jwtTokenizer.getEmailWithToken(request);
        User user = userService.findIdByEmail(emailWithToken);

        Answer answer = answerMapper.answerPostToAnswer(postData);

        Question question = questionService.findQuestion(postData.getQuestionId());

        Answer savedAnswer = answerService.createAnswer(answer,user,question);

        return new ResponseEntity(
                new SingleResponseDto<>(answerMapper.answerToAnswerResponse(savedAnswer)),HttpStatus.OK);
    }

    /*
     answer 단건조회 (프론트 요청사항)
     */
    @GetMapping("/{answer-Id}")
    public ResponseEntity getAnswer(@PathVariable("answer-Id") @Positive long answerId) {
        Answer answer = answerService.findAnswer(answerId);

        return new ResponseEntity(
                new SingleResponseDto<>(answerMapper.answerToAnswerResponse(answer)), HttpStatus.OK
        );

    }



    @GetMapping
    public ResponseEntity getAnswers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {

        Page<Answer> pageInformation = answerService.findAllAnswer(page - 1, size);
        List<Answer> allAnswers = pageInformation.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(answerMapper.answersToAnswerReponses(allAnswers), pageInformation), HttpStatus.OK);
    }

    @PatchMapping("/{answer-Id}")
    public ResponseEntity patchAnswer(@Valid @RequestBody AnswerDto.Patch patchData,@PathVariable("answer-Id") @Positive long answerId,
                                      HttpServletRequest request
                                      ) throws Exception{

        String emailWithToken = jwtTokenizer.getEmailWithToken(request);
        User user = userService.findIdByEmail(emailWithToken);

        Answer answer = answerService.updateAnswer(answerId, answerMapper.answerPatchToAnswer(patchData),user);
            log.info("answerId={}",answerId);
            log.info("username = {}",user.getUserName());

        return new ResponseEntity(
                new SingleResponseDto<>(answerMapper.answerToAnswerResponse(answer)),HttpStatus.OK);
    }
    @DeleteMapping("/{answerId}")
    public ResponseEntity deleteAnswer(@PathVariable("answerId") @Positive long answerId,HttpServletRequest request) {
        String emailWithToken = jwtTokenizer.getEmailWithToken(request);
        User user = userService.findIdByEmail(emailWithToken);

        answerService.deleteAnswer(answerId,user);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity deleteAnswers() {

        answerService.deleteAllAnswer();

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    /**
     *
     * @param answerId Question에 Answer 마다 있는 Like 버튼 클릭시 Answer 식별을 위한 값
     * @param isLike like 버튼에서 위를 가리키는 화살표 클릭시 true 아래를 가리키는 화살표 클릭시 false
     */
    @PostMapping("/{answerId}")
    public void postVote(@Valid @PathVariable("answerId")@Positive long answerId,
                              @RequestParam("isLike") boolean isLike) {
        answerService.votePlusMinus(answerId, isLike);
    }
}
