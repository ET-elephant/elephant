package com.xinhai.elephant.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.xinhai.elephant.api.Student;
import com.xinhai.elephant.api.StudentService;
import com.xinhai.elephant.dao.StudentMapper;


/**
 * StudentService接口实现类
 * 
 * @author xinhai conper 2016-03-11
 *
 */
@Repository
public class StudentServiceImpl implements StudentService {
	@Autowired
	private StudentMapper studentMapper;


	public void createStudent(Student student) {
		studentMapper.createStudent(student);
	}

	public void updateStudent(String studentId, Student student){
		studentMapper.updateStudent(studentId, student);
	}

	public void deleteStudents(List<String> studentIds){
		studentMapper.deleteStudentList(studentIds);
	}

	public void deleteStudent(String studentId){
		studentMapper.deleteStudent(studentId);
	}

	public List<Student> findAllStudent(){
		return studentMapper.getStudentList();
	}

	public Student findStudent(String id){
		Student student=studentMapper.getStudent(id);
		return student;
	}

}
