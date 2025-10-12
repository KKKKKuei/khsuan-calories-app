package com.khusan.util;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Component;

@Component
public class Argon2Util {

    private final Argon2 argon2;

    public Argon2Util() {
        this.argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
    }

    /**
     * 加密密碼
     */
    public String hashPassword(String plainPassword) {
        try {
            // 參數: iterations, memory, parallelism
            return argon2.hash(3, 4096, 1, plainPassword.toCharArray());
        } finally {
            // 安全清除原密碼
            argon2.wipeArray(plainPassword.toCharArray());
        }
    }

    /**
     * 驗證密碼
     */
    public boolean verifyPassword(String hash, String plainPassword) {
        if (hash == null || plainPassword == null) {
            return false;
        }

        try {
            return argon2.verify(hash, plainPassword.toCharArray());
        } catch (Exception e) {
            return false;
        } finally {
            // 安全清除原密碼
            if (plainPassword != null) {
                argon2.wipeArray(plainPassword.toCharArray());
            }
        }
    }
}