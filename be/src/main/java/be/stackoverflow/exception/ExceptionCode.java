package be.stackoverflow.exception;

import lombok.Getter;

public enum ExceptionCode {
    /*
    * 필요시 추가로 구현하시면 됩니다 에러이름(code, message)
     */

    //User 부분 예외 ==============시작
    USER_NOT_FOUND(404, "User not exists"),
    USER_EMAIL_ALREADY_EXISTS(400, "This useremail already exists"),
    USER_NAME_ALREADY_EXISTS(400, "This username already exists"),

    //User 부분 예외 ==============끝
    QUESTION_NOT_FOUND(404, "Question not exists"),

    //Answer 부분 예외 ==============시작
    ANSWER_NOT_FOUND(404, "Answer not exists");
    //Answer 부분 예외 ==============끝
    /* 위에다가 추가 하세요 */
    
    @Getter
    private int code;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
