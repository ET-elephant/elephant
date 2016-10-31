package com.xinhai.elephant.api;

import java.util.List;

import org.springframework.stereotype.Service;


/**
 * EmployeeService服务类接口
 * 
 * @author xinhai conper 2016-03-10
 *
 * @version 1.0
 */
@Service
public interface EmployeeService {

	Employee findEmployee(String id);

	void createEmployee(Employee employee);

	void updateEmployee(String employeeId, Employee employee);

	void deleteEmployee(String id);

	void deleteEmployees(List<String> employeeIds);

	List<Employee> findAllEmployee();

}
