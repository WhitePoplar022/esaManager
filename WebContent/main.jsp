<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<c:set var="version" value="${applicationScope.SysVersion}"></c:set>
<!DOCTYPE html>
<!--[if IE 8]> <html  class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html  class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html class="no-js"  ng-app="main" >
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>

<meta charset="utf-8"/>
<title>商家登陆系统</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<meta content="Angular+Bootstrap+Jquery界面DEMO" name="description"/>
<meta content="think" name="author"/>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<link rel="shortcut icon" href="images/favicon.ico"/>
<!-- BEGIN 插件 c s s -->
<link href="${ctx}/font/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
<link href="${ctx}/font/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css"/>
<link href="${ctx}/frame/bootstrap/bootstrap3.2.0/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
<link href="${ctx}/frame/bootstrap/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css"/>
<link href="${ctx}/frame/bootstrap/bootstrap-toastr/toastr.min.css" rel="stylesheet" type="text/css"/>

<!-- END 插件 c s s -->
<!-- BEGIN 主界面c s s-->
<link href="${ctx}/css/main/metro.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/css/main/layout.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/frame/jquery/jquery-ui/jquery-ui-1.10.3.custom.min.css" rel="stylesheet">
<link href="${ctx}/frame/util/datatables/plugins/bootstrap/dataTables.bootstrap.css" rel="stylesheet" />
<link href="${ctx}/frame/bootstrap/bootstrap-select/bootstrap-select.min.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/frame/util/select2/select2.css" rel="stylesheet" type="text/css"/>

<link href="${ctx}/css/themes/default.css" rel="stylesheet" type="text/css" id="style_color"/>
<!-- END 主界面c s s -->
<script type="text/javascript">var version="${version}";var ctx = '${ctx}';var app; </script>
</head>

<body ng-controller="TabPanelList" class="page-header-fixed page-quick-sidebar-over-content page-sidebar-closed-hide-logo ">

