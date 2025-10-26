package com.khusan.repo;

import com.khusan.entity.DailyCalories;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

public interface DailyCaloriesRepository extends JpaRepository<DailyCalories, Integer> {

    Optional<DailyCalories> findByUser_UserIdAndRecordDate(Integer userId, LocalDate recordDate);

    List<DailyCalories> findAllByUser_UserId(Integer userId);


}
