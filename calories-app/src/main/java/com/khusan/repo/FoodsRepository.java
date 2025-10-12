package com.khusan.repo;

import com.khusan.entity.Foods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface FoodsRepository extends JpaRepository<Foods, Integer>, JpaSpecificationExecutor<Foods> {

}