<!-- BEGIN 头部栏 -->
<div class="page-header navbar navbar-fixed-top">
	<!-- BEGIN HEADER INNER -->
	<div class="page-header-inner">
		<!-- L o g o -->
		<div class="page-logo">
			<a href="#">
			<img src="images/logo.png" height="46px" alt="" class="logo-default"/>
			</a>
		    <div class="menu-toggler sidebar-toggler">
			</div>
			
		</div>
		<!-- END L o g o -->
		<!-- BEGIN RESPONSIVE MENU TOGGLER -->
		<a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
		</a>
		<div class="hor-menu ">
		        <ul  class="nav navbar-nav main-top-page"  > 
		            <li class="classic-menu-dropdown"  ng-repeat="tab in tabs" ng-class="{true: 'active current', false: ''}[isActiveTab(tab.url)]" ng-dblclick="onDblClickMenu(tab)"   ng-click="onClickTab(tab)">
		              
		                <a  href="javascript: void(0)"  data-toggle="tab">
		                 <div class="caption"  >
								<i class="{{tab.icon}} "></i>
								<span class="caption-subject bold uppercase"> {{tab.name}}	</span>
								<i ng-click="onCloseTab(tab)"   ng-class="{hide:isHideClose(tab.url)} " style="cursor: pointer;"  class="icon-close main_close"></i>
							</div>	
							<span class="selected"></span>
								
		                </a>
		            </li>
		        </ul>
		</div>
		
		<!-- END RESPONSIVE MENU TOGGLER -->
		<!-- BEGIN TOP NAVIGATION MENU -->
		<div class="top-menu">
			<ul class="nav navbar-nav pull-right">
				<!-- BEGIN 用户信息界面 -->
				<li class="dropdown dropdown-user">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
						<img alt="" class="img-circle hide1" src="images/yt_u.png"/>
						<span class="username username-hide-on-mobile"> 管理员 </span>
						<i class="fa fa-angle-down"></i>
					</a>
					<ul class="dropdown-menu">
						<li>
							<a href="#">
							<i class="icon-user"></i> 个人信息 </a>
						</li>
						<li>
							<a href="#">
							<i class="icon-calendar"></i>修改密码</a>
						</li>
						<li>
							<a href="#">
							<i class="icon-envelope-open"></i>我的消息 <span class="badge badge-danger">5 </span>
							</a>
						</li> 
						<li class="divider">
						</li>
						<li>
							<a href="#">
							<i class="icon-lock"></i> 锁屏 </a>
						</li>
						<li>
							<a  data-toggle="modal" href="#main_logo_out" >
							<i class="icon-key"></i> 退出 </a>
						</li>
					</ul>
				</li>
				<!-- END 用户信息界面 -->
						
				 <!-- BEGIN STYLE CUSTOMIZER -->
				<li  >
					<div class="theme-panel ">
						<div class="toggler" title="系统设置" >
						</div>
						<div class="toggler-close">
						</div>
						<div class="theme-options">
							<div class="theme-option theme-colors clearfix">
								<span>
								主题 颜色 </span>
								<ul>
									<li class="color-default current tooltips" data-style="default" data-container="body" data-original-title="纯黑">
									</li>
									<li class="color-blue tooltips" data-style="blue" data-container="body" data-original-title="蓝色">
									</li>
									<li class="color-grey tooltips" data-style="grey" data-container="body" data-original-title="深灰">
									</li>
									<li class="color-light tooltips" data-style="light" data-container="body" data-original-title="明亮">
									</li>
									<li class="color-light2 tooltips" data-style="light2" data-container="body" data-html="true" data-original-title="纯白">
									</li>
									<li class="color-youku tooltips" data-style="youku" data-container="body" data-html="true" data-original-title="优酷主要色">
									</li>
								</ul>
							</div>
							<div class="theme-option">
								<span>
								布局 </span>
								<select class="layout-option form-control input-small">
									<option value="fluid" selected="selected">自适应</option>
									<option value="boxed">固定</option>
								</select>
							</div>
							<div class="theme-option">
								<span>
								顶部</span>
								<select class="page-header-option form-control input-small">
									<option value="fixed" selected="selected">固定</option>
									<option value="default">随内容滚动</option>
								</select>
							</div>
							
							<div class="theme-option">
								<span>
								菜单栏滚动 </span>
								<select class="sidebar-option form-control input-small">
									<option selected="selected"  value="fixed">固定</option>
									<option value="default" >随内容滚动</option>
								</select>
							</div>
							<div class="theme-option">
								<span>
								菜单栏打开方式 </span>
								<select class="sidebar-menu-option form-control input-small">
									<option value="accordion" selected="selected">传统</option>
									<option value="hover">鼠标Hover</option>
								</select>
							</div>
							<div class="theme-option">
								<span>
								菜单栏高亮</span>
								<select class="sidebar-style-option form-control input-small">
									<option value="default" >高亮</option>
									<option value="light" selected="selected" >侧边高亮</option>
								</select>
							</div>
							<div class="theme-option">
								<span>
								菜单栏停靠</span>
								<select class="sidebar-pos-option form-control input-small">
									<option value="left" selected="selected">左侧</option>
									<option value="right">右侧</option>
								</select>
							</div>
							<div class="theme-option">
								<span>
								底部栏 </span>
								<select class="page-footer-option form-control input-small">
									<option value="fixed" selected="selected" >固定</option>
									<option value="default" >随内容滚动</option>
								</select>
							</div>
						</div>
					</div>
				</li>
				
				<!-- BEGIN 打开关闭快捷菜单 -->
				<li class="dropdown dropdown-quick-sidebar-toggler">
					<a href="javascript:;" class="dropdown-toggle">
					<i class="icon-logout"></i>
					</a>
				</li>
				<!-- END 打开关闭快捷菜单 -->
			</ul>
		</div>
		<!-- END TOP NAVIGATION MENU -->
	</div>
	<!-- END HEADER INNER -->
