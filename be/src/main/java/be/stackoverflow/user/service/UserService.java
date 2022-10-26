package be.stackoverflow.user.service;

import be.stackoverflow.exception.BusinessLogicException;
import be.stackoverflow.exception.ExceptionCode;
import be.stackoverflow.user.entity.User;
import be.stackoverflow.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    public User createUser(User user) {
        verifyExistsUserName(user.getUserName());
        verifyExistsEmail(user.getUserEmail());

        user.setUserStatus(true);

        user.setRole(User.Role.USER);

        User savedUser = userRepository.save(user);
        return savedUser;
    }

    public User findUser(Long userId) {
        return findVerifiedUser(userId);
    }

    public Page<User> findUserAll(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size,
                Sort.by("userId").descending()));
    }

    // ACCESS와 MEMBERSTATUS는 설정하고, 바꾸는 권한은 뒤에 admin 완성시 구성 예정 / 상태 : undo
    public User updateUser(Long userId, User user) {
        User chosenUser = this.findUser(userId);

        Optional.ofNullable(user.getUserEmail()).ifPresent(email -> chosenUser.setUserEmail(email));
        Optional.ofNullable(user.getPassword()).ifPresent(password -> chosenUser.setPassword(password));

        return userRepository.save(chosenUser);
    }

    public void deleteUser(Long memberId) {
        User chosenUser = findVerifiedUser(memberId);

        userRepository.delete(chosenUser);
    }

    public User findVerifiedUser(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;
    }
    public void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByUserEmail(email);
        if (user.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.USER_EMAIL_ALREADY_EXISTS);
        }
    }
    public void verifyExistsUserName(String userName) {
        Optional<User> user = userRepository.findByUserName(userName);
        if (user.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.USER_NAME_ALREADY_EXISTS);
        }
    }
}
