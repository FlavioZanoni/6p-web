package com.trab._bi.inventory.gateway.jpa;

import com.trab._bi.inventory.domain.User;
import com.trab._bi.inventory.domain.repository.UserRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepositoryImpl extends JpaRepository<User, UUID>, UserRepository {
    @Override
    User findByEmail(String email);

    @Override
    default void persist(User user) {
        save(user);
    }
}
