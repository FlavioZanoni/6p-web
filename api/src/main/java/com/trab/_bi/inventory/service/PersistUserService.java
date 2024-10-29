package com.trab._bi.inventory.service;

import com.trab._bi.inventory.domain.User;
import com.trab._bi.inventory.domain.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class PersistUserService {
    private final UserRepository userRepository;

    public PersistUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void persist(User user) {
        userRepository.persist(user);
    }
}
