package be.stackoverflow.security.dto;
import lombok.Getter;

/**
 * 데이터 입력시 filter에서 알아볼수 있게 역직렬화 (stream of byte -> object)
 */

@Getter
public class LoginDto {
    private String userEmail;
    private String password;

}