package com.example.db_team.controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class SessionController {

    @GetMapping("/check_login")
    public ResponseEntity<Void> checkLoginStatus(HttpSession session) {
        if (session.getAttribute("userId") != null) {
            return ResponseEntity.status(HttpStatus.OK).build(); // 세션에 userId가 있으면 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 로그인되지 않은 경우 401
        }
    }
}
