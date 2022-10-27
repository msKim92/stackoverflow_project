package be.stackoverflow.user.service;

import be.stackoverflow.exception.BusinessLogicException;
import be.stackoverflow.exception.ExceptionCode;
import be.stackoverflow.security.utils.CustomAuthorityUtils;
import be.stackoverflow.user.entity.User;
import be.stackoverflow.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * 10-27 user role 관련 업데이트 -ms-
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    /**
     * 민섭: 권한을 주는 로직과 Password 생성기를 추가함.
     */
    private final CustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;


    public User createUser(User user) {
        verifyExistsUserName(user.getUserName());
        verifyExistsEmail(user.getUserEmail());

        user.setUserStatus(true);
        /**
         * 비밀번호와 롤 지정하는 함수
         */
        //Password 암호화
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        //DB에 User Role 저장
        List<String> roles = authorityUtils.createRolesForDatabase(user.getUserEmail());
        user.setRoles(roles);

        //user.setRole(User.Role.USER); 보안으로부터 받을예정

        User savedUser = userRepository.save(user);
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
        User findUser = optionalUser.orElseThrow(() -> new RuntimeException("회원을 조회할 수 없습니다"));
        return findUser;
    }
    public void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByUserEmail(email);
        if (user.isPresent()) {
            throw new RuntimeException("같은 이메일로 등록된 회원이 이미 있습니다.");
        }
    }
    public void verifyExistsUserName(String userName) {
        Optional<User> user = userRepository.findByUserName(userName);
        if (user.isPresent()) {
            throw new RuntimeException("같은 이름으로 등록된 회원이 이미 있습니다.");
        }
    }

    /**
     * 민섭: 이메일을 통해 올바른 접근인지 확인
     * @param username the username identifying the user whose data is required.
     * @return
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> byUserEmail = userRepository.findByUserEmail(username);
        User findUser = byUserEmail.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return new Details(findUser);
    }

    private class Details extends User implements UserDetails {
        public Details(User user) {
            setPassword(user.getPassword());
            setRoles(user.getRoles());
            setUserEmail(user.getUserEmail());
            setUserId(getUserId());

        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createRoleDependsRole(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getUserEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
