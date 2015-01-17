package com.esa.manager.util;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.esa.manager.dao.base.BaseEntity;


public abstract class AbstractXLSExportor {

	private static Logger logger = LogManager.getLogger(CommonXLSExportor.class);

	private CommonXLSCellStyle commonStyle = new CommonXLSCellStyle();

	public void export(HttpServletRequest request, HttpServletResponse response, Object baseDao, String countMethod, String dataMethod, BaseEntity paramObj, String title, String fileName, ExtLimit limit) throws Exception {
		String[] exp_column_names = limit.getExp_column_names().split(",");
		String[] exp_column_indexs = limit.getExp_column_indexs().split(",");
		doExport(request, response, baseDao, countMethod, dataMethod, paramObj, title, fileName, exp_column_names, exp_column_indexs);
	}

	/**
	 * 
	 * @param request
	 * @param response
	 * @param baseDao
	 * @param countMethod 记录数方法名称
	 * @param dataMethod 分页查询方法名称
	 * @param paramObj
	 * @param title
	 * @param exp_column_names
	 * @param exp_column_indexs
	 */
	public void doExport(HttpServletRequest request, HttpServletResponse response, Object baseDao, String countMethod, String dataMethod, BaseEntity paramObj, String title, String fileName, String[] exp_column_names, String[] exp_column_indexs) throws Exception {
		try {
			if (exp_column_names == null || exp_column_names.length == 0 || exp_column_indexs == null || exp_column_indexs.length == 0 || exp_column_indexs.length != exp_column_names.length)
				return;

			HSSFWorkbook wb = new HSSFWorkbook();
			commonStyle.initCellStyle(wb);

			int count = (Integer) EntityReflect.invokeMethod(baseDao, countMethod, paramObj);
			int startOffset = 0;
			int pageSize = 4000;
			if (paramObj.getExtLimit() == null) {
				ExtLimit limit = new ExtLimit();
				paramObj.setExtLimit(limit);
			}
			paramObj.getExtLimit().setLimit(pageSize);
			int rowIndex = 0;
			int sheetIndex = 1;
			HSSFSheet sheet = null;

			// 生成数据
			while (startOffset < count) {
				paramObj.getExtLimit().setStart(startOffset);

				@SuppressWarnings("unchecked")
				List<Object> dataList = (List<Object>) EntityReflect.invokeMethod(baseDao, dataMethod, paramObj);

				if (startOffset % 50000 == 0) {// 需要新sheet
					sheet = wb.createSheet(title + "(" + sheetIndex + ")");
					rowIndex += createHeader(wb, sheet, wb.createCellStyle(), exp_column_names, title);
					sheetIndex++;
				}

				// 生成数据
				rowIndex += addDataToSheet(wb, sheet, dataList, exp_column_indexs, rowIndex);
//				addSumRowData(wb, dataList, sheet, exp_column_indexs, rowIndex);
				startOffset += dataList.size();
			}

			sheet.autoSizeColumn(0); // 根据内容自动调整宽度

			exportWorkbook(response, wb, fileName);
		} catch (Exception e) {
			logger.error("导出数据错误！", e);
			throw e;
		}
	}

	/**
	 * 导出数据<br>
	 * 该方法适用于小数据量导出，如果数据量超过2000条，不宜使用，否则会造成内存溢出
	 * 
	 * @param request
	 * @param response
	 * @param dataList 导出的数据列表
	 * @param title 标题
	 * @param limit 导出的表头以及数据列信息
	 */
	public void export(HttpServletRequest request, HttpServletResponse response, List<? extends Object> dataList, String exportTitle, ExtLimit limit) throws Exception {
		this.export(request, response, dataList, exportTitle, limit, "#,##0.000");
	}
	
