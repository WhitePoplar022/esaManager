package com.esa.manager.dao.entity.log;

import java.util.Date;

import com.esa.manager.dao.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonFormat;

public class LogEty extends BaseEntity {

	private Integer id;	//日志ID
	private Integer userId;	//操作用户Id
	private String userName;	//操作用户
	private Date createTime;	//操作时间
	private String ip;	//IP地址
	private String operationType;	//操作类型
	private String logType;	//日志类型
	private Integer businessId;	//操作数据ID
	private String businessName;	//业务名称
	private String description;	//备注信息

	/**
	* 操作业务ID
	* @return 日志ID : Integer
	*/
	public Integer getBusinessId() {
		return businessId;
	}
	
	/**
	* 操作业务ID
	* @return 日志ID : Integer
	*/
	public void setBusinessId(Integer businessId) {
		this.businessId = businessId;
	}
	/**
	* 得到 日志ID
	* @return 日志ID : Integer
	*/
	public Integer getId() {
		return this.id;
	}
	/**
	 * 设置 日志ID
	 * @param id, 日志ID : Integer
	*/
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	* 得到 操作用户Id
	* @return 操作用户Id : String
	*/
	public Integer getUserId() {
		return this.userId;
	}
	/**
	 * 设置 操作用户Id
	 * @param userId, 操作用户Id : String
	*/
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	/**
	* 得到 操作用户
	* @return 操作用户 : String
	*/
	public String getUserName() {
		return this.userName;
	}
	/**
	 * 设置 操作用户
	 * @param userName, 操作用户 : String
	*/
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	* 得到 操作时间
	* @return 操作时间 : Date
	*/
	@JsonFormat(pattern = "yyyy-MM-dd")
	public Date getCreateTime() {
		return this.createTime;
	}
	/**
	 * 设置 操作时间
	 * @param createTime, 操作时间 : Date
	*/
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	* 得到 IP地址
	* @return IP地址 : String
	*/
	public String getIp() {
		return this.ip;
	}
	/**
	 * 设置 IP地址
	 * @param ip, IP地址 : String
	*/
	public void setIp(String ip) {
		this.ip = ip;
	}

	/**
	* 得到 操作类型
	* @return 操作类型 : String
	*/
	public String getOperationType() {
		return this.operationType;
	}
	/**
	 * 设置 操作类型
	 * @param operationType, 操作类型 : String
	*/
	public void setOperationType(String operationType) {
		this.operationType = operationType;
	}

	/**
	* 得到 日志类型
	* @return 日志类型 : String
	*/
	public String getLogType() {
		return this.logType;
	}
	/**
	 * 设置 日志类型
	 * @param logType, 日志类型 : String
	*/
	public void setLogType(String logType) {
		this.logType = logType;
	}

	/**
	* 得到 业务名称
	* @return 业务名称 : String
	*/
	public String getBusinessName() {
		return this.businessName;
	}
	/**
	 * 设置 业务名称
	 * @param businessName, 业务名称 : String
	*/
	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}

	/**
	* 得到 备注信息
	* @return 备注信息 : String
	*/
	public String getDescription() {
		return this.description;
	}
	/**
	 * 设置 备注信息
	 * @param description, 备注信息 : String
	*/
	public void setDescription(String description) {
		this.description = description;
	}

}