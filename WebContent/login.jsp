<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<c:set var="ctx" value="${pageContext.request.contextPath}"></c:set>
<c:set var="version" value="${applicationScope.SysVersion}"></c:set>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
<meta charset="utf-8"/>
<title>商家登陆系统</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta content="Dmp,youku" name="description"/>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta content="youku" name="author"/>

<link href="${ctx}/font/font-awesome/css/font-awesome.min.css?v=${version}" rel="stylesheet" type="text/css"/>
<link href="${ctx}/font/simple-line-icons/simple-line-icons.min.css?v=${version}" rel="stylesheet" type="text/css"/>
<link href="${ctx}/frame/bootstrap/bootstrap3.2.0/css/bootstrap.min.css?v=${version}" rel="stylesheet" type="text/css"/>
<link href="${ctx}/frame/bootstrap/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css"/>
<link href="${ctx}/frame/bootstrap/bootstrap-datepicker/css/datepicker3.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/frame/bootstrap/bootstrap-fileinput/bootstrap-fileinput.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/css/login/login.css?v=${version}" rel="stylesheet" type="text/css"/>
<link rel="shortcut icon" href="images/favicon.ico"/>
</head>
<body class="login">
<div class="logo">
	<a >
		<!--<img src="" alt=""/> -->
	</a>
