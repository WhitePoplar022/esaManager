<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 

<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<c:set var="version" value="${applicationScope.SysVersion}"></c:set>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>菜单管理</title>
		<meta name="title" content="esa商家系统"/>
	    <meta name="application-name" content="esa商家系统" />
	    
		<link rel="stylesheet" type="text/css" href="${ctx}/frame/jquery/jqGrid-4.7.0/css/ui.jqgrid.css"/>
		<script src="${ctx}/frame/jquery/jqGrid-4.7.0/js/jquery.jqGrid.src.js" type="text/javascript" ></script>

		
		<script type="text/javascript" src="dsp/basic/Menu.js"></script>
		
	</head>
	<body>
				<table id="list"></table>
				<div id="pager"></div>

	</body>
</html>