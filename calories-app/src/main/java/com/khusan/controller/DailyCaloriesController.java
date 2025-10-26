package com.khusan.controller;

import com.khusan.dto.DailyCaloriesRequest;
import com.khusan.entity.DailyCalories;
import com.khusan.entity.Users;
import com.khusan.repo.DailyCaloriesRepository;
import com.khusan.service.DailyCaloriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/daily-calories")
public class DailyCaloriesController {

    @Autowired
    DailyCaloriesService dailyCaloriesService;
    @Autowired
    DailyCaloriesRepository dailyCaloriesRepository;

//    @PostMapping("/getToday")
//    public Optional<DailyCalories> getToday(@RequestBody Integer userId) {
//        return dailyCaloriesService.getTodayRecord(userId);
//    }

//    @PostMapping
//    public DailyCalories saveRecord(@RequestBody DailyCalories record) {
//        return dailyCaloriesService.saveOrUpdate(record);
//    }

    @PostMapping("/save")
    public ResponseEntity<?> saveDailyCalories(@RequestBody DailyCaloriesRequest req) {
        DailyCalories record = dailyCaloriesService.saveOrUpdateDailyCalories(
                req.getUserId(),
                req.getRecordDate(),
                req.getWeight(),
                req.getHeight(),
                req.getActivityLevel(),
                req.getTdee(),
                req.getCalorieIntake(),
                req.getCalorieBurned()
        );
        return ResponseEntity.ok(record);
    }

    @PostMapping("/getAllCaloriesByUser")
    public List<DailyCalories> getAllCaloriesByUser(@RequestBody Integer userId) {
        return dailyCaloriesService.getAllByUserId(userId);
    }

    @PostMapping("/calculateTDEE")
    public Double calculateTDEE(@RequestBody Users users) {
        return dailyCaloriesService.calculateTDEE(users);
    }


}
