package com.esa.manager.controller.basic;

public class DbForm {
	private String name;
	private String type;
	private String iskey;
	private String notnull;
	private String remark;
	private String defaults;
	private String extra;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	public String getIskey() {
		return iskey;
	}
	public void setIskey(String iskey) {
		this.iskey = iskey;
	}
	public String getNotnull() {
		return notnull;
	}
	public void setNotnull(String notnull) {
		this.notnull = notnull;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getDefaults() {
		return defaults;
	}
	public void setDefaults(String defaults) {
		this.defaults = defaults;
	}
	public String getExtra() {
		return extra;
	}
	public void setExtra(String extra) {
		this.extra = extra;
	}
	
	
}
