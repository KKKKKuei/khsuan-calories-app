package com.khusan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MealRequest {
    private Integer userId;
    private Integer mealId;
    private String mealType;
    private LocalDate consumedAt;
    private List<MealItemRequest> items;
}

