package com.esa.manager.controller.basic;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.esa.manager.SSPConstant;
import com.esa.manager.dao.entity.basic.UserEty;
import com.esa.manager.dao.mapper.ssp.basic.UserDao;
import com.esa.manager.services.basic.UserRoleService;
import com.esa.manager.services.log.LogService;
import com.esa.manager.util.jsonresult.JsonResult;
import com.esa.manager.util.jsonresult.JsonResultFactory;
/**
 * 用户管理
 * 
 */
@Controller
@RequestMapping(value="/basic/UserController/")
public class UserController {
	
	@Autowired
	private UserDao userDao;
	
	@Resource(name="UserRoleService")
	private UserRoleService userRoleService;
	
	@Autowired
	private LogService logService;
	
	@InitBinder
	public void initBibder(WebDataBinder binder) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		df.setLenient(false);
		binder.registerCustomEditor(Date.class, new CustomDateEditor(df, true));
	}
	
	/**
	 * 查询全部用户
	 * @param request
	 * @param response
	 * @param userEty
	 * @return userEty
	 * @throws Exception
	 */
	@RequestMapping(value="list.sdo")
	public @ResponseBody JsonResult list(UserEty user) throws Exception {
		int count = userDao.selectLimitCount(user);
		List<UserEty> list = userDao.selectByLimit(user);
		return JsonResultFactory.extgrid(list, count);
	}

	/**
	 * 添加或更改用户
	 * @param request
	 * @param response
	 * @param userEty
	 * @throws Exception
	 */
	@RequestMapping(value="add.sdo")
	public @ResponseBody JsonResult add(HttpServletRequest request, HttpServletResponse response, UserEty userEty) throws Exception {
		if(userEty.getId() == null) {
			userEty.setInsert_date(new Date());
			userDao.insert(userEty);
			logService.add(SSPConstant.LOG_ADD, SSPConstant.LOG_TYPE_ROLE, userEty.getId(), "用户管理模块");
		} else { 
			userDao.updateById(userEty);
			logService.add(SSPConstant.LOG_UPDATA, SSPConstant.LOG_TYPE_ROLE, userEty.getId(), "用户管理模块");
		}
		return JsonResultFactory.success();
	}
	
	/**
	 * 根据 id删除用户
	 * @param request id
	 * @throws Exception
	 */
	@RequestMapping(value="delete.sdo", method=RequestMethod.POST)
	public @ResponseBody JsonResult delete(@RequestParam("id") int id) {
		userDao.deleteById(id);
		userDao.deleteRole(id);
		logService.add(SSPConstant.LOG_DELETE, SSPConstant.LOG_TYPE_ROLE, id, "用户管理模块");
		return JsonResultFactory.success();
	}
	
	/**
	 * 
	 * 根据id 配置用户的角色
	 * 
	 * */
	@RequestMapping(value="setRole.sdo")
	public @ResponseBody JsonResult setRole(@RequestParam("userid") Integer userId,@RequestParam("roleid") String roleIds) throws Exception{
		userRoleService.saveUserRole(userId, roleIds);
		logService.add(SSPConstant.LOG_ADD, SSPConstant.LOG_TYPE_ROLE, userId, "用户管理模块-权限分配");
		return JsonResultFactory.success();
	}
}
