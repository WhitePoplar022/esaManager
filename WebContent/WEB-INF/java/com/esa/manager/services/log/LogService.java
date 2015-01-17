package com.esa.manager.services.log;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.esa.manager.dao.entity.basic.UserEty;
import com.esa.manager.dao.entity.log.LogEty;
import com.esa.manager.dao.mapper.ssp.log.LogDao;
import com.esa.manager.springutil.SpringWebContext;

/**
 * Log管理 Service
 * @author
 *
 */
@Service("logService")
public class LogService {

	@Autowired
	private LogDao logDao;
	
	/**
	 * 记入日志
	 * @param operationType  删除、修改、新增、审批..有枚举类进行维护
	 * @param logType        操作日志，权限日志
	 * @param businessId     模块ID ：操作数据ID
	 * @param businessName   模块名称：广告位、物料管理、权限管理
	 */
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=java.lang.Exception.class)
	public void add(String operationType,String logType,Integer businessId,String businessName) {
		
		UserEty ue = SpringWebContext.getUser();
		
		LogEty ye = new LogEty();
		ye.setUserId(ue.getId());//用户ID
		ye.setUserName(ue.getName());//用户名称
		ye.setCreateTime(new Date());//操作日期
		ye.setIp(getVisitIP());//操作IP
		ye.setOperationType(operationType);//操作类型
		ye.setLogType(logType);//日志类型
		ye.setBusinessId(businessId);//操作数据ID
		ye.setBusinessName(businessName);//操作模块名称
		
		logDao.insert(ye);//插入
	}
	
	
	private String getVisitIP() {
		try {
			String ip = SpringWebContext.getRequest().getHeader("X-Forwarded-For");
			if (ip == null || ip.equals("")) {
				ip = SpringWebContext.getRequest().getRemoteAddr();
			}
			if (ip.indexOf(",") != -1) {
				String tmp[] = ip.split(",");
				ip = tmp[tmp.length - 1].trim();
			}
			return ip;
		}
		catch (Exception e) {
			return "";
		}
	}
}
