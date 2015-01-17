package com.esa.manager.controller.basic;

import com.esa.manager.dao.entity.basic.FunctionEty;

public class RoleFunForm extends FunctionEty{

	private Integer roleId;
	private String type;
	
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	
	
}
