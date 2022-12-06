package com.fitzgerald.floorplanmanager.engine;

/**
 * Service for endpoints for calculating floor plans
 */
public interface FloorPlanEngineService {

    /**
     * Creates and persists a floor plan.
     * @param userId
     * @param title
     * @param width
     * @param length
     * @param minRoomLength
     * @param maxRoomLength
     * @param maxNumDoors
     */
    void createFloorPlan(
            String userId,
            String title,
            int width,
            int length,
            int minRoomLength,
            int maxRoomLength,
            int maxNumDoors);
}
