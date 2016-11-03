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

import com.xinhai.elephant.api.Student;
import com.xinhai.elephant.api.StudentService;

@Controller
@RequestMapping("/elephant")
public class StudentController {
	Logger logger = LogManager.getLogger(StudentController.class.getName());

	@Autowired
	private StudentService studentService;

	@RequestMapping(value = "/student/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Student getStudent(@PathVariable("id") String id) {
		logger.debug("getstudent" + id);
		Student student = studentService.findStudent(id);
		return student;
	}

	@RequestMapping(value = "/student", method = RequestMethod.GET)
	@ResponseBody
	public List<Student> getStudent() {

		return studentService.findAllStudent();

	}

	@RequestMapping(value = "/student/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public Boolean updateStudent(@PathVariable("id") String id, @RequestBody Student student){
		studentService.updateStudent(id, student);
		return true;
	}

	@RequestMapping(value = "/student", method = RequestMethod.POST)
	@ResponseBody
	public Boolean addStudent(@RequestBody Student student){
		studentService.createStudent(student);
		return true;
	}

	@RequestMapping(value = "/student/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public Boolean deleteStudent(@PathVariable("id") String id){
		studentService.deleteStudent(id);
		return true;
	}
}
