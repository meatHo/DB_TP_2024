package com.example.db_team.controller;

import com.example.db_team.user.UserControllerDocs;
import com.example.db_team.user.dto.UserInfoResponse;
import com.example.db_team.user.dto.UserLoginRequest;
import com.example.db_team.user.dto.UserLoginResponse;
import com.example.db_team.user.dto.UserSignUpRequest;
import com.example.db_team.user.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class UserController implements UserControllerDocs {

    private final UserService userService;

    @PostMapping("/validate")
    public ResponseEntity<String> checkDuplicateId(@RequestParam String id) {
        boolean isDuplicate = userService.checkDuplicateId(id);
        if (isDuplicate) {
            return ResponseEntity.status(400).body("ID already exists");
        }
        return ResponseEntity.ok("ID is available");
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody UserSignUpRequest userSignUpRequest) {
        userService.signUp(userSignUpRequest);
        return ResponseEntity.ok("Signup successful!");
    }

    @PostMapping("/login")
    public UserLoginResponse login(@RequestBody UserLoginRequest userLoginRequest, HttpSession session) {
        UserLoginResponse response =  userService.login(userLoginRequest);
        session.setAttribute("userId", response.userId());
        return response;
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logout success!");
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
