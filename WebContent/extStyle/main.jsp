<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<c:set var="ctx" value='${pageContext.request.contextPath+"/extStyle"}'></c:set>
<c:set var="version" value="${applicationScope.SysVersion}"></c:set>

<!DOCTYPE html>
<html>
<head>
	<title>esa商家系统</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="Shortcut Icon" href="images/favicon.ico" />
	<link rel="stylesheet" title="neptune" type="text/css" href="${ctx}/Ext/packages/ext-theme-neptune/build/resources/ext-theme-neptune-all-rtl.css">      
	<link rel="stylesheet" title="crisp" type="text/css" href="${ctx}/Ext/packages/ext-theme-crisp/build/resources/ext-theme-crisp-all.css">      
	<link rel="stylesheet" title="classic" type="text/css" href="${ctx}/Ext/packages/ext-theme-classic/build/resources/ext-theme-classic-all.css">      
	<link rel="stylesheet" title="gray" type="text/css" href="${ctx}/Ext/packages/ext-theme-gray/build/resources/ext-theme-gray-all.css">      
	
	<link rel="stylesheet" type="text/css" href="${ctx}/css/app.css?v=${version}">
	<link rel="stylesheet" type="text/css" href="${ctx}/css/imageChooser.css?v=${version}">
	
	<script src="${ctx}/Ext/ext-all.js"></script>
	<script src="${ctx}/Ext/packages/ext-charts/build/ext-charts.js"></script>
	<script src="${ctx}/Ext/packages/ext-locale/build/ext-locale-zh_CN.js"></script>
	<script src="${ctx}/js/jQuery/jquery-1.4.4.min.js"></script>
	
	<!-- jquery 以及hight chart -->
	<script src="${ctx}/ssp/util/export.js?v=${version}"></script>
	<script src="${ctx}/ssp/util/gridToExcel.js?v=${version}"></script>
	<script src="${ctx}/ssp/util/UtilFun.js?v=${version}"></script>
	<script src="${ctx}/ssp/util/DateUtilSelect.js?v=${version}"></script>
	<script src="${ctx}/js/Highcharts-3.0.5/js/highcharts.js?v=1.0"></script>
	<script type="text/javascript">
		var globalCtx = '${ctx}';
		var userName = '${name}';
		var userId = '${userId}';
	</script>
	<script src="app.js?v=${version}"></script>
</head>
<body>
</body>
</html>
