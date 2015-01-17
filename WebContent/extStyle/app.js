/*
 * 页面框架初始化
 */
// 创建application 初始化
Ext.application({
	name : 'SSPApp',
	navView:null,
	userMenuData:null,//用户菜单
	userFunction:null,//用户权限
	userInfo:null,//用户信息
	msgCt:null,//定义消息弹出窗
	launch : function() {
		Ext.tip.QuickTipManager.init();
		Ext.form.Field.prototype.msgTarget = 'qtip';
		Ext.Ajax.timeout = 600000;//请求超时时间
		this.cookies = Ext.create('Ext.state.CookieProvider', {
		    expires: new Date(new Date().getTime()+(1000*60*60*24*30)) //30 days
		});
		Ext.state.Manager.setProvider(this.cookies);
		this.themeCookie= this.cookies.get("themes");
		this.themeCookie = !this.themeCookie || this.themeCookie == '' ? 'neptune': this.themeCookie;//获取用户主题
		this.loadView();//预加载界面
		Ext.getBody().mask('正在加载用户信息...');
		this.loadUserData();//加载用户信息和菜单
	},
	/*
	 * 加载界面
	 * */
	loadView:function(){
		//加载主界面
		var mainTab = this.mainTab = Ext.create('SSPApp.main.MainTab', {
			region : 'center',
			defaults : {
				bodyPadding : 1,
				autoScroll : true
			},
			listeners : {
				scope:this,
				tabchange:function(){
					
				}
			}
		});
		//加载顶部
		this.topPanel = Ext.create('SSPApp.main.TopPanel', {
			region : 'north'
		})
		//加载底部
		this.southPanel = Ext.create('SSPApp.main.BottomPanel', {
			region : 'south'
		});
		//从cookie主题
		var themeCombo = Ext.ComponentQuery.query('combo',this.southPanel)[0]; 
		themeCombo.setValue(this.themeCookie);
		this.setActiveStyleSheet(this.themeCookie);
		themeCombo.on('select',function(combo){
			this.setActiveStyleSheet(combo.getValue());
			this.cookies.set("themes", combo.getValue());
		},this)
		//加载左侧栏
		this.nv = Ext.create('SSPApp.main.NavigationPanel', {
			region : 'west',
			listeners : {
				scope:this,
				menuClick : this.opneTab
			}
		})
	},
	/*
	 * 根据菜单id从用户树当中找到当前的菜单树
	 * */
	getTabFromUserMenuDataById:function(id){
		var obj = {}
		Ext.each(this.userMenuData,function(i){
			
		    Ext.each(i.children,function(j){
			    if(id==j.id){
			        obj = j;
			    }
			})
		})
		return obj;
	},
	/**
	 * 动态添加JS模块
	 * id:Tab页ID
	 * icon : 图片
	 * menuName 名称
	 * jsClassFile 加载JS
	 */
	addModuleTab: function(menuObj) {
		if(menuObj.jsClassFile != undefined && menuObj.jsClassFile != ""){
			var p = Ext.create('Ext.panel.Panel', {
				id : menuObj.id,
				icon:menuObj.icon,
				title:menuObj.menuName,
				closable : true,
				border : false,
				layout:'fit',
				itmes:[]
			});
			this.mainTab.add(p).show();
			p.updateLayout();
			p.mask('正在加载['+menuObj.menuName+']模块信息...');
			Ext.require(menuObj.jsClassFile, function() {
				var moduleInstance = Ext.create(menuObj.jsClassFile);
				p.add(moduleInstance);
				p.updateLayout();
				p.unmask();
				moduleInstance.initMethod(menuObj);
			},this);
			
		}
	},
	
	/**
	 * 根据ID查找TAB
	 * @param {} id id
	 * @return {}
	 */
	findTab: function(id) {
		return this.mainTab.getComponent(id);
	},
	
	/*
	 * 根据一个菜单节点打开一个窗口tab
	 * */
	opneTab:function(oneTreeMenu){
		var tabItem = this.mainTab.getComponent(oneTreeMenu.id);
		
			
		if (tabItem) {
			this.mainTab.setActiveTab(tabItem);
		} else {
			if(oneTreeMenu.jsClassFile != undefined &&oneTreeMenu.jsClassFile != ""){
				//this.nv.mask('');//正在加载['+d.menuName+']模块信息...
				var p = Ext.create('Ext.panel.Panel', {
					id : oneTreeMenu.id,
					icon:oneTreeMenu.icon,
					title:oneTreeMenu.menuName,
					closable : true,
					border : false,
					layout:'fit',
					itmes:[]
				});
				this.mainTab.add(p).show();
				p.updateLayout();
				p.mask('正在加载['+oneTreeMenu.menuName+']模块信息...');
				Ext.require(oneTreeMenu.jsClassFile, function() {
					var s = Ext.create(oneTreeMenu.jsClassFile);
					p.add(s);
					p.updateLayout();
					p.unmask();
				},this);
				
			}else if(oneTreeMenu.actionPath != undefined &&oneTreeMenu.actionPath != ""){
				var p = Ext.create('Ext.panel.Panel', {
					id : oneTreeMenu.id,
					icon:oneTreeMenu.icon,
					title:oneTreeMenu.menuName,
					closable : true,
					html: '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="' + oneTreeMenu.actionPath + '"></iframe>',
						
					border : false
				});
				this.mainTab.add(p).show();
				p.updateLayout();
			}
		}
	
	},
	/*
	 * 加载用户信息
	 * */
	loadUserData:function(){
		var box = Ext.ComponentQuery.query('box',this.topPanel)[1];
		box.update('<div class="app_time" > <span id="liveclock" >' +
				   Ext.Date.format(new Date(), 'Y-m-d H:i:s l')+
				   '</span></div><span class="app_time" >'+userName+',欢迎您！</span>');
		this.setMenu(userId);//加载菜单
	},
	/*
	 * 加载菜单
	 * */
	setMenu:function(userId){
		if(userId == null ||userId == undefined ||userId == "null" ||userId == ""){
			window.location.href = 'login.html';
			return;
		};
		Ext.Ajax.request({
			url : globalCtx+'/basic/LoginController/getUserTreeAndFunction.sdo?userId='+userId,
			scope:this,
			success : function(response) {
				Ext.getBody().unmask();
				setInterval(this.setTime,1000)//开启时钟
				var cal = Ext.JSON.decode(response.responseText);
				if(cal.result == 'success'){
					this.userMenuData = cal.userTree;
					this.userFunction =cal.userFunction;//用户权限
					this.nv.removeNV();
					this.nv.createNV(this.userMenuData);	//创建左侧菜单
					this.navView = Ext.create('Ext.container.Viewport', {
						layout : 'border',
						items : [this.mainTab, this.topPanel, this.nv, this.southPanel]
					});
				}else{
					window.location.href = 'login.html';
					return;
				}
			}
		});
	},
	/*
	 * 添加 当前时间 时钟
	 * */
	setTime:function(){
		var date = Ext.Date.format(new Date(), 'Y-m-d H:i:s l');
		document.getElementById('liveclock').innerHTML=date;
	},
	setActiveStyleSheet: function(title) {
	    this.setDocumentTheme(document, title);
	     //刷新iframe的主题
	    var iframes = Ext.query('iframe');
	    for(var i = 0; i < iframes.length; i++) {
	    	this.setDocumentTheme(iframes[i].contentWindow.document, title);
	    }
	},
	/**
	 * 刷新documnet主题
	 * @param {} doc documnet对象
	 * @param {} themeTitle CSS的title
	 */
	setDocumentTheme: function(doc, themeTitle) {
		var i,a,links = doc.getElementsByTagName("link"), len = links.length;
	    for (i = 0; i < len; i++) {
	        a = links[i];
	        if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
	            a.disabled = true;
	            if (a.getAttribute("title") == themeTitle) a.disabled = false;
	        }
	    }
	},
	/**
	 * 用户是否有角色
	 * @param {} roleNameArr 判断的角色数组
	 */
	isUserHasRole: function(roleNameArr) {
		var roleName = [];
		if (Ext.isArray(roleNameArr)) {
			roleName = roleNameArr;
		}else{
		   roleName.push(roleNameArr);
		}
		if(this.userFunction != null && this.userFunction != undefined){
			var list = this.userFunction.toString().split(",");
			for(var i = 0; i < list.length; i++) {
				for(var j = 0; j < roleName.length; j++) {
					if(roleName[j] == list[i]) {
						return true;
					}
				}
			}
		}
		return false;
	},
	/*
	 * 设置模块的按钮权限
	 * */
	setModuleFunction:function(btn){
		var btns = Ext.ComponentQuery.query('button[iconCls!="search"]',btn);
		for (var i = 0; i < btns.length; i++) {
			if(!this.isUserHasRole(btns[i].code)){
				var separt = btns[i].nextNode('tbseparator');
				if(separt!=null){
					separt.hide();
				}
				btns[i].hide();
			}
		}
	},
	/*
	 * 根据模块的toobar 的名称 去做按钮的显示与隐藏
	 * */
	setModuleBtnDisable:function(toolBar,names){
		var disName = [];
		if (Ext.isArray(names)) {
			disName = names;
		}else{
		   disName.push(names);
		};
		var btns = Ext.ComponentQuery.query('button[iconCls!="search"]',toolBar);
		for (var i = 0; i < btns.length; i++) {
			btns[i].setDisabled(false);
			for (var j = 0; j < names.length; j++) {
				if(names[j]==btns[i].text){
					btns[i].setDisabled(true);
					break;
				}
			}
		};
	},
	/*
	 * 根据模块的toobar 的名称 控制按钮的显示与隐藏，除设置的按钮名称外：以备按钮太多的情况
	 * */
	setModuleBtnDisableExcept : function(toolBar,names){
		var btns = Ext.ComponentQuery.query('button[iconCls!="search"]',toolBar);
		for (var i = 0; i < btns.length; i++) {
			if(names.indexOf(btns[i].text) != -1) {
				btns[i].setDisabled(false);
			} else {
				btns[i].setDisabled(true);
			}
		};
	},
	/*
	 * 关闭全屏
	 * */
	collapse:function(){
		this.topPanel.hide();
		this.nv.collapse();
	},
	/*
	 * 全屏操作
	 * */
	expand:function(){
		this.topPanel.show();
		this.nv.expand();
	},
     /*
	 * 默认打开的界面
	 * */
	expand:function(){
		this.topPanel.show();
		this.nv.expand();
	},
	/*
	 * 信息弹出提示窗口
	 * */
	msg : function(title, format,delay){
        this.msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true)
        var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
        var m = Ext.DomHelper.append(this.msgCt, this.createBox(title, s), true);
        m.hide();
        m.slideIn('t',{duration:200}).ghost("b", { delay: delay == undefined ?2000:delay, remove: true});
    },
    //private using to msg
    createBox:function(t, s){
        return '<div class="msg ' + Ext.baseCSSPrefix + 'border-box"><h3>' + t + '</h3><p>' + s + '</p></div>';
    },
    /*
     * 全局init
     * */
    init:function(){
        //防止按backspace回退
		Ext.create('Ext.util.KeyNav', Ext.getBody(), {
			ignoreInputFields : true,//忽略里面的filed的 事件响应 不阻止
	        'backspace'  :{
		        fn: function(e){e.stopEvent()}
		    }
	    });
    }
});
		    	// 定义顶部面板
