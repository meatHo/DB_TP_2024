package com.example.db_team.user;

import com.example.db_team.user.dto.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;

@Tag(name = "User", description = "유저 관련 API")
public interface UserControllerDocs {

    @Operation(summary = "회원가입", description = "회원가입을 한다.")
    @ApiResponse(responseCode = "200", description = "회원가입 성공")
    @ApiResponse(responseCode = "400", description = "회원가입 실패")
    ResponseEntity<String> signUp(
            @Schema(description = "회원가입 정보", implementation = UserSignUpRequest.class)
            UserSignUpRequest userSignUpRequest
    );

    @Operation(summary = "로그인", description = "로그인을 한다.")
    @ApiResponse(responseCode = "200", description = "로그인 성공", useReturnTypeSchema = true)
    @ApiResponse(responseCode = "400", description = "로그인 실패")
    ResponseEntity<String> login(
            @Schema(description = "로그인 정보", implementation = UserLoginRequest.class)
            UserLoginRequest userLoginRequest,
            @Schema(description = "HTTP session for user login. The session will store the user ID upon successful login.")
            HttpSession session
    );

    @Operation(summary = "로그아웃", description = "로그아웃을 한다.")
    @ApiResponse(responseCode = "200", description = "로그아웃 성공")
    @ApiResponse(responseCode = "400", description = "로그아웃 실패")
    void logout(
            @Schema(description = "HTTP session for user logout. The session will be invalidated upon logout.")
            HttpSession session
    );

    @Operation(summary = "유저 정보 조회", description = "유저 정보를 조회한다.")
    @ApiResponse(responseCode = "200", description = "유저 정보 조회 성공", useReturnTypeSchema = true)
    @ApiResponse(responseCode = "400", description = "유저 정보 조회 실패")
    UserInfoResponse getUserInfo(
            @Schema(description = "HTTP session to identify the logged-in user. The session should contain the user ID.")
            HttpSession session
    );
}
