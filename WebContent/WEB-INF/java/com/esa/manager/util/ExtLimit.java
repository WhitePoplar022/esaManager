package com.esa.manager.util;

public class ExtLimit {
	private Integer limit;
	private Integer start;
	private String sort;
	private String dir;
	
	private String exp_name;
	private String exp_type;
	private String exp_column_names;
	private String exp_column_indexs;
	
	public Integer getLimit() {
		return limit;
	}
	public void setLimit(Integer limit) {
		this.limit = limit;
	}
	public Integer getStart() {
		return start;
	}
	public void setStart(Integer start) {
		this.start = start;
	}
	public String getDir() {
		return dir;
	}
	public void setDir(String dir) {
		this.dir = dir;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	public String getExp_name() {
		return exp_name;
	}
	public void setExp_name(String expName) {
		exp_name = expName;
	}
	public String getExp_type() {
		return exp_type;
	}
	public void setExp_type(String expType) {
		exp_type = expType;
	}
	public String getExp_column_names() {
		return exp_column_names;
	}
	public void setExp_column_names(String expColumnNames) {
		exp_column_names = expColumnNames;
	}
	public String getExp_column_indexs() {
		return exp_column_indexs;
	}
	public void setExp_column_indexs(String expColumnIndexs) {
		exp_column_indexs = expColumnIndexs;
	}
}
