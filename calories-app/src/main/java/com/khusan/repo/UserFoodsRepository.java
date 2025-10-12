package com.khusan.repo;

import com.khusan.entity.UserFoods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface UserFoodsRepository extends JpaRepository<UserFoods, Long>, JpaSpecificationExecutor<UserFoods> {

}