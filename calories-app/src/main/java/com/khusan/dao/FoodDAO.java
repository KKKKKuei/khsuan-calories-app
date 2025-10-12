package com.khusan.dao;

import com.khusan.entity.Foods;
import com.khusan.repo.FoodsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodDAO {

    @Autowired
    private FoodsRepository foodsRepository;

//    public Food createFood(String name, String servingSize, Double calories, Double protein, Double fat, Double carbs) {
//        Food newFood = new Food();
//        newFood.setName(name);
//        newFood.setServingSize(servingSize);
//        newFood.setCalories(calories);
//        newFood.setProtein(protein);
//        newFood.setFat(fat);
//        newFood.setCarbs(carbs);
//        newFood.setLastUpdated(LocalDateTime.now());
//
//        return foodRepository.save(newFood);
//    }

    public List<Foods> getAllFoods() {
        return foodsRepository.findAll();
    }

    public void addNewFood(Foods foods) {
        foodsRepository.save(foods);
    }

}