</div>
<!-- END 头部栏 -->
<div class="clearfix">
</div>
<!-- BEGIN CONTAINER -->
<div class="page-container">
	<!-- BEGIN SIDEBAR -->
	<div class="page-sidebar-wrapper">
		<div ng-controller="MainMenuList" class="page-sidebar navbar-collapse collapse">
			<!-- BEGIN SIDEBAR MENU -->
			<ul class="page-sidebar-menu page-sidebar-menu-hover-submenu page-sidebar-menu-light" data-auto-scroll="true" data-slide-speed="200">
				
				<!-- 左侧slider菜单 width angular -->
			    <li ng-click="onClickMenu(menu)"  ng-class="{active:menu.isac}" class="start"  ng-repeat="menu in menus"  >
			       <a href="javascript:;">
					<i class="{{menu.icon}}"></i>
					<span class="title">{{menu.name}}</span>
					<span class="selected"></span>
					<span ng-class="{hide:isLeaf(menu.leaf)}"  class="arrow"></span>
					</a>
					<ul  class="sub-menu" ng-class="{true: 'always-open', false: ''}[isLeafAndNoMenus(menu)]"   >
						<li ng-repeat="subMenu in menu.menus">
							<a   ng-click="onClickMenu(subMenu)"  class="active"  href="javascript: void(0)" ><i class="{{subMenu.icon}}"> </i>{{subMenu.name}}</a>
						</li>
					</ul>
			    </li>
			    <!-- End Width 左侧菜单 -->
			</ul>
			<!-- END SIDEBAR MENU -->
		</div>
	</div>
	<!-- END SIDEBAR -->
	<!-- 主界面tab Width angular -->
	<div class="page-content-wrapper" style="height:100%;">
		<div class="page-content " style="height:100%;"  >
        	<div  class=" tabbable tabbable-custom tabbable-full-width tabbable-full-height"  >
		        <ul  class="nav nav-tabs main-center-page" > 
		            <li style="list-style: none;float: left;"  ng-repeat="tab in tabs" ng-class="{active:isActiveTab(tab.url)} " ng-dblclick="onDblClickMenu(tab)"   ng-click="onClickTab(tab)">
		              
		                <a  href="javascript: void(0)"  data-toggle="tab">
		                 <div class="caption"  >
								<i class="{{tab.icon}} "></i>
								<span class="caption-subject bold uppercase"> {{tab.name}}	</span>
								<i ng-click="onCloseTab(tab)"   ng-class="{hide:isHideClose(tab.url)} " style="cursor: pointer;"  class="icon-close main_close"></i>
							</div>	
								
		                </a>
		            </li>
		        </ul>
		        <div class="tab-content" style="height: 100%;"  ng-class="{hide:showWitchTab(tab.url)} " ng-repeat="tab in tabs" >
		            <div ng-include="tab.url"  ></div>
		        </div>
			</div>
		  </div>  
	</div>
	<!-- END 主界面tab  -->
	<!-- BEGIN QUICK SIDEBAR -->
	<a href="javascript:;" class="page-quick-sidebar-toggler"><i class="icon-close"></i></a>
	<div class="page-quick-sidebar-wrapper">
		<div class="page-quick-sidebar">
			<div class="nav-justified">
				<ul class="nav nav-tabs nav-justified">
					
					<li class="active">
						<a href="#quick_sidebar_tab_1" data-toggle="tab">
						消息公告<span class="badge badge-success">7</span>
						</a>
					</li>
					
					
					<li >
						<a href="#quick_sidebar_tab_2" data-toggle="tab">
						操作日志
						</a>
					</li>
					<li >
						<a href="#quick_sidebar_tab_3" data-toggle="tab">
						系统设置 
						</a>
					</li>
				</ul>
				<div class="tab-content" >
					<div class="tab-pane  page-quick-sidebar-settings"  id="quick_sidebar_tab_3">
						<div class="page-quick-sidebar-settings-list">
							<h3 class="list-heading">页面设置</h3>
							<ul class="list-items borderless">
								<li>
									 默认全屏 <input type="checkbox" class="make-switch" checked data-size="small" data-on-color="success" data-on-text="开" data-off-color="default" data-off-text="关">
								</li>
								<li>
									 默认界面布局自适应 <input type="checkbox" checked class="make-switch" data-size="small" data-on-color="info" data-on-text="开" data-off-color="default" data-off-text="关">
								</li>
								<li>
									 菜单栏位置
									<select class="form-control input-inline input-sm input-small">
										<option value="1" selected >左侧打开多页面</option>
										<option value="2" >顶部打开单页面</option>
									</select>
								</li>
							</ul>
							<h3 class="list-heading">系统设置</h3>
							<ul class="list-items borderless">
							
								<li>
									错误记录<input type="checkbox" class="make-switch" checked data-size="small" data-on-color="danger" data-on-text="ON" data-off-color="default" data-off-text="OFF">
								</li>
								<li>
									 安全级别
									<select class="form-control input-inline input-sm input-small">
										<option value="1">正常</option>
										<option value="2" selected>中等</option>
										<option value="e">高级</option>
									</select>
								</li>
								<li>
									 消息刷新时间<input class="form-control input-inline input-sm input-small" value="5"/>
								</li>
							</ul>
							<div class="inner-content">
								<button class="btn btn-success"><i class="icon-settings"></i>保存</button>
							</div>
							<div  class="inner-content">
							<ul class="list-inline blog-images">
								<li>
									<a class="fancybox-button" data-rel="fancybox-button" title="系统二维码" href="#">
									<img alt="" src="images/2dcode.png">
									</a>
									<div  > 
									优酷土豆DSP广告竞价平台现已加入APPSTORE，快来扫一扫关注我们吧。
									</div>
								</li>
								
							</ul>
							</div>
						</div>
					</div>
					
					<div class="tab-pane  page-quick-sidebar-settings" id="quick_sidebar_tab_2">
						
					</div>
					<div class="tab-pane active page-quick-sidebar-chat" id="quick_sidebar_tab_1">
						<div class="page-quick-sidebar-chat-users" data-rail-color="#ddd" data-wrapper-class="page-quick-sidebar-list">
							<h3 class="list-heading">公告</h3>
							<ul class="media-list list-items">
								<li class="media">
									<div class="media-status">
										<span class="badge badge-success">10</span>
									</div>
									<img class="media-object" src="images/main/user/U-07.gif" alt="...">
									<div class="media-body">
										<h4 class="media-heading">exchange审合通知</h4>
										<div class="media-heading-sub">
											您有10个创意包审核通过...
										</div>
									</div>
								</li>
								
								<li class="media">
									<img class="media-object" src="images/main/user/U-07.gif" alt="...">
									<div class="media-body">
										<h4 class="media-heading">cpm地域接口接口同步成功</h4>
										<div class="media-heading-sub">
											  请注意...
										</div>
									</div>
								</li>
							</ul>
							<h3 class="list-heading">消息通知</h3>
							<ul class="media-list list-items">
								<li class="media">
									<div class="media-status">
										<span class="badge badge-warning">2</span>
									</div>
									<img class="media-object" src="images/main/user/56.jpeg" alt="...">
									<div class="media-body">
										<h4 class="media-heading">56网</h4>
										<div class="media-heading-sub">
											 申请加入DSP流量渠道
										</div>
										<div class="media-heading-small">
											 昨天上午10点30分
										</div>
									</div>
								</li>
								<li class="media">
									<div class="media-status">
										<span class="label label-sm label-success">急</span>
									</div>
									<img class="media-object" src="images/main/user/tencent.jpeg" alt="...">
									<div class="media-body">
										<h4 class="media-heading">腾讯视频 </h4>
										<div class="media-heading-sub">
											 急需修改广告ssp分流比例
										</div>
										<div class="media-heading-small">
											 今天上午10点30分
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- END QUICK SIDEBAR -->
</div>
<!-- END CONTAINER -->
<!-- BEGIN FOOTER -->
<div class="page-footer">
	
	<div class="page-footer-inner">
		 商家登陆系统V1.0
	</div>
	<div class="page-footer-inner page-footer-inner-copy" >
		 2015 &copy; ESA.Inc.
	</div>
	<div class="page-footer-tools">
		<span class="go-top">
		<i class="fa fa-angle-up"></i>
		</span>
	</div>
