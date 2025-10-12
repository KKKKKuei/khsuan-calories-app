package com.khusan.controller;

import com.khusan.dto.AuthResponse;
import com.khusan.dto.LoginRequest;
import com.khusan.dto.RegisterRequest;
import com.khusan.dto.UserResponse;
import com.khusan.entity.Users;
import com.khusan.repo.UsersRepository;
import com.khusan.util.Argon2Util;
import com.khusan.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private Argon2Util argon2Util;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Email不能為空");
            }

            if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("使用者名稱不能為空");
            }

            if (request.getPassword() == null || request.getPassword().length() < 6) {
                return ResponseEntity.badRequest().body("密碼長度至少6位");
            }

            String email = request.getEmail().trim().toLowerCase();
            String username = request.getUsername().trim();

            if (userRepository.findByEmail(email).isPresent()) {
                return ResponseEntity.badRequest().body("Email已被使用");
            }

            String hashedPassword = argon2Util.hashPassword(request.getPassword());

            Users user = new Users();
            user.setEmail(username);
            user.setUsername(username);
            user.setPasswordHash(hashedPassword);
            Users savedUser = userRepository.save(user);

            // 生成 token
            String token = jwtUtil.generateToken(user.getEmail(), user.getUserId());

            UserResponse userResponse = new UserResponse(savedUser.getUserId(), savedUser.getEmail(), savedUser.getUsername());
            AuthResponse authResponse = new AuthResponse(token, userResponse);

            return ResponseEntity.ok(authResponse);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("註冊失敗: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // 輸入驗證## MySQL
            //spring.datasource.url=jdbc:mysql://localhost:3306/calories_app
            //spring.datasource.username=root
            //spring.datasource.password=root
            //
            //
            //## ollama AI
            //ollama.api.url=http://192.168.0.13:11434
            //
            //ollama.model=gemma3:1b
            //#ollama.model=deepseek-r1:8b
            //
            //## JWT ??
            //jwt.secret=mySuperSecretKeyForJWTTokenGenerationInSpringBootApplication
            //jwt.expiration=86400000
            //
            //cors.allowed-origins=http://localhost:8100,http://192.168.0.13:8100
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Email不能為空");
            }

            if (request.getPassword() == null || request.getPassword().isEmpty()) {
                return ResponseEntity.badRequest().body("密碼不能為空");
            }

            String email = request.getEmail().trim().toLowerCase();

            // 查找使用者
            Optional<Users> userOptional = userRepository.findByEmail(email);
            if (userOptional.isEmpty()) {
                // 安全考量：即使使用者不存在也執行一次雜湊計算
                argon2Util.hashPassword("dummy_password_for_timing_attack_protection");
                return ResponseEntity.badRequest().body("Email或密碼錯誤");
            }

            Users user = userOptional.get();

            // 驗證密碼
            if (!argon2Util.verifyPassword(user.getPasswordHash(), request.getPassword())) {
                return ResponseEntity.badRequest().body("Email或密碼錯誤");
            }

            // 生成 token
            String token = jwtUtil.generateToken(user.getEmail(), user.getUserId());

            // 建立回應
            UserResponse userResponse = new UserResponse(user.getUserId(), user.getEmail(), user.getUsername());
            AuthResponse authResponse = new AuthResponse(token, userResponse);

            return ResponseEntity.ok(authResponse);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("登入失敗: " + e.getMessage());
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.badRequest().body("無效的Authorization標頭");
            }

            String token = authHeader.substring(7);

            if (!jwtUtil.validateToken(token)) {
                return ResponseEntity.badRequest().body("Token無效或已過期");
            }

            String email = jwtUtil.getEmailFromToken(token);
            Long userId = jwtUtil.getUserIdFromToken(token);

            Optional<Users> userOptional = userRepository.findByEmail(email);
            if (userOptional.isPresent()) {
                Users user = userOptional.get();
                UserResponse userResponse = new UserResponse(user.getUserId(), user.getEmail(), user.getUsername());
                return ResponseEntity.ok(userResponse);
            }

            return ResponseEntity.badRequest().body("使用者不存在");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Token驗證失敗");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        try {
            return ResponseEntity.ok("登出成功");
        } catch (Exception e) {
            return ResponseEntity.ok("登出成功"); // 即使出錯也回傳成功
        }
    }

}