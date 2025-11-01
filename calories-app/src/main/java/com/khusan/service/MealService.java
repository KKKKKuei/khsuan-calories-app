package com.khusan.service;

import com.khusan.entity.Meal;
import com.khusan.entity.MealItems;
import com.khusan.repo.FoodsRepository;
import com.khusan.repo.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MealService {

    @Autowired
    MealRepository mealRepository;
    @Autowired
    FoodsRepository foodsRepository;

    @Transactional
    public Meal editMeal(Integer userId, String mealType, LocalDate consumedAt, List<MealItems> items) {
        // 先查是否已存在
        Optional<Meal> existingMealOpt = mealRepository.findByUserIdAndMealTypeAndConsumedAt(userId, mealType, consumedAt);

        Meal meal;
        if (existingMealOpt.isPresent()) {
            // 已存在 -> 更新
            meal = existingMealOpt.get();

            // 先清空舊的 items (避免殘留)
            meal.getItems().clear();

            // 加入新的 items
            for (MealItems item : items) {
                item.setMeal(meal);
                meal.getItems().add(item);
            }
        } else {
            // 不存在 -> 新增
            meal = new Meal();
            meal.setUserId(userId);
            meal.setMealType(mealType);
            meal.setConsumedAt(consumedAt);

            for (MealItems item : items) {
                item.setMeal(meal);
                meal.getItems().add(item);
            }
        }

        return mealRepository.save(meal); //[]
    }

    @Transactional(readOnly = true)
    public List<Meal> getMealsByUser(Integer userId) {
        List<Meal> meals = mealRepository.findByUserId(userId);
        // 這行會強制把 items 撈出來，避免 Lazy 問題
        meals.forEach(meal -> meal.getItems().size());
        return meals;
    }

}
