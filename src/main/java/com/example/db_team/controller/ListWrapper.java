package com.example.db_team.controller;

import java.util.List;

public record ListWrapper<T>(
        List<T> result
) {
}