	/**
	 * 导出数据，支持double金额自定义数据格式。<br>
	 * 该方法适用于小数据量导出，如果数据量超过2000条，不宜使用，否则会造成内存溢出
	 * 
	 * @param request
	 * @param response
	 * @param dataList 导出的数据列表
	 * @param doubleFormatStyle double数据格式化样式 #,##0.000
	 * @param title 标题
	 * @param limit 导出的表头以及数据列信息
	 */
	public void export(HttpServletRequest request, HttpServletResponse response, List<? extends Object> dataList, String exportTitle, ExtLimit limit, String doubleFormatStyle) throws Exception {
		try {
			HSSFWorkbook wb = new HSSFWorkbook();
			commonStyle.initCellStyle(wb, doubleFormatStyle);
			HSSFSheet sheet = wb.createSheet(exportTitle);

			String[] exp_column_names = limit.getExp_column_names().split(",");
			String[] exp_column_indexs = limit.getExp_column_indexs().split(",");
			
			int rowIndex = 0;
			// 生成数据列的表头
			rowIndex += createHeader(wb, sheet, wb.createCellStyle(), exp_column_names, exportTitle);

			// 生成数据
			rowIndex += addDataToSheet(wb, sheet, dataList, exp_column_indexs, rowIndex);
			//addSumRowData(wb, dataList, sheet, exp_column_indexs, rowIndex);

//			for (int j = 0; j < exp_column_names.length; j++) {
//				sheet.autoSizeColumn(j); // 根据内容自动调整宽度
//			}

			exportWorkbook(response, wb, limit.getExp_name());
		} catch (Exception e) {
			logger.error("导出数据错误！", e);
			throw e;
		}
	}

	public void exportWorkbook(HttpServletResponse response, HSSFWorkbook wb, String fileName) throws Exception {
		if (fileName == null) {
			fileName = "数据表";
		}

		response.setHeader("Content-Disposition", "attachment;filename=\"" + new String(fileName.getBytes("GBK"), "ISO8859_1") + "\"");
		response.setHeader("Pragma", "public");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		response.setContentType("application/vnd.ms-excel" + ";charset=UTF-8");
		wb.write(response.getOutputStream());
		response.getOutputStream().flush();
		response.getOutputStream().close();
	}

	/**
	 * 创建标题、以及首行属性
	 * 
	 * @param wb
	 * @param sheet
	 * @param style
	 * @param exp_column_names
	 * @param headerTitle
	 * @return
	 */
	public int createHeader(HSSFWorkbook wb, HSSFSheet sheet, HSSFCellStyle style, String[] exp_column_names, String headerTitle) {
		int rowIndex = 0;
		// 设置主标题
//		createSheetTitle(wb, sheet, exp_column_names, headerTitle);

		// 设置列标题
		createColumnsTitle(wb, sheet, exp_column_names, rowIndex++);
		return rowIndex;
	}


	/**
	 * 设置列表标题
	 * 
	 * @param wb
	 * @param sheet
	 * @param columns
	 */
	public void createColumnsTitle(HSSFWorkbook wb, HSSFSheet sheet, String[] columns, int rowIndex) {
		// 创建第一行列标题样式
		HSSFCellStyle style = wb.createCellStyle();
		HSSFRow row = sheet.createRow(rowIndex);

		// 设置第一行列标题字体
		HSSFFont fristFont = wb.createFont();
		fristFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);// 设置粗体
		style.setFont(fristFont);// 将字体加入到样式对象

		// 设置第一行列标题对齐方式
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER_SELECTION);// 水平居中
		style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);// 垂直居中

		for (int j = 0; j < columns.length; j++) {
			HSSFCell cell = row.createCell(j);
			cell.setCellStyle(style);
			setCellStyleBorder(style, (short) 1);
			cell.setCellType(HSSFCell.CELL_TYPE_STRING);
			cell.setCellValue(columns[j]);
		}
	}

	/**
	 * 数据列的转换成ABC...
	 * 
	 * @param i
	 * @return
	 */
	public String getColumnNumByABC(int n) {
		if (n <= 25) {
			char ret = (char) (n + 65);
			return ret + "";
		} else {
			int mn = n / 26;
			int mod = n % 26;
			char modChar = (char) (mod + 65);
			String retStr = modChar + "";
			retStr = getColumnNumByABC(mn - 1) + retStr;
			return retStr;
		}
	}

	/**
	 * 设置边框
	 * 
	 * @param style
	 * @param type
	 */
	public void setCellStyleBorder(HSSFCellStyle style, short type) {
		style.setBorderBottom(type);// 下边框
		style.setBorderLeft(type);// 左边框
		style.setBorderRight(type);// 右边框
		style.setBorderTop(type);// 上边框
	}

	/**
	 * 此字段是否包含ID字段
	 * 
	 * @param bigStr
	 * @param smallStr
	 * @return
	 */
	public static boolean isIDInString(String CellStr, String idStr) {
		if (CellStr.toUpperCase().indexOf(idStr.toUpperCase()) > -1)
			return true;
		return false;
	}

	public CommonXLSCellStyle getCommonStyle() {
		return commonStyle;
	}
	
	public abstract int addDataToSheet(HSSFWorkbook wb, HSSFSheet sheet, List<? extends Object> dataList, String[] exp_column_indexs, int startRowIndex);

}
