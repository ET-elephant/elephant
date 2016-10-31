package com.xinhai.elephant.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xinhai.elephant.api.Employee;
import com.xinhai.elephant.api.EmployeeService;

@Controller
@RequestMapping("/elephant")
public class EmployeeController {
	Logger logger = LogManager.getLogger(EmployeeController.class.getName());

	@Autowired
	private EmployeeService employeeService;

	@RequestMapping(value = "/employee/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Employee getEmployee(@PathVariable("id") String id) {
		logger.debug("getemployee" + id);
		Employee employee = employeeService.findEmployee(id);
		return employee;
	}

	@RequestMapping(value = "/employee", method = RequestMethod.GET)
	@ResponseBody
	public List<Employee> getEmployee() {

		return employeeService.findAllEmployee();

	}

	@RequestMapping(value = "/employee/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public Boolean updateEmployee(@PathVariable("id") String id, @RequestBody Employee employee){
		employeeService.updateEmployee(id, employee);
		return true;
	}

	@RequestMapping(value = "/employee", method = RequestMethod.POST)
	@ResponseBody
	public Boolean addEmployee(@RequestBody Employee employee){
		employeeService.createEmployee(employee);
		return true;
	}

	@RequestMapping(value = "/employee/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public Boolean deleteEmployee(@PathVariable("id") String id){
		employeeService.deleteEmployee(id);
		return true;
	}
}
