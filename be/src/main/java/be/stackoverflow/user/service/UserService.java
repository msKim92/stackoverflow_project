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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
         * 비밀번호와 권한 지정하는 함수
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

    /**
     * 민섭: 이메일을 통해 올바른 접근인지 확인
     * @param username the username identifying the user whose data is required.
     * @return
     * @throws UsernameNotFoundException
     */

    public Long findIdByEmail(String emailWithToken) {
        Optional<User> byUserEmail = userRepository.findByUserEmail(emailWithToken);
        Long userId = byUserEmail.map(user -> user.getUserId()).orElseThrow(()->new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return userId;

    }

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
