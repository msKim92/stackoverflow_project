package be.stackoverflow.question.dto;

import be.stackoverflow.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class questionDto {

    @Getter
    @Builder
    public static class questionPost {

        @Positive
        private long userId;

        @NotBlank(message = "제목을 기입하기 바랍니다.")
        private String questionTitle;
        @NotBlank(message = "내용을 기입하기 바랍니다.")
        private String questionBody;

        private String tags; // tag CRUD 기능 완료시 구현 예정

    }

    @Getter
    @Builder
    public static class questionPatch {
        @Positive
        private long userId;
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
    @Setter
    public static class questionFrontResponse {


        private String questionTitle;

        private String tags; // tag CRUD 기능 완료시 구현 예정
        private int questionViewCount;
        private Boolean questionstatus;
        private int questionVote;
        private LocalDateTime created_at;
        private LocalDateTime updated_at;
        // 로그인 기능 추가 후 구현 예정
        @Setter(AccessLevel.NONE)//일반 setter로 접근하지 못하게 한다.
        private String create_by_user;
        private String updated_by_user;

        public void setUser(User user) {
            if (create_by_user == null) {
                create_by_user = user.getUserName();
                updated_by_user = user.getUserName();
            } else {
                updated_by_user=user.getUserName();
            }
        }
    }

    @Getter
    @Setter
    public static class questionDetailResponse {

        private String questionTitle;
        private String questionBody;

        private String tags; // tag CRUD 기능 완료시 구현 예정
        private int questionViewCount;
        private Boolean questionStatus;
        private int questionVote;
        private LocalDateTime created_at;
        private LocalDateTime updated_at;
        // 로그인 기능 추가 후 구현 예정
        @Setter(AccessLevel.NONE)//일반 setter로 접근하지 못하게 한다.
        private String create_by_user;
        private String updated_by_user;

        public void setUser(User user) {
            if (create_by_user == null) {
                create_by_user = user.getUserName();
                updated_by_user = user.getUserName();
            } else {
                updated_by_user=user.getUserName();
            }
        }
    }


}
