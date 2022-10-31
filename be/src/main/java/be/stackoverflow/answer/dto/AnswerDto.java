package be.stackoverflow.answer.dto;


import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class AnswerDto {

    @Getter
    @Builder
    public static class Post {

        @Positive
        private Long questionId;

        @NotBlank(message = "내용을 기입하기 바랍니다.")
        private String answerBody;

    }

    @Getter
    @Builder
    public static class Patch {

        private Long questionId;

        @NotBlank(message = "내용을 기입하기 바랍니다.")
        private String answerBody;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {

        private Long answerId;
        private String answerBody;
        private int answerVote;
        //댓글 작성자 확인
        private LocalDateTime created_at;
        private LocalDateTime updated_at;
        private String create_by_user;
        private String updated_by_user;
        //answerPageInfo의 size는 MultiResponseDto 로 출력시 pageInfo를 통해 파악가능
    }
}
