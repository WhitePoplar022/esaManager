/*
 * 系统管理 - 用户管理
 * */
Ext.define('ssp.basic.UserPanel', {
	extend: 'Ext.panel.Panel',
	border: false,
	layout: 'fit',
	requires: [
        'Ext.ux.ProgressBarPager',
        'Ext.grid.*',
        'Ext.window.Window',
        'Ext.toolbar.Toolbar',
        'Ext.selection.CheckboxModel',
        'ssp.util.selector.RoleSelectorWindow'
    ],
	initComponent : function() {
		this.initStore();//初始化数据
		this.initColumn();//初始化columns
		this.app = SSPApp.getApplication();
		//按钮toolbar
		this.toolBar = Ext.create('Ext.toolbar.Toolbar',{
			items:[{
				text : '新建用户',
				iconCls:'add',
				code: 'newUser',
				scope : this,
				handler:function(){
					this.userWindow.setTitle('新建用户');
					this.userWindow.show();
				}
			},'-',{
				text : '修改用户',
				scope : this,
				code: 'editUser',
				iconCls:'edit',
				handler : this.editUser
			},{
				text : '删除用户',
				iconCls:'delete',
				code: 'remove',
				scope : this,
				handler : this.deleteUser
			},
			{
				text : '配置角色',
				scope : this,
				iconCls:'show',
				code: 'setRole',
				handler : function(){
					this.roleWin.show();
					var r = this.gridPanel.getSelectionModel().getSelection()[0];
					this.roleWin.setValue(r.data.roleids);
				}
			},'-',{
				xtype : 'textfield',
				fieldLabel : '用户名',
				labelAlign : 'right',
				labelWidth : 60,
				name : 'name',
				listeners:{
					scope:this,
					specialkey:function(field, e){
						if (e.getKey() == e.ENTER) {
	                    	this.searchUser();
	                    }
					}
				}
			},{
				xtype : 'button',
				text : '查询',
				iconCls:'search',
				scope:this,
				handler:this.searchUser
			}]
		});
		//主面板 数据面板
		this.gridPanel = Ext.create('Ext.grid.Panel',{
			mask : true,
			region:'center',
			border : false,
			enableColumnHide : false,//禁用增加选择列
			columnLines : true,
			forceFit : true,
			reserveScrollbar: true,//防止滚动条溢出
			selModel : new Ext.selection.CheckboxModel({mode : 'SIMPLE',allowDeselect : true,showHeaderCheckbox : false}),//单选可反选
			viewConfig: {stripeRows: true},
			store : this.userStore,
			columns :this.columns,
			tbar :this.toolBar,
			bbar : {
				xtype : 'pagingtoolbar',
				pageSize : 25,
				store : this.userStore,
				displayInfo : true,
				plugins : new Ext.ux.ProgressBarPager()
			}
		});
		this.redTpl =  '<span style="color:red;font-weight:bold" data-qtip="必填">*</span>';
		this.addUserKey = {scope:this,specialkey:function(f, e){if (e.getKey() == e.ENTER) {this.newUser();}}};
		//用户 新建 修改 查看 Panel
		this.userPanel = Ext.create('Ext.form.Panel',{
			frame : false,
			border:false,
			layout:'column',
			defaults : {layout:'form',border:false,defaults:{margin : 2,anchor:'100%',xtype:'textfield',listeners:this.addUserKey}},
			fieldDefaults : {labelAlign : 'right',labelWidth :90},
			items : [{
				xtype:'fieldset',
				title: '账号信息',
				border: true,
				collapsible: false,
				columnWidth:.5,
				items:[
			        {
						xtype:'hidden',name:'id'
					},
					{
				    	fieldLabel: '用户名',  name: 'name', afterLabelTextTpl:this.redTpl, allowBlank:false
			    	},
			    	{
				    	fieldLabel: '邮箱', vtype:'email', name: 'useremail',	 afterLabelTextTpl:this.redTpl,allowBlank:false
           			},
           			{
				    	fieldLabel: '密码',  inputType:'password', afterLabelTextTpl:this.redTpl, name: 'password', allowBlank:false
			    	},
			    	{
				    	fieldLabel: '状态', 
				    	name: 'status',
				    	afterLabelTextTpl:this.redTpl,
				    	allowBlank:false,
				    	store: this.statusStore,
						queryMode: 'local',
						value:"0",
						editable:false,
						xtype:'combo',
						displayField: 'name',
						valueField: 'id',
						listeners:{
							specialkey:function(field, e){
								//防止用户按后退键导致页面后退
								if (e.getKey() == e.BACKSPACE) {
			                        e.stopEvent();
			                    }
							}
						}
					}
		  		]
			},
			{width:10, html:'&nbsp;&nbsp;&nbsp; '},
			{
				xtype:'fieldset',
				title: '联系人信息',
				border: true,
				collapsible: false,
				columnWidth:.5,
				items:[{
				    	fieldLabel: '姓名',
				    	name: 'username'
           			},{
				    	fieldLabel: '电话',
				    	name: 'userphone'
           			},{
				    	fieldLabel: '性别', 
				    	name: 'sex',
				    	store: this.sexStore,
						queryMode: 'local',
						value:'男',
						editable:false,
						xtype:'combo',
						displayField: 'name',
						valueField: 'id',
						listeners:{
							specialkey:function(field, e){
								//防止用户按后退键导致页面后退
								if (e.getKey() == e.BACKSPACE) {
			                        e.stopEvent();
			                    }
							}
						}
				    },{
				    	fieldLabel: '备注',
				    	name: 'description'
           			}]
			}]
		});
		//用户 新建 修改 查看 Window
		this.userWindow = Ext.create('Ext.window.Window',{
			autoHeight:true,
		    width: 560,
		    title: '新建用户',
		    bodyPadding: 5,
		    modal: true,
		    frame: true,
		    closeAction:'hide',
		    constrain : true,
		    constrainTo:this.getId(),
		    items:[this.userPanel],
		    listeners:{
				scope:this,
				close:function(win, e){
				    this.userPanel.reset();
				}
			},
		    buttonAlign:'center',
		    buttons:[{
		    	text:'确定',
		    	scope:this,
		    	iconCls:'confirm',
		    	handler:this.newUser
		    },{
		    	text:'取消',
		    	iconCls:'cancel',
		    	scope:this,
		    	handler:function(){
		    		this.userPanel.reset();
		    		this.userWindow.close();
		    	}
		    }]
		});
		//配置角色 window
		this.roleWin = Ext.create('ssp.util.selector.RoleSelectorWindow');
		Ext.apply(this, {
			layout: 'border',
			items: [this.gridPanel]
		});
		
		this.callParent();
	},
	/*
	 * 用户管理界面全局事件初始化
	 * */
	initEvents:function(){
		this.items.on('afterrender',this.initMethod(),this);
		this.gridPanel.on('select',function(row,record){this.gridPanel.getSelectionModel().select(record)},this);
		this.gridPanel.getSelectionModel().on('selectionchange',function(sm) {this.setBtn(sm.getCount())},this);
		this.roleWin.on('configureRoles',this.configureRoles,this);
		
	},
	/*
	 * 用户管理init 方法
	 * */
	initMethod:function(){
		this.gridPanelLoadData()
		this.setBtn(0);
		this.app.setModuleFunction(this.toolBar);//按钮权限设置
	},
	/*
	 * 初始化Store
	 * */
	initStore : function() {
		Ext.define('user', {
			extend : 'Ext.data.Model',
			idProperty : 'id'
		});
		this.sexStore = Ext.create('Ext.data.Store', {
		    fields: ['id', 'name'],
		    data : [
		        {"id":"男", "name":"男"},
		        {"id":"女", "name":"女"}
		    ]
		});
		this.statusStore = Ext.create('Ext.data.Store', {
		    fields: ['id', 'name'],
		    data : [
		        {"id":"0", "name":"可用"},
		        {"id":"1", "name":"不可用"}
		    ]
		});
		//数据列表 Store
		this.userStore = Ext.create('Ext.data.JsonStore', {
			model : 'user',
			sorters :{property :'id',direction: 'DESC'},
			remoteSort : true,
			pageSize : 25,
			proxy : {
				type : 'ajax',
				actionMethods: {read: 'POST'}, 
		        startParam: 'extLimit.start',
		        limitParam: 'extLimit.limit',
		        simpleSortMode: true,
		        sortParam : 'extLimit.sort',
		        directionParam :'extLimit.dir',
				url:globalCtx+'/basic/UserController/list.sdo',
				reader : {type : 'json',totalProperty:'total',rootProperty : 'invdata'}
			}
		});
	},
	/*
	 * 初始化column
	 * */
	initColumn:function(){
		var statusRenderer = function(v){
			if(v == 0 ) return '<font style="color: #379337;font-weight: bold;">可用</font>'; 
			else if(v == 1)return '<font style="color: #c9c5dd;font-weight: bold;">不可用</font>';
		};
		this.columns = [
			{text : '用户ID', flex: 1,dataIndex : 'id'}, 
			{text : '用户名',flex: 2,dataIndex : 'name'}, 
			{text : '真实姓名',flex: 2,dataIndex : 'username'}, 
			{text : '邮箱',flex: 2.5,dataIndex : 'useremail'}, 
			{text : '性别',flex: 1,dataIndex : 'sex'}, 
			{text : '状态',flex: 1.2,dataIndex : 'status',renderer:statusRenderer}
		]
	},
	/*
	 * 新建用户
	 * */
	newUser:function(){
		var form = this.userPanel.getForm();
		var baseParams = form.getFieldValues();
		var id = form.findField('id').getValue();
		var name = form.findField('name').getValue();
		if(form.isValid()){
			Ext.Ajax.request({
				method: 'post',
				url:globalCtx+'/basic/UserController/add.sdo',
				params: baseParams,
				waitTitle: '请稍等片刻',
	       		waitMsg: '正在提交...',
				scope:this,
				success: function(resp) {
					var obj = Ext.util.JSON.decode(resp.responseText);
					if (obj.result == 'success') {
						var msg = id == ""?'新建 ':'修改';
						SSPApp.getApplication().msg('提示', msg+'用户[ <font>'+name+'</font> ]成功');	
						this.userPanel.reset();
						this.userWindow.close();
					} else {
						Ext.Msg.alert("提示", "错误信息:"+obj.info);
					}
					this.gridPanelLoadData();
				},
	   			failure: function(response, opts) {
	   				this.exception();
	   			}
			});
		}
	},
	/*
	 * 删除用户
	 * */
	deleteUser :function(){
		var r = this.gridPanel.getSelectionModel().getSelection()[0];
		var s = this;
		var userStr = '删除用户[ <font color="blue" >'+r.get('name')+'</font> ]';
		Ext.MessageBox.confirm('提示', '确定'+userStr+' ？', function(btn) {
			if (btn != 'yes') {
				return;
			}
			Ext.Ajax.request({
				method: 'post',
				url:globalCtx+'/basic/UserController/delete.sdo',
				params: {id: r.get('id')},
				waitTitle: '请稍等片刻',
	       		waitMsg: '正在删除...',
				scope:this,
				success: function(resp) {
					var obj = Ext.util.JSON.decode(resp.responseText);
					if (obj.result == 'success') {
						SSPApp.getApplication().msg('提示', userStr+'成功!');
					} else {
						Ext.Msg.alert("提示", "错误信息:"+obj.info);
					}
					s.gridPanelLoadData();
				},
	   			failure: function(response, opts) {
	   				this.exception();
	   			}
			});
		});
	},
	/*
	 * 查询用户
	 * */
	searchUser:function(){
		var value = Ext.ComponentQuery.query('textfield',this.toolBar)[0].getValue();
		var params = {name:value}; 
		Ext.apply(this.userStore.proxy.extraParams, params);
		this.userStore.loadPage(1);
	},
	/*
	 * 修改用户
	 * */
	editUser:function(p, td, cellIndex, r, tr, rowIndex, e, eOpts){
		if(r == undefined){
		    r = this.gridPanel.getSelectionModel().getSelection()[0];
		}
		this.userWindow.setTitle('修改用户');
		this.userWindow.show();
		this.userPanel.getForm().loadRecord(r);
	},
	
	/**
	 * 配置角色 usingBy roleSelectorWindow
	 * */
	configureRoles :function(roleValue){
		var r = this.gridPanel.getSelectionModel().getSelection()[0];
		var s = this;
		Ext.MessageBox.confirm('提示', "确定给[<font color=red >"+r.get('name')+"</font>]配置如下角色:</br><font color=red>"+
		this.roleWin.getNames()+"</font>?", function(btn) {
			if (btn != 'yes') {
				return;
			}
			Ext.Ajax.request({
				method: 'post',
				url:globalCtx+'/basic/UserController/setRole.sdo',
				params: {userid: r.get('id'),roleid:roleValue==""? "":roleValue},
				waitTitle: '请稍等片刻',
	       		waitMsg: '正在提交...',
				scope:this,
				success: function(resp) {
					var obj = Ext.util.JSON.decode(resp.responseText);
					if (obj.result == 'success') {
						SSPApp.getApplication().msg('提示', '配置角色成功');
					} else {
						Ext.Msg.alert("提示", "错误信息:"+obj.info);
					}
					s.gridPanelLoadData();
				},
	   			failure: function(response, opts) {
	   				this.exception();
	   			}
			});
		});
		
	},
	/*
	 *  列表加载数据
	 * */
	gridPanelLoadData:function(){
		this.userStore.load({params:{"extLimit.start":0,"extLimit.limit":25}});
	},
	/*
	 *  刷新表格
	 * */
	reloadGrid:function(){
		this.gridPanel.getView().refresh();
	},
	/*
	 * 查看 删除等按钮的状态安置 当未选择数据按钮置灰
	 * */
	setBtn:function(sm){
		if(sm<1){
			this.app.setModuleBtnDisable(this.toolBar,['修改用户','删除用户','配置角色']);
		}else{
			this.app.setModuleBtnDisable(this.toolBar,['新建用户']);
			var status = this.gridPanel.getSelectionModel().getSelection()[0].get('status');
			if(status == "1"){
				this.app.setModuleBtnDisable(this.toolBar,['新建用户','配置角色']);
			}
		}
	},
	/*
	 *  错误处理
	 * */
	exception:function(){
		SSPApp.getApplication().msg('出错', '后端未正确返回数据',2000);
	}
});