package com.trab._bi.inventory.service;

import com.trab._bi.inventory.domain.User;
import com.trab._bi.inventory.domain.UserDetailsImpl;
import com.trab._bi.inventory.domain.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

@Service
public class SearchUserService {
    private final UserRepository userRepository;

    public SearchUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserDetailsImpl findUserDetailsByEmail(String email) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new BadCredentialsException("");
        }

        return new UserDetailsImpl(user);
    }
}
