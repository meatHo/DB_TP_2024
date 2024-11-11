package com.example.db_team.controller;

import com.example.db_team.controller.user.UserControllerDocs;
import com.example.db_team.controller.user.dto.UserIdResponse;
import com.example.db_team.controller.user.dto.UserInfoResponse;
import com.example.db_team.controller.user.dto.UserRegisterRequest;
import com.example.db_team.controller.user.dto.UserUpdateRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController implements UserControllerDocs {

    @PostMapping
    public UserIdResponse registerUser(@RequestBody UserRegisterRequest request) {
        return null;
    }

    @GetMapping
    public ListWrapper<UserInfoResponse> getUserList() {
        return null;
    }

    @GetMapping("/{userId}")
    public UserInfoResponse getUserInfo(@PathVariable String userId) {
        return null;
    }

    @PutMapping("/{userId}")
    public UserInfoResponse updateUserInfo(@PathVariable String userId,
                                                 @RequestBody UserUpdateRequest request) {
        return null;
    }
}
