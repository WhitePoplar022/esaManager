package com.esa.manager.dao.entity.task;

import java.util.Date;

import com.esa.manager.dao.base.BaseEntity;
/**
 * Task 任务实体
 * 
 *
 */
public class TaskEty extends BaseEntity {
	
	private Integer id;//任务Id
	private String name;//任务名称
	private String triggerName;//
	private Integer state;//0: 等待运行，1：正在运行
	private String lastResult;//
	private Date lastRunDate;//
	private String resultInfo;//
	
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
	public String getTriggerName() {
		return triggerName;
	}
	public void setTriggerName(String triggerName) {
		this.triggerName = triggerName;
	}
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	public String getLastResult() {
		return lastResult;
	}
	public void setLastResult(String lastResult) {
		this.lastResult = lastResult;
	}
	public Date getLastRunDate() {
		return lastRunDate;
	}
	public void setLastRunDate(Date lastRunDate) {
		this.lastRunDate = lastRunDate;
	}
	public String getResultInfo() {
		return resultInfo;
	}
	public void setResultInfo(String resultInfo) {
		this.resultInfo = resultInfo;
	}
	
}
