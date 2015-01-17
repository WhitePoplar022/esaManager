package com.esa.manager.services.basic;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.esa.manager.dao.mapper.ssp.basic.UserDao;

@Service(value = "UserRoleService")
@Scope(value = "singleton")
public class UserRoleService {
	
	@Autowired
	private UserDao userDao;
	
	/**
	 * 配置角色用户
	 * @param userId
	 * @param roleIds
	 */
	@Transactional(propagation=Propagation.REQUIRES_NEW, rollbackFor=java.lang.Exception.class)
	public void saveUserRole(Integer userId, String roleIds) {
		
		userDao.deleteRole(userId);
		String[] roleList =  roleIds.split(",");
		Map<String,Integer> userMap = new HashMap<String,Integer>();
		userMap.put("userId", userId);
		for (int i = 0; i < roleList.length; i++) {
			userMap.put("roleId", Integer.parseInt(roleList[i]));
			userDao.insertRole(userMap);
		}
	}
}
