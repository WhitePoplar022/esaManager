package com.esa.manager.dao.mapper.ssp.basic;

import java.util.List;

import com.esa.manager.dao.base.BaseDao;
import com.esa.manager.dao.entity.basic.BaseData;

public interface BaseDataDao extends BaseDao<BaseData>{

	public List<BaseData> getBaseDataListByType(BaseData baseData);
}
