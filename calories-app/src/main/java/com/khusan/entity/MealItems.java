package com.khusan.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@ToString
@SuperBuilder
@NoArgsConstructor
@Table(name = "meal_items")
public class MealItems {

    @Id
    @Column(name = "meal_item_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer mealItemId;

    @Column(name = "meal_id", insertable = false, updatable = false)
    private Integer mealId;

//    @ManyToOne(fetch = FetchType.LAZY)   // 多個 item 對應一個 food
//    @Column(name = "food_id", nullable = false)
//    private Integer foodId;

    @Column(name = "quantity", nullable = false)
    private String quantity;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "meal_id", nullable = false)
//    @JsonBackReference
//    private Meal meal;


    // 多個 item 對應一個 meal
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meal_id", nullable = false)
    @JsonBackReference
    private Meal meal;

    // 對應 food entity
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "food_id", nullable = false, insertable = false, updatable = false)
    private Foods foods;

    // 保留 food_id 原始值
    @Column(name = "food_id", nullable = false)
    private Integer foodId;
}
