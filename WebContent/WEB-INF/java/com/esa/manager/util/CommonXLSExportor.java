package com.esa.manager.util;

import java.text.SimpleDateFormat;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

public class CommonXLSExportor extends AbstractXLSExportor {

	public static CommonXLSExportor getExportor() {
		return new CommonXLSExportor();
	}

	public int addDataToSheet(HSSFWorkbook wb,HSSFSheet sheet,List<? extends Object> dataList,String[] exp_column_indexs, int startRowIndex) {
		int n = 0;
		for (int i = 0; i < dataList.size(); i++) {
			HSSFRow row = sheet.createRow(startRowIndex);
			Object dataObj = dataList.get(i);
			
			for (int j = 0; j < exp_column_indexs.length; j++) {
				Object cellValue = EntityReflect.getObjectProperty(dataObj, exp_column_indexs[j]);
				HSSFCell cell = row.createCell(j);
				if (cellValue == null) {
					cell.setCellType(HSSFCell.CELL_TYPE_STRING);
					cell.setCellStyle(getCommonStyle().getCs_String());
					cell.setCellValue("");
				} else {
					if (cellValue instanceof java.util.Date) {
						cell.setCellType(HSSFCell.CELL_TYPE_STRING);
						cell.setCellValue(new SimpleDateFormat("yyyy-MM-dd").format(cellValue));
						cell.setCellStyle(getCommonStyle().getCs_Date());
					} 
					else if(cellValue instanceof java.lang.Double) {
						cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
						cell.setCellValue((Double)cellValue);
						cell.setCellStyle(getCommonStyle().getCs_Double());
					}
					else if(cellValue instanceof java.lang.Integer) {
						cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
						cell.setCellValue((Integer)cellValue);
						if(isIDInString(exp_column_indexs[j],"id")){
							cell.setCellStyle(getCommonStyle().getCs_Id());
						}else{
							cell.setCellStyle(getCommonStyle().getCs_Integer());
						}
					}
					else if(cellValue instanceof java.lang.Float) {
						cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
						cell.setCellValue((Float)cellValue);
						cell.setCellStyle(getCommonStyle().getCs_Float());
					}
					else {
						cell.setCellType(HSSFCell.CELL_TYPE_STRING);
						cell.setCellValue(cellValue.toString());
						cell.setCellStyle(getCommonStyle().getCs_String());
					}
				}
			}
			startRowIndex++;
			n++;
		}
		return n;
	}
	
}
