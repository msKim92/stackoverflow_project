package be.stackoverflow.user.service;

import be.stackoverflow.user.entity.User;
import be.stackoverflow.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    public User createUser(User user) {
        log.info("user = {}",user.getEmail());
        verifyExistsEmail(user.getEmail());

        User savedUser = userRepository.save(user);
        log.info("savedUser = {}",savedUser.getName());
        return savedUser;
    }

    public User findUser(Long userId) {
        return findVerifiedUser(userId);
    }

    public List<User> findUserAll() {
        List<User> userAll = userRepository.findAll();
        return userAll;
    }

    // ACCESS와 MEMBERSTATUS는 설정하고, 바꾸는 권한은 뒤에 admin 완성시 구성 예정 / 상태 : undo
    public User updateUser(Long userId, User user) {
        User chosenUser = this.findUser(userId);

        Optional.ofNullable(user.getName()).ifPresent(name -> chosenUser.setName(name));
        Optional.ofNullable(user.getEmail()).ifPresent(email -> chosenUser.setEmail(email));
        Optional.ofNullable(user.getPassword()).ifPresent(password -> chosenUser.setPassword(password));

        return userRepository.save(chosenUser);
    }

    public void deleteUser(Long memberId) {
        User chosenUser = findVerifiedUser(memberId);

        userRepository.delete(chosenUser);
    }

    public User findVerifiedUser(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User findUser = optionalUser.orElseThrow(() -> new RuntimeException("회원을 조회할 수 없습니다"));
        return findUser;
    }
    public void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            throw new RuntimeException("회원이 이미 있습니다.");
        }
    }



}
