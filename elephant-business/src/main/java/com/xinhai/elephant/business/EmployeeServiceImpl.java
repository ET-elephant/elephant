package com.xinhai.elephant.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.xinhai.elephant.api.Employee;
import com.xinhai.elephant.api.EmployeeService;
import com.xinhai.elephant.dao.EmployeeMapper;


/**
 * EmployeeService接口实现类
 * 
 * @author xinhai conper 2016-03-11
 *
 */
@Repository
public class EmployeeServiceImpl implements EmployeeService {
	@Autowired
	private EmployeeMapper employeeMapper;


	public void createEmployee(Employee employee) {
		employeeMapper.createEmployee(employee);
	}

	public void updateEmployee(String employeeId, Employee employee){
		employeeMapper.updateEmployee(employeeId, employee);
	}

	public void deleteEmployees(List<String> employeeIds){
		employeeMapper.deleteEmployeeList(employeeIds);
	}

	public void deleteEmployee(String employeeId){
		employeeMapper.deleteEmployee(employeeId);
	}

	public List<Employee> findAllEmployee(){
		return employeeMapper.getEmployeeList();
	}

	public Employee findEmployee(String id){
		Employee employee=employeeMapper.getEmployee(id);
		return employee;
	}

}
