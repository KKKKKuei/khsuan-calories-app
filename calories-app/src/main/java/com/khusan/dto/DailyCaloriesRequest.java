package com.khusan.dto;

import lombok.Data;

import java.time.LocalDate;

/**
 * 用於接收前端傳入的每日熱量紀錄請求
 */
@Data
public class DailyCaloriesRequest {

    private Integer userId;        // 使用者 ID（對應 Users.userId）
    private LocalDate recordDate;  // 紀錄日期（如 2025-10-19）

    // 📊 當天身體狀況
    private Double weight;         // 體重 (kg)
    private Double height;         // 身高 (cm)
    private String activityLevel;  // 活動量 (sedentary, active, 等)
    private Double tdee;           // 當日總消耗熱量

    // 🔥 熱量統計
    private Double calorieIntake;  // 攝取熱量
    private Double calorieBurned;  // 運動消耗

    // 📅 是否為更新 (可選)
    private Integer id;            // 若有傳入 id，代表是編輯現有紀錄
}
