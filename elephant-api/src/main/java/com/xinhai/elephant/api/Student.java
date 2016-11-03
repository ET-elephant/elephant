package com.xinhai.elephant.api;

import java.util.Date;

/**
 * Created by fanxi on 2016-3-7.
 */
public class Student {
	public static enum Sex {
		male, female
	}

	private int id;
	private String name;
	private String code;
	private Sex sex;
	private int age;
	private Date birthday;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public Sex getSex() {
		return sex;
	}
	public void setSex(Sex sex) {
		this.sex = sex;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

}
