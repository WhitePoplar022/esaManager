package com.esa.manager.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

/**
 * http请求工具类
 *
 */
@Service
public class ClientRequest {
	
	/**
	 * 发起一个异步请求，请求将在新的线程中完成
	 * @param url
	 * @throws Exception
	 */
	public void ajaxRequest(final String url) throws Exception {
		new Thread(new Runnable() {
			public void run() {
				try {
					request(url, null);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}).start(); 
	}
	
	/**
	 * 执行请求
	 * @param url
	 * @return
	 * @throws Exception
	 */
	public String request(final String url) throws Exception {
		return request(url, null);
	}
	
	/**
	 * 执行请求
	 * @param url 地址
	 * @param paramMap 参数
	 * @return
	 * @throws Exception
	 */
	public String request(String url, Map<String, String> paramMap) throws Exception {
		List<NameValuePair> qparams = new ArrayList<NameValuePair>();
		if(paramMap != null) {
			for(String s : paramMap.keySet()) {
				qparams.add(new BasicNameValuePair(s, paramMap.get(s)));
			}
		}
		String retStr = executeRequest(url, qparams);
		return retStr;
	}

	/**
	 * 执行http请求
	 * @param url 请求地址
	 * @param qparams 参数列表
	 * @return
	 * @throws Exception
	 */
	private String executeRequest(String url, List<NameValuePair> qparams) throws Exception {
		HttpParams httpParameters = new BasicHttpParams();
		int timeoutConnection = 1000 * 10;
		int timeoutSocket = 1000 * 60 * 10;
		HttpConnectionParams.setConnectionTimeout(httpParameters, timeoutConnection);
		HttpConnectionParams.setSoTimeout(httpParameters, timeoutSocket);
		
		DefaultHttpClient client = new DefaultHttpClient(httpParameters);
		Header header = new BasicHeader("User-Agent", "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.1)");
		
		HttpPost post = new HttpPost(url);
		
		post.setEntity(new UrlEncodedFormEntity(qparams, HTTP.UTF_8));
		post.addHeader(header);
		HttpResponse response = client.execute(post);
		return EntityUtils.toString(response.getEntity());
	}
}
