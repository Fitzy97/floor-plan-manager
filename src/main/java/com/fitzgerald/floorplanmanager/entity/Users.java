package com.fitzgerald.floorplanmanager.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Users {

    @Id
    @Column
    private long id;

    @Column
    private String userName;

    @Column
    private String password;

    public Users setUserName(String userName) {
        this.userName = userName;
        return this;
    }

    public Users setPassword(String password) {
        this.password = password;
        return this;
    }
}
