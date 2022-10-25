package be.stackoverflow.question.service;

import be.stackoverflow.question.entity.Question;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class questionService {

    private final be.stackoverflow.question.repository.questionRepository questionRepository;

    //전체조회
    public List<Question> findAllQuestion() {
        return questionRepository.findAll();
    }

    //게시글 생성
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    //게시글 찾기

    public Question findQuestion(long questionId) throws Exception {

        Question found_question = verifyQuestionUsingID(questionId);
        found_question.setQuestionViewCount(found_question.getQuestionViewCount()+1); // 조회할때마다 상승...? 인간당으로 바꿔야하나? 고민필요
        questionRepository.save(found_question);

        return found_question;
    }


    //게시글 수정
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    //propagation(번식) 동작도중에 다른 트랜잭션을 호출시 어찌할지(전파옵션), isolation 일관성없는 데이터 허용수준 설정
    //isolation.serializable
    public Question updateQuestion(Question question) throws Exception {


        Question questionFromRepository = verifyQuestionUsingID(question.getQuestionId());

        //CustomBeanUtils 써보기 <리팩토링시>
        Optional.ofNullable(question.getQuestionTitle())
                .ifPresent(new_title -> questionFromRepository.setQuestionTitle(new_title));//title
        Optional.ofNullable(question.getQuestionBody())
                .ifPresent(new_body -> questionFromRepository.setQuestionBody(new_body));//body

        log.info("tag 관련 업데이트 필요");//tag 관련 업데이트 필요
        /**
         * 유현 : Audit 기능 추가
         * 코드리뷰이후 audit 채택 되면 아래 내용 삭제 예정
         */
//        questionFromRepository.setModifiedAt(LocalDateTime.now()); //수정시간 현재로 수정

        return questionRepository.save(questionFromRepository);

    }


    //게시글 삭제
    public void deleteQuestion(long questionId) throws Exception {
        Question verifiedQuestion = verifyQuestionUsingID(questionId);//삭제하기전에 해당아이디에 데이터가 있는지 확인한다.
        questionRepository.delete(verifiedQuestion);
    }

    private Question verifyQuestionUsingID(Long questionId) throws Exception {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question question = optionalQuestion.orElseThrow(() ->
                new Exception("존재하지않은 아이디입니다. 해당 로직은 비즈니스로직 구현시 업데이트 예정입니다."));

        return question;

    }
}
