package com.khusan.controller;

import com.khusan.entity.UserFavorite;
import com.khusan.service.UserFavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
public class UserFavoriteController {

    @Autowired
    UserFavoriteService userFavoriteService;

    @PostMapping("/getFavorite")
    public List<UserFavorite> getFavorite(@RequestBody Integer userId) {
        return userFavoriteService.getFavoritesByUserId(userId);
    }

    @PostMapping("/toggle")
    public Map<String, String> toggleFavorite(@RequestBody Map<String, Integer> request) {
        Integer userId = request.get("userId");
        Integer foodId = request.get("foodId");
        String result = userFavoriteService.toggleFavorite(userId, foodId);
        return Map.of("message", result);
    }

    @DeleteMapping("/remove")
    public void removeFavorite(@RequestBody Map<String, Integer> request) {
        Integer userId = request.get("userId");
        Integer foodId = request.get("foodId");
        userFavoriteService.removeFavorite(userId, foodId);
    }
}
