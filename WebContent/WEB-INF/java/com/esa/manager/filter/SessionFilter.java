package com.esa.manager.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * sessionfilter
 * 
 * 
 */
public class SessionFilter implements Filter {
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		if(request instanceof HttpServletRequest) {
			HttpServletRequest httpServletRequest = (HttpServletRequest) request;
			String url = httpServletRequest.getRequestURI();// 得到请求URL
			if (!SessionUtil.ifFlagExistInSession(httpServletRequest)
					&& !url.endsWith(SessionUtil.AuthTest)
					&& !url.endsWith(SessionUtil.Main)
					&& !url.endsWith(SessionUtil.MainDo)
					&& !url.endsWith(SessionUtil.MainExt)
					
					&& !url.endsWith(SessionUtil.CASLogin)
					&& !url.endsWith(SessionUtil.NoResource)
					&& !url.endsWith(SessionUtil.Index)
					&& !url.endsWith(SessionUtil.Index_JSP) 
					&& !url.endsWith(SessionUtil.Validate)
					&& !url.endsWith(SessionUtil.Error) 
					&& !url.endsWith(SessionUtil.Login) 
					&& !url.endsWith(SessionUtil.Redirect) 
					&& !url.endsWith(SessionUtil.LoginAction) 
					&& !url.endsWith(SessionUtil.LogOutAction) 
					&& !url.endsWith(SessionUtil.JS) 
					&& !url.endsWith(SessionUtil.GZIPFILE)
					&& !url.endsWith(SessionUtil.CSS)
					&& !url.endsWith(SessionUtil.ICO)
					&& !url.endsWith(SessionUtil.IsTransCodeAtion)
					&& !url.contains(SessionUtil.WEBSERVICE)
					&& !url.endsWith(SessionUtil.JPG) 
					&& !url.endsWith(SessionUtil.GIF) 
					&& !url.endsWith(SessionUtil.PNG)
					&& !url.endsWith(SessionUtil.SVG)
					&& !url.endsWith(SessionUtil.WOFF)
				) 
			{
				if (response instanceof HttpServletResponse) {
					HttpServletResponse httpServletResponse = (HttpServletResponse) response;
					httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + "/login.jsp");
					return;
				}
			}
		}
		
		try {
			chain.doFilter(request, response);
		}
		catch (Exception e) {
		}
	}

	public void destroy() {
	}

}