package com.example.db_team.controller;

import com.example.db_team.user.UserControllerDocs;
import com.example.db_team.user.dto.UserInfoResponse;
import com.example.db_team.user.dto.UserLoginRequest;
import com.example.db_team.user.dto.UserLoginResponse;
import com.example.db_team.user.dto.UserSignUpRequest;
import com.example.db_team.user.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class UserController implements UserControllerDocs {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody UserSignUpRequest userSignUpRequest) {
        try {
            userService.signUp(userSignUpRequest);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("User successfully registered");
        } catch (ConstraintViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("User already exists");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during registration");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLoginRequest userLoginRequest, HttpSession session) {
        try {
            UserLoginResponse response =  userService.login(userLoginRequest);
            session.setAttribute("userId", response.userId());
            return ResponseEntity.status(HttpStatus.OK)
                    .body("로그인 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("로그인 실패");
        }
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }

    @GetMapping("/user_info")
    public UserInfoResponse getUserInfo(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if(userId == null) {
            throw new RuntimeException("User not logged in!");
        }
        return userService.getUserInfo(userId);
    }
}
