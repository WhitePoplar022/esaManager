/*
 * 广告位审批管理 
 * */
Ext.define('ssp.log.LogSearchPanel', {
	extend : 'Ext.panel.Panel',
	border : false,
	layout: 'fit',
	requires: [
        'Ext.layout.container.Border',
        'Ext.ux.ProgressBarPager',
        'Ext.grid.*',
        'Ext.window.Window',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.selection.CheckboxModel',
        'ssp.widget.ActionTextColumn'
    ],
	initComponent : function() {
		this.initStore();//初始化数据
		this.initColumn();//初始化columns
		this.app = SSPApp.getApplication();
		
		//定义toolbar
		this.toolBar = Ext.create('Ext.toolbar.Toolbar',{
			items:[
			   {
			    	name: 'logType',
			    	fieldLabel : '日志类型',
			    	labelWidth:'60px',
			    	store: this.logTypeStore,
					queryMode: 'local',
					value:'全部',
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
				,'-',{
					name: 'operationType',
			    	fieldLabel : '操作类型',
			    	labelWidth:'60px',
			    	store: this.operationTypeStore,
					queryMode: 'local',
					value:'全部',
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
				,{
					xtype : 'button',
					text : '查询',
					iconCls:'search',
					scope:this,
					handler:this.search
				}
			]
		});

		//数据列表Grid
		this.logGridPanel = Ext.create('Ext.grid.Panel',{
			mask : true,
			region:'center',
			border : false,
			store : this.logStore,
			enableColumnHide : false,//禁用增加选择列
			columnLines : true,
			reserveScrollbar: true,//防止滚动条溢出
			forceFit : true,
			selModel : new Ext.selection.CheckboxModel({mode : 'SIMPLE',allowDeselect : true,showHeaderCheckbox : false}),//单选可反选
			viewConfig: {stripeRows: true},
			columns :this.columns,
			tbar :this.toolBar,
			bbar : {
				xtype : 'pagingtoolbar',
				pageSize : 25,
				store : this.logStore,
				displayInfo : true,
				plugins : new Ext.ux.ProgressBarPager()
			}
		});
		
		
		Ext.apply(this, {
			layout: 'fit',
			items: [this.logGridPanel]
		});
		
		this.callParent();
	},

	//广告位全局事件初始化
	initEvents:function(){
		this.logGridPanel.on('select',function(row,record){this.logGridPanel.getSelectionModel().select(record)},this);
		this.items.on('afterrender',this.initMethod(),this);
	},
	//广告位init 方法
	initMethod:function(){
		this.gridPanelLoadData()
		this.app.setModuleFunction(this.toolBar);//按钮权限设置
	},
	//初始化Store
	initStore : function() {
		
		this.logTypeStore = Ext.create('Ext.data.Store', {
		    fields: ['id', 'name'],
		    data : [
	            {"id":"全部", "name":"全部"},
		        {"id":"操作日志", "name":"操作日志"},
		        {"id":"权限日志", "name":"权限日志"}
		    ]
		});
		
		
		this.operationTypeStore = Ext.create('Ext.data.Store', {
		    fields: ['id', 'name'],
		    data : [
	            {"id":"全部", "name":"全部"},
		        {"id":"登入", "name":"登入"},
		        {"id":"增加", "name":"增加"},
		        {"id":"删除", "name":"删除"},
		        {"id":"修改", "name":"修改"},
		        {"id":"审批", "name":"审批"}
		    ]
		});
		
		//数据列表 Store
		Ext.define('log', {
			extend : 'Ext.data.Model',
			idProperty : 'id'
		});
		
		this.logStore = Ext.create('Ext.data.JsonStore', {
			model : 'log',
			storeId: 'id',
			proxy : {
				type : 'ajax',
				actionMethods: {  
		            read: 'POST'  
		        }, 
		        startParam: 'extLimit.start',
		        limitParam: 'extLimit.limit',
		        simpleSortMode: true,
		        sortParam : 'extLimit.sort',
		        directionParam :'extLimit.dir',
				url:globalCtx+'/log/LogController/list.sdo',
				reader : {type : 'json',rootProperty : 'invdata'},
				remoteSort: true
			}
		});
	
	},
	//初始化column
	initColumn:function(){
		this.columns = [
			{text : 'ID',flex: 1.5,dataIndex : 'id',hidden:true}, 
			{text : '用户ID',flex: 1.5,dataIndex : 'userId'}, 
			{text : '操作用户',flex: 1.5,dataIndex : 'userName'}, 
			{text : '操作时间',flex: 1.5,dataIndex : 'createTime'}, 
			{text : '操作IP',flex: 1.5,dataIndex : 'ip'},
			{text : '操作类型',flex: 1.5,dataIndex : 'operationType'}, 
			{text : '日志类型',flex: 1.5,dataIndex : 'logType'},
			{text : '业务ID',flex: 1.5,dataIndex : 'businessId'},
			{text : '业务名称',flex: 1.5,dataIndex : 'businessName'},
			{text : '备注信息',flex: 1.5,dataIndex : 'description'}
		]
	},
	/*
	 *  列表加载数据
	 * */
	gridPanelLoadData:function(){
		this.logStore.load({params:{'extLimit.sort': 'createTime', 'extLimit.dir': 'DESC',"extLimit.start":0,"extLimit.limit":25}});
	},
	//日志查询
	search:function(){
		var logType = Ext.ComponentQuery.query('textfield',this.toolBar)[0].getValue();
		var operationType = Ext.ComponentQuery.query('textfield',this.toolBar)[1].getValue();
		var params = {logType:logType,operationType:operationType}; 
		Ext.apply(this.logStore.proxy.extraParams,params );
		this.logStore.loadPage(1,{params:{'extLimit.sort': 'createTime', 'extLimit.dir': 'DESC',"extLimit.start":0,"extLimit.limit":25}});
	},
	exception:function(){
		SSPApp.getApplication().msg('出错', '后端未正确返回数据',2000);
	}
});