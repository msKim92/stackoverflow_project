package be.stackoverflow.user.controller;


import be.stackoverflow.dto.MultiResponseDto;
import be.stackoverflow.dto.SingleResponseDto;
import be.stackoverflow.security.JwtTokenizer;
import be.stackoverflow.user.dto.UserDto;
import be.stackoverflow.user.entity.User;
//import be.stackoverflow.user.mapper.UserMapper;
import be.stackoverflow.user.mapper.UserMapper;
import be.stackoverflow.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1")
@Validated
public class UserController {

    private final UserService userService;
    private final JwtTokenizer jwtTokenizer;
    private final UserMapper userMapper;

    @PostMapping("/sign")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post request) {

        User user = userMapper.userPostToUser(request);

        User createdUser = userService.createUser(user);

        return new ResponseEntity<>(
                new SingleResponseDto<>(userMapper.userToUserResponse(createdUser)),HttpStatus.CREATED);
    }


    /**
     * 이 부분은 테스트시 사용자 조회용으로 사용될 예정 / 상태: undo
     * header에서 알아온다음에 추가하면될꺼같다?
     */
    @RequestMapping(value = "/userFinder", method = GET)
    @ResponseBody
    public void userNameFinder(HttpServletRequest request, HttpServletResponse response) throws IOException {
        User authorizedUser = userService.findIdByEmail(jwtTokenizer.getEmailWithToken(request));
        String userName = authorizedUser.getUserName();
        response.sendRedirect("/v1/"+ userName);

    }

    @GetMapping("/{userName}")
    public ResponseEntity getUserByUserName(@PathVariable("userName") String userName) {

        User chosenUser = userService.findUserByUserName(userName);

        return new ResponseEntity<>(
                new SingleResponseDto<>(userMapper.userToUserResponse(chosenUser)), HttpStatus.OK);
    }




    /**
     * 이 부분은 사용자 전체 조회 및 페이지네이션 용도로 사용될 예정 / 상태: undo
     */
    @GetMapping
    public ResponseEntity getUsers(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size) {
        Page<User> pageInformation = userService.findUserAll(page - 1, size);
        List<User> userAll = pageInformation.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(userMapper.usersToUserReponses(userAll),pageInformation), HttpStatus.OK);
    }

    /**
     * 안쓰게 될 확률이 큰 uri
     */
    @PatchMapping("/{userId}")
    public ResponseEntity patchUser(@PathVariable("userId") Long userId, @RequestBody UserDto.Patch request) {

        User user = userService.updateUser(userId,userMapper.userPatchToUser(request));

        return new ResponseEntity<>(
                new SingleResponseDto<>(userMapper.userToUserResponse(user)), HttpStatus.UPGRADE_REQUIRED);
    }

    /**
     * 안쓰게 될 확률이 큰 uri
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity deleteOne(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 로그아웃기능도 구현 필요
     */
}
