package com.esa.manager.util;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.reflect.MethodUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class EntityReflect<T> {
	
	private static Logger logger = LogManager.getLogger(EntityReflect.class);
	
	public static Object getObjectProperty(Object obj, String property) {
		if(property == null || property.trim().equals(""))
			return "";
		String method = "get";
		String ch = property.charAt(0) + "";
		property = property.replaceFirst(ch, ch.toUpperCase());
		return invokeGetMethod(obj, method + property);
	}
	
	private static Object invokeGetMethod(Object obj, String methodName) {
		Object retObj = null;
		try {
			retObj = MethodUtils.invokeExactMethod(obj, methodName, new Object[]{});
		} catch (Exception e) {
			return null;
		}
		return retObj;
	}
	
	public static Object invokeMethod(Object obj, String methodName, Object param) {
		Object[] params = new Object[1];
		params[0] = param;
		return invokeMethod(obj, methodName, params);
	}
	
	public static Object invokeMethod(Object obj, String methodName, Object[] params) {
		Object retObj = null;
		try {
			retObj = MethodUtils.invokeExactMethod(obj, methodName, params);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return retObj;
	}
	
	public static<T> T createObjectFromRequest(HttpServletRequest request, Class<T> c) {
		try {
			T obj = c.newInstance();
			mappingMapToObject(request, obj);
			return obj;
		} catch (InstantiationException e) {
			logger.error(e.getMessage(), e);
		} catch (IllegalAccessException e) {
			logger.error(e.getMessage(), e);
		}
		
		return null;
	}
	
	private static<T> void getClassMethodMap(Class<T> cls, Map<String, Method> objMethodMap) {
		if(objMethodMap == null)
			objMethodMap = new HashMap<String, Method>();
		
		Method[] methods = cls.getDeclaredMethods();
		for(Method m : methods) 
			objMethodMap.put(m.getName(), m);
		
		if(cls.getSuperclass() != null) {
			getClassMethodMap(cls.getSuperclass(), objMethodMap);
		}
	}
	
	/**
	 * 将request对象中的值放入到实体中<br>
	 * 如果request既不是RequestEncodingPostWrapper也不是RequestEncodingWrapper，则说明是Ajax请求<b>
	 * 用此方法时，用Ajax提交的form不能用get方式，否则form中的中文会有乱码
	 * @param request
	 * @param object
	 */
	private static void mappingMapToObject(HttpServletRequest request, Object object) {
		try {
			Iterator<String> itor = request.getParameterMap().keySet().iterator();
			
			Map<String, Method> objMethodMap = new HashMap<String, Method>();
			getClassMethodMap(object.getClass(), objMethodMap);
			
			while(itor.hasNext()) {
				try {
					String keyName = itor.next();
					String paraValue = request.getParameter(keyName);
					
					if(request.getMethod().equalsIgnoreCase("GET")) {
						try {
							paraValue = java.net.URLDecoder.decode(paraValue,"UTF-8");
						}
						catch (Exception e) {
							logger.error(e.getMessage(), e);
						}
					}
					
					String fc = keyName.charAt(0) + "";
					keyName = keyName.replaceFirst(fc, fc.toUpperCase());
					String methodName = "set" + keyName;

					Method mthod = objMethodMap.get(methodName);
					Class<?>[] parasClass = mthod.getParameterTypes();
					Class<?> pc = parasClass[0];
					Object[] vaObjs = new Object[1];
					
					if(pc.getName().equals(Date.class.getName())) {//如果是时间类型，则进行格式化
						vaObjs[0] = org.apache.commons.lang3.time.DateUtils.parseDate(paraValue, "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd", "yyyy-MM");
					}
					else {
						Constructor<?> cunstructor = pc.getConstructor(paraValue.getClass());					
						vaObjs[0] = cunstructor.newInstance(paraValue);
					}
					mthod.invoke(object, vaObjs);
				}
				catch (Exception e) {
				}
			}
		}
		catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
	}
 }
