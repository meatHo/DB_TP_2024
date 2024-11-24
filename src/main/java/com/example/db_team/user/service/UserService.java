package com.example.db_team.user.service;

import com.example.db_team.user.domain.User;
import com.example.db_team.user.domain.UserRepository;
import com.example.db_team.user.dto.UserInfoResponse;
import com.example.db_team.user.dto.UserLoginRequest;
import com.example.db_team.user.dto.UserLoginResponse;
import com.example.db_team.user.dto.UserSignUpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public boolean checkDuplicateId(String loginId) {
        return userRepository.existsByLoginId(loginId);
    }

    @Transactional
    public void signUp(UserSignUpRequest userSignUpRequest) {

        if(userRepository.findByLoginId(userSignUpRequest.loginId()).isPresent()) {
            throw new RuntimeException("ID already exists!");
        }

        User user = User.builder()
                .loginId(userSignUpRequest.loginId())
                .userName(userSignUpRequest.userName())
                .email(userSignUpRequest.email())
                .phoneNumber(userSignUpRequest.phoneNumber())
                .password(userSignUpRequest.password())
                .build();
        userRepository.save(user);
    }

    @Transactional
    public UserLoginResponse login(UserLoginRequest userLoginRequest) {

        return userRepository.findByLoginId(userLoginRequest.loginId())
                .filter(user -> user.getPassword().equals(userLoginRequest.password()))
                .map(user -> new UserLoginResponse(user.getUserId()))
                .orElseThrow(() -> new RuntimeException("로그인 실패"));
    }

    public UserInfoResponse getUserInfo(Long userId) {
        Optional<User> result = userRepository.findById(userId);
        User user;
        if(result.isPresent()) {
            user = result.get();
        } else {
            throw new RuntimeException("User not found!");
        }

        return new UserInfoResponse(
                user.getLoginId(),
                user.getUserName(),
                user.getEmail(),
                user.getPhoneNumber()
        );
    }
}