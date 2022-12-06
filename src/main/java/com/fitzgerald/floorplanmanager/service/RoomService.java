package com.fitzgerald.floorplanmanager.service;

import com.fitzgerald.floorplanmanager.repository.RoomsRepository;
import org.springframework.stereotype.Component;

@Component
public class RoomService {

    private RoomsRepository roomsRepository;

    public RoomService(RoomsRepository roomsRepository) {
        this.roomsRepository = roomsRepository;
    }
}
