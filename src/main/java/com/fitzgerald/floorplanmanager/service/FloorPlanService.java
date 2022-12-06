package com.fitzgerald.floorplanmanager.service;

import com.fitzgerald.floorplanmanager.repository.FloorPlansRepository;
import org.springframework.stereotype.Component;

@Component
public class FloorPlanService {

    private FloorPlansRepository floorPlansRepository;

    public FloorPlanService(FloorPlansRepository floorPlansRepository) {
        this.floorPlansRepository = floorPlansRepository;
    }
}
