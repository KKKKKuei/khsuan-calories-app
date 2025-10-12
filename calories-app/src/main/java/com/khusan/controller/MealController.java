package com.khusan.controller;

import com.khusan.dto.MealRequest;
import com.khusan.entity.Meal;
import com.khusan.entity.MealItems;
import com.khusan.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/meals")
public class MealController {

    @Autowired
    MealService mealService;


    @PostMapping("/editMeal")
    public Meal editMeal(@RequestBody MealRequest request) {
        List<MealItems> items = request.getItems().stream().map(itemReq -> {
            MealItems item = new MealItems();
            item.setFoodId(itemReq.getFoodId());
            item.setQuantity(itemReq.getQuantity());
            return item;
        }).collect(Collectors.toList());

        return mealService.editMeal(request.getUserId(), request.getMealType(), request.getConsumedAt(), items);
    }

    @PostMapping("/getMealsByUser")
    public ResponseEntity<?> getMealsByUser(@RequestBody Integer userId) {
//        return mealService.getMealsByUser(userId);
        List<Meal> meals = mealService.getMealsByUser(userId);

        List<Map<String, Object>> response = meals.stream().map(meal -> {
            Map<String, Object> mealMap = new HashMap<>();
            mealMap.put("mealId", meal.getMealId());
            mealMap.put("mealType", meal.getMealType());
            mealMap.put("consumedAt", meal.getConsumedAt());

            // meal items
            List<Map<String, Object>> itemsWithFood = meal.getItems().stream().map(item -> {
                Map<String, Object> itemMap = new HashMap<>();
                itemMap.put("mealItemId", item.getMealItemId());
                itemMap.put("quantity", item.getQuantity());
                itemMap.put("foodId", item.getFoodId());
                itemMap.put("foods", item.getFoods());
                return itemMap;
            }).collect(Collectors.toList());

            mealMap.put("items", itemsWithFood);

            return mealMap;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
}
