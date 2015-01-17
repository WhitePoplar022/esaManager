/*
 * 项目主页面app
 * 
 * @message
 * 1.msg(type,title,msg);//界面右下角弹出消息[即提示 非重要消息] param->type:["success","error","info","warining"],default->"success"
 * 2.alert(title,msg);//界面alert提示[即提请 重要消息]
 * 
 * @tab
 * 1.addTab(tabid);添加一个窗口
 * 2.closeTab(tabid);//关闭一个窗口
 * 3.refreshTab(tabid);//刷新窗口
 * 4.getActiveTab()//获得激活窗口
 * 5.setActiveTab()//激活窗口
 * 
 * 
 * @userInfo
 * 1.getUserAuthor();//return author[{name:"",id:""}]://获取当前用户权限列表
 * 2.getUserInfo();//return json{user}//返回用户信息
 * 3.
 * 
 * @publicFunction
 * 1.export();
 * 2.
 * 3.loadScript([scripts],callback function(){},scope);//加载script【多个】 callback函数 scope 作用域
 * 4.loadCss();
 * 5.
 * 
 * @component
 * 1.grid();//grid组件
 * 2.window();//window窗口组件
 * 3.tree();//
 * 4.form();
 * 4.1:Switch   Spinners  textfiled textarea combox
 * 3.datePicker();//时间日期组件
 * 4.timePicker();
 * 5.progressBar();//
 * 6.selectDropdown();//下拉选择combox //type:[local,remote],
 * 6.1:multipleDropdown()//多选下拉
 * 6.2:cascadeDropdown()//级联下拉
 * 6.3:groupDropdown()//下拉分组
 * 7.multipleFileUpload()
 * 8.portlet();
 * 9.chart();//extend highCharts;
 * 10.tab();
 * 11.
 */
 namespace('com.youku.ad.dsp');
 com.youku.ad.dsp.app = Base.extend({
 	ctx:null,
 	isRTL:false,
 	constructor:function(param){
 		apply(this,param);
    	this.initMainUI();//初始化主界面
    	this.initLayout();//初始化布局
    	this.initThemeAndControl();//初始化主题设置和界面布局设置
    	this.initToastr();//初始化提示窗口
    	this.initEvents();//事件初始化
    	this.setDefault();//设置用户界面的基本界面属性
    	this.setMainUI();
    	this.initOptation();//设置一些插件的初始化参数
 		this.initUser();
    },
    initUser:function(){
    	
    	$.ajax({
		     type: "POST",
		     url: ctx+'/basic/LoginController/getUserInfo.sdo', 
		     data:{userId:1} ,
		     dataType: "json",
		     scope:this,
		     success: function(data){
		     	if(data.result=="success"){
		     		
		     	}else{
		     		
		     	}
		     }
		 });
    },
    msg:function(type,title,cotent){
    	toastr[type](cotent,title);
    },
    alert:function(){
    	
    },
    grid:function(param){
    	gridObj = Base.extend({
    		start:1,
    		limit:25,
    		constructor : function() {
    			apply(this,param);//将传过来的属性赋值给this 覆盖原来的参数
    			
			},
			initUI:function(){
				
			},
			setValue:function(value){
				
			},
			getValue:function(){
				
			}
    	});
    	return new gridObj();
    },
    /*
     *下拉列表Compent return  new selectDropdownObject
     *@openFunction
     *1.setValue();
     *2.getValue();
     *3.
     * */
    selectDropdown:function(param){
    	selectDropdownObject = Base.extend({
    		type:'local',
    		constructor : function() {
    			apply(this,param);//将传过来的属性赋值给this 覆盖原来的参数
    			this.initUI();
    			alert(this.type)
    			
			},
			initUI:function(){
				
			},
			setValue:function(value){
				
			},
			getValue:function(){
				
			}
    	});
    	return new selectDropdownObject();
    },
    setDefault:function(){
    	var thems  = this.handleTheme(); // handles style customer tool
        if(!$.cookie('userTheme')){
        	$.cookie('userTheme',"light2",{expires:1000*60*60*24*30})
    	}
    	 var theme = $.cookie('userTheme');
         thems.setColor(theme);
         $('.theme-colors > ul > li').each(function () {
           if($(this).attr('data-style')==theme){
             $(this).addClass("current");
           }else{
              $(this).removeClass("current"); 
           }
        });
         $('.color-blue tooltips').trigger('click');
    },
    initEvents:function(){
    	$(document).bind("selectstart",function(){return false;});  
	   $('#main_logoout').click(function(){
		   location.href="login.jsp";
	   })
	   $('.main_close').live('mouseover',function(){
		   $(".main_close").addClass("font-red-sunglo")
	   })
	   $('.main_close').live('mouseout',function(){
		   $(".main_close").removeClass("font-red-sunglo")
	   })
		$('.top-menu .dropdown-quick-sidebar-toggler a, .page-quick-sidebar-toggler').click(function (e) {
		    $('body').toggleClass('page-quick-sidebar-open'); 
		});
    },
    initToastr:function(){
    	toastr.options = {
			"closeButton": true,
			"debug": false,
			"progressBar": false,
			"positionClass": "toast-bottom-right",
			"showDuration": "200",
			"hideDuration": "500",
			"timeOut": "2000",
			"extendedTimeOut": "500",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		}
    },
    setMainUI:function(){
        $('.modal').css({'margin-top': function () { return -($('.modal').height() / 2); }});
    },
    initOptation:function(){
	    jQuery.extend(jQuery.validator.messages, {
		  required: "必选字段",
		  remote: "请修正该字段",
		  email: "请输入正确格式的电子邮件",
		  url: "请输入合法的网址",
		  date: "请输入合法的日期",
		  dateISO: "请输入合法的日期 (ISO).",
		  number: "请输入合法的数字",
		  digits: "只能输入整数",
		  creditcard: "请输入合法的信用卡号",
		  equalTo: "请再次输入相同的值",
		  accept: "请输入拥有合法后缀名的字符串",
		  maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 个的字符串"),
		  minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 个的字符串"),
		  rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
		  range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
		  max: jQuery.validator.format("请输入一个最大为{0} 的值"),
		  min: jQuery.validator.format("请输入一个最小为{0} 的值")
		});
    },
    initMainUI:function(){
	    var isRTL =this.isRTL = false; // IE mode
	    var isIE8 =this.isIE8 = false;
	    var isIE9 =this.isIE9 = false;
	    var isIE10 =this.isIE10 = false;
	    var resizeHandlers= this.resizeHandlers = [];
	
	    var assetsPath = this.assetsPath = '';
	
	    var globalImgPath = this.globalImgPath = assetsPath + 'img/';
	
	    // theme layout color set
	
	    var brandColors = this.brandColors = {
	        'blue': '#89C4F4',
	        'red': '#F3565D',
	        'green': '#1bbc9b',
	        'purple': '#9b59b6',
	        'grey': '#95a5a6',
	        'yellow': '#F8CB00'
	    };
	
	    // initializes main settings
	    var handleInit = function () {
	
	        if ($('body').css('direction') === 'rtl') {
	            isRTL = true;
	        }
	
	        isIE8 = !! navigator.userAgent.match(/MSIE 8.0/);
	        isIE9 = !! navigator.userAgent.match(/MSIE 9.0/);
	        isIE10 = !! navigator.userAgent.match(/MSIE 10.0/);
	
	        if (isIE10) {
	            $('html').addClass('ie10'); // detect IE10 version
	        }
	        
	        if (isIE10 || isIE9 || isIE8) {
	            $('html').addClass('ie'); // detect IE10 version
	        }
	    }
	
	    // runs callback functions set by this.addResponsiveHandler().
	    var _runResizeHandlers = this._runResizeHandlers = function () {
	        // reinitialize other subscribed elements
	        for (var i = 0; i < resizeHandlers.length; i++) {
	            var each = resizeHandlers[i];
	            each.call();
	        }
	    }
	
	    // handle the layout reinitialization on window resize
	    var handleOnResize = function () {
	        var resize;
	        if (isIE8) {
	            var currheight;
	            $(window).resize(function () {
	                if (currheight == document.documentElement.clientHeight) {
	                    return; //quite event since only body resized not window.
	                }
	                if (resize) {
	                    clearTimeout(resize);
	                }
	                resize = setTimeout(function () {
	                    _runResizeHandlers();
	                }, 50); // wait 50ms until window resize finishes.                
	                currheight = document.documentElement.clientHeight; // store last body client height
	            });
	        } else {
	            $(window).resize(function () {
	                if (resize) {
	                    clearTimeout(resize);
	                }
	                resize = setTimeout(function () {
	                    _runResizeHandlers();
	                }, 50); // wait 50ms until window resize finishes.
	            });
	        }
	    }
	
	    // Handles portlet tools & actions
	    var handlePortletTools = function () {
	        $('body').on('click', '.portlet > .portlet-title > .tools > a.remove', function (e) {
	            e.preventDefault();
	            $(this).closest(".portlet").remove();
	        });
	
	        $('body').on('click', '.portlet > .portlet-title > .tools > a.reload', function (e) {
	            e.preventDefault();
	            var el = $(this).closest(".portlet").children(".portlet-body");
	            var url = $(this).attr("data-url");
	            var error = $(this).attr("data-error-display");
	            if (url) {
	                this.blockUI({target: el, iconOnly: true});
	                $.ajax({
	                    type: "GET",
	                    cache: false,
	                    url: url,
	                    dataType: "html",
	                    success: function(res) 
	                    {                        
	                        this.unblockUI(el);
	                        el.html(res);
	                    },
	                    error: function(xhr, ajaxOptions, thrownError)
	                    {
	                        this.unblockUI(el);
	                        var msg = 'Error on reloading the content. Please check your connection and try again.';
	                        if (error == "toastr" && toastr) {
	                            toastr.error(msg);
	                        } else if (error == "notific8" && $.notific8) {
	                            $.notific8('zindex', 11500);
	                            $.notific8(msg, {theme: 'ruby', life: 3000});
	                        } else {
	                            alert(msg);
	                        }
	                    }
	                });
	            } else {
	                // for demo purpose
	                this.blockUI({target: el, iconOnly: true});
	                window.setTimeout(function () {
	                    this.unblockUI(el);
	                }, 1000);
	            }            
	        });
	
	        // load ajax data on page init
	        $('.portlet .portlet-title a.reload[data-load="true"]').click();
	
	        $('body').on('click', '.portlet > .portlet-title > .tools > .collapse, .portlet .portlet-title > .tools > .expand', function (e) {
	            e.preventDefault();
	            var el = $(this).closest(".portlet").children(".portlet-body");
	            if ($(this).hasClass("collapse")) {
	                $(this).removeClass("collapse").addClass("expand");
	                el.slideUp(200);
	            } else {
	                $(this).removeClass("expand").addClass("collapse");
	                el.slideDown(200);
	            }
	        });
	    }
	
	    // Handles custom checkboxes & radios using jQuery Uniform plugin
	    var handleUniform = function () {
	        if (!$().uniform) {
	            return;
	        }
	        var test = $("input[type=checkbox]:not(.toggle, .make-switch), input[type=radio]:not(.toggle, .star, .make-switch)");
	        if (test.size() > 0) {
	            test.each(function () {
	                if ($(this).parents(".checker").size() == 0) {
	                    $(this).show();
	                    $(this).uniform();
	                }
	            });
	        }
	    }
	
	    var handleBootstrapSwitch = function () {
	        if (!$().bootstrapSwitch) {
	            return;
	        }
	        $('.make-switch').bootstrapSwitch();
	    }
	
	    // Handles Bootstrap Accordions.
	    var handleAccordions = function () {
	        $('body').on('shown.bs.collapse', '.accordion.scrollable', function (e) {
	            this.scrollTo($(e.target));
	        });
	    }
	
	    // Handles Bootstrap Tabs.
	    var handleTabs = function () {
	        //activate tab if tab id provided in the URL
	        if (location.hash) {
	            var tabid = location.hash.substr(1);
	            $('a[href="#' + tabid + '"]').parents('.tab-pane:hidden').each(function(){
	                var tabid = $(this).attr("id");
	                $('a[href="#' + tabid + '"]').click();    
	            });            
	            $('a[href="#' + tabid + '"]').click();
	        }
	    }
	
	    // Handles Bootstrap Modals.
	    var handleModals = function () {
	        // fix stackable modal issue: when 2 or more modals opened, closing one of modal will remove .modal-open class. 
	        $('body').on('hide.bs.modal', function () {
	           if ($('.modal:visible').size() > 1 && $('html').hasClass('modal-open') == false) {
	              $('html').addClass('modal-open');
	           } else if ($('.modal:visible').size() <= 1) {
	              $('html').removeClass('modal-open');
	           }
	        });
	            
	        $('body').on('show.bs.modal', '.modal', function () {
	            if ($(this).hasClass("modal-scroll")) {
	                $('body').addClass("modal-open-noscroll");
	            } 
	        });
	
	        $('body').on('hide.bs.modal', '.modal', function () {
	            $('body').removeClass("modal-open-noscroll");
	        });
	    }
	
	    // Handles Bootstrap Tooltips.
	    var handleTooltips = function () {
	       $('.tooltips').tooltip();
	    }
	
	    // Handles Bootstrap Dropdowns
	    var handleDropdowns = function () {
	        /*
	          Hold dropdown on click  
	        */
	        $('body').on('click', '.dropdown-menu.hold-on-click', function (e) {
	            e.stopPropagation();
	        });
	    }
	
	    var handleAlerts = function () {
	        $('body').on('click', '[data-close="alert"]', function(e){
	            $(this).parent('.alert').hide();
	            e.preventDefault();
	        });
	    }
	
	    // Handle Hower Dropdowns
	    var handleDropdownHover = function () {
	        $('[data-hover="dropdown"]').dropdownHover();
	    }
	
	    // Handles Bootstrap Popovers
	
	    // last popep popover
	    var lastPopedPopover;
	
	    var handlePopovers = function () {
	        $('.popovers').popover();
	
	        // close last displayed popover
	
	        $(document).on('click.bs.popover.data-api', function (e) {
	            if (lastPopedPopover) {
	                lastPopedPopover.popover('hide');
	            }
	        });
	    }
	
	    // Handles scrollable contents using jQuery SlimScroll plugin.
	    var thi = this;
	    var handleScrollers = function () {
	        thi.initSlimScroll('.scroller');
	    }
	
	    // Handles Image Preview using jQuery Fancybox plugin
	    var handleFancybox = function () {
	        if (!jQuery.fancybox) {
	            return;
	        }
	
	        if ($(".fancybox-button").size() > 0) {
	            $(".fancybox-button").fancybox({
	                groupAttr: 'data-rel',
	                prevEffect: 'none',
	                nextEffect: 'none',
	                closeBtn: true,
	                helpers: {
	                    title: {
	                        type: 'inside'
	                    }
	                }
	            });
	        }
	    }
	
	    // Fix input placeholder issue for IE8 and IE9
	    var handleFixInputPlaceholderForIE = function () {
	        //fix html5 placeholder attribute for ie7 & ie8
	        if (isIE8 || isIE9) { // ie8 & ie9
	            // this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class will be skipped(e.g: we need this for password fields)
	            $('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each(function () {
	                var input = $(this);
	
	                if (input.val() == '' && input.attr("placeholder") != '') {
	                    input.addClass("placeholder").val(input.attr('placeholder'));
	                }
	
	                input.focus(function () {
	                    if (input.val() == input.attr('placeholder')) {
	                        input.val('');
	                    }
	                });
	
	                input.blur(function () {
	                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
	                        input.val(input.attr('placeholder'));
	                    }
	                });
	            });
	        }
	    }
	
	    // Handle Select2 Dropdowns
	    var handleSelect2 = function() {
	        if ($().select2) {
	            $('.select2me').select2({
	                placeholder: "Select",
	                allowClear: true
	            });
	        }
	    }
  		handleInit(); // initialize core variables
        handleOnResize(); // set and handle responsive          
        handleUniform(); // hanfle custom radio & checkboxes
        handleBootstrapSwitch(); // handle bootstrap switch plugin
        handleScrollers(); // handles slim scrolling contents 
        handleFancybox() // handle fancy box
        handleSelect2(); // handle custom Select2 dropdowns
        handlePortletTools(); // handles portlet action bar functionality(refresh, configure, toggle, remove)
        handleAlerts(); //handle closabled alerts
        handleDropdowns(); // handle dropdowns
        handleTabs(); // handle tabs
        handleTooltips(); // handle bootstrap tooltips
        handlePopovers(); // handles bootstrap popovers
        handleAccordions(); //handles accordions 
        handleModals(); // handle modals
        handleFixInputPlaceholderForIE(); 
    },
    initLayout:function(){
    	var layoutImgPath = this.getAssetsPath() + 'images/';
	
	    var layoutCssPath = this.getAssetsPath() + 'css/';
	
	    //* BEGIN:CORE HANDLERS *//
	    // this function handles responsive layout on screen size resize or mobile device rotate.
	
	    // Set proper height for sidebar and content. The content and sidebar height must be synced always.
	    var thi = this;
	    var handleSidebarAndContentHeight = this.handleSidebarAndContentHeight = function () {
	        var content = $('.page-content');
	        var sidebar = $('.page-sidebar');
	        var body = $('body');
	        var height;
	
	        if (body.hasClass("page-footer-fixed") === true && body.hasClass("page-sidebar-fixed") === false) {
	            var available_height = thi.getViewPort().height - $('.page-footer').outerHeight() - $('.page-header').outerHeight();
	            if (content.height() < available_height) {
	                content.attr('style', 'min-height:' + available_height + 'px');
	            }
	        } else {
	            if (body.hasClass('page-sidebar-fixed')) {
	                height = _calculateFixedSidebarViewportHeight();
	                if (body.hasClass('page-footer-fixed') === false) {
	                    height = height - $('.page-footer').outerHeight();
	                }
	            } else {
	                var headerHeight = $('.page-header').outerHeight();
	                var footerHeight = $('.page-footer').outerHeight();
	
	                if (thi.getViewPort().width < 992) {
	                    height = thi.getViewPort().height - headerHeight - footerHeight;
	                } else {
	                    height = sidebar.height() + 20;
	                }
	
	                if ((height + headerHeight + footerHeight) <= thi.getViewPort().height) {
	                    height = thi.getViewPort().height - headerHeight - footerHeight;
	                }
	            }
	            content.attr('style', 'min-height:' + height + 'px');
	        }
	    }
	
	    // Handle sidebar menu
	    var handleSidebarMenu = function () {
	    	jQuery('.page-sidebar').on('mouseover', 'li > a', function (e) {
	    		$(this).find('i').addClass('fa-spin')
	    	});
	    	jQuery('.page-sidebar').on('mouseout', 'li > a', function (e) {
	    		$(this).find('i').removeClass('fa-spin')
	    	});
	        jQuery('.page-sidebar').on('click', 'li > a', function (e) {
	
	            if (thi.getViewPort().width >= 992 && $(this).parents('.page-sidebar-menu-hover-submenu').size() === 1) { // exit of hover sidebar menu
	                return;
	            }
	
	            if ($(this).next().hasClass('sub-menu') === false) {
	                if (thi.getViewPort().width < 992 && $('.page-sidebar').hasClass("in")) { // close the menu on mobile view while laoding a page 
	                    $('.page-header .responsive-toggler').click();
	                }
	                return;
	            }
	
	            if ($(this).next().hasClass('sub-menu always-open')) {
	                return;
	            }
	
	            var parent = $(this).parent().parent();
	            var the = $(this);
	            var menu = $('.page-sidebar-menu');
	            var sub = jQuery(this).next();
	
	            var autoScroll = menu.data("auto-scroll");
	            var slideSpeed = parseInt(menu.data("slide-speed"));
	
	            parent.children('li.open').children('a').children('.arrow').removeClass('open');
	          //  console.log(parent.children('li.open').children('.sub-menu'))
	            parent.children('li.open').children('.sub-menu').slideUp(slideSpeed);
	            parent.children('li.open').removeClass('open');
	
	            var slideOffeset = -200;
	            if (sub.is(":visible")) {
	                jQuery('.arrow', jQuery(this)).removeClass("open");
	                jQuery(this).parent().removeClass("open");
	                sub.slideUp(slideSpeed, function () {
	                    if (autoScroll == true && $('body').hasClass('page-sidebar-closed') == false) {
	                        if ($('body').hasClass('page-sidebar-fixed')) {
	                            menu.slimScroll({
	                                'scrollTo': (the.position()).top
	                            });
	                        } else {
	                            this.scrollTo(the, slideOffeset);
	                        }
	                    }
	                    handleSidebarAndContentHeight();
	                });
	            } else {
	                jQuery('.arrow', jQuery(this)).addClass("open");
	                jQuery(this).parent().addClass("open");
	                sub.slideDown(slideSpeed, function () {
	                    if (autoScroll == true && $('body').hasClass('page-sidebar-closed') == false) {
	                        if ($('body').hasClass('page-sidebar-fixed')) {
	                            menu.slimScroll({
	                                'scrollTo': (the.position()).top
	                            });
	                        } else {
	                            this.scrollTo(the, slideOffeset);
	                        }
	                    }
	                    handleSidebarAndContentHeight();
	                });
	            }
	
	            e.preventDefault();
	        });
	
	        // handle ajax links within sidebar menu
	        jQuery('.page-sidebar').on('click', ' li > a.ajaxify', function (e) {
	            e.preventDefault();
	            this.scrollTop();
	
	            var url = $(this).attr("href");
	            var menuContainer = jQuery('.page-sidebar ul');
	            var pageContent = $('.page-content');
	            var pageContentBody = $('.page-content .page-content-body');
	
	            menuContainer.children('li.active').removeClass('active');
	            menuContainer.children('arrow.open').removeClass('open');
	
	            $(this).parents('li').each(function () {
	                $(this).addClass('active');
	                $(this).children('a > span.arrow').addClass('open');
	            });
	            $(this).parents('li').addClass('active');
	
	            if (this.getViewPort().width < 992 && $('.page-sidebar').hasClass("in")) { // close the menu on mobile view while laoding a page 
	                $('.page-header .responsive-toggler').click();
	            }
	
	            this.startPageLoading();
	
	            var the = $(this);
	
	            $.ajax({
	                type: "GET",
	                cache: false,
	                url: url,
	                dataType: "html",
	                success: function (res) {
	
	                    if (the.parents('li.open').size() === 0) {
	                        $('.page-sidebar-menu > li.open > a').click();
	                    }
	
	                    this.stopPageLoading();
	                    pageContentBody.html(res);
	                    this.fixContentHeight(); // fix content height
	                    this.initAjax(); // initialize core stuff
	                },
	                error: function (xhr, ajaxOptions, thrownError) {
	                    this.stopPageLoading();
	                    pageContentBody.html('<h4>没有加载到数据.</h4>');
	                }
	            });
	        });
	
	        // handle ajax link within main content
	        jQuery('.page-content').on('click', '.ajaxify', function (e) {
	            e.preventDefault();
	            this.scrollTop();
	
	            var url = $(this).attr("href");
	            var pageContent = $('.page-content');
	            var pageContentBody = $('.page-content .page-content-body');
	
	            this.startPageLoading();
	
	            if (this.getViewPort().width < 992 && $('.page-sidebar').hasClass("in")) { // close the menu on mobile view while laoding a page 
	                $('.page-header .responsive-toggler').click();
	            }
	
	            $.ajax({
	                type: "GET",
	                cache: false,
	                url: url,
	                dataType: "html",
	                success: function (res) {
	                    this.stopPageLoading();
	                    pageContentBody.html(res);
	                    this.fixContentHeight(); // fix content height
	                    this.initAjax(); // initialize core stuff
	                },
	                error: function (xhr, ajaxOptions, thrownError) {
	                    pageContentBody.html('<h4>Could not load the requested content.</h4>');
	                    this.stopPageLoading();
	                }
	            });
	        });
	    }
	
	    // Helper function to calculate sidebar height for fixed sidebar layout.
	    var _calculateFixedSidebarViewportHeight = function () {
	        var sidebarHeight = thi.getViewPort().height - $('.page-header').outerHeight();
	        if ($('body').hasClass("page-footer-fixed")) {
	            sidebarHeight = sidebarHeight - $('.page-footer').outerHeight();
	        }
	
	        return sidebarHeight;
	    }
	    // Handles fixed sidebar
	    var handleFixedSidebar =this.handleFixedSidebar = function () {
	        var menu = $('.page-sidebar-menu');
	
	        thi.destroySlimScroll(menu);
	
	        if ($('.page-sidebar-fixed').size() === 0) {
	            handleSidebarAndContentHeight();
	            return;
	        }
	
	        if (thi.getViewPort().width >= 992) {
	            menu.attr("data-height", _calculateFixedSidebarViewportHeight());
	            thi.initSlimScroll(menu);
	            handleSidebarAndContentHeight();
	        }
	    }
	
	    // Handles sidebar toggler to close/hide the sidebar.
	    var handleFixedSidebarHoverEffect = this.handleFixedSidebarHoverEffect = function () {
	        var body = $('body');
	        if (body.hasClass('page-sidebar-fixed')) {
	            $('.page-sidebar-menu').on('mouseenter', function () {
	                if (body.hasClass('page-sidebar-closed')) {
	                    $(this).removeClass('page-sidebar-menu-closed');
	                }
	            }).on('mouseleave', function () {
	                if (body.hasClass('page-sidebar-closed')) {
	                    $(this).addClass('page-sidebar-menu-closed');
	                }
	            });
	        }
	    }
	
	    // Hanles sidebar toggler
	    var handleSidebarToggler = this.handleSidebarToggler = function () {
	        var body = $('body');
	        if ($.cookie && $.cookie('sidebar_closed') === '1' && thi.getViewPort().width >= 992) {
	            $('body').addClass('page-sidebar-closed');
	            $('.page-sidebar-menu').addClass('page-sidebar-menu-closed');
	            $('.main-center-page').hide();
	            $('.main-top-page').show();
	        }else{
	       		$('.main-center-page').show();
	            $('.main-top-page').hide();
	        
	        }
	        // handle sidebar show/hide
	        $('.page-sidebar, .page-header').on('click', '.sidebar-toggler', function (e) {
	            var sidebar = $('.page-sidebar');
	            var sidebarMenu = $('.page-sidebar-menu');
	            $(".sidebar-search", sidebar).removeClass("open");
	
	            if (body.hasClass("page-sidebar-closed")) {
	            	$('.main-center-page').show();
	            	$('.main-top-page').hide();
	                body.removeClass("page-sidebar-closed");
	                sidebarMenu.removeClass("page-sidebar-menu-closed");
	                if ($.cookie) {
	                    $.cookie('sidebar_closed', '0');
	                }
	            } else {
	            	$('.main-center-page').hide();
	            	$('.main-top-page').show();
	                body.addClass("page-sidebar-closed");
	                sidebarMenu.addClass("page-sidebar-menu-closed");
	                if (body.hasClass("page-sidebar-fixed")) {
	                    sidebarMenu.trigger("mouseleave");
	                }
	                if ($.cookie) {
	                    $.cookie('sidebar_closed', '1');
	                }
	            }
	
	            $(window).trigger('resize');
	        });
	
	        handleFixedSidebarHoverEffect();
	
	        // handle the search bar close
	        $('.page-sidebar').on('click', '.sidebar-search .remove', function (e) {
	            e.preventDefault();
	            $('.sidebar-search').removeClass("open");
	        });
	
	        // handle the search query submit on enter press
	        $('.page-sidebar .sidebar-search').on('keypress', 'input.form-control', function (e) {
	            if (e.which == 13) {
	                $('.sidebar-search').submit();
	                return false; //<---- Add this line
	            }
	        });
	
	        // handle the search submit(for sidebar search and responsive mode of the header search)
	        $('.sidebar-search .submit').on('click', function (e) {
	            e.preventDefault();
	            if ($('body').hasClass("page-sidebar-closed")) {
	                if ($('.sidebar-search').hasClass('open') == false) {
	                    if ($('.page-sidebar-fixed').size() === 1) {
	                        $('.page-sidebar .sidebar-toggler').click(); //trigger sidebar toggle button
	                    }
	                    $('.sidebar-search').addClass("open");
	                } else {
	                    $('.sidebar-search').submit();
	                }
	            } else {
	                $('.sidebar-search').submit();
	            }
	        });
	
	        // handle close on body click
	        if ($('.sidebar-search').size() != 0) {
	            $('.sidebar-search .input-group').on('click', function(e){
	                e.stopPropagation();
	            });
	
	            $('body').on('click', function() {
	                if ($('.sidebar-search').hasClass('open')) {
	                    $('.sidebar-search').removeClass("open");
	                }
	            });
	        }
	    }
	
	    // Handles the horizontal menu
	    var handleHorizontalMenu = function () {
	        //handle tab click
	        $('.page-header').on('click', '.hor-menu a[data-toggle="tab"]', function (e) {
	            e.preventDefault();
	            var nav = $(".hor-menu .nav");
	            var active_link = nav.find('li.current');
	            $('li.active', active_link).removeClass("active");
	            $('.selected', active_link).remove();
	            var new_link = $(this).parents('li').last();
	            new_link.addClass("current");
	            new_link.find("a:first").append('<span class="selected"></span>');
	        });
	
	        // handle search box expand/collapse        
	        $('.page-header').on('click', '.search-form', function (e) {
	            $(this).addClass("open");
	            $(this).find('.form-control').focus();
	
	            $('.page-header .search-form .form-control').on('blur', function (e) {
	                $(this).closest('.search-form').removeClass("open");
	                $(this).unbind("blur");
	            });
	        });
	
	        // handle hor menu search form on enter press
	        $('.page-header').on('keypress', '.hor-menu .search-form .form-control', function (e) {
	            if (e.which == 13) {
	                $(this).closest('.search-form').submit();
	                return false;
	            }
	        });
	
	        // handle header search button click
	        $('.page-header').on('mousedown', '.search-form.open .submit', function (e) {
	            e.preventDefault();
	            e.stopPropagation();
	            $(this).closest('.search-form').submit();
	        });
	
	        $(document).on('click', '.mega-menu-dropdown .dropdown-menu', function (e) {
	            e.stopPropagation();
	        });
	    }
	
	    // Handles Bootstrap Tabs.
	    var handleTabs = function () {
	        // fix content height on tab click
	        $('body').on('shown.bs.tab', 'a[data-toggle="tab"]', function () {
	            handleSidebarAndContentHeight();
	        });
	    }
	
	    // Handles the go to top button at the footer
	    var handleGoTop = function () {
	        /* set variables locally for increased performance */
	        jQuery('.page-footer').on('click', '.go-top', function (e) {
	            thi.scrollTo();
	            e.preventDefault();
	        });
	    }
	
	    // Hanlde 100% height elements(block, portlet, etc)
	    var thi = this;
	    var handle100HeightContent = function () {
	
	        var target = $('.full-height-content');
	        var height;
	
	        height = thi.getViewPort().height -
	            $('.page-header').outerHeight(true) -
	            $('.page-footer').outerHeight(true) -
	            $('.page-title').outerHeight(true) -
	            $('.page-bar').outerHeight(true);
	
	        if (target.hasClass('portlet')) {
	            var portletBody = target.find('.portlet-body');
	            
	            if (thi.getViewPort().width < 992) {
	                thi.destroySlimScroll(portletBody.find('.full-height-content-body')); // destroy slimscroll 
	                return;
	            }
	
	            height = height -
	                target.find('.portlet-title').outerHeight(true) -
	                parseInt(target.find('.portlet-body').css('padding-top')) -
	                parseInt(target.find('.portlet-body').css('padding-bottom')) - 2;
	
	            if (target.hasClass("full-height-content-scrollable")) {
	                height = height - 35;
	                portletBody.find('.full-height-content-body').css('height', height);
	                thi.initSlimScroll(portletBody.find('.full-height-content-body'));
	            } else {
	                portletBody.css('min-height', height);
	            }
	        } else {
	            if (thi.getViewPort().width < 992) {
	                thi.destroySlimScroll(target.find('.full-height-content-body')); // destroy slimscroll 
	                return;
	            }
	
	            if (target.hasClass("full-height-content-scrollable")) {
	                height = height - 35;
	                target.find('.full-height-content-body').css('height', height);
	                thi.initSlimScroll(target.find('.full-height-content-body'));
	            } else {
	                target.css('min-height', height);
	            }
	        }
	    }
	    var batchsc = this.batchsc = "";
	    //锁屏
	    var lockScreen = function(){
	    	batchsc = $.backstretch([
						"images/login/bg/1.jpg",
						"images/login/bg/3.jpg",
						"images/login/bg/4.jpg",
						"images/login/bg/5.jpg",
						"images/login/bg/2.jpg"
				        ], {
				          fade: 200,
				          duration: 2000
						    }
				);
				
	    	$('.page-lock').css({'z-index':'-999999','position':'absolute'})
	    };
	    var unlockScreen = function(){
	    	//console.log(batchsc)
	    	batchsc.destory();
	    	$('.page-lock').css({'z-index':'99999','position':'relative'})
	    }
	    handleFixedSidebar(); // handles fixed sidebar menu
        handleSidebarMenu(); // handles main menu
        handleHorizontalMenu(); // handles horizontal menu
        handleSidebarToggler(); // handles sidebar hide/show
        handle100HeightContent(); // handles 100% height elements(block, portlet, etc)            
        handleGoTop(); //handles scroll to top functionality in the footer
        handleTabs(); // handle bootstrah tabs

        // reinitialize the layout on window resize
        this.addResizeHandler(handleSidebarAndContentHeight); // recalculate sidebar & content height on window resize
        this.addResizeHandler(handleFixedSidebar); // reinitialize fixed sidebar on window resize
        this.addResizeHandler(handle100HeightContent); // r
    },
    initThemeAndControl:function(){
    	var thi = this;
    	 var handleTheme = this.handleTheme =function () {
    	//$.cookie(’name’, ‘value’)
    	
        var panel = $('.theme-panel');
        
        if ($('body').hasClass('page-boxed') == false) {
            $('.layout-option', panel).val("fluid");
        }

        $('.sidebar-option', panel).val("fixed");
        $('.page-header-option', panel).val("fixed");
        $('.page-footer-option', panel).val("fixed");
        if ($('.sidebar-pos-option').attr("disabled") === false) {
            $('.sidebar-pos-option', panel).val(this.isRTL() ? 'right' : 'left');
        }

        //handle theme layout
        var resetLayout = function () {
            $("body").removeClass("page-boxed").
            removeClass("page-footer-default").
            removeClass("page-sidebar-fixed").
            removeClass("page-header-fixed").
            removeClass("page-sidebar-reversed");

            $('.page-header > .page-header-inner').removeClass("container");

            if ($('.page-container').parent(".container").size() === 1) {
                $('.page-container').insertAfter('body > .clearfix');
            }

            if ($('.page-footer > .container').size() === 1) {
                $('.page-footer').html($('.page-footer > .container').html());
            } else if ($('.page-footer').parent(".container").size() === 1) {
                $('.page-footer').insertAfter('.page-container');
            }

            $('body > .container').remove();
            
        }

        var lastSelectedLayout = '';
 		
        var setLayout = function () {
            var layoutOption = $('.layout-option', panel).val();
            var sidebarOption = $('.sidebar-option', panel).val();
            var headerOption = $('.page-header-option', panel).val();
            var footerOption = $('.page-footer-option', panel).val();
            var sidebarPosOption = $('.sidebar-pos-option', panel).val();
            var sidebarStyleOption = $('.sidebar-style-option', panel).val();
            var sidebarMenuOption = $('.sidebar-menu-option', panel).val();
            
            if (sidebarOption == "fixed" && headerOption == "default") {
                alert('表头固定 就不需要固定菜单了');
                $('.page-header-option', panel).val("fixed");
                $('.sidebar-option', panel).val("fixed");
                sidebarOption = 'fixed';
                headerOption = 'fixed';
            }

            resetLayout(); // reset layout to default state

            if (layoutOption === "boxed") {
                $("body").addClass("page-boxed");

                // set header
                $('.page-header > .page-header-inner').addClass("container");
                var cont = $('body > .clearfix').after('<div class="container"></div>');

                // set content
                $('.page-container').appendTo('body > .container');

                // set footer
                if (footerOption === 'fixed') {
                    $('.page-footer').html('<div class="container">' + $('.page-footer').html() + '</div>');
                } else {
                    $('.page-footer').appendTo('body > .container');
                }
            }
           
            if (lastSelectedLayout != layoutOption) {
                //layout changed, run responsive handler: 
                thi.runResizeHandlers();
            }
            lastSelectedLayout = layoutOption;

            //header
            if (headerOption === 'fixed') {
                $("body").addClass("page-header-fixed");
                $(".page-header").removeClass("navbar-static-top").addClass("navbar-fixed-top");
            } else {
                $("body").removeClass("page-header-fixed");
                $(".page-header").removeClass("navbar-fixed-top").addClass("navbar-static-top");
            }

            //sidebar
            if ($('body').hasClass('page-full-width') === false) {
                if (sidebarOption === 'fixed') {
                    $("body").addClass("page-sidebar-fixed");
                    $("page-sidebar-menu").addClass("page-sidebar-menu-fixed");
                    $("page-sidebar-menu").removeClass("page-sidebar-menu-default");
                    thi.initFixedSidebarHoverEffect();
                } else {
                    $("body").removeClass("page-sidebar-fixed");
                    $("page-sidebar-menu").addClass("page-sidebar-menu-default");
                    $("page-sidebar-menu").removeClass("page-sidebar-menu-fixed");
                    $('.page-sidebar-menu').unbind('mouseenter').unbind('mouseleave');
                }
            }

            //footer 
            if (footerOption === 'fixed') {
                $("body").addClass("page-footer-fixed");
            } else {
                $("body").removeClass("page-footer-fixed");
            }

            //sidebar style
            if (sidebarStyleOption === 'light') {
                $(".page-sidebar-menu").addClass("page-sidebar-menu-light");
            } else {
                $(".page-sidebar-menu").removeClass("page-sidebar-menu-light");
            }

            //sidebar menu 
            if (sidebarMenuOption === 'hover') {
                if (sidebarOption == 'fixed') {
                    $('.sidebar-menu-option', panel).val("accordion");
                    alert("Hover Sidebar Menu is not compatible with Fixed Sidebar Mode. Select Default Sidebar Mode Instead.");
                } else {
                    $(".page-sidebar-menu").addClass("page-sidebar-menu-hover-submenu");
                }                
            } else {
                $(".page-sidebar-menu").removeClass("page-sidebar-menu-hover-submenu");
            }

            //sidebar position
            if (thi.isRTL) {
                if (sidebarPosOption === 'left') {
                    $("body").addClass("page-sidebar-reversed");
                    $('#frontend-link').tooltip('destroy').tooltip({
                        placement: 'right'
                    });
                } else {
                    $("body").removeClass("page-sidebar-reversed");
                    $('#frontend-link').tooltip('destroy').tooltip({
                        placement: 'left'
                    });
                }
            } else {
                if (sidebarPosOption === 'right') {
                    $("body").addClass("page-sidebar-reversed");
                    $('#frontend-link').tooltip('destroy').tooltip({
                        placement: 'left'
                    });
                } else {
                    $("body").removeClass("page-sidebar-reversed");
                    $('#frontend-link').tooltip('destroy').tooltip({
                        placement: 'right'
                    });
                }
            }
            thi.fixContentHeight(); // fix content height            
            thi.initFixedSidebar(); // reinitialize fixed sidebar
        }
		setLayout();
        // handle theme colors
        var setColor = this.setColor = function (color) {
            var color_ = (this.isRTL ? color + '-rtl' : color);
            $('#style_color').attr("href",   'css/themes/' + color_ + ".css");
            $.cookie('userTheme',color_);
            if (color == 'light2') {
                $('.page-logo img').attr('src', 'images/logo-invert.png');
            } else {
                $('.page-logo img').attr('src','images/logo.png');
            }
        }

        $('.toggler', panel).click(function () {
            $('.toggler').hide();
            $('.toggler-close').show();
            $('.theme-panel > .theme-options').show();
        });

        $('.toggler-close', panel).click(function () {
            $('.toggler').show();
            $('.toggler-close').hide();
            $('.theme-panel > .theme-options').hide();
        });

        $('.theme-colors > ul > li', panel).click(function () {
            var color = $(this).attr("data-style");
            setColor(color);
            $('ul > li', panel).removeClass("current");
            $(this).addClass("current");
        });

        // set default theme options:

        if ($("body").hasClass("page-boxed")) {
            $('.layout-option', panel).val("boxed");
        }

        if ($("body").hasClass("page-sidebar-fixed")) {
            $('.sidebar-option', panel).val("fixed");
        }

        if ($("body").hasClass("page-header-fixed")) {
            $('.page-header-option', panel).val("fixed");
        }

        if ($("body").hasClass("page-footer-fixed")) {
            $('.page-footer-option', panel).val("fixed");
        }

        if ($("body").hasClass("page-sidebar-reversed")) {
            $('.sidebar-pos-option', panel).val("right");
        }

        if ($(".page-sidebar-menu").hasClass("page-sidebar-menu-light")) {
            $('.sidebar-style-option', panel).val("light");
        }

        if ($(".page-sidebar-menu").hasClass("page-sidebar-menu-hover-submenu")) {
            $('.sidebar-menu-option', panel).val("hover");
        }        

        var sidebarOption = $('.sidebar-option', panel).val();
            var headerOption = $('.page-header-option', panel).val();
            var footerOption = $('.page-footer-option', panel).val();
            var sidebarPosOption = $('.sidebar-pos-option', panel).val();
            var sidebarStyleOption = $('.sidebar-style-option', panel).val();
            var sidebarMenuOption = $('.sidebar-menu-option', panel).val();

        $('.layout-option, .page-header-option, .sidebar-option, .page-footer-option, .sidebar-pos-option, .sidebar-style-option, .sidebar-menu-option', panel).change(setLayout);
           return this;
        }
        
    }, 
     //public function to fix the sidebar and content height accordingly
    fixContentHeight: function () {
        this.handleSidebarAndContentHeight();
    },

    initFixedSidebarHoverEffect: function() {
        this.handleFixedSidebarHoverEffect();
    },

    initFixedSidebar: function() {
        this.handleFixedSidebar();
    },

    getLayoutImgPath: function () {
        return this.layoutImgPath;
    },

    getLayoutCssPath: function () {
        return this.layoutCssPath;
    },
    //main function to initiate core javascript after ajax complete
    initAjax: function () {
        this.handleScrollers(); // handles slim scrolling contents 
        this.handleSelect2(); // handle custom Select2 dropdowns
        handleDropdowns(); // handle dropdowns
        handleTooltips(); // handle bootstrap tooltips
        handlePopovers(); // handles bootstrap popovers
        handleAccordions(); //handles accordions 
        handleUniform(); // hanfle custom radio & checkboxes     
        handleBootstrapSwitch(); // handle bootstrap switch plugin
        handleDropdownHover() // handles dropdown hover       
    },
    
    //public function to remember last opened popover that needs to be closed on click
    setLastPopedPopover: function (el) {
        this.lastPopedPopover = el;
    },

    //public function to add callback a function which will be called on window resize
    addResizeHandler: function (func) {
        this.resizeHandlers.push(func);
    },

    //public functon to call _runresizeHandlers
    runResizeHandlers: function() {
        this._runResizeHandlers();   
    },
    
    // wrthiser function to scroll(focus) to an element
    scrollTo: function (el, offeset) {
        var pos = (el && el.size() > 0) ? el.offset().top : 0;

         if (el) {
            if ($('body').hasClass('page-header-fixed')) { 
                pos = pos - $('.page-header').height(); 
            }            
            pos = pos + (offeset ? offeset : -1 * el.height());
        }

        $('html,body').animate({
            scrollTop: pos
        }, 'slow');
    }, 

    initSlimScroll: function(el) {
        $(el).each(function () {
            if ($(this).attr("data-initialized")) {
                return; // exit
            }
            var height;
            if ($(this).attr("data-height")) {
                height = $(this).attr("data-height");
            } else {
                height = $(this).css('height');
            }

            $(this).slimScroll({
                allowPageScroll: true, // allow page scroll when the element scroll is ended
                size: '7px',
                color: ($(this).attr("data-handle-color")  ? $(this).attr("data-handle-color") : '#bbb'),
                wrapperClass: ($(this).attr("data-wrapper-class")  ? $(this).attr("data-wrapper-class") : 'slimScrollDiv'),
                railColor: ($(this).attr("data-rail-color")  ? $(this).attr("data-rail-color") : '#eaeaea'),
                position: this.isRTL ? 'left' : 'right',
                height: height,
                alwaysVisible: ($(this).attr("data-always-visible") == "1" ? true : false),
                railVisible: ($(this).attr("data-rail-visible") == "1" ? true : false),
                disableFadeOut: true
            });
            $(this).attr("data-initialized", "1");
        });
    },

    destroySlimScroll: function(el) {
        $(el).each(function () {
            if ($(this).attr("data-initialized") === "1") { // destroy existing instance before updating the height
                $(this).removeAttr("data-initialized");
                $(this).removeAttr("style"); 
 
                    var attrList = {};

                    // store the custom attribures so later we will reassign.
                if ($(this).attr("data-handle-color")) {
                    attrList["data-handle-color"] = $(this).attr("data-handle-color");
                }
                if ($(this).attr("data-wrapper-class")) {
                    attrList["data-wrapper-class"] = $(this).attr("data-wrapper-class");
                }
                if ($(this).attr("data-rail-color")) {
                    attrList["data-rail-color"] = $(this).attr("data-rail-color");
                }
                if ($(this).attr("data-always-visible")) {
                    attrList["data-always-visible"] = $(this).attr("data-always-visible");
                }
                if ($(this).attr("data-rail-visible")) {
                    attrList["data-rail-visible"] = $(this).attr("data-rail-visible");
                }

                $(this).slimScroll({
                    wrapperClass: ($(this).attr("data-wrapper-class")  ? $(this).attr("data-wrapper-class") : 'slimScrollDiv'),
                    destroy: true
                });  

                var the = $(this);            
                
                // reassign custom attributes
                $.each(attrList, function (key, value) {
                    the.attr(key, value);
                });      
            }
        });
    },

    // function to scroll to the top
    scrollTop: function () {
        this.scrollTo();
    },

    // wrthiser function to  block element(indicate loading)
    blockUI: function (options) {
        var options = $.extend(true, {}, options);
        var html = '';
        if (options.iconOnly) {
            html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '')+'"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif" align=""></div>';
        } else if (options.textOnly) {
            html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '')+'"><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
        } else {    
            html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '')+'"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif" align=""><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
        }

        if (options.target) { // element blocking
            var el = $(options.target);
            if (el.height() <= ($(window).height())) {
                options.cenrerY = true;
            }            
            el.block({
                message: html,
                baseZ: options.zIndex ? options.zIndex : 1000,
                centerY: options.cenrerY != undefined ? options.cenrerY : false,
                css: {
                    top: '10%',
                    border: '0',
                    padding: '0',
                    backgroundColor: 'none'
                },
                overlayCSS: {
                    backgroundColor: options.overlayColor ? options.overlayColor : '#000',
                    opacity: options.boxed ? 0.05 : 0.1, 
                    cursor: 'wait'
                }
            });
        } else { // page blocking
            $.blockUI({
                message: html,
                baseZ: options.zIndex ? options.zIndex : 1000,
                css: {
                    border: '0',
                    padding: '0',
                    backgroundColor: 'none'
                },
                overlayCSS: {
                    backgroundColor: options.overlayColor ? options.overlayColor : '#000',
                    opacity: options.boxed ? 0.05 : 0.1,
                    cursor: 'wait'
                }
            });
        }            
    },

    // wrthiser function to  un-block element(finish loading)
    unblockUI: function (target) {
        if (target) {
            $(target).unblock({
                onUnblock: function () {
                    $(target).css('position', '');
                    $(target).css('zoom', '');
                }
            });
        } else {
            $.unblockUI();
        }
    },

    startPageLoading: function(message) {
        $('.page-loading').remove();
        $('body').append('<div class="page-loading"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif"/>&nbsp;&nbsp;<span>' + (message ? message : 'Loading...') + '</span></div>');
    },

    stopPageLoading: function() {
        $('.page-loading').remove();
    },

    alert: function(options) {

        options = $.extend(true, {
            container: "", // alerts parent container(by default placed after the page breadcrumbs)
            place: "append", // append or prepent in container 
            type: 'success',  // alert's type
            message: "",  // alert's message
            close: true, // make alert closable
            reset: true, // close all previouse alerts first
            focus: true, // auto scroll to the alert after shown
            closeInSeconds: 0, // auto close after defined seconds
            icon: "" // put icon before the message
        }, options);

        var id = this.getUniqueID("this_alert");

        var html = '<div id="'+id+'" class="this-alerts alert alert-'+options.type+' fade in">' + (options.close ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>' : '' ) + (options.icon != "" ? '<i class="fa-lg fa fa-'+options.icon + '"></i>  ' : '') + options.message+'</div>'

        if (options.reset) {0
            $('.this-alerts').remove();
        }

        if (!options.container) {
            if ($('body').hasClass("page-container-bg-solid")) {
                $('.page-title').after(html);
            } else {
                $('.page-bar').after(html);
            }
        } else {
            if (options.place == "append") {
                $(options.container).append(html);
            } else {
                $(options.container).prepend(html);
            }
        }

        if (options.focus) {
            this.scrollTo($('#' + id));
        }

        if (options.closeInSeconds > 0) {
            setTimeout(function(){
                $('#' + id).remove();
            }, options.closeInSeconds * 1000);
        }

        return id;
    },

    // initializes uniform elements
    initUniform: function (els) {
        if (els) {
            $(els).each(function () {
                if ($(this).parents(".checker").size() == 0) {
                    $(this).show();
                    $(this).uniform();
                }
            });
        } else {
            this.handleUniform();
        }
    },
    //wrthiser function to update/sync jquery uniform checkbox & radios
    updateUniform: function (els) {
        $.uniform.update(els); // update the uniform checkbox & radios UI after the actual input control state changed
    },
    //public function to initialize the fancybox plugin
    initFancybox: function () {
        this.handleFancybox();
    },
    //public helper function to get actual input value(used in IE9 and IE8 due to placeholder attribute not supported)
    getActualVal: function (el) {
        var el = $(el);
        if (el.val() === el.attr("placeholder")) {
            return "";
        }
        return el.val();
    },
    //public function to get a paremeter by name from URL
    getURLParameter: function (paramName) {
        var searchString = window.location.search.substring(1),
            i, val, params = searchString.split("&");

        for (i = 0; i < params.length; i++) {
            val = params[i].split("=");
            if (val[0] == paramName) {
                return unescape(val[1]);
            }
        }
        return null;
    },
    // check for device touch support
    isTouchDevice: function () {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    },
    // To get the correct viewport width based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
    getViewPort: function () {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return {
            width: e[a + 'Width'],
            height: e[a + 'Height']
        }
    },
    getUniqueID: function(prefix) {
        return 'prefix_' + Math.floor(Math.random() * (new Date()).getTime());
    },
    // check IE8 mode
    isIE8: function () {
        return this.isIE8;
    },
    // check IE9 mode
    isIE9: function () {
        return this.isIE9;
    },
    //check RTL mode
    isRTL: function () {
        return this.isRTL;
    },
    getAssetsPath: function () {
        return this.assetsPath;
    },  
    setAssetsPath: function(path) {
        this.assetsPath = path;
    },
    setGlobalImgPath: function (path) {
        this.globalImgPath = this.assetsPath + path;
    },
    getGlobalImgPath: function () {
        return this.globalImgPath;
    },
    // get layout color code by color name
    getBrandColor: function (name) {
        if (this.brandColors[name]) {
            return this.brandColors[name];
        } else {
            return '';
        }
    }
 });
 //主页面初始化
jQuery(document).ready(function() {
 	 app = new com.youku.ad.dsp.app({ctx:ctx});
});