Ext.define('SSPApp.main.TopPanel', {
	extend : 'Ext.toolbar.Toolbar',
	border : false,
	style : 'margin-top:-8px;',
	height : 47,
	items : [{
		xtype : 'box',
		html : '<div class="app_logo" ><img src="images/YT-Inc-k.png" ></img></div>'
				+ '<div class="add_logo_name">YES管理统计平台</div>'
	}, '->', {
		xtype : 'box',
		html : ''
	}, {
		iconAlign : 'left',
		iconCls : 'app_logout',
		xtype : 'button',
		text : '退出',
		scope : this,
		handler : function() {
			Ext.MessageBox.confirm('提示', "确定退出登录？？", function(btn) {
				if (btn != 'yes') {
					return;
				}
				Ext.Ajax.request({
					url : globalCtx+'/basic/LoginController/logout.sdo',
					scope:this,
					success : function(response) {
						window.location.href = 'login.html';
						//location.href = "http://10.100.55.24/logout";
					}
				});
			});
		}
	}]
});
// 定义底部面板
Ext.define('SSPApp.main.BottomPanel', {
	extend : 'Ext.toolbar.Toolbar',
	border : false,
	scope:this,
	defaults : {
		xtype : 'panel'
	},
	items : [
	    {
            xtype:'tbspacer',
            flex:.2
        },
        '-',
        {
        	xtype:'label',
        	width: 250,
	        html:'<span style="font-size: 12px;font-weight: bold;margin-left:45px;">优酷YES管理统计平台 V1.0</span>'
        },
        '-',
        {
            xtype:'tbspacer',
            flex:.2
        },
        '-',
		{
        	xtype : 'combo',
			displayField : 'name',
			valueField : 'value',
			editable:false,
			width : 80,
			labelStyle : 'cursor:move;',
			store : Ext.create('Ext.data.Store', {
				fields : ['value', 'name'],
				data : [{
						value : 'neptune',
						name : '默认'
					}, {
						value : 'crisp',
						name : '扁平化'
					}, {
						value : 'classic',
						name : '经典主题'
					}, {
						value : 'gray',
						name : '灰色'
				}]
			})
		},
		{
			xtype : 'button',
			text : '全屏操作',
			width : 90,
			iconCls : 'fullscreen',
			handler : function(btn) {
				if (SSPApp.getApplication().nv.collapsed) {
					SSPApp.getApplication().expand();
					btn.setText('全屏操作');
				} else {
					SSPApp.getApplication().collapse();
					btn.setText('退出全屏');
				}
			}
        }
	]
});
// 定义导航面板
Ext.define('SSPApp.main.NavigationPanel', {
	extend : 'Ext.panel.Panel',
	width : 200,
	layout : 'accordion',
	title : '导航',
	split : true,
	
	collapsible : true,
	requires : ['ssp.util.MenuView'],
	removeNV:function(){
		this.removeAll();
	},
	createNV : function(menuData) {
		if(menuData == null || menuData == "" || menuData == undefined){
			return;
		}
		for (var i = 0; i < menuData.length; i++) {
			this.add(Ext.create('Ext.tree.Panel', {
				title :'<div class="app_small_img"><img src = "'+menuData[i].openIcon+'"></img><span style="font-size:14px;">' + menuData[i].menuName+'</span></div>',
				parentPanel:this,
				border: false ,
			    store : Ext.create('Ext.data.TreeStore', {
					root : {
						expanded : true,
						children : menuData[i].children
					}
				}),
			    rootVisible: false,
			    listeners: {
			    	scope: this,
			    	itemclick: this.onTreeClick
		        }
			}));
		}
	},
	onTreeClick : function(node, record, item, index, e, eOpts) {
		this.fireEvent('menuClick', record.data);
	},
	initComponent : function() {
		this.items = [];
		this.callParent();
	}
});
// 定义主面板
Ext.define('SSPApp.main.MainTab', {
	extend : 'Ext.tab.Panel',
	requires : ['Ext.ux.TabReorderer','Ext.ux.TabCloseMenu','ssp.basic.PortalPanel'],
	plugins : ['tabreorderer',
        Ext.create('Ext.ux.TabCloseMenu', {  
            closeTabText : '关闭当前页',  
            closeOthersTabsText : '关闭其他页',  
            closeAllTabsText : '关闭所有页'  
    })],
	layout : 'hbox',
	defaults : {
		bodyPadding : 2,
		autoScroll : true,
		closable : true,
		border : false
	},
	items : [Ext.create('ssp.basic.PortalPanel',{})]
});