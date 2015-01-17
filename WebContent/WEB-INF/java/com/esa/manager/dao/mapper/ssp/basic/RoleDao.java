package com.esa.manager.dao.mapper.ssp.basic;

import java.util.Map;

import com.esa.manager.dao.base.BaseDao;
import com.esa.manager.dao.entity.basic.RoleEty;
/*
 * 角色管理
 * 
 * */
public interface RoleDao extends BaseDao<RoleEty>{
 	/**
	 * 将角色ID 和 菜单ID 插入 临时表
	 * @param roleMap
	 */
	public void insertMenu(Map<String,Integer> roleMap);
	/**
	 * 删除角色菜单
	 * @param roleId
	 */
	public void deleteMenu(Integer roleId);
	
	/**
	 * 根据角色ID 查看是否有用户使用该角色
	 * @param roleId
	 */
	public int getUsingRole(Integer roleId);
	
	/**
	 * 将角色ID 和 权限functionID 插入 临时表
	 * @param functionMap
	 */
	public void insertFunction(Map<String,Integer> functionMap);
	
	/**
	 * 根据角色ID删除权限
	 * @param functionId
	 */
	public void deleteFunction(Integer functionId);
}
