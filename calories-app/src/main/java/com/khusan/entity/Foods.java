package com.khusan.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@SuperBuilder
@NoArgsConstructor
@Table(name = "foods")
public class Foods {

    @Id
    @Column(name = "food_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer foodId;

    @Column(name = "name")
    private String name;

    @Column(name = "serving_size")
    private String servingSize;

    @Column(name = "calories")
    private BigDecimal calories;

    @Column(name = "protein")
    private BigDecimal protein;

    @Column(name = "total_fat")
    private BigDecimal totalFat;

    @Column(name = "saturated_fat")
    private BigDecimal saturatedFat;

    @Column(name = "carbs")
    private BigDecimal carbs;

    @Column(name = "fiber")
    private BigDecimal fiber;

    @Column(name = "sugar")
    private BigDecimal sugar;

    @Column(name = "trans_fat")
    private BigDecimal transFat;

    @Column(name = "sodium")
    private BigDecimal sodium;

    @Column(name = "data_source")
    private String dataSource;

    @Column(name = "created_by_user_id")
    private Integer createdByUserId;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @CreationTimestamp
    @Column(name = "create_at")
    private LocalDateTime createAt;

}
