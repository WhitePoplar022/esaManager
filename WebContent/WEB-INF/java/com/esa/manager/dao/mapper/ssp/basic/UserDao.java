package com.esa.manager.dao.mapper.ssp.basic;

import java.util.List;
import java.util.Map;

import com.esa.manager.dao.base.BaseDao;
import com.esa.manager.dao.entity.basic.MenuEty;
import com.esa.manager.dao.entity.basic.UserEty;

/**
 * 用户管理
 * 
 *
 */
public interface UserDao extends BaseDao<UserEty>{
	/**
	 * 将用名称和密码获得用户
	 * @param userMap
	 */
	public List<UserEty>  selectUserByName(UserEty userEty);
	
	/**
	 * 将用户ID 和 角色ID 插入 临时表
	 * @param userMap
	 */
	public void insertRole(Map<String,Integer> userMap);
	/**
	 * 删除用户角色
	 * @param userid
	 */
	public void deleteRole(Integer userid);
	/**
	 * 根据用户的ID去查到相对应的菜单
	 * @param userid
	 * @return List<MenuEty>
	 */
	public List<MenuEty> selectUserMenuMap(Integer userid);
	/**
	 * 根据用户的ID去查到相对应的权限名称
	 * @param userid
	 * @return string
	 */
	public String selectUserFunctionMap(Integer userid);
	
}
