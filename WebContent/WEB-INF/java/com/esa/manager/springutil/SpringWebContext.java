package com.esa.manager.springutil;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.esa.manager.dao.entity.basic.UserEty;

public class SpringWebContext {
	
	/**
	 * 得到登录用户
	 * @return
	 */
	public static UserEty getUser() {
		return (UserEty) getRequest().getSession().getAttribute("UserEty");
	}
	
	
	public static HttpServletRequest getRequest() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		return request;
	}
	

}
