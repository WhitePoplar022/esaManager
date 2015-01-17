package com.esa.manager.dao.mapper.ssp.basic;

import java.util.List;
import java.util.Map;

import com.esa.manager.controller.basic.RoleFunForm;
import com.esa.manager.dao.base.BaseDao;
import com.esa.manager.dao.entity.basic.FunctionEty;

/*
 * 权限功能
 * 
 * */
public interface FunctionDao extends BaseDao<FunctionEty> {
	
	/*
	 * 根据menuId 查询 list
	 * */
	public List<FunctionEty> selectFunctionListByMenuId(Integer p_menu_id);
	
	/*
	 * 根据menuId 查询 list 总数
	 * */
	public Integer selectFunctionListByMenuIdCount(Integer p_menu_id);
	
	/*
	 * 根据p_menu_id 删除 表数据
	 * */
	public void deleteByP_menu_id(Integer p_menu_id);
	
	/**
	 * 此角色已选择的功能Count
	 * @param roleId
	 * @return
	 */
	public Integer selectFunctionByRoleIdCount(RoleFunForm roleFunForm);
	
	/**
	 * 此角色已选择的功能List
	 * @param roleId
	 * @return
	 */
	public List<RoleFunForm> selectFunctionByRoleIdList(RoleFunForm roleFunForm);
	
	/**
	 * 此角色已未选择的功能Count
	 * @param roleId
	 * @return
	 */
	public Integer onSelectFunctionByRoleIdCount(RoleFunForm roleFunForm);
	
	/**
	 * 此角色已未选择的功能List
	 * @param roleId
	 * @return
	 */
	public List<FunctionEty> onSelectFunctionByRoleIdList(RoleFunForm roleFunForm);
	
	/**
	 * 临时存储：功能IDS
	 * @param map
	 */
	public void addFun(Map<String,Integer> map);
	
	/**
	 * 临时删除：修改RoleFunState
	 * @param map
	 */
	public void delFun(Integer seletFunId);
	
	/**
	 * 验证UCOde是否重复
	 * @param code
	 * @return
	 */
	public Integer vlidateUcode(FunctionEty functionEty);
}
