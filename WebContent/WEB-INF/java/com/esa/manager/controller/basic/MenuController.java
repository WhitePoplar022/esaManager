package com.esa.manager.controller.basic;


import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.esa.manager.SSPConstant;
import com.esa.manager.dao.entity.basic.MenuEty;
import com.esa.manager.dao.entity.basic.PictureEty;
import com.esa.manager.dao.mapper.ssp.basic.FunctionDao;
import com.esa.manager.dao.mapper.ssp.basic.MenuDao;
import com.esa.manager.services.log.LogService;
import com.esa.manager.util.jsonresult.JsonResult;
import com.esa.manager.util.jsonresult.JsonResultFactory;
/**
 * 菜单管理
 * 
 */
@Controller
@RequestMapping(value="/basic/MenuController/")
public class MenuController {
	
	@Autowired MenuDao menuDao;
	
	@Autowired FunctionDao functionDao;
	
	@Autowired
	private LogService logService;
	
	/*
	 * 全部菜单列成树
	 * @param request
	 * @param response
	 * @return JsonTree
	 * @throws Exception
	 * */
	@RequestMapping(value="list.sdo")
	public @ResponseBody List<MenuEty> list(@RequestParam("id") int id) throws Exception{
		List<MenuEty> dataArray = new ArrayList<MenuEty>();
		List<MenuEty> firstList = menuDao.getListByParentId(id);
		
		for (int i = 0; i < firstList.size(); i++) {
			MenuEty node = firstList.get(i);
			node.setIcon("images/menu/"+node.getIcon());
			node.setOpenIcon("images/menu/32/"+node.getOpenIcon());
			//是否有子结点
			List<MenuEty> subList = menuDao.getListByParentId(node.getId());
			if(subList.size() > 0) {
				for (int j = 0; j < subList.size(); j++) {
					MenuEty secondNode = subList.get(j);
					secondNode.setIcon("images/menu/"+secondNode.getIcon());
					secondNode.setOpenIcon("images/menu/32/"+secondNode.getOpenIcon());
					secondNode.setMenuOrder(secondNode.getMenuOrder());
					secondNode.setLeaf(true);
				}
				node.setLeaf(false);
				node.setChildren(subList);
			}
			else {
				node.setLeaf(true);
			}
			dataArray.add(node);
		}
		return dataArray;
	}
	
	
	
	/**
	 * 添加或更改菜单
	 * @param request
	 * @param response
	 * @param menuEty
	 * @throws Exception
	 */
	@RequestMapping(value="add.sdo")
	public @ResponseBody JsonResult add(HttpServletRequest request, HttpServletResponse response, MenuEty menuEty) throws Exception {
		if(menuEty.getId() == null) {
			menuDao.insert(menuEty);
			logService.add(SSPConstant.LOG_DELETE, SSPConstant.LOG_TYPE_ROLE, menuEty.getId(), "菜单管理模块");
		} else { 
			menuDao.updateById(menuEty);
			logService.add(SSPConstant.LOG_UPDATA, SSPConstant.LOG_TYPE_ROLE, menuEty.getId(), "菜单管理模块");
		}
		return JsonResultFactory.success();
	}
	/**
	 * 根据 id删除菜单
	 * @param request id
	 * @throws Exception
	 */
	@RequestMapping(value="delete.sdo", method=RequestMethod.POST)
	public @ResponseBody Map<String,String> delete(@RequestParam("id") int id){
		Map<String,String> map = new HashMap<String, String>();
		
		if(menuDao.getUsingMenu(id)>0){
			map.put("result","error");
			map.put("info","该菜单已经被某角色使用，暂时不能删除！");
			return map;
		}
		menuDao.deleteById(id);
		functionDao.deleteByP_menu_id(id);
		logService.add(SSPConstant.LOG_DELETE, SSPConstant.LOG_TYPE_ROLE, id, "菜单管理模块");
		return map;
	}
	/**
	 * 查询图表列表
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("searchPic.sdo")
	public @ResponseBody JsonResult searchPic(HttpServletRequest request, HttpServletResponse response)throws Exception {
		List<PictureEty> picList = new ArrayList<PictureEty>();
		HttpSession session = request.getSession();
		ServletContext application = session.getServletContext();
		String Path = application.getRealPath("/") + "images/menu/32";
		Path = Path.replace("/", File.separator);
		File folderList = new File(Path);
		File list[] = folderList.listFiles();
		if (list != null && list.length > 0) {
			for (int i = 0; i < list.length; i++) {
				int index = list[i].toString().indexOf("menu");
				String path = list[i].toString().substring(index + 7,list[i].toString().length());
				PictureEty ety = new PictureEty();
				ety.setName(path.substring(1, path.indexOf(".")));
				ety.setUrl("images/menu/32" + path);
				picList.add(ety);
			}
		}
		return JsonResultFactory.extgrid(picList, picList.size());
	}

}
