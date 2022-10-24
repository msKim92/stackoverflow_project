package be.stackoverflow.user.controller;


import be.stackoverflow.user.entity.User;
//import be.stackoverflow.user.mapper.UserMapper;
import be.stackoverflow.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping
public class UserController {

    private final UserService userService;

//    private final UserMapper userMapper;

    /**
     * 파라미터에 유효성 적용 예정 : @Valid / 상태: undo
     * Dto로 갈아끼울 예정 / 상태: undo
     */
    @PostMapping
    public ResponseEntity postUser(@RequestBody User user) {

        User createdUser = userService.createUser(user);

        return new ResponseEntity<>(createdUser,HttpStatus.CREATED);
    }

    /**
     * @GetMapping url 생성후 기입 / 상태: undo
     * 이 부분은 테스트시 사용자 조회용으로 사용될 예정 / 상태: undo
     * Dto로 갈아끼울 예정 / 상태: undo
     */
    @GetMapping("/{userId}")
    public ResponseEntity getUser(@PathVariable("userId") Long userId) {
        User chosenUser = userService.findUser(userId);

        return new ResponseEntity<>(chosenUser, HttpStatus.OK);
    }

    /**
     * @GetMapping url 생성후 기입 / 상태: undo
     * Dto로 갈아끼울 예정 / 상태: undo
     */
    @GetMapping
    public ResponseEntity getUsers() {
        List<User> userAll = userService.findUserAll();
        return new ResponseEntity<>(userAll, HttpStatus.OK);
    }

    /**
     * @PatchMapping url 생성후 기입 / 상태: undo
     * Dto로 갈아끼울 예정 / 상태: undo
     */
    @PatchMapping("/{userId}")
    public ResponseEntity patchUser(@PathVariable("userId") Long userId, @RequestBody User user) {
        User updateUser = userService.updateUser(userId, user);

        return new ResponseEntity<>(updateUser, HttpStatus.UPGRADE_REQUIRED);
    }

    /**
     * @DeleteMapping url 생성후 기입 / 상태: undo
     * Dto로 갈아끼울 예정 / 상태: undo
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity deleteOne(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
