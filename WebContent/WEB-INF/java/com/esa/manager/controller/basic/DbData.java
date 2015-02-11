package com.esa.manager.controller.basic;

import java.util.List;

public class DbData {
	private String name;
	private String remark;
	private String engine;
	private List<DbForm> columns;
	private List<DbIndex> indexs;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public List<DbForm> getColumns() {
		return columns;
	}
	public void setColumns(List<DbForm> columns) {
		this.columns = columns;
	}
	public String getEngine() {
		return engine;
	}
	public void setEngine(String engine) {
		this.engine = engine;
	}
	public List<DbIndex> getIndexs() {
		return indexs;
	}
	public void setIndexs(List<DbIndex> indexs) {
		this.indexs = indexs;
	}
	
}
