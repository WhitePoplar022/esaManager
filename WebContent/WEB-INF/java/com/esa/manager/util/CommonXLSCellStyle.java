package com.esa.manager.util;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;

public class CommonXLSCellStyle {
	
	private CellStyle cs_String;
	private CellStyle cs_Double;
	private CellStyle cs_Integer;
	private CellStyle cs_Float;
	private CellStyle cs_Date;
	private CellStyle cs_Id;

	private void createString(HSSFWorkbook wb) {
		cs_String = wb.createCellStyle();
		cs_String.setAlignment(HSSFCellStyle.ALIGN_LEFT);// 水平居左
		setCellStyle(cs_String, (short) 1);// 设置边框
	}

	private void createDate(HSSFWorkbook wb) {
		cs_Date = wb.createCellStyle();
		setCellStyle(cs_Date, (short) 1);// 设置边框
		cs_Date.setAlignment(HSSFCellStyle.ALIGN_CENTER);// 水平居中
	}

	private void createDouble(HSSFWorkbook wb, String doubleFormatStyle) {
		DataFormat format = wb.createDataFormat();
		cs_Double = wb.createCellStyle();
		setCellStyle(cs_Double, (short) 1);// 设置边框
		cs_Double.setAlignment(HSSFCellStyle.ALIGN_RIGHT);// 水平居中
		cs_Double.setDataFormat(format.getFormat(doubleFormatStyle));
	}

	private void createFloat(HSSFWorkbook wb) {
		cs_Float = wb.createCellStyle();
		setCellStyle(cs_Float, (short) 1);// 设置边框
		cs_Float.setAlignment(HSSFCellStyle.ALIGN_RIGHT);// 水平居右
	}

	private void createInteger(HSSFWorkbook wb) {
		//DataFormat format = wb.createDataFormat();
		cs_Integer = wb.createCellStyle();
		setCellStyle(cs_Integer, (short) 1);// 设置边框
		cs_Integer.setAlignment(HSSFCellStyle.ALIGN_RIGHT);// 水平居右
		//cs_Integer.setDataFormat(format.getFormat("#,###"));
	}
	
	private void createCsID(HSSFWorkbook wb) {
		cs_Id = wb.createCellStyle();
		setCellStyle(cs_Id, (short) 1);// 设置边框
		cs_Id.setAlignment(HSSFCellStyle.ALIGN_RIGHT);// 水平居右
	}

	private void setCellStyle(CellStyle style, short type) {
		style.setBorderBottom(type);// 下边框
		style.setBorderLeft(type);// 左边框
		style.setBorderRight(type);// 右边框
		style.setBorderTop(type);// 上边框
	}

	public void initCellStyle(HSSFWorkbook wb, String doubleFormatStyle) {
		createInteger(wb);
		createDouble(wb, doubleFormatStyle);
		createDate(wb);
		createString(wb);
		createFloat(wb);
		createCsID(wb);
	}
	
	public void initCellStyle(HSSFWorkbook wb) {
		this.initCellStyle(wb, "#,##0.000");
	}

	public CellStyle getCs_Id() {
		return cs_Id;
	}
	
	public CellStyle getCs_String() {
		return cs_String;
	}

	public CellStyle getCs_Double() {
		return cs_Double;
	}

	public CellStyle getCs_Integer() {
		return cs_Integer;
	}

	public CellStyle getCs_Float() {
		return cs_Float;
	}

	public CellStyle getCs_Date() {
		return cs_Date;
	}

}
