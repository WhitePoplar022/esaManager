package com.esa.manager.services.mail;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.List;

import javax.mail.internet.MimeMessage;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

/**
 * 定时任务邮件发送器
 * @author User
 *
 */
public class TaskMailSender {
	
	private Logger logger = LogManager.getLogger(getClass());
	
	private JavaMailSender mailSender;
	
	private List<String> toList = new ArrayList<String>();
	
	private String from = "systeminformation@youku.com";
	
	private static String sysHost = "";
	
	static {
		try {
			sysHost = InetAddress.getLocalHost().toString();
		}
		catch(Exception e) {}
	}
	
	public void sendMail(String subject, String text) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
			helper.setFrom(from);
			
			String[] toArr = new String[toList.size()];
			toList.toArray(toArr);
			helper.setTo(toArr);
			helper.setSubject(subject + "[" + sysHost + "]");
			helper.setText(text, true);
			mailSender.send(message);
		} catch(Exception e) {
			logger.error(e.getMessage(), e);
		}
	}

	public List<String> getToList() {
		return toList;
	}

	public void setToList(List<String> toList) {
		this.toList = toList;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public JavaMailSender getMailSender() {
		return mailSender;
	}

	public void setMailSender(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}
	
}
