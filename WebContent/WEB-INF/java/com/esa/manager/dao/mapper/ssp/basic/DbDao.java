package com.esa.manager.dao.mapper.ssp.basic;
import java.util.List;

import com.esa.manager.controller.basic.DbData;
import com.esa.manager.controller.basic.DbForm;
import com.esa.manager.controller.basic.DbIndex;
import com.esa.manager.dao.base.BaseDao;
public interface DbDao extends BaseDao<DbData>{
	
	public List<DbData> selectTables();
	
	public List<DbForm> selectColumnsByTableName(DbData dbdata);
	
	
	public List<DbIndex> selectIndexByTableName(DbData dbdata);
}
