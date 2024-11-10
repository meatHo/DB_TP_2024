package com.example.db_team.controller.home;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller

public class HomeController {
    @GetMapping("/")
    public String home() {
        return "index"; // src/main/resources/static/index.html을 제공
    }
}