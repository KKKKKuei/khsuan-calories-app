package com.khusan.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "daily_calories", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "record_date"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailyCalories {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // 🔗 關聯到使用者
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    // 📅 紀錄日期
    @Column(name = "record_date", nullable = false)
    private LocalDate recordDate;

    // 📊 當天身體狀況
    private Double weight;          // 體重 (kg)
    private Double height;          // 身高 (cm)
    private String activityLevel;   // 活動量 (如: sedentary, active)
    private Double tdee;            // 當日總消耗熱量

    // 🔥 熱量統計
    private Double calorieIntake = 0.0;   // 攝取熱量
    private Double calorieBurned = 0.0;   // 運動消耗
    private Double calorieDeficit = 0.0;  // 赤字 (TDEE - 攝取)

    // 🕒 建立時間
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // 是否達到熱量赤字
    @Column(name = "is_deficit")
    private Boolean isDeficit = false;

}
