package com.xinhai.elephant.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.xinhai.elephant.api.EnergyPlan;

public interface EnergyPlanMapper {

	void createEnergyPlan (EnergyPlan energyplan);
	
	void updateEnergyPlan(@Param("id") int id,@Param("energyplan") EnergyPlan energyplan);
	
	void deleteEnergyPlan(String id);
	
	void deleteEnergyPlan(List<String> energyPlanIds);
	
	EnergyPlan getEnergyPlan(String id);
	
    List<EnergyPlan> getEnergyPlanList();
}
