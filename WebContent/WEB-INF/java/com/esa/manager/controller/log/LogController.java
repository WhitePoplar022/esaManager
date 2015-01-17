package com.esa.manager.controller.log;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.esa.manager.dao.entity.log.LogEty;
import com.esa.manager.dao.mapper.ssp.log.LogDao;
import com.esa.manager.util.jsonresult.JsonResult;
import com.esa.manager.util.jsonresult.JsonResultFactory;
/**
 * 日志管理
 * 
 */
@Controller
@RequestMapping(value="/log/LogController/")
public class LogController {

	@Autowired
	private LogDao logDao;
	
	@InitBinder
	public void initBibder(WebDataBinder binder) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		df.setLenient(false);
		binder.registerCustomEditor(Date.class, new CustomDateEditor(df, true));
	}
	
	
	/**
	 * 日志：查询
	 * @param request
	 * @param response
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="list.sdo")
	public @ResponseBody JsonResult list(HttpServletRequest request, HttpServletResponse response, LogEty logEty) throws Exception {
		if(logEty.getLogType() != null  && logEty.getLogType().equals("全部")) logEty.setLogType(null);
		if(logEty.getOperationType() != null  && logEty.getOperationType().equals("全部")) logEty.setOperationType(null);
		int count = logDao.selectLimitCount(logEty);
		List<LogEty> list = logDao.selectByLimit(logEty);
		return JsonResultFactory.extgrid(list, count);
	}
}
