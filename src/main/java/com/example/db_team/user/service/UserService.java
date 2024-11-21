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

    private UserRepository userRepository;

    public void checkDuplicateId(String id) {
        if(userRepository.findByLoginId(id).isPresent()) {
            throw new RuntimeException("ID already exists!");
        }
    }

    @Transactional
    public void signUp(UserSignUpRequest userSignUpRequest) {
        User user = User.builder()
                .loginId(userSignUpRequest.userLoginId())
                .userName(userSignUpRequest.userName())
                .nickName(userSignUpRequest.userNickName())
                .phoneNumber(userSignUpRequest.userPhoneNumber())
                .password(userSignUpRequest.userPassword())
                .build();
        userRepository.save(user);
    }

    @Transactional
    public UserLoginResponse login(UserLoginRequest userLoginRequest) {
        Optional<User> result = userRepository.findByLoginId(userLoginRequest.userLoginId());
        if(result.isPresent() && result.get().getPassword().equals(userLoginRequest.userPassword())) {
            return new UserLoginResponse(result.get().getId());
        } else {
            throw new RuntimeException("Invalid login info!");
        }
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
                user.getId(),
                user.getLoginId(),
                user.getUserName(),
                user.getNickName(),
                user.getPhoneNumber()
        );
    }
}