/**
 * 主界面登陆js
 * */
AdBase.namespace('com.esa.login');
com.esa.login = AdBase.extend(AdBase.util.Observable,{
	constructor: function(config) {
	    config = config || {};
	    AdBase.apply(this, config);//传参赋值
		this.initUi();//初始化界面
		this.initComponent();//初始化各种第三方组件
		this.initEvents();//初始化事件
	    this.initDoLogin();//处理登陆系统的form
	    this.initPasswordWizard();//处理找回密码的form
	    this.initDoRegister();//处理注册界面
	    this.initBackgroundStretch();//处理界面背景图片轮替
	    com.esa.login.superclass.constructor.call(this, config);
	 },
	 /**
	  * 初始化界面
	  * */
	initUi:function(){
	 	$('.login-form').show();
		$('.forget-form').hide();
		$('.register-form').hide();
	 },
	 /**
	  * 事件处理
	  * */
	initEvents:function(){
		//登陆按钮的enter事件
		$('.login-form input').keypress(function (e) {
			if (e.which == 13) {
			    if ($('.login-form').validate().form()) {
			        $('.login-form').submit();
				}
				return false;
			 }
		});
		 //获取验证码
		$('.getCode').click(function(){
		    alert("huode")
		    return;
		})
		//忘记密码 form显示
		$('#forget-password').click(function () {
		    $('.login-form').fadeOut(200,function(){
		    	$('.content').css({width:660})
		  		$('.forget-form').fadeIn(200);
		    });
		});
		//忘记密码 form关闭
		$('#back-btn').click(function () {
		     $('.forget-form').fadeOut(200,function(){
		    	$('.content').css({width:360})
		  		$('.login-form').fadeIn(200);
		    });
		});
		//注册密码 form显示
		$('.register-back').click(function () {
		    $('.register-form').fadeOut(200,function(){
		    	$('.content').css({width:360})
		  		$('.login-form').fadeIn(200);
		    });
		});
		//注册密码 form关闭
		$('#register-btn').click(function () {
		    $('.login-form').fadeOut(200,function(){
		    	$('.content').css({width:800})
		  		$('.register-form').fadeIn(200);
		    });
		});
		//关闭previous
		$('#form_wizard_1').find('.button-previous').hide();
		$('#form_wizard_1 .button-submit').click(function () {
		    $('.login-form').show();
		    $('.content').css({width:360})
		    $('.forget-form').hide();
		}).hide();
	 },
	 /**
	  * 初始化各种第三方组件
	  * */
	 initComponent:function(){
	 	this.initDatepicker();
	 	this.initBootstrapSwitch();
	 	this.initTooltip();
	 },
	 /**
	  * 初始化datepicker
	  * */
	 initDatepicker:function(){
	 	$('.date-picker').datepicker({
	    rtl: false,
	    orientation: "left",
	        autoclose: true
	    });
	 },
	 /**
	  * 初始化bootstrapSwitch
	  * */
	 initBootstrapSwitch:function(){
	 	$('.make-switch').bootstrapSwitch();
	 },
	 /**
	  * 初始化tooltip
	  * */
	 initTooltip:function(){
	 	$('.tooltips').tooltip();
	 },
	 initDoLogin:function(){
		$('.login-form').validate({
			errorElement: 'span', //default input error message container
			errorClass: 'help-block', // default input error message class
			focusInvalid: false, // do not focus the last invalid input
			rules: {
			    username: {
			        required: true
			    },
			    password: {
			        required: true
			    },
			    remember: {
			        required: false
			    }
			},
			messages: {
			    username: {
			        required: "用户名不能为空."
			    },
			    password: {
			        required: "密码不能为空."
			    }
			},
			invalidHandler: function (event, validator) {
			    $('.alert-danger', $('.login-form')).show();
			},
			highlight: function (element) { // hightlight error inputs
			    $(element).closest('.form-group').addClass('has-error');
			},
			success: function (label) {
			    label.closest('.form-group').removeClass('has-error');
			    label.remove();
			},
			errorPlacement: function (error, element) {
			    error.insertAfter(element.closest('.input-icon'));
			},
			submitHandler: function (form) {
				
				$.ajax({
					type: "POST",
					dataType:'json',
					data:{name:'admin',password:'1'},
					url:"./basic/LoginController/login.sdo",
					success:function(data) {
					    window.location.href = "./basic/LoginController/Main.sdo";
					}
				});
			}
		});
	 },
	 /**
	  * 处理找回密码
	  * */
	 initPasswordWizard:function(){
        var form = $('#submit_form');
        var error = $('.alert-danger', form);
        var success = $('.alert-success', form);
        form.validate({
            doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {},
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.attr("name") == "gender") { // for uniform radio buttons, insert the after the given container
                    error.insertAfter("#form_gender_error");
                } else if (element.attr("name") == "payment[]") { // for uniform radio buttons, insert the after the given container
                    error.insertAfter("#form_payment_error");
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit   
                success.hide();
                error.show();
              //  Metronic.scrollTo(error, -200);
            },

            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change done by hightlight
                $(element)
                    .closest('.form-group').removeClass('has-error'); // set error class to the control group
            },

            success: function (label) {
                if (label.attr("for") == "gender" || label.attr("for") == "payment[]") { // for checkboxes and radio buttons, no need to show OK icon
                    label
                        .closest('.form-group').removeClass('has-error').addClass('has-success');
                    label.remove(); // remove error label here
                } else { // display success icon for other inputs
                    label
                        .addClass('valid') // mark the current input as valid and display OK icon
                    .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                }
            },

            submitHandler: function (form) {
                success.show();
                error.hide();
                //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
            }

        });

        var handleTitle = function(tab, navigation, index) {
            var total = navigation.find('li').length;
            var current = index + 1;
            $('li', $('#form_wizard_1')).removeClass("done");
            var li_list = navigation.find('li');
            for (var i = 0; i < index; i++) {
                $(li_list[i]).addClass("done");
            }
            if (current == 1) {
                $('#form_wizard_1').find('.button-previous').hide();
                $('#form_wizard_1').find('#back-btn').show();
            } else {
                $('#form_wizard_1').find('.button-previous').show();
                $('#form_wizard_1').find('#back-btn').hide();
                
            }

            if (current >= total) {
                $('#form_wizard_1').find('.button-next').hide();
                $('#form_wizard_1').find('.button-submit').show();
            } else {
                $('#form_wizard_1').find('.button-next').show();
                $('#form_wizard_1').find('.button-submit').hide();
            }
        }
        

            
        $('#form_wizard_1').bootstrapWizard({
            'nextSelector': '.button-next',
            'previousSelector': '.button-previous',
            onTabClick: function (tab, navigation, index, clickedIndex) {
                success.hide();
                error.hide();
//                    if (form.valid() == false) {
//                        return false;
//                    }
                handleTitle(tab, navigation, clickedIndex);
            },
            onNext: function (tab, navigation, index) {
                success.hide();
                error.hide();

//                    if (form.valid() == false) {
//                        return false;
//                    }

                handleTitle(tab, navigation, index);
            },
            onPrevious: function (tab, navigation, index) {
                success.hide();
                error.hide();
                handleTitle(tab, navigation, index);
            },
            onTabShow: function (tab, navigation, index) {
                var total = navigation.find('li').length;
                var current = index + 1;
                var $percent = (current / total) * 100;
                $('#form_wizard_1').find('.progress-bar').css({width: $percent + '%'});
            }
        });
	 },
	 /**
	  * 注册处理
	  * */
	 initDoRegister:function(){
	 	
	 },
	 /**
	  * 处理界面背景图片轮替
	  * */
	 initBackgroundStretch:function(){
		 $.backstretch(["images/login/bg/4.jpg","images/login/bg/1.jpg"],
		 	{
	         	fade: 1000,
	            duration: 15000
		    }
		 )
	 }
});

AdBase.onReady(function(){
	new com.esa.login();
});