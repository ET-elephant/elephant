package com.xinhai.elephant.api;

import java.util.List;

import org.springframework.stereotype.Service;


/**
 * StudentService服务类接口
 * 
 * @author xinhai conper 2016-03-10
 *
 * @version 1.0
 */
@Service
public interface StudentService {

	Student findStudent(String id);

	void createStudent(Student student);

	void updateStudent(String studentId, Student student);

	void deleteStudent(String id);

	void deleteStudents(List<String> studentIds);

	List<Student> findAllStudent();

}
