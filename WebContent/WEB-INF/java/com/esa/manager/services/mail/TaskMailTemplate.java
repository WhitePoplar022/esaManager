package com.esa.manager.services.mail;

public class TaskMailTemplate {
	
	private StringBuffer tableHtml;
	
	public static String commonStyle = "margin:auto;font-size: 14px;border-color: black;border-collapse: collapse;border-spacing: 0;width: 100%;";
	
	public static String tdStyle = "text-align: left;border: 1px solid black;";
	
	public TaskMailTemplate() {
		this(commonStyle);
	}
	
	public TaskMailTemplate(String style) {
		tableHtml = new StringBuffer("<table style=\"" + style + "\">");
	}
	
	public void addRow(String... tds) {
		tableHtml.append("<tr>");
		for(String t : tds) {
			tableHtml.append("<td style=\"" + tdStyle + "\">" + t + "</td>");
		}
		tableHtml.append("</tr>");
	}
	
	public void reset() {
		reset(commonStyle);
	}
	
	public void reset(String style) {
		tableHtml = new StringBuffer("<table style=\"" + style + "\">");
	}
	
	/**
	 * 在此之前确认是否已经调用tableEnd(),否则取到的table有可能不全
	 * @return
	 */
	public String getTableHtml() {
		if(!tableHtml.toString().endsWith("</table>")) {
			tableHtml.append("</table>");
		}
		return tableHtml.toString();
	}

	@Override
	public String toString() {
		return getTableHtml();
	}
	
}
