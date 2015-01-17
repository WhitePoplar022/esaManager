package com.esa.manager;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SSPConstant {
	 
	private SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

	public static final String LOG_LOGIN       = "登入";
	public static final String LOG_ADD       = "增加";                   
	public static final String LOG_DELETE    = "删除";                    
	public static final String LOG_UPDATA    = "修改";                    
	public static final String LOG_STATES    = "审批";                      
	
	public static final String LOG_TYPE_OPERATION    = "操作日志";           
	public static final String LOG_TYPE_ROLE    = "权限日志";    
	
	public String getFramctDate(Date date){
		return format.format(date);
	}
	/**
	 * 获取时间差的天数日期
	 * @param fDate
	 * @param oDate
	 * @return
	 */
	 public static List<String> getIntervalDays(String startDate, String endDate) throws Exception{
			List<String> date = new ArrayList<String>();//存日期
			
			SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd");
			
			Date sDate = new Date();
			Date eDate = new Date();
			
		    if (startDate.equals("") || endDate.equals("")) {
		       return date;
		    }else if(startDate.equals(endDate)){
		    	date.add(startDate);
			   return date;
		    }else{
		    	sDate = formatDate.parse(startDate);
				eDate = formatDate.parse(endDate);
		    }
		       
	       long intervalMilli = eDate.getTime() - sDate.getTime();
	       if(intervalMilli < 0)return date;
	       int day =  (int) (intervalMilli / (24 * 60 * 60 * 1000));
	       
	       date.add(startDate);
		   for(int i=0;i<day;i++){
			   Calendar cal = Calendar.getInstance();    
		       cal.setTime(sDate);    
		       cal.add(Calendar.DAY_OF_MONTH, 1);
		       date.add(formatDate.format(cal.getTime()));
		       sDate = cal.getTime();
		   }
			return date;
	    }
	 /**
     * 反射：填充字段值
     * @param T
     * @param keyName
     * @param paraValue
     */
	public static<T> void setClassMetodMap(Object T,String keyName,String paraValue){
		Map<String, Method> objMethodMap = new HashMap<String, Method>();
		getClassMethodMap(T.getClass(), objMethodMap);
		
		try {
			String fc = keyName.charAt(0) + "";
			keyName = keyName.replaceFirst(fc, fc.toUpperCase());
			String methodName = "set" + keyName;

			Method mthod = objMethodMap.get(methodName);
			Class<?>[] parasClass = mthod.getParameterTypes();
			Class<?> pc = parasClass[0];
			Object[] vaObjs = new Object[1];
			
			Constructor<?> cunstructor = pc.getConstructor(paraValue.getClass());					
			vaObjs[0] = cunstructor.newInstance(paraValue);
			mthod.invoke(T, vaObjs);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
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
	 * 指标汇总公式
	 * @param name
	 * @return
	 */
	public static String getSumFormulaStr(String parentName,String name){
		
		//CTR = 点击量 / 曝光量  【CTR = click_num/ imp】
		if(name.equalsIgnoreCase("CTR")){
			name = "(click_num/ imp)*100";
		}
		//渠道：竞价成功率 = 竞价成功次数 / 竞价请求数【bidding_suc_rate = bidding_suc_num / bidding_answer_num】
		else if(parentName != null && parentName.equalsIgnoreCase("channels_id") && name.equalsIgnoreCase("bidding_suc_rate")){
			name = "(bidding_suc_num / bidding_answer_num)*100";
		}
		//网站：竞价成功率 = 竞价成功次数 / 竞价请求数  【bidding_suc_rate = bidding_suc_num / bidding_req_num】
		else if(parentName != null && parentName.equalsIgnoreCase("website_id") && name.equalsIgnoreCase("bidding_suc_rate")){
			name = "(bidding_suc_num / bidding_req_num)*100";
		}
		//渠道：竞价应答率 = 竞价回应数 / 竞价请求数  【 bidding_answer_rate = bidding_answer_num / bidding_req_num】
		else if(name.equalsIgnoreCase("bidding_suc_rate")){
			name = "(bidding_answer_num / bidding_req_num)*100";
		}
		return name;
	}
}
