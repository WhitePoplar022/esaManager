package com.esa.manager.util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

public class AjaxOut {
	
	private static Logger logger = LogManager.getLogger(AjaxOut.class);

	/**
	 * 
	 * @param response
	 * @param s
	 */
	public static void responseText(HttpServletResponse response, String s) {
		response.setContentType("text/html;charset=utf-8");
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		try {
			PrintWriter out = response.getWriter();
			out.print(s);
			out.close();
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
	}
	
	public static void responseText(HttpServletResponse response, Object obj) {
		ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
		String json = "";
		try {
			json = ow.writeValueAsString(obj);
		} catch (JsonProcessingException e) {
			logger.error(e);
		}
		responseText(response, json);
		
	}
}
