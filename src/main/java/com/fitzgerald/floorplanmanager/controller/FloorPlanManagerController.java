package com.fitzgerald.floorplanmanager.controller;

import com.fitzgerald.floorplanmanager.engine.FloorPlanEngineService;
import com.fitzgerald.floorplanmanager.entity.Users;
import com.fitzgerald.floorplanmanager.service.UsersService;
import com.fitzgerald.floorplanmanager.request.CreateFloorPlanRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/")
public class FloorPlanManagerController {

    @Autowired
    private FloorPlanEngineService floorPlanEngineService;
    @Autowired
    private UsersService usersService;

    @PostMapping(path = "createUser")
    @ResponseBody
    public Long createUser(@RequestParam("username") String username, @RequestParam("password") String password) {
        Users newUser = new Users();
        newUser.setUserName(username);
        newUser.setPassword(password);
        return usersService.saveUser(newUser).getId();
    }

    @GetMapping(path = "validateUser")
    @ResponseBody
    public Long validateUser(@RequestParam("usernmae") String username, @RequestParam("password") String password) throws Exception{
        return usersService.validateUser(username, password);
    }

    @PostMapping(path = "createFloorPlan")
    @ResponseBody
    public void createFloorPlan(@RequestBody CreateFloorPlanRequest request) {
        floorPlanEngineService.createFloorPlan(
                request.getUserId(),
                request.getTitle(),
                request.getWidth(),
                request.getLength(),
                request.getMinRoomLength(),
                request.getMaxRoomLength(),
                request.getMaxNumDoors()
        );
    }
}
