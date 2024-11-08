package com.example.db_team.controller.user;

import com.example.db_team.controller.ListWrapper;
import com.example.db_team.controller.user.dto.UserIdResponse;
import com.example.db_team.controller.user.dto.UserInfoResponse;
import com.example.db_team.controller.user.dto.UserRegisterRequest;
import com.example.db_team.controller.user.dto.UserUpdateRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController implements UserControllerDocs {

    @PostMapping
    public UserIdResponse registerUser(@RequestBody UserRegisterRequest request) {
        return null;
    }

    @GetMapping
    public ListWrapper<UserInfoResponse> getUserList() {
        return null;
    }

    @GetMapping("/{accountId}")
    public UserInfoResponse getUserInfo(@PathVariable Long userId) {
        return null;
    }

    @PutMapping("/{accountId}")
    public UserInfoResponse updateUserInfo(@PathVariable Long accountId,
                                                 @RequestBody UserUpdateRequest request) {
        return null;
    }
}
