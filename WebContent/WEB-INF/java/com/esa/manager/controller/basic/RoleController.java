package com.esa.manager.controller.basic;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.esa.manager.SSPConstant;
import com.esa.manager.dao.entity.basic.RoleEty;
import com.esa.manager.dao.mapper.ssp.basic.RoleDao;
import com.esa.manager.services.log.LogService;
import com.esa.manager.util.jsonresult.JsonResult;
import com.esa.manager.util.jsonresult.JsonResultFactory;
/**
 * 角色管理
 * 
 */
@Controller
@RequestMapping(value="/basic/RoleController/")
public class RoleController {
	
	@Autowired RoleDao roleDao;
	
	@Autowired
	private LogService logService;
	/*
	 * 角色列表
	 * @param request
	 * @param response
	 * @param roleEty
	 * @return roleEty
	 * @throws Exception
	 * */
	@RequestMapping(value="list.sdo")
	public @ResponseBody JsonResult list(RoleEty roleEty) throws Exception{
		int count = roleDao.selectLimitCount(roleEty);
		List<RoleEty> list = roleDao.selectByLimit(roleEty);
		return JsonResultFactory.extgrid(list, count);
	}
	/*
	 * 角色查询
	 * */
	
	/*
	 * 角色添加 或修改
	 * @param request
	 * @param response
	 * @param roleEty
	 * @throws Exception
	 * */
	@RequestMapping(value="add.sdo")
	public @ResponseBody JsonResult add(RoleEty roleEty) throws Exception {
		if(roleEty.getId() == null) {
			roleDao.insert(roleEty);
			logService.add(SSPConstant.LOG_ADD, SSPConstant.LOG_TYPE_ROLE, roleEty.getId(), "角色管理模块");
		} else { 
			roleDao.updateById(roleEty);
			logService.add(SSPConstant.LOG_UPDATA, SSPConstant.LOG_TYPE_ROLE, roleEty.getId(), "角色管理模块");
		}
		return JsonResultFactory.success();
	}
	/**
	 * 根据 id删除角色
	 * @param request id
	 * @throws Exception
	 */
	@RequestMapping(value="delete.sdo", method=RequestMethod.POST)
	public @ResponseBody JsonResult delete(@RequestParam("id") int id)  throws Exception {
		if(roleDao.getUsingRole(id)>0){
			return JsonResultFactory.error("该角色已经被用户指定，暂时不能删除！");
		}
		roleDao.deleteById(id);
		roleDao.deleteMenu(id);
		roleDao.deleteFunction(id);
		logService.add(SSPConstant.LOG_DELETE, SSPConstant.LOG_TYPE_ROLE, id, "角色管理模块");
		return JsonResultFactory.success();
	}
	/**
	 * 
	 * 根据id menuId 配置菜单
	 * @param request roleId menuId
	 * */
	@RequestMapping(value="setMenu.sdo")
	public @ResponseBody JsonResult setRole(@RequestParam("roleId") Integer roleId,@RequestParam("menuId") String menuId)  throws Exception {
		roleDao.deleteMenu(roleId);
		if (!menuId.equals("")&&!menuId.equals(null)) {
			String[] roleList =  menuId.split(",");
			Map<String,Integer> roleMap = new HashMap<String,Integer>();
			roleMap.put("roleId", roleId);
			for (int i = 0; i < roleList.length; i++) {
				roleMap.put("menuId", Integer.parseInt(roleList[i]));
				roleDao.insertMenu(roleMap);
			}
		}
		logService.add(SSPConstant.LOG_ADD, SSPConstant.LOG_TYPE_ROLE, roleId, "角色管理模块-配置菜单");
		return JsonResultFactory.success();
	}
}
