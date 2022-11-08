package be.stackoverflow.vote.service;

import be.stackoverflow.answer.entity.Answer;
import be.stackoverflow.answer.repository.AnswerRepository;
import be.stackoverflow.question.entity.Question;
import be.stackoverflow.question.repository.questionRepository;
import be.stackoverflow.user.entity.User;
import be.stackoverflow.vote.entity.Vote;
import be.stackoverflow.vote.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@RequiredArgsConstructor
@Service
public class VoteService {
    private final VoteRepository voteRepository;
    private final questionRepository questionRepository;

    private final AnswerRepository answerRepository;

    public boolean addQuestionVote(User user, Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow();

        //중복 좋아요 방지
        if (isNotAlreadyQuestionVote(user, question)) {
            Vote vote=voteRepository.save(new Vote(user, question));
            Set<Vote> votes =question.getVotes();
            votes.add(vote);
            int voteCount= question.getVoteCount();
            voteCount++;
            question.setVotes(votes);
            question.setVoteCount(voteCount);
            questionRepository.save(question);
            return true;
        }
        return false;
    }
    public boolean minusQuestionVote(User user, Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow();

        //중복 좋아요 방지
        if (isNotAlreadyQuestionVote(user, question)) {
            Vote vote=voteRepository.save(new Vote(user, question));
            Set<Vote> votes =question.getVotes();
            votes.add(vote);
            int voteCount= question.getVoteCount();
            if (voteCount > 0) {
                voteCount--;
            }
            question.setVotes(votes);
            question.setVoteCount(voteCount);
            questionRepository.save(question);
            return true;
        }
        return false;
    }
    public boolean addAnswerVote(User user, Long answerId) {
        Answer answer = answerRepository.findById(answerId).orElseThrow();

        //중복 좋아요 방지
        if (isNotAlreadyAnswerVote(user, answer)) {
            Vote vote=voteRepository.save(new Vote(user, answer));
            Set<Vote> votes =answer.getVotes();
            votes.add(vote);
            int voteCount= answer.getVoteCount();
            voteCount++;
            answer.setVotes(votes);
            answer.setVoteCount(voteCount);
            answerRepository.save(answer);
            return true;
        }
        return false;
    }
    public boolean minusAnswerVote(User user, Long answerId) {
        Answer answer = answerRepository.findById(answerId).orElseThrow();

        //중복 좋아요 방지
        if (isNotAlreadyAnswerVote(user, answer)) {
            Vote vote=voteRepository.save(new Vote(user, answer));
            Set<Vote> votes =answer.getVotes();
            votes.add(vote);
            int voteCount= answer.getVoteCount();
            if (voteCount > 0) {
                voteCount--;
            }
            answer.setVotes(votes);
            answer.setVoteCount(voteCount);
            answerRepository.save(answer);
            return true;
        }
        return false;
    }
    private boolean isNotAlreadyQuestionVote(User user, Question question) {
        return voteRepository.findByUserAndQuestion(user, question).isEmpty(); // user와, question으로 검색되는 vote가 없다면 true
    }
    private boolean isNotAlreadyAnswerVote(User user, Answer answer) {
        return voteRepository.findByUserAndAnswer(user, answer).isEmpty(); // user와, question으로 검색되는 vote가 없다면 true
    }

}
