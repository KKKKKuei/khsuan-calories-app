package com.khusan.service;

import com.khusan.entity.DailyCalories;
import com.khusan.entity.Users;
import com.khusan.repo.DailyCaloriesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DailyCaloriesService {

    @Autowired
    DailyCaloriesRepository dailyCaloriesRepository;

    // 取得當日紀錄 (若不存在可返回空)
    public Optional<DailyCalories> getTodayRecord(Integer userId) {
        return dailyCaloriesRepository.findByUser_UserIdAndRecordDate(userId, LocalDate.now());
    }

    // 新增或更新當日熱量紀錄
//    public DailyCalories saveOrUpdate(DailyCalories record) {
//        if (record.getTdee() != null && record.getCalorieIntake() != null) {
//            double deficit = record.getTdee() - record.getCalorieIntake();
//            record.setCalorieDeficit(deficit);
//            record.setIsDeficit(deficit > 0);
//        }
//        return dailyCaloriesRepository.save(record);
//    }

    /**
     * 新增或更新 DailyCalories 紀錄
     *
     * @param userId         使用者 ID
     * @param recordDate     日期
     * @param weight         體重
     * @param height         身高
     * @param activityLevel  活動量 (如: sedentary, active)
     * @param tdee           每日總消耗熱量
     * @param calorieIntake  攝取熱量
     * @param calorieBurned  運動消耗熱量
     * @return 儲存後的 DailyCalories
     */
    @Transactional
    public DailyCalories saveOrUpdateDailyCalories(Integer userId, LocalDate recordDate, Double weight, Double height, String activityLevel, Double tdee, Double calorieIntake, Double calorieBurned) {
        // 查是否已有當天紀錄
        Optional<DailyCalories> existingRecordOpt =
                dailyCaloriesRepository.findByUser_UserIdAndRecordDate(userId, recordDate);

        DailyCalories record;

        if (existingRecordOpt.isPresent()) {
            // ✅ 更新
            record = existingRecordOpt.get();
        } else {
            // 🆕 新增
            record = new DailyCalories();
            Users user = new Users();
            user.setUserId(userId);
            record.setUser(user);
            record.setRecordDate(recordDate);
        }

        // 更新可編輯欄位
        if (weight != null) record.setWeight(weight);
        if (height != null) record.setHeight(height);
        if (activityLevel != null) record.setActivityLevel(activityLevel);
        if (tdee != null) record.setTdee(tdee);
        if (calorieIntake != null) record.setCalorieIntake(calorieIntake);
        if (calorieBurned != null) record.setCalorieBurned(calorieBurned);

        // 自動計算赤字與是否達標
        double deficit = (record.getTdee() != null ? record.getTdee() : 0)
                - (record.getCalorieIntake() != null ? record.getCalorieIntake() : 0);
        record.setCalorieDeficit(deficit);
        record.setIsDeficit(deficit > 0);

        // 儲存
        return dailyCaloriesRepository.save(record);
    }

    public List<DailyCalories> getAllByUserId(Integer userId) {
        return dailyCaloriesRepository.findAllByUser_UserId(userId);
    }

    public double calculateTDEE(Users user) {
        double bmr;
        double weight = user.getWeight();
        double height = user.getHeight();
        int age = calculateAge(user.getBirthDate()); // 需要在 users 表中有 age 欄位
        String gender = user.getGender(); // 需要 gender 欄位

        if ("male".equalsIgnoreCase(gender)) {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        double activityFactor = switch (user.getActivityLevel()) {
            case "light" -> 1.375;
            case "moderate" -> 1.55;
            case "active" -> 1.725;
            case "very_active" -> 1.9;
            default -> 1.2;
        };

        return Math.round(bmr * activityFactor);
    }

    public static int calculateAge(LocalDate birthDate) {
        LocalDate today = LocalDate.now();
        Period period = Period.between(birthDate, today);
        return period.getYears(); //實歲
    }

}
