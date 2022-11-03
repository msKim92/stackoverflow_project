package be.stackoverflow.user.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;


public class UserDto {

    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank(message = "이름 입력란을 채워주세요.")
        @Pattern(regexp = "^[a-z0-9]{4,20}$", message = "아이디는 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.")
        private String userName;


        @NotBlank(message = "이메일 입력란을 채워주세요.")
        @Email(message = "이메일 형식이 올바르지 않습니다.")
        private String userEmail;

        @NotBlank(message = "비밀번호 입력란을 채워주세요.")
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String password;


    }

    @Getter
    @AllArgsConstructor
    public static class Patch {

        @Email(message = "이메일 형식이 올바르지 않습니다.")
        private String userEmail;

        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String password;
    }

    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response {
        private long userId;
        private String userName;
        private String userEmail;
        private String password;
        private boolean userStatus;
        private List<String> roles;
        private LocalDateTime created_at;
        private LocalDateTime updated_at;

        /**
         * User 개인 페이지 조회시 User가 작성한 Questions와 Answers를 보여주는 필드
         */
        private List<UserQuestionResponseDto> questions;
        private List<UserAnswerResponseDto> answers;

    }

    /**
     * Question과 User에 무한 호출을 풀기 위해서 Response 클래스를 새로 만들어야한다.
     */
    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserQuestionResponseDto {
        private Long questionId;
        private String questionTitle;
    }

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserAnswerResponseDto {
        private Long answerId;
        private String answerBody;
    }
}
