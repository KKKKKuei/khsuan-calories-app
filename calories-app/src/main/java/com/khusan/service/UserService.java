package com.khusan.service;

import com.khusan.entity.Users;
import com.khusan.repo.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UsersRepository userRepository;

    public Users updateUser(Users updatedUser) {
        Users existingUser = userRepository.findById(updatedUser.getUserId())
                .orElseThrow(() -> new RuntimeException("使用者不存在，ID：" + updatedUser.getUserId()));

        if (updatedUser.getUsername() != null)
            existingUser.setUsername(updatedUser.getUsername());

        if (updatedUser.getHeight() != null)
            existingUser.setHeight(updatedUser.getHeight());

        if (updatedUser.getWeight() != null)
            existingUser.setWeight(updatedUser.getWeight());

        if (updatedUser.getActivityLevel() != null)
            existingUser.setActivityLevel(updatedUser.getActivityLevel());

//        if (updatedUser.getGender() != null)
//            existingUser.setGender(updatedUser.getGender());

        if (updatedUser.getBirthDate() != null)
            existingUser.setBirthDate(updatedUser.getBirthDate());

        return userRepository.save(existingUser); // save = 更新 or 新增
    }
}