</div>
<!-- END FOOTER -->

<div class="modal fade in" id="main_logo_out" tabindex="-1" role="main_logo_out" aria-hidden="true">
<div class="modal-dialog" style="width: 160px;" >
	<div class="modal-content">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
			<h4 class="modal-title">提示</h4>
		</div>
		<div class="modal-body">
			 确定退出本系统？
		</div>
		<div class="modal-footer center">
			<button type="button" class="btn default" data-dismiss="modal">返回</button>
			<button type="button" class="btn btn-primary blue" id="main_logoout" >退出</button>
		</div>
	</div>
</div>
</div>

<!-- 减少页面加载js 时间-->
<!--[if lt IE 9]>
<script src="js/ie/respond.min.js"></script>
<script src="js/ie/excanvas.min.js"></script> 
<![endif]-->

 <!--[if lt IE 8]>
   <script>
     document.createElement('ng-include');
     document.createElement('ng-pluralize');
     document.createElement('ng-view');

     // Optionally these for CSS
     document.createElement('ng:include');
     document.createElement('ng:pluralize');
     document.createElement('ng:view');
   </script>
<![endif]-->
<!-- BEGIN 加载核心js -->
<script src="${ctx}/js/base.js" type="text/javascript"></script>
<script src="${ctx}/frame/jquery/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/jquery/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/bootstrap/bootstrap3.2.0/js/bootstrap.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/jquery/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>

<script src="${ctx}/frame/jquery/jquery.cokie.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/bootstrap/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/bootstrap/bootstrap-toastr/toastr.min.js"></script>
<script src="${ctx}/frame/util/select2/select2.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/bootstrap/bootstrap-select/bootstrap-select.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/util/datatables/media/js/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/util/datatables/extensions/TableTools/js/dataTables.tableTools.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/util/datatables/plugins/bootstrap/dataTables.bootstrap.js" type="text/javascript"></script>
<script src="${ctx}/frame/jquery/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/jquery/jquery-validation/js/additional-methods.min.js" type="text/javascript" ></script>
<!-- END 加载核心js -->
<!-- BEGIN 主页面JS-->
<script src="${ctx}/js/app.js" type="text/javascript"></script>
<script src="${ctx}/frame/angular/angular1.2.13/angular.min.js" type="text/javascript"></script>
<script src="${ctx}/js/main/main.js" type="text/javascript"></script>
</body>
</html>