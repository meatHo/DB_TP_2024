package com.example.db_team.controller.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController implements UserControllerDocs {

    @GetMapping("/")
    public String HelloWorld() {
        return "User!";
    }
}
