package com.esa.manager.dao.mapper.ssp.task;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Select;

import com.esa.manager.dao.base.BaseDao;
import com.esa.manager.dao.entity.task.TaskEty;

public interface TaskDao extends BaseDao<TaskEty>{

	@Delete("delete from ssp_task where triggerName=#{value}")
	void deleteByTriggerName(String string);

	@Select("select * from ssp_task where triggerName=#{value}")
	TaskEty selectTriggerByTriggerName(String triggerName);
}
