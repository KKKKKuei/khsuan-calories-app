package com.khusan.controller;

import com.khusan.entity.Users;
import com.khusan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody Users updatedUser) {
        try {
            Users user = userService.updateUser(updatedUser);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("更新失敗：" + e.getMessage());
        }
    }
}
