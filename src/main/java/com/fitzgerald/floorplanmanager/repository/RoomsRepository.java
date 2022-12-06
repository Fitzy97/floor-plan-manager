package com.fitzgerald.floorplanmanager.repository;

import com.fitzgerald.floorplanmanager.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface RoomsRepository extends
        JpaRepository<Room, Integer>,
        JpaSpecificationExecutor<Room>,
        QuerydslPredicateExecutor<Room> {
}
