package com.khusan.service;


import com.khusan.entity.Foods;
import com.khusan.entity.UserFavorite;
import com.khusan.entity.Users;
import com.khusan.repo.FoodsRepository;
import com.khusan.repo.UserFavoriteRepository;
import com.khusan.repo.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserFavoriteService {

    @Autowired
    UserFavoriteRepository userFavoriteRepository;
    @Autowired
    UsersRepository userRepository;
    @Autowired
    FoodsRepository foodRepository;

    public List<UserFavorite> getFavoritesByUserId(Integer userId) {
        return userFavoriteRepository.findByUsers_UserId(userId);
    }

    public String toggleFavorite(Integer userId, Integer foodId) {
        Optional<UserFavorite> existing = userFavoriteRepository.findByUsers_UserIdAndFoods_FoodId(userId, foodId);

        if (existing.isPresent()) {
            userFavoriteRepository.delete(existing.get());
            return "remove";
        } else {
            Users user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Foods food = foodRepository.findById(foodId)
                    .orElseThrow(() -> new RuntimeException("Food not found"));

            UserFavorite favorite = UserFavorite.builder()
                    .users(user)
                    .foods(food)
                    .build();

            userFavoriteRepository.save(favorite);
            return "add";
        }
    }

    public void removeFavorite(Integer userId, Integer foodId) {
        userFavoriteRepository.deleteByUsers_UserIdAndFoods_FoodId(userId, foodId);
    }
}
