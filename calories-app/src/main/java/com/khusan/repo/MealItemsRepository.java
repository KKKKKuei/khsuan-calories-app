package com.khusan.repo;

import com.khusan.entity.MealItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface MealItemsRepository extends JpaRepository<MealItems, Integer>, JpaSpecificationExecutor<MealItems> {

}