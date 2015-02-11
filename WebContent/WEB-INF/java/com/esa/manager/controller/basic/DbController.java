package com.esa.manager.controller.basic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.esa.manager.dao.mapper.ssp.basic.DbDao;

@Controller
@RequestMapping(value="/basic/DbController/")
public class DbController {
	
	@Autowired DbDao dbDao;
	
	@RequestMapping(value="list.sdo")
	public @ResponseBody List<DbData> list() throws Exception {
		List<DbData> tables = dbDao.selectTables();
		for (int i = 0; i < tables.size(); i++) {
			List<DbForm> columns = dbDao.selectColumnsByTableName(tables.get(i));
			List<DbIndex> indexs = dbDao.selectIndexByTableName(tables.get(i));
			tables.get(i).setColumns(columns);
			tables.get(i).setIndexs(indexs);
		}
		return tables;
	}
	
}
