package com.xinhai.elephant.dao;

import java.util.List;

import java.util.Map;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.apache.ibatis.annotations.Param;

import com.xinhai.elephant.api.Employee;

/**
 * mybatis Mapper接口，对应同名称的xml文件
 * 
 * @author xinhai conper 2016-03-11
 *
 */
public interface EmployeeMapper {

	void createEmployee(Employee employee);

	void updateEmployee(@Param("id") String id, @Param("employee") Employee employee);

	void deleteEmployeeList(List<String> employeeIds);

	void deleteEmployee(String id);

	Employee getEmployee(String id);

	List<Employee> getEmployeeList();
	
	List<Employee> getEmployeeListByKeyword(@Param("keyword") String keyword);
	
	List<JSONObject> getAllEmployee(Map<String, Object> parameters);
}