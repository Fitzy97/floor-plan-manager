package com.fitzgerald.floorplanmanager.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class FloorPlan {

    @Id
    @Column
    private long id;

    @Column
    private long userId;

    @Column
    private long width;

    @Column
    private long height;
}
