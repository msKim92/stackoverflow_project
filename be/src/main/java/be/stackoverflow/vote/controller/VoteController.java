package be.stackoverflow.vote.controller;

import be.stackoverflow.exception.BusinessLogicException;
import be.stackoverflow.exception.ExceptionCode;
import be.stackoverflow.security.JwtTokenizer;
import be.stackoverflow.user.entity.User;
import be.stackoverflow.user.service.UserService;
import be.stackoverflow.vote.service.VoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/v1")
public class VoteController {
    private final VoteService voteService;
    private final UserService userService;
    private final JwtTokenizer jwtTokenizer;

    //질문 좋아요를 눌렀을때
    @PostMapping("/vote/like/question/{questionId}")
    public void plusQuestionVote(@PathVariable("questionId") Long questionId,
                                   HttpServletRequest request) {
        boolean result = false;
        String emailWithToken = jwtTokenizer.getEmailWithToken(request);
        User user = userService.findIdByEmail(emailWithToken);
        result = voteService.addQuestionVote(user, questionId);

        if (!result) {
            throw new BusinessLogicException(ExceptionCode.OVERLAP_VOTE);//중복투표시 예외 발생
        }
    }
    //질문 싫어요를 눌렀을때
    @PostMapping("/vote/dislike/question/{questionId}")
    public void postQuestionVote(@PathVariable("questionId") Long questionId,
                         HttpServletRequest request) {
        boolean result = false;
        String emailWithToken = jwtTokenizer.getEmailWithToken(request);
        User user = userService.findIdByEmail(emailWithToken);
        result = voteService.minusQuestionVote(user, questionId);

        if (!result) {
            throw new BusinessLogicException(ExceptionCode.OVERLAP_VOTE);
        }
    }
    @PostMapping("/vote/like/answer/{answerId}")
    public void plusAnswerVote(@PathVariable("answerId") Long answerId,
                                 HttpServletRequest request) {
        boolean result = false;
        String emailWithToken = jwtTokenizer.getEmailWithToken(request);
        User user = userService.findIdByEmail(emailWithToken);
        result = voteService.addAnswerVote(user, answerId);

        if (!result) {
            throw new BusinessLogicException(ExceptionCode.OVERLAP_VOTE);//중복투표시 예외 발생
        }
    }
    //싫어요를 눌렀을때
    @PostMapping("/vote/dislike/answer/{answerId}")
    public void postAnswerVote(@PathVariable("answerId") Long answerId,
                                 HttpServletRequest request) {
        boolean result = false;
        String emailWithToken = jwtTokenizer.getEmailWithToken(request);
        User user = userService.findIdByEmail(emailWithToken);
        result = voteService.minusAnswerVote(user, answerId);

        if (!result) {
            throw new BusinessLogicException(ExceptionCode.OVERLAP_VOTE);
        }
    }
}
