package be.stackoverflow.answer.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerGetResponseDTO {

    private Long answerId;
    private Long questionId;
    private String answerBody;
    private int answerVote;
}
