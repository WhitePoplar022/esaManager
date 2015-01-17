package com.esa.manager.controller.basic;

import java.util.Date;
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
import com.esa.manager.dao.entity.basic.FunctionEty;
import com.esa.manager.dao.mapper.ssp.basic.FunctionDao;
import com.esa.manager.services.log.LogService;
import com.esa.manager.util.jsonresult.JsonResult;
import com.esa.manager.util.jsonresult.JsonResultFactory;

/*
 * 权限功能 controller 
 * */
@Controller
@RequestMapping(value="/basic/FunctionController/")
public class FunctionController {
	
	@Autowired FunctionDao functionDao;
	
	@Autowired
	private LogService logService;
	/**
	 *  权限功能：列出全部权限
	 * @param request 
	 * @return List<functionEty>
	 * @throws Exception
	 */
	@RequestMapping(value="list.sdo")
	public @ResponseBody JsonResult list( FunctionEty functionEty) throws Exception {
		int count = functionDao.selectLimitCount(functionEty);
		List<FunctionEty> list = functionDao.selectByLimit(functionEty);
		return JsonResultFactory.extgrid(list, count);
	}
	
	
	/**
	 *  此角色已未选择的功能
	 * @param request 
	 * @return List<functionEty>
	 * @throws Exception
	 */
	@RequestMapping(value="onSelectFunctionByRoleId.sdo")
	public @ResponseBody JsonResult onSelectFunctionByRoleId(RoleFunForm roleFunForm) throws Exception {
		int count = functionDao.onSelectFunctionByRoleIdCount(roleFunForm);
		List<FunctionEty> list = functionDao.onSelectFunctionByRoleIdList(roleFunForm);
		return JsonResultFactory.extgrid(list, count);
	}
	
	
	/**
	 *  此角色已选择的功能
	 * @param request 
	 * @return List<functionEty>
	 * @throws Exception
	 */
	@RequestMapping(value="selectFunctionByRoleId.sdo")
	public @ResponseBody JsonResult selectFunctionByRoleId( 
			RoleFunForm roleFunForm) throws Exception {
		int count = functionDao.selectFunctionByRoleIdCount(roleFunForm);
		List<RoleFunForm> list = functionDao.selectFunctionByRoleIdList(roleFunForm);
		return JsonResultFactory.extgrid(list, count);
	}
	
	
	/**
	 *  addFun
	 * @param request
	 * @param response
	 * @param functionEty
	 * @return 
	 * @throws Exception
	 */
	@RequestMapping(value="addFun.sdo")
	public @ResponseBody JsonResult addFun(@RequestParam("funIds") String funIds,@RequestParam("roleId") int roleId) throws Exception {
		String st[] = funIds.split(",");
		Map<String,Integer> map = new HashMap<String,Integer>();
		for(int i = 0; i < st.length; i++){
			map.put("roleId", roleId);
			map.put("funId", Integer.parseInt(st[i]));
			functionDao.addFun(map);
		}
		logService.add(SSPConstant.LOG_ADD, SSPConstant.LOG_TYPE_ROLE, roleId, "角色分配功能");
		return JsonResultFactory.success();
	}
	
	
	/**
	 *  delFun
	 * @param request
	 * @param response
	 * @param functionEty
	 * @return 
	 * @throws Exception
	 */
	@RequestMapping(value="delFun.sdo")
	public @ResponseBody JsonResult delFun(@RequestParam("funIds") String funIds) throws Exception {
		String st[] = funIds.split(",");
		for(int i = 0; i < st.length; i++){
			functionDao.delFun(Integer.parseInt(st[i]));
			logService.add(SSPConstant.LOG_DELETE, SSPConstant.LOG_TYPE_ROLE, Integer.parseInt(st[i]), "角色分配功能");
		}
		return JsonResultFactory.success();
	}
	
	/**
	 *  权限功能：根据menuId 去查询相对应的功能
	 * @param request p_menu_id
	 * @return List<functionEty>
	 * @throws Exception
	 */
	@RequestMapping(value="selectFunctionListByMenuId.sdo")
	public @ResponseBody JsonResult selectFunctionListByMenuId(@RequestParam("p_menu_id") int p_menu_id) throws Exception {
		int count = functionDao.selectFunctionListByMenuIdCount(p_menu_id);
		List<FunctionEty> list = functionDao.selectFunctionListByMenuId(p_menu_id);
		return JsonResultFactory.extgrid(list, count);
	}
	
	/**
	 *  权限功能：添加、修改
	 * @param request
	 * @param response
	 * @param functionEty
	 * @return 
	 * @throws Exception
	 */
	@RequestMapping(value="add.sdo")
	public @ResponseBody JsonResult add( FunctionEty functionEty) throws Exception {
		if(functionEty.getId() == null) {
			functionEty.setCreate_date(new Date());
			functionDao.insert(functionEty);
			logService.add(SSPConstant.LOG_ADD, SSPConstant.LOG_TYPE_ROLE, functionEty.getId(), "功能权限");
		} else { 
			functionEty.setUpdate_date(new Date());
			functionDao.updateById(functionEty);
			logService.add(SSPConstant.LOG_UPDATA, SSPConstant.LOG_TYPE_ROLE, functionEty.getId(), "功能权限");
		}
		return JsonResultFactory.success();
	}
	
	/**
	 * 实时验证UCode是否重复
	 * @param request
	 * @param response
	 * @param functionEty
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="vlidateUcode.sdo")
	public @ResponseBody JsonResult vlidateUcode( @RequestParam(value="code",required=false) String code,@RequestParam(value="funId",required=false) int funId) throws Exception {
		int count = 0;
		FunctionEty functionEty = new FunctionEty();
		functionEty.setCode(code);
		functionEty.setId(funId);
		if(code != null && !code.equals("")) {
			count = functionDao.vlidateUcode(functionEty);
		} 
		if(count > 0) {
			return JsonResultFactory.error("false");
		}
		
		return JsonResultFactory.success();
	}
	
	/**
	 *  权限功能：删除
	 * @param request id
	 * @throws Exception
	 */
	@RequestMapping(value="delete.sdo",method=RequestMethod.POST)
	public @ResponseBody JsonResult delete(@RequestParam("id") int id) throws Exception {
		functionDao.deleteById(id);
		logService.add(SSPConstant.LOG_DELETE, SSPConstant.LOG_TYPE_ROLE, id, "功能权限");
		return JsonResultFactory.success();
	}
}
