package com.khusan.repo;

import com.khusan.entity.UserFavorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserFavoriteRepository extends JpaRepository<UserFavorite, Integer> {

    List<UserFavorite> findByUsers_UserId(Integer userId);

    Optional<UserFavorite> findByUsers_UserIdAndFoods_FoodId(Integer userId, Integer foodId);

    void deleteByUsers_UserIdAndFoods_FoodId(Integer userId, Integer foodId);
}
