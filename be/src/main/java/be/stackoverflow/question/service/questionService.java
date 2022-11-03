package be.stackoverflow.question.service;

import be.stackoverflow.exception.BusinessLogicException;
import be.stackoverflow.exception.ExceptionCode;
import be.stackoverflow.question.entity.Question;
import be.stackoverflow.user.entity.User;
import com.querydsl.core.QueryResults;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class questionService {

    private final be.stackoverflow.question.repository.questionRepository questionRepository;

    /**
     *                (디폴트값)
     *  view, like , questionId(작성순)
     *
     * @param page 페이지수
     * @param size 페이지 최대 몇개
     * @param sort sort 기준 string 값
     */
    public Page<Question> findAllQuestion(int page, int size, String sort ) {
        Sort standard;
        //
        switch (sort) {
            case "view" :
                sort = "questionViewCount";
                break;
            case "like" :
                sort = "questionVote";
                break;
            default: sort = "questionId";
                break;
        }

        return questionRepository.findAll(PageRequest.of(page, size, Sort.by(sort).descending()));
    }

    //C: 질문 추가 페이지
    public Question createQuestion(Question question, User user) {

        question.setCreate_by_user(user.getUserName());
        question.setUpdated_by_user(user.getUserName());
        question.setUser(user);


        Question savedQuestion = questionRepository.save(question);
        return savedQuestion;
    }

    //R: 질문 상세 페이지
    public Question findQuestion(long questionId){

        Question found_question = verifyQuestionUsingID(questionId);
        found_question.setQuestionViewCount(found_question.getQuestionViewCount()+1); // 조회할때마다 상승...? 인간당으로 바꿔야하나? 고민필요
        questionRepository.save(found_question);

        return found_question;
    }

    /**
     * 질문 검색 기능
     */
    public Page<Question> searchQuestion(String title, int page, int size) {
        Pageable pageable = PageRequest.of(page,size,Sort.by("questionId").ascending());
        List<Question> searchedQuestion=questionRepository.findByTitle(title);
        int start = (int)pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), searchedQuestion.size());
        return new PageImpl<>(searchedQuestion.subList(start, end),pageable, searchedQuestion.size());
    }

    //U: 질문 수정페이지
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    //propagation(번식) 동작도중에 다른 트랜잭션을 호출시 어찌할지(전파옵션), isolation 일관성없는 데이터 허용수준 설정
    public Question updateQuestion(long questionId,Question question,User user){

        Question questionFromRepository = verifyQuestionUsingID(questionId);

        questionFromRepository.setUpdated_by_user(user.getUserName());
        //수정자 구분하는 로직 필요

        //CustomBeanUtils 써보기 <리팩토링시>
        Optional.ofNullable(question.getQuestionTitle())
                .ifPresent(new_title -> questionFromRepository.setQuestionTitle(new_title));//title
        Optional.ofNullable(question.getQuestionBody())
                .ifPresent(new_body -> questionFromRepository.setQuestionBody(new_body));//body

        log.info("tag 관련 업데이트 필요");//tag 관련 업데이트 필요

        return questionRepository.save(questionFromRepository);

    }

    //D: 질문 삭제
    public void deleteQuestion(long questionId, User user){
        Question verifiedQuestion = verifyQuestionUsingID(questionId);//삭제하기전에 해당아이디에 데이터가 있는지 확인한다.
        isSameQuestionAuthor(verifiedQuestion,user);
        questionRepository.delete(verifiedQuestion);
    }

    //질문이 있는지 없는지 확인
    private Question verifyQuestionUsingID(Long questionId){
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question question = optionalQuestion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return question;
    }

    /**
     *
     * @param question 의 사용자 이메일과
     * @param user 의 이메일이 일치 하지 않으면 삭제 하지 못하게 한다
     */
    public void isSameQuestionAuthor(Question question,User user) {
        if (question.getUser().getUserEmail() != user.getUserEmail()) {
            throw new BusinessLogicException(ExceptionCode.QUESTION_DELETE_ONLY_AUTHOR);
        }
    }

    public void votePlusMinus(long questionId, boolean isLike) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question chosenQuestion = optionalQuestion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        int vote = chosenQuestion.getQuestionVote();
        if (isLike) {
            vote++;
        } else {
            if (vote > 0) {
                vote--;
            } else {
                vote=0;
            }
        }
        chosenQuestion.setQuestionVote(vote);
        questionRepository.save(chosenQuestion);
    }

}
