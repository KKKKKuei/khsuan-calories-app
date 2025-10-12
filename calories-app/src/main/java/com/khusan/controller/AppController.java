package com.khusan.controller;

import com.khusan.entity.Foods;
import com.khusan.model.FoodRequest;
import com.khusan.service.FoodService;
import com.khusan.service.OllamaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AppController {


    @Autowired
    OllamaService ollamaService;

    @Autowired
    FoodService foodService;

    @GetMapping("/getAllFoods")
    public List<Foods> findAll() {
        return foodService.getAllFoods();
    }

    @PostMapping("/getFoodsData")
    public Mono<Object> getFoodsData(@RequestBody String foodString) {
        return foodService.processFoodQuery(foodString)
                .map(foodsData -> {
                    return foodsData;
                });
    }

    @RequestMapping("/fortest")
    public String d() {
        return "";
    }

    @PostMapping("/getAiDataForFood")
    public Mono<Object> getAiDataForFood(@RequestBody FoodRequest data) {
        return foodService.callAiGetFoodData(data)
                .map(foodsData -> {
                    return foodsData;
                });
    }

    @PostMapping("/addNewFood")
    public void addNewFood(@RequestBody Foods foods) {
        foodService.addNewFood(foods);
    }

}
