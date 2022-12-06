package com.fitzgerald.floorplanmanager.service;

import com.fitzgerald.floorplanmanager.entity.Users;
import com.fitzgerald.floorplanmanager.repository.UsersRepository;
import org.apache.catalina.User;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class UsersService {

    private UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public Users saveUser(Users users) {
        users.setId(new Random().nextInt());
        return usersRepository.save(users);
    }

    public Long validateUser(String username, String password) throws Exception {
        return usersRepository.findOne(Example.of(
                new Users().setUserName(username).setPassword(password)))
                .map(Users::getId)
                .orElseThrow(() -> new Exception("User does not exist"));
    }
}
