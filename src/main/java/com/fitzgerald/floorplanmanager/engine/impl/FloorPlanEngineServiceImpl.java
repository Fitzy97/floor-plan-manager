package com.fitzgerald.floorplanmanager.engine.impl;

import com.fitzgerald.floorplanmanager.engine.FloorPlanEngineService;
import org.springframework.stereotype.Service;

@Service
public class FloorPlanEngineServiceImpl implements FloorPlanEngineService {

    @Override
    public void createFloorPlan(
            String userId,
            String title,
            int width,
            int length,
            int minRoomLength,
            int maxRoomLength,
            int maxNumDoors) {

    }
}
