package com.esa.manager.dao.mapper.ssp.basic;

import java.util.List;

import com.esa.manager.dao.base.BaseDao;
import com.esa.manager.dao.entity.basic.MenuEty;
/*
 * 菜单管理
 * 
 * */
public interface MenuDao extends BaseDao<MenuEty>{
	 /**
 	 * 根据父节点id 获得菜单列表
 	 * @param Integer 父节点id
 	 * @return List 客户菜单列表
 	 */
 	public List<MenuEty> getListByParentId(int id);
 	
 	/**
	 * 根据菜单ID 查看是否有角色使用该菜单
	 * @param menuId
	 */
	public int getUsingMenu(Integer menuId);
 	
}
