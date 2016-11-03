package com.xinhai.elephant.dao;

import java.util.List;

import java.util.Map;
import com.alibaba.fastjson.JSONObject;

import org.apache.ibatis.annotations.Param;

import com.xinhai.elephant.api.Student;

/**
 * mybatis Mapper接口，对应同名称的xml文件
 * 
 * @author xinhai conper 2016-03-11
 *
 */
public interface StudentMapper {

	void createStudent(Student student);

	void updateStudent(@Param("id") String id, @Param("student") Student student);

	void deleteStudentList(List<String> studentIds);

	void deleteStudent(String id);

	Student getStudent(String id);

	List<Student> getStudentList();
	
	List<Student> getStudentListByKeyword(@Param("keyword") String keyword);
	
	List<JSONObject> getAllStudent(Map<String, Object> parameters);
}