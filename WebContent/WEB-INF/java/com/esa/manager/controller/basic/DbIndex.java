package com.esa.manager.controller.basic;

public class DbIndex {
	private String name;
	private String columnName;
	private String asc_or_desc;
	private String non_unique;
	private String remark;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getColumnName() {
		return columnName;
	}
	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}
	public String getAsc_or_desc() {
		return asc_or_desc;
	}
	public void setAsc_or_desc(String asc_or_desc) {
		this.asc_or_desc = asc_or_desc;
	}
	public String getNon_unique() {
		return non_unique;
	}
	public void setNon_unique(String non_unique) {
		this.non_unique = non_unique;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
