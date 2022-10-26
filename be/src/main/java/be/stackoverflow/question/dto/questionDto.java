package be.stackoverflow.question.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class questionDto {

    @Getter
    @Builder
    public static class questionPost {

        @NotBlank(message = "제목을 기입하기 바랍니다.")
        private String questionTitle;
        @NotBlank(message = "내용을 기입하기 바랍니다.")
        private String questionBody;

        private String tags; // tag CRUD 기능 완료시 구현 예정

    }

    @Getter
    @Builder
    public static class questionPatch {

        private Long questionId;

        public void setQuestionId(Long questionId) {
            this.questionId = questionId;
        }

        @NotBlank(message = "제목을 기입하기 바랍니다.")
        private String questionTitle;
        @NotBlank(message = "내용을 기입하기 바랍니다.")
        private String questionBody;

        private String tags; // tag CRUD 기능 완료시 구현 예정

    }

    @Getter
    @Builder
    public static class questionFrontResponse {


        private String questionTitle;
        private String questionBody;

        private String tags; // tag CRUD 기능 완료시 구현 예정
        private int questionViewCount;
        private Boolean questionstatus;
        private int questionVote;
        private LocalDateTime created_at;
        private LocalDateTime updated_at;
        private String create_by_user;
        private String updated_by_user;
    }

    @Getter
    @Builder
    public static class questionDetailResponse {

        private String questionTitle;
        private String questionBody;

        private String tags; // tag CRUD 기능 완료시 구현 예정
        private int questionViewCount;
        private Boolean questionStatus;
        private int questionVote;
        private LocalDateTime created_at;
        private LocalDateTime updated_at;
        private String create_by_user;
        private String updated_by_user;

    }


}
