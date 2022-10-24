package be.stackoverflow.question.controller;

import be.stackoverflow.question.dto.questionDto;
import be.stackoverflow.question.entity.Question;
import be.stackoverflow.question.mapper.questionMapper;
import be.stackoverflow.question.service.questionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RequiredArgsConstructor
@RestController
//@Validated 업데이트 예정
@Slf4j
@RequestMapping("/v1/questions")
public class questionController {

    //DI 주입
    private final questionService questionService;
    private final questionMapper mapper;

    //ReadAll (싹다 조회)
    @GetMapping
    public ResponseEntity getAllQuestions() {

        List<Question> FoundQuestions = questionService.findAllQuestion(); //페이지네이션 추가예정

        return new ResponseEntity<>(FoundQuestions, HttpStatus.CREATED);
    }




    //create (게시글 생성)
    @PostMapping("/createQuestion")
    public ResponseEntity postQuestion(@Validated @RequestBody questionDto.questionPost postdata) {
        log.info("postdata ={}", postdata);
        Question question = mapper.questionPostToQuestion(postdata);
        Question savedQuestion = questionService.createQuestion(question);

        return new ResponseEntity<>(mapper.questionToFrontResponse(savedQuestion), HttpStatus.CREATED);
    }


    //Read (조회)
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id")@Positive long questionId) throws Exception {

        Question FoundQuestion = questionService.findQuestion(questionId);

        return new ResponseEntity<>(mapper.questionToDeatilResponse(FoundQuestion), HttpStatus.CREATED);
    }



    //UPDATE (수정)
    @PatchMapping("/{question-id}")
    public ResponseEntity postQuestion(@PathVariable("question-id")@Positive long questionId,
                                        @Validated @RequestBody questionDto.questionPatch patchData) throws Exception {
        patchData.setQuestionId(questionId);
        Question ModifiedQuestion = questionService.updateQuestion(mapper.questionPatchToQuestion(patchData));

        return new ResponseEntity<>(mapper.questionToDeatilResponse(ModifiedQuestion), HttpStatus.CREATED);
    }


    //Delete(삭제)
    @DeleteMapping("/{question-id}")
    public ResponseEntity postQuestion(@PathVariable("question-id")@Positive long questionId) {
        // 비즈니스 예외 로직 추가시, 수정예정
        // Stauts를 false로 바꾸고 자료는 남길지?
        try {
            questionService.deleteQuestion(questionId); 
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
