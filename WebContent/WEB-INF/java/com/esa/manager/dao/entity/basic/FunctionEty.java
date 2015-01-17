package com.esa.manager.dao.entity.basic;

import java.util.Date;

import com.esa.manager.dao.base.BaseEntity;
/*
 * 权限功能实体定义
 * 
 * */
public class FunctionEty extends BaseEntity{
	private Integer id;//id自增
	private String name;//功能名称(链接、按钮等)
	private String code;//功能代码标识
	private Date create_date;//创建时间
	private Date update_date;//更新时间
	private Integer status; //是否删除;0:删除,1:正常
	private String description;//描述
	private Integer p_menu_id;//菜单表id
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
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
	public Date getCreate_date() {
		return create_date;
	}
	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}
	public Date getUpdate_date() {
		return update_date;
	}
	public void setUpdate_date(Date update_date) {
		this.update_date = update_date;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Integer getP_menu_id() {
		return p_menu_id;
	}
	public void setP_menu_id(Integer p_menu_id) {
		this.p_menu_id = p_menu_id;
	}
	
	
}
