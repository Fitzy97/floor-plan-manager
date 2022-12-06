package com.fitzgerald.floorplanmanager.repository;

import com.fitzgerald.floorplanmanager.entity.FloorPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface FloorPlansRepository extends
        JpaRepository<FloorPlan, Integer>,
        JpaSpecificationExecutor<FloorPlan>,
        QuerydslPredicateExecutor<FloorPlan> {
}
