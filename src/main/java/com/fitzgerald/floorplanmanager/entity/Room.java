package com.fitzgerald.floorplanmanager.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Room {

    @Id
    @Column
    private long id;

    @Column
    private long floorPlanId;

    @Column
    private long width;

    @Column
    private long height;

    @Column
    private boolean top;

    @Column
    private boolean right;

    @Column
    private boolean bottom;

    @Column
    private boolean left;
}
