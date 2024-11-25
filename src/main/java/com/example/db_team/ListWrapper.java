package com.example.db_team;

import java.util.List;

public record ListWrapper<T>(
        List<T> result
) {
}