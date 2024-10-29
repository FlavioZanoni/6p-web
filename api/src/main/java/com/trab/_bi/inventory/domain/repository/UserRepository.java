package com.trab._bi.inventory.domain.repository;

import com.trab._bi.inventory.domain.User;

public interface UserRepository {
    User findByEmail(String email);

    void persist(User user);
}
