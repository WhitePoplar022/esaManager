package com.esa.manager.controller.basic;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.esa.manager.SSPConstant;
import com.esa.manager.dao.entity.basic.MenuEty;
import com.esa.manager.dao.entity.basic.UserEty;
import com.esa.manager.dao.mapper.ssp.basic.MenuDao;
import com.esa.manager.dao.mapper.ssp.basic.UserDao;
import com.esa.manager.services.log.LogService;
import com.esa.manager.util.jsonresult.JsonResult;
import com.esa.manager.util.jsonresult.JsonResultFactory;

/**
 * 单点登录控制
 * 
 * @author User
 *
 */
@Controller
@RequestMapping("/basic/LoginController/")
public class LoginController {

	@Autowired
	private UserDao userDao;

	@Autowired
	private MenuDao menuDao;

	@Autowired
	private LogService logService;

	/**
	 * CAS登入预留接口
	 * 
	 * @param request
	 * @param response
	 * @param user
	 * @throws Exception
	 */
	@RequestMapping("CASLogin.sdo")
	public void CASLogin(HttpServletRequest request, HttpServletResponse response, UserEty user) throws Exception {
		// 用户名称为空直接返回
		if (StringUtils.isEmpty(user.getUsername())) {
			response.sendRedirect(request.getContextPath() + "/login.jsp");
			return;
		}
	}

	/**
	 * SSP用户登入
	 * 
	 * @param request
	 * @param response
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("login.sdo")
	public @ResponseBody JsonResult login(HttpServletRequest request, HttpServletResponse response, UserEty user) throws Exception {
		List<UserEty> list = userDao.selectUserByName(user);
		if (list.size() == 1) {
			UserEty userEty = list.get(0);
			request.getSession().setAttribute("UserEty", userEty);
			request.getSession().setAttribute("name", userEty.getName());
			request.getSession().setAttribute("userId", userEty.getId());

			logService.add(SSPConstant.LOG_LOGIN, SSPConstant.LOG_TYPE_OPERATION, null, "登入模块");

			return JsonResultFactory.success();
		} else {
			return JsonResultFactory.error("用户名或者密码错误！");
		}
	}

	@RequestMapping("Main.sdo")
	public void Main(HttpServletRequest request, HttpServletResponse response, UserEty user) throws Exception {
		response.sendRedirect(request.getContextPath() + "/main.jsp");
		return;
	}
	@RequestMapping("mainExt.sdo")
	public void mainExt(HttpServletRequest request, HttpServletResponse response, UserEty user) throws Exception {
		response.sendRedirect(request.getContextPath() + "/extStyle/main.jsp");
		return;
	}

	/**
	 * 根据用户ID 获得用户所属的角色对应的菜单树 和权限function
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getUserTreeAndFunction.sdo")
	public @ResponseBody Map<String, Object> getUserTreeAndFunction(@RequestParam("userId") int userId) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Map<String, Object>> dataArray = new ArrayList<Map<String, Object>>();
		List<MenuEty> menuList = userDao.selectUserMenuMap(userId);
		for (int i = 0; i < menuList.size(); i++) {
			MenuEty menuEty = menuDao.selectById(menuList.get(i).getParantMenuID());
			Map<String, Object> aMenuObj = new HashMap<String, Object>();
			aMenuObj.put("id", menuEty.getId());
			aMenuObj.put("text", menuEty.getMenuName());
			aMenuObj.put("menuName", menuEty.getMenuName());
			aMenuObj.put("type", menuEty.getType());
			aMenuObj.put("functions", menuEty.getFunctions());
			aMenuObj.put("icon", "images/menu/" + menuEty.getIcon());
			aMenuObj.put("openIcon", "images/menu/32/" + menuEty.getOpenIcon());
			aMenuObj.put("jsClassFile", menuEty.getJsClassFile());
			aMenuObj.put("cls", "menuNodeCls");
			
			String[] menuIds = menuList.get(i).getMenuIds().split(",");

			List<Map<String, Object>> childrenList = new ArrayList<Map<String, Object>>();
			for (int j = 0; j < menuIds.length; j++) {
				MenuEty secondMenuEty = menuDao.selectById(Integer.parseInt(menuIds[j]));
				Map<String, Object> aChildObj = new HashMap<String, Object>();
				aChildObj.put("id", secondMenuEty.getId());
				aChildObj.put("text", secondMenuEty.getMenuName());
				aChildObj.put("menuName", secondMenuEty.getMenuName());
				aChildObj.put("type", secondMenuEty.getType());
				aChildObj.put("functions", secondMenuEty.getFunctions());
				aChildObj.put("jsClassFile", secondMenuEty.getJsClassFile());
				aChildObj.put("icon", "images/menu/" + secondMenuEty.getIcon());
				aChildObj.put("openIcon", "images/menu/32/" + secondMenuEty.getOpenIcon());
				aChildObj.put("cls", "menuNodeCls");
				aChildObj.put("iconCls", "menuNodeIconCls");
				aChildObj.put("leaf", true);
				childrenList.add(aChildObj);
			}
			aMenuObj.put("children", childrenList);
			dataArray.add(aMenuObj);
		}
		String userFunction = userDao.selectUserFunctionMap(userId);
		map.put("result", "success");
		map.put("userTree", dataArray);
		map.put("userFunction", userFunction);
		return map;
	}

	/**
	 * 用户登出
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("logout.sdo")
	public @ResponseBody JsonResult logout(HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.getSession().removeAttribute("UserEty");
		request.getSession().removeAttribute("name");
		request.getSession().removeAttribute("userId");
		request.getSession().removeAttribute("UserTree");
		request.getSession().invalidate();
		return JsonResultFactory.success();
	}
}
