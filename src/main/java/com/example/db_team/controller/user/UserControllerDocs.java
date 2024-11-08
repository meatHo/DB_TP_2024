package com.example.db_team.controller.user;

import com.example.db_team.controller.user.dto.UserIdResponse;
import com.example.db_team.controller.user.dto.UserRegisterRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "User", description = "사용자 관리 API")
public interface UserControllerDocs {
    @Operation(summary = "신규 사용자 등록", description = "신규 사용자를 등록한다.")
    @ApiResponse(responseCode = "200", description = "신규 사용자 등록 성공")
    @ApiResponse(responseCode = "400", description = "신규 사용자 등록 실패")
    UserIdResponse registerUser(
            @Schema(description = "시용자 등록 정보", implementation = UserRegisterRequest.class)
            UserRegisterRequest accountRegisterRequest
    );
}
