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
    QUESTION_DELETE_ONLY_AUTHOR(404,"Question delete only author"),
    //Answer 부분 예외 ==============시작
    ANSWER_NOT_FOUND(404, "Answer not exists"),
    ANSWER_DELETE_ONLY_AUTHOR(404,"Answer delete only author"),
    //Answer 부분 예외 ==============끝
    //vote 부분 =========시작
    OVERLAP_VOTE(404,"You can one time vote for one post"),
    //vote부분==============끝

    // 리프레쉬 토큰 예외 ================시작
     REFRESHTOKEN_EXPIRED(404, "refresh token also got expired" ),
    // 리프레쉬 토큰 예외 ================끝
    //삭제권한, 접근권한이 없다
    NOT_AUTHORIZED(404,"You do not have the right to delete a post" );
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
