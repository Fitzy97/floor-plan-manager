package com.fitzgerald.floorplanmanager.request;

import com.fitzgerald.floorplanmanager.controller.FloorPlanManagerController;

/**
 * POJO representing the client request to create a floor plan.
 * To be used in {@link FloorPlanManagerController#createFloorPlan}
 */
public class CreateFloorPlanRequest {
    private String userId;
    private String title;
    private int width;
    private int length;
    private int minRoomLength;
    private int maxRoomLength;
    private int maxNumDoors;

    public CreateFloorPlanRequest() {}

    public String getUserId() {
        return userId;
    }

    public String getTitle() {
        return title;
    }

    public int getWidth() {
        return width;
    }

    public int getLength() {
        return length;
    }

    public int getMinRoomLength() {
        return minRoomLength;
    }

    public int getMaxRoomLength() {
        return maxRoomLength;
    }

    public int getMaxNumDoors() {
        return maxNumDoors;
    }

}
