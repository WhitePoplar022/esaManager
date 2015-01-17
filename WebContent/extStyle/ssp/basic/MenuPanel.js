Ext.define('ssp.basic.MenuPanel', {
	extend: 'Ext.panel.Panel',
	border: false,
	layout: 'fit',
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.ux.CheckColumn',
        'ssp.util.selector.ImageSelectorWindow'
    ],
    initComponent: function() {
    	this.initStore();//初始化数据
		this.initColumn();//初始化columns
		this.app = SSPApp.getApplication();
		this.imageWindow = Ext.create('ssp.util.selector.ImageSelectorWindow',{});
		this.functionPanel = Ext.create('ssp.util.selector.FunctionPanel',{});
    	//按钮toolbar
		this.toolBar = Ext.create('Ext.toolbar.Toolbar',{
			items:[{
						text : '新建菜单',
						iconCls:'add',
						code:'cdgl-add',
						scope : this,
						handler:function(){
							this.menuWindow.setTitle('新建菜单');
							var sm = this.treePanel.getSelectionModel();
							if(sm.getCount()<1){
								this.firstNode();
							}else{
								this.secondNode(sm);
							};
							this.menuPanel.getForm().findField('imageDisplay').setRawValue('');
							this.menuWindow.show();
						}
					},'-',{
						text : '修改菜单',
						scope : this,
						code:'cdgl-edit',
						iconCls:'edit',
						handler : this.editMenu
					},{
						text : '删除菜单',
						iconCls:'delete',
						code:'cdgl-del',
						scope : this,
						handler : this.deleteMenu
					},'-',{
						text: '设置菜单权限',
						iconCls: 'show',
						code:'cdgl-function',
						scope:this,
						handler: function() {
							var r = this.treePanel.getSelectionModel().getSelection()[0];
							this.functionPanel.setTitle('设置【'+r.get('menuName')+'】权限');
							this.functionPanel.selectByMenuId(r.get('id'));
							this.functionPanel.show();
						}
					}]
		});
		this.redTpl =  '<span style="color:red;font-weight:bold" data-qtip="必填">*</span>';
		//菜单 新建 修改 查看 Panel
		this.menuPanel = Ext.create('Ext.form.Panel',{
			frame : false,
			border:false,
			layout:'column',
			defaults : {layout:'form',border:false,defaults:{margin : 2,anchor:'100%',xtype:'textfield'}},
			fieldDefaults : {labelAlign : 'right',labelWidth :90},
			items : [{
				columnWidth:1,
				items:[{
				        xtype:'hidden',
						name:'id'
				    },{
						xtype:'hidden',
						name:'parantMenuID',
						value:0
					},{
						xtype:'hidden',
						name:'openIcon',
						value:0
					},{
				    	fieldLabel: '菜单名称', 
				    	name: 'menuName',
				    	afterLabelTextTpl:this.redTpl,
				    	allowBlank:false
			    	},{
				    	fieldLabel: '排列序号', 
				    	name: 'menuOrder',
				    	allowBlank:false
			    	},{
			            xtype: 'fieldcontainer',
			            fieldLabel: '菜单图片',
			            layout: {
			                type: 'hbox',
			                defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
			            },
			            defaults: {
			                hideLabel: true
			            },
			            items: [{
				            	xtype: 'textfield',
				            	readOnly:true,
				            	name: 'icon'
			            	},{
				            	xtype: 'displayfield',
				            	width:40,
				            	name: 'imageDisplay'
			            	},{
				            	xtype: 'button', 
				                text: '选择',
								scope : this,
								handler : function(){
									this.imageWindow.show();
									var v = this.menuPanel.getForm().findField('openIcon').getValue();
									this.imageWindow.setSelectimage(v);
								}
						}]
			        },{
				    	fieldLabel: '页面类型', 
				    	name: 'type',
				    	afterLabelTextTpl:this.redTpl,
				    	allowBlank:false,
				    	store: this.typeStore,
						queryMode: 'local',
						value:"jsClassFile",
						editable:false,
						scope:this,
						xtype:'combo',
						displayField: 'name',
						valueField: 'id',
						listeners:{
							scope:this,
							specialkey:function(field, e){
								//防止用户按后退键导致页面后退
								if (e.getKey() == e.BACKSPACE) {
			                        e.stopEvent();
			                    }
							},
							change:function( combo){
								var form = this.menuPanel.getForm();
								var jsc = form.findField('jsClassFile');
								var acp = form.findField('actionPath');
								jsc.reset();
								acp.reset();
								if(combo.getValue() == 'jsClassFile'){
									jsc.show();
									acp.hide();
									jsc.setDisabled(false);
									acp.setDisabled(true);
								}else if(combo.getValue() == 'actionPath'){
									jsc.hide();
									acp.show();
									jsc.setDisabled(true);
									acp.setDisabled(false);
								}else{
									jsc.hide();
									acp.hide();
									jsc.setDisabled(true);
									acp.setDisabled(true);
								}
							}
						}
			    	},{
				    	fieldLabel: 'js类名',
				    	allowBlank:false,
				    	afterLabelTextTpl:this.redTpl,
				    	name: 'jsClassFile'
			    	},{
				    	fieldLabel: 'HTML页面',
				    	allowBlank:false,
				    	afterLabelTextTpl:this.redTpl,
				    	hidden:true,
				    	disabled:true,
				    	name: 'actionPath'
			    	},{
				    	fieldLabel: '是否可用', 
				    	name: 'isValiDate',
				    	allowBlank:false,
				    	store: this.isValiDateStore,
						queryMode: 'local',
						value:0,
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
				    	fieldLabel: '菜单描述', 
				    	xtype:'textarea',
				    	height:40,
				    	name: 'description'
			    	}]
			}]
		});
		//菜单 新建 修改  Window
		this.menuWindow = Ext.create('Ext.window.Window',{
			autoHeight:true,
		    width: 350,
		    title: '新建菜单',
		    bodyPadding: 5,
		    modal: true,
		    frame: true,
		    scope:this,
		    constrain : true,
		    constrainTo:this.getId(),
		    closeAction:'hide',
		    listeners:{
				scope:this,
				close:function(win, e){
				    this.menuPanel.getForm().reset();
				}
			},
		    items:[this.menuPanel],
		    buttonAlign:'center',
		    buttons:[{
		    	text:'确定',
		    	scope:this,
		    	iconCls:'confirm',
		    	handler:this.addMenu
		    },{
		    	text:'取消',
		    	iconCls:'cancel',
		    	scope:this,
		    	handler:function(){
		    		this.menuPanel.getForm().reset();
		    		this.menuWindow.close();
		    	}
		    }]
		});
		this.treePanel = Ext.create('Ext.tree.Panel',{
			mask : true,
			region:'center',
		    reserveScrollbar: true,
		    useArrows: true,
		    rootVisible: false,
		    columnLines : true,
		    enableColumnHide : false,//禁用增加选择列
		    collapseFirst : false,
			forceFit : true,
			viewConfig: {stripeRows: true},
		    multiSelect: false,
            store: this.menuStore,
            columns:this.columns,
            tbar :this.toolBar
		});
		Ext.apply(this, {
			layout: 'border',
			items: [this.treePanel]
		});
        this.callParent();
    },
    	/*
	 * 菜单管理界面全局事件初始化
	 * */
	initEvents:function(){
		this.items.on('afterrender',this.initMethod(),this);
		this.treePanel.on('itemdblclick',function(tree) {this.resetBtn(tree)},this);
		this.treePanel.getSelectionModel().on('selectionchange',function(sm) {this.setBtn(sm.getCount())},this);
		this.imageWindow.addListener('selectImage',this.selectImage,this);//选择图片窗口事件注册
		this.functionPanel.addListener('treePanelLoadData',this.treePanelLoadData,this);//选择图片窗口事件注册
	},
	/*
	 * 菜单管理init 方法
	 * */
	initMethod:function(){
		this.setBtn(0);
		this.treePanel.expandAll();
		this.app.setModuleFunction(this.toolBar);//按钮权限设置
	},
	/*
	 * 初始化Store
	 * */
	initStore : function() {
		Ext.define('menu', {
			extend : 'Ext.data.Model',
			idProperty : 'id'
		});
		this.typeStore = Ext.create('Ext.data.Store', {
		    fields: ['id', 'name'],
		    data : [
		        {"id":"jsClassFile", "name":"js类名"},
		        {"id":"actionPath", "name":"HTML页面"}
		    ]
		});
		this.isValiDateStore = Ext.create('Ext.data.Store', {
		    fields: ['id', 'name'],
		    data : [
		        {"id":0, "name":"可用"},
		        {"id":1, "name":"不可用"}
		    ]
		});
		//数据列表 Store
		this.menuStore = new Ext.data.TreeStore({
                model: 'menu',
                proxy: {
                	type : 'ajax',
    				actionMethods: {read: 'POST'}, 
    		        startParam: 'extLimit.start',
    		        limitParam: 'extLimit.limit',
    		        simpleSortMode: true,
    		        sortParam : 'extLimit.sort',
    		        directionParam :'extLimit.dir',
                    url:globalCtx+'/basic/MenuController/list.sdo?id=0'
                },
                folderSort: true
        })
	},
	/*
	 * 初始化column
	 * */
	initColumn:function(){
		this.typeRenderer = function(v){
			if(v=='jsClassFile') return 'js类名'; 
			else if(v=='actionPath')  return 'HTML页面';
			else if(v=='firstMenu')  return '一级菜单';
			else return v;
		};
		this.isValiDateRenderer = function(v){
			if(v == "0" ) return '<font style="color: #379337;font-weight: bold;">可用</font>'; 
			else if(v == "1")return '<font style="color: #c9c5dd;font-weight: bold;">不可用</font>';
		};
		this.columns = [{
                xtype: 'treecolumn',
                text: '菜单名称',
                flex: 2.5,
                sortable: true,
                dataIndex: 'menuName'
            },{
                text: '类型',
                flex: 1.4,
                sortable: true,
                dataIndex: 'type',
                renderer:this.typeRenderer
            },{
                text: 'js类名',
                flex: 2,
                sortable: true,
                dataIndex: 'jsClassFile'
            },{
                text: 'HTML页面',
                flex: 2,
                sortable: true,
                dataIndex: 'actionPath'
            },{
                text: '菜单功能',
                flex: 2,
                sortable: true,
                dataIndex: 'functions'
            },{
                text: '菜单描述',
                flex: 2.2,
                sortable: true,
                dataIndex: 'description'
            },{
                text: '是否可用',
                flex: 1.2,
                sortable: true,
                renderer:this.isValiDateRenderer,
                dataIndex: 'isValiDate'
            },{
                text: '排序号',
                flex: 1.2,
                sortable: true,
                dataIndex: 'menuOrder'
            }]
	},
	addMenu:function(){
		var form = this.menuPanel.getForm();
		var baseParams = form.getFieldValues();
		var id = form.findField('id').getValue();
		var name = form.findField('menuName').getValue();
		if(form.isValid()){
			Ext.Ajax.request({
				method: 'post',
				url:globalCtx+'/basic/MenuController/add.sdo',
				params: baseParams,
				waitTitle: '请稍等片刻',
	       		waitMsg: '正在提交...',
				scope:this,
				success: function(resp) {
					var obj = Ext.util.JSON.decode(resp.responseText);
					if (obj.result == 'success') {
						var msg = id == ""?'新建 ':'修改';
						SSPApp.getApplication().msg('提示', msg+'菜单[ <font>'+name+'</font> ]成功');	
						this.menuPanel.reset();
						this.menuWindow.close();
					} else {
						Ext.Msg.alert("提示", "错误信息:"+obj.info);
					}
					this.treePanelLoadData(id);
					//SSPApp.getApplication().setMenu();
				},
	   			failure: function(response, opts) {
	   				this.exception();
	   			}
			});
		}
	
	},
	editMenu:function(){
		var sm = this.treePanel.getSelectionModel();
		var r = sm.getSelection()[0];
		var form = this.menuPanel.getForm();
		var type = r.get('type');
		this.menuWindow.setTitle('修改菜单');
		this.menuWindow.show();
		if(type == 'firstMenu'){
			this.firstNode();
		}else{
			this.secondNode(sm);
		}
		var imageVlaue = '<image class="app_medinu_show" src="'+globalCtx+'/'+r.get('openIcon')+'" ></image>';
		form.findField('imageDisplay').setRawValue(imageVlaue);
		form.loadRecord(r);
		form.findField('openIcon').setValue(r.get('openIcon').replace(/[\\ =]/g, "/").replace("images/menu/32/",""));
		form.findField('icon').setValue(r.get('icon').replace(/[\\ =]/g, "/").replace("images/menu/",""));
	},
    firstNode:function(){
		var form = this.menuPanel.getForm();
		var jsc = form.findField('jsClassFile');
		var acp = form.findField('actionPath');
		var type = form.findField('type');
		jsc.reset();
		acp.reset();
		jsc.hide();
		acp.hide();
		jsc.setDisabled(true);
		acp.setDisabled(true);
		this.typeStore.add({"id":"firstMenu", "name":"一级菜单"});
		type.setValue('firstMenu');
		type.setReadOnly(true);
    },
    secondNode:function(sm){
    	var form = this.menuPanel.getForm();
		var r = sm.getSelection()[0];
		var jsc = form.findField('jsClassFile');
		var acp = form.findField('actionPath');
		var parantMenuID = form.findField('parantMenuID');
		var type = form.findField('type');
		jsc.reset();
		acp.reset();
		jsc.show();
		acp.hide();
		jsc.setDisabled(false);
		acp.setDisabled(true);
		this.typeStore.removeAt(2);
		type.setValue('jsClassFile');
		type.setReadOnly(false);
		parantMenuID.setValue(r.get('id'));
	},
	deleteMenu:function(){
		var r = this.treePanel.getSelectionModel().getSelection()[0];
		var s = this;
		var userStr = '删除菜单[ <font color="blue" >'+r.get('menuName')+'</font> ]';
		Ext.MessageBox.confirm('提示', '确定'+userStr+' ？', function(btn) {
			if (btn != 'yes') {
				return;
			}
			Ext.Ajax.request({
				method: 'post',
				url:globalCtx+'/basic/MenuController/delete.sdo',
				params: {id: r.get('id')},
				waitTitle: '请稍等片刻',
	       		waitMsg: '正在删除...',
				scope:this,
				success: function(resp) {
					var obj = Ext.util.JSON.decode(resp.responseText);
					if (obj.result == 'success') {
						SSPApp.getApplication().msg('提示', userStr+'成功!');
					} else {
						Ext.Msg.alert("提示", "信息:"+obj.info);
					}
					s.treePanelLoadData(r.get('id'));
				},
	   			failure: function(response, opts) {
	   				this.exception();
	   			}
			});
		});
	
	},
	/*
	 * 获得照片selector 并 返回 照片信息
	 * */
	selectImage:function(url){
		var form = this.menuPanel.getForm();
		var imageVlaue = '<image class="app_medinu_show" src="'+globalCtx+'/'+url+'" ></image>';
		form.findField('icon').setValue(url.replace(/[\\ =]/g, "/").replace("images/menu/32/",""));
		form.findField('openIcon').setValue(url.replace(/[\\ =]/g, "/").replace("images/menu/32/",""));
		form.findField('imageDisplay').setRawValue(imageVlaue);
	},
		/*
	 * 查看 删除等按钮的状态安置 当未选择数据按钮置灰
	 * */
	setBtn:function(sm){
		if(sm<1){
			this.app.setModuleBtnDisable(this.toolBar,['修改菜单','删除菜单','设置菜单权限']);
		}else{
			this.app.setModuleBtnDisable(this.toolBar,['新建菜单']);
			var parantMenuID = this.treePanel.getSelectionModel().getSelection()[0].get('parantMenuID');
			if(parantMenuID == "0"){
				this.app.setModuleBtnDisable(this.toolBar,['新建用户','设置菜单权限']);
			}
		}
	},
	resetBtn:function(tree){
		tree.getSelectionModel().deselectAll();
		this.app.setModuleBtnDisable(this.toolBar,['修改菜单','删除菜单','设置菜单权限']);
	},
	treePanelLoadData:function(id){
		this.menuStore.load({scope:this,callback:function(){ 
			this.treePanel.expandAll();
			var node =  this.treePanel.getRootNode();
			this.treePanel.getSelectionModel().deselectAll();
			this.menuStore.each(function(rec){
				if(rec.get('id')==id){
				    this.treePanel.getSelectionModel().select(rec,true);
				}
			},this);
			
		}},this);
	},
		/*
	 *  错误处理
	 * */
	exception:function(){
		SSPApp.getApplication().msg('出错', '后端未正确返回数据',2000);
	}
});