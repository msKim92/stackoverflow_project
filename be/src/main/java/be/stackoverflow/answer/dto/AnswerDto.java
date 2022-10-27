package be.stackoverflow.answer.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class AnswerDto {

    @Getter
    @Builder
    public static class Post {

        private Long answerId;

        public void setAnswerId(Long answerId) {
            this.answerId = answerId;
        }

        @NotBlank(message = "내용을 기입하기 바랍니다.")
        private String answerBody;

    }

    @Getter
    @Builder
    public static class Patch {

        private Long answerId;

        public void setAnswerId(Long answerId) {
            this.answerId = answerId;
        }

        @NotBlank(message = "내용을 기입하기 바랍니다.")
        private String answerBody;

    }

    @Getter
    @Setter
    public static class Response {

        private Long answerId;
        private String answerBody;
        private int answerVote;

    }
}
