package com.khusan.repo;

import com.khusan.entity.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MealRepository extends JpaRepository<Meal, Integer>, JpaSpecificationExecutor<Meal> {

    Optional<Meal> findByUserIdAndMealTypeAndConsumedAt(Integer userId, String mealType, LocalDate consumedAt);

    List<Meal> findByUserId(Integer userId);

}