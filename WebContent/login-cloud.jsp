<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
<meta charset="utf-8"/>
<title>优酷土豆DMP系统</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta content="Dmp,youku" name="description"/>
<meta content="youku" name="author"/>

<link href="frame/bootstrap/bootstrap3.2.0/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
<link href="css/login/login.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="frame/util/webgl-clouds/three.min.js"></script>
<script type="text/javascript" src="frame/util/webgl-clouds/Detector.js"></script>
<link rel="shortcut icon" href="images/favicon.ico"/>
<style type="text/css">
body {
	background-color: #326696;
	margin: 0px;
	overflow: hidden;
	font-family:Monospace;
	font-size:13px;
	text-align:center;
	font-weight: bold;
	text-align:center;
}
</style>
<script id="vs" type="x-shader/x-vertex">

			varying vec2 vUv;

			void main() {

				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			}

		</script>

		<script id="fs" type="x-shader/x-fragment">

			uniform sampler2D map;

			uniform vec3 fogColor;
			uniform float fogNear;
			uniform float fogFar;

			varying vec2 vUv;

			void main() {

				float depth = gl_FragCoord.z / gl_FragCoord.w;
				float fogFactor = smoothstep( fogNear, fogFar, depth );

				gl_FragColor = texture2D( map, vUv );
				gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );
				gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

			}

		</script>
</head>
<body class="login">
<div class="logo" id="login">
	<a >
	<img src="images/logo.png" alt=""/>
	</a>
</div>
<div class="menu-toggler sidebar-toggler">
</div>
<div class="content">

	<form class="login-form" action="main.jsp" method="post">
		<h3 class="form-title">DSP广告竞价平台</h3>
		<div class="form-group">
			<!-- 由于IE 8 IE 9 不支持html5 所以在文本框显示不了内容，所以需要在外面加上 用户 和密码文本 -->
			<label class="control-label visible-ie8 visible-ie9">用户名</label>
			<div class="input-icon">
				<i class="fa fa-user"></i>
				<input class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="用户名..." name="username"/>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label visible-ie8 visible-ie9">密码</label>
			<div class="input-icon">
				<i class="fa fa-lock"></i>
				<input class="form-control placeholder-no-fix" type="password" autocomplete="off" placeholder="密码..." name="password"/>
			</div>
		</div>
		<div class="form-actions">
			<label class="checkbox">
			<input type="checkbox" name="remember" value="1"/>记住我 </label>
			<button type="submit" class="btn  pull-right">
			登陆&nbsp;&nbsp;<i class="m-icon-swapright m-icon-white"></i>
			</button>
		</div>
	</form>
</div>
<div class="copyright">
	 Copyright &copy;2014 优酷 版权所有
	 <p></p>
京ICP证 060288 号  隐私政策
</div>

<!--[if lt IE 9]>
<script src="js/ie/respond.min.js"></script>
<script src="js/ie/excanvas.min.js"></script> 
<![endif]-->
<script src="frame/jquery/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="frame/bootstrap/bootstrap3.2.0/js/bootstrap.min.js" type="text/javascript"></script>
<script src="frame/jquery/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<script src="js/login/login-soft.js" type="text/javascript"></script>
<script src="js/login/login-cloud.js" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<script>
jQuery(document).ready(function() {  
  Login.init();
  init();
});
</script>
</body>
</html>