</div>
<div class="menu-toggler sidebar-toggler">
</div>
<div class="content">
		<form class="login-form" action="main.jsp" method="post">
			<h3 class="form-title">商家登陆系统</h3>
			<!-- 用户名 -->
			<div class="form-group">
				<!-- 由于IE 8 IE 9 不支持html5 所以在文本框显示不了内容，所以需要在外面加上 用户 和密码文本 -->
				<label class="control-label visible-ie8 visible-ie9">用户名</label>
				<div class="input-icon">
					<i class="fa fa-user"></i>
					<input class="form-control placeholder-no-fix" type="text"  placeholder="用户名..." name="username"/>
				</div>
			</div>
			<!-- 密码 -->
			<div class="form-group">
				<label class="control-label visible-ie8 visible-ie9">密码</label>
				<div class="input-icon">
					<i class="fa fa-lock"></i>
					<input class="form-control placeholder-no-fix" type="password"  placeholder="密码..." name="password"/>
				</div>
			</div>
			<!-- 记住我 登陆  -->
			<div class="form-actions">
				<label class="checkbox">
				<input type="checkbox" name="remember" value="1"/>记住我 </label>
				<button type="submit" class="btn  pull-right">
					登陆<i class="m-icon-swapright m-icon-white"></i>
				</button>
			</div>
			<!-- 忘记密码  & 注册-->
			<div class="forget-password">
				<p>
					<a href="javascript:;" id="forget-password">忘记账号或密码？</a>
					没有账号?&nbsp; <a  href="javascript:;" id="register-btn">申请成为商家</a>
				</p>
			</div>
		</form>
		<form class="forget-form" action="index.html" method="post">
		<div class="row">
		<div  id="form_wizard_1" class="col-md-12" >
			<h3>忘记密码 ?</h3>
			
						<div class="form-wizard">
								<ul class="nav nav-pills nav-justified steps">
									<li class="active">
									<a href="#tab1" data-toggle="tab"
										class="step"> <span class="number"> 1 </span> <span
											class="desc"> <i class="fa fa-check"></i> 邮箱或手机号
										</span>
									</a></li>
									<li><a href="#tab2" data-toggle="tab" class="step"> <span
											class="number"> 2 </span> <span class="desc"> <i
												class="fa fa-check"></i> 重设密码
										</span>
									</a></li>
									<li><a href="#tab3" data-toggle="tab" class="step active">
											<span class="number"> 3 </span> <span class="desc"> <i
												class="fa fa-check"></i> 修改成功
										</span>
									</a></li>
								</ul>
								<div id="bar" class="progress progress-striped"
									role="progressbar">
									<div class="progress-bar progress-bar-success"
										style="width: 33.3%;"></div>
								</div>
								<div class="tab-content" >
									<div class="tab-pane active" id="tab1">
										<!-- 用户名 -->
										<div class="form-group col-md-7">
											<label class="control-label  visible-ie8 visible-ie9">邮箱或手机号</label>
											<div class="input-icon">
												<i class="fa fa-envelope-o"></i>
												<input class="form-control placeholder-no-fix" type="text"  placeholder="请输入注册时使用的邮箱或者手机号..." name="username"/>
											</div>
										</div>
										<button class="btn getCode">获取验证码 </button>
										<div class="form-group col-md-7">
										   
										</div>
										
									</div>
									<div class="tab-pane" id="tab2">
										<div class="form-group col-md-7">
											<label class="control-label visible-ie8 visible-ie9">请输入新密码</label>
											<div class="input-icon">
												<i class="fa fa-lock"></i>
												<input class="form-control placeholder-no-fix" type="password" autocomplete="off" id="register_password" placeholder="请输入新密码" name="password"/>
											</div>
										</div>
										<div class="form-group col-md-7">
											<label class="control-label visible-ie8 visible-ie9">请确认新密码</label>
											<div class="controls">
												<div class="input-icon">
													<i class="fa fa-check"></i>
													<input class="form-control placeholder-no-fix" type="password" autocomplete="off" placeholder="请确认新密码" name="rpassword"/>
												</div>
											</div>
										</div>
									</div>
									<div class="tab-pane" id="tab3">
										<h3>恭喜您，成功修改密码！请重新登录系统或关闭窗口</h3>
									</div>
								</div>
						</div>
			
			<div class="form-actions">
				<button type="button" class="btn button-previous">
				<i class="m-icon-swapleft"></i> 上一步 </button>
				
				<button type="button" id="back-btn" class="btn">
				<i class="m-icon-swapleft"></i> 返回 </button>
				<button type="button" class="btn button-next pull-right">
				确认 <i class="m-icon-swapright m-icon-white"></i>
				</button>
				<button type="button" class="btn button-submit pull-right">
				去登陆<i class="m-icon-swapright m-icon-white"></i>
				</button>
			</div>
			</div>
			</div>
		</form>
		<!-- 用户注册 -->
		<form class="register-form" action="" method="post">
			<h3>注册成为商家</h3>
			<div class="row">
				<div class="col-md-4" >
				    <div class="caption">基本信息(必填<span class="required" aria-required="true"> * </span>):</div>
				    <br>
					<div class="form-group tooltips" data-placement="right" data-original-title="用户名" >
						<label class="control-label visible-ie8 visible-ie9">用户名</label>
						<div class="input-icon">
							<i class="fa fa-user"></i><input class="form-control placeholder-no-fix" type="text"  placeholder="用户名..." name="username"/>
						</div>
					</div>
					<div class="form-group tooltips"  data-placement="right" data-original-title="密码"  >
						<label class="control-label visible-ie8 visible-ie9">密码</label>
						<div class="input-icon">
							<i class="fa fa-lock"></i><input class="form-control placeholder-no-fix" type="password"  placeholder="密码..." name="username"/>
						</div>
					</div>
					<div class="form-group tooltips"  data-placement="right" data-original-title="确认密码"  >
						<label class="control-label visible-ie8 visible-ie9">确认密码</label>
						<div class="input-icon">
							<i class="fa fa-check"></i><input class="form-control placeholder-no-fix" type="password"  placeholder="确认密码..." name="username"/>
						</div>
					</div>
					<div class="form-group tooltips" data-placement="right" data-original-title="邮箱"   >
						<label class="control-label visible-ie8 visible-ie9">邮箱</label>
						<div class="input-icon">
							<i class="fa fa-envelope-o"></i><input class="form-control placeholder-no-fix" type="text"  placeholder="邮箱" name="username"/>
						</div>
					</div>
					<div class="form-group tooltips" data-placement="right" data-original-title="QQ"   >
						<label class="control-label visible-ie8 visible-ie9">QQ</label>
						<div class="input-icon">
							<i class="fa fa-qq"></i><input class="form-control placeholder-no-fix" type="text"  placeholder="QQ" name="username"/>
						</div>
					</div>
					<div class="form-group tooltips" data-placement="right" data-original-title="微信号"   >
						<label class="control-label visible-ie8 visible-ie9">微信号</label>
						<div class="input-icon">
							<i class="fa fa-wechat"></i><input class="form-control placeholder-no-fix" type="text"  placeholder="微信号" name="username"/>
						</div>
					</div>
					<div class="form-group tooltips" data-placement="right" data-original-title="淘宝店地址"   >
						<label class="control-label visible-ie8 visible-ie9">淘宝店地址</label>
						<div class="input-icon">
							<i class="fa fa-dot-circle-o"></i><input class="form-control placeholder-no-fix" type="text"  placeholder="淘宝店地址" name="username"/>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="caption">商铺信息(选填):</div>
				    <br>
				    <div class="form-group tooltips" data-placement="right" data-original-title="店铺名称"   >
						<label class="control-label visible-ie8 visible-ie9">店铺名称</label>
						<div class="input-icon">
							<i class="fa fa-user"></i><input class="form-control placeholder-no-fix" type="text"  placeholder="店铺名称" name="username"/>
						</div>
					</div>
					<div class="form-group tooltips"  data-placement="right" data-original-title="所属商圈"  >
						<label class="control-label visible-ie8 visible-ie9">所属商圈</label>
						<div class="input-icon">
							<i class="fa fa-user"></i><input class="form-control placeholder-no-fix" type="text"  placeholder="所属商圈" name="username"/>
						</div>
					</div>
					<div class="form-group tooltips" data-placement="right" data-original-title="具体地址"   >
						<label class="control-label visible-ie8 visible-ie9">具体地址</label>
						<div class="input-icon">
							<i class="fa fa-user"></i><input class="form-control placeholder-no-fix" type="text"  placeholder="具体地址" name="username"/>
						</div>
					</div>
					<div class="form-group tooltips"  data-placement="right" data-original-title="联系人"  >
						<label class="control-label visible-ie8 visible-ie9">联系人</label>
						<div class="input-icon">
							<i class="fa fa-user"></i><input class="form-control placeholder-no-fix" type="text"  placeholder="联系人" name="username"/>
						</div>
					</div>
					<div class="form-group tooltips" data-placement="right" data-original-title="电话"   >
						<label class="control-label visible-ie8 visible-ie9">电话</label>
						<div class="input-icon">
							<i class="fa fa-user"></i><input class="form-control placeholder-no-fix" type="text"  placeholder="电话" name="username"/>
						</div>
					</div>
					<div class="form-group tooltips"  data-placement="right" data-original-title="开店时间"  >
						<label class="control-label visible-ie8 visible-ie9">开店时间</label>
						<div class="input-group input-medium date date-picker" data-date-format="yyyy-mm-dd" data-date-start-date="+0d">
							<span class="input-group-btn">
							<button class="btn default" type="button"><i class="fa fa-calendar"></i></button>
							</span>
							<input class="form-control placeholder-no-fix" type="text" placeholder="开店时间" name="username" readonly>
						</div>
					</div>
					<div class="form-group tooltips"  data-placement="right" data-original-title="营业时间"  >
						<label class="control-label visible-ie8 visible-ie9">营业时间</label>
						<div class="input-group input-medium date date-picker" data-date-format="yyyy-mm-dd" data-date-start-date="+0d">
							<span class="input-group-btn">
							<button class="btn default" type="button"><i class="fa fa-calendar"></i></button>
							</span>
							<input type="text" class="form-control placeholder-no-fix" placeholder="营业时间" name="username" readonly>
							
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="caption">营业信息(选填):</div>
				    <br>
				    <div class="" >
						<label class="control-label ">营业执照扫描文件:</label>
						<div class="fileinput fileinput-new" data-provides="fileinput">
							<div class="fileinput-preview thumbnail" data-trigger="fileinput" style="width: 165px;min-height:55px;float: left;">
							</div>
							<div style="width: 60px;float: left;">
								<button class="btn default btn-file">
								<span class="fileinput-new">选择</span>
								<span class="fileinput-exists">更换 </span>
								<input type="file" name="" >
								</button>
								<button class="btn red fileinput-exists" data-dismiss="fileinput">删除 </button>
							</div>
						</div>
					</div>
					 <div class="form-group tooltips" data-placement="right" data-original-title="法人代表"  >
						<label class="control-label visible-ie8 visible-ie9">法人代表</label>
						<div class="input-icon">
							<i class="fa fa-user"></i><input class="form-control placeholder-no-fix" type="text"  placeholder="法人代表" name="username"/>
						</div>
					</div>
					 <div class="form-group tooltips" data-placement="right" data-original-title="经营类别"  >
						<label class="control-label visible-ie8 visible-ie9">经营类别</label>
						<div class="input-icon">
							<i class="fa fa-user"></i><input class="form-control placeholder-no-fix" type="text"  placeholder="经营类别" name="username"/>
						</div>
					</div>
					 <div class="form-group tooltips" data-placement="right" data-original-title="日均销售额"  >
						<label class="control-label visible-ie8 visible-ie9">日均销售额</label>
						<div class="input-icon">
							<i class="fa fa-user"></i><input class="form-control placeholder-no-fix" type="text"  placeholder="日均销售额" name="username"/>
						</div>
						<span class="help-block" style="color:red;font-size: 11px;" >方便后续统计商家营销活动效果对比分析</span>
					</div>
					 <div class="form-group" >
						<label class="control-label ">是否显示给普通用户:</label>
						<input type="checkbox" class="make-switch" checked data-size="small" data-on-color="success" data-on-text="是" data-off-color="default" data-off-text="否">		
					
					</div>
				</div>
			</div>
			<div class="form-actions">
				<button type="button" class="btn register-back"><i class="m-icon-swapleft"></i> 返回</button>
				<button type="button" class="btn pull-right"><i class="m-icon-swapleft"></i> 注册</button>
			</div>
		</form>
	</div>
	
<div class="copyright">
	 Copyright &copy;2015 ESA 版权所有
	 <p></p>
京ICP证 060288 号  隐私政策
</div>

<!--[if lt IE 9]>
<script src="js/ie/respond.min.js"></script>
<script src="js/ie/excanvas.min.js"></script> 
<![endif]-->
<script src="${ctx}/frame/jquery/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/bootstrap/bootstrap3.2.0/js/bootstrap.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/jquery/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/jquery/jquery-backstretch/jquery.backstretch.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/bootstrap/bootstrap-wizard/jquery.bootstrap.wizard.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/jquery/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/jquery/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/jquery/jquery-validation/js/additional-methods.min.js" type="text/javascript" ></script>
<script src="${ctx}/frame/bootstrap/bootstrap-datepicker/js/bootstrap-datepicker.js"  type="text/javascript" ></script>
<script src="${ctx}/frame/bootstrap/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
<script src="${ctx}/frame/bootstrap/bootstrap-fileinput/bootstrap-fileinput.js" type="text/javascript"></script>
<script src="${ctx}/js/AdBase.js?v=${version}" type="text/javascript"></script>
<script src="${ctx}/js/login/login-soft.js?v=${version}" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->
</body>
</html>