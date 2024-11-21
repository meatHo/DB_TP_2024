package com.example.db_team.controller;

import com.example.db_team.user.UserControllerDocs;
import com.example.db_team.user.dto.UserInfoResponse;
import com.example.db_team.user.dto.UserLoginRequest;
import com.example.db_team.user.dto.UserLoginResponse;
import com.example.db_team.user.dto.UserSignUpRequest;
import com.example.db_team.user.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class UserController implements UserControllerDocs {

    private final UserService userService;

    @PostMapping("/validate")
    public void checkDuplicateId(@RequestParam String id) {
        userService.checkDuplicateId(id);
    }

    @PostMapping("/signup")
    public void signUp(@RequestBody UserSignUpRequest userSignUpRequest) {
        userService.signUp(userSignUpRequest);
    }

    @PostMapping("/login")
    public UserLoginResponse login(@RequestBody UserLoginRequest userLoginRequest, HttpSession session) {
        UserLoginResponse response =  userService.login(userLoginRequest);
        session.setAttribute("userId", response.userId());
        return response;
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }

    @GetMapping("/{userId}")
    public UserInfoResponse getUserInfo(@PathVariable Long userId) {
        return userService.getUserInfo(userId);
    }
}
