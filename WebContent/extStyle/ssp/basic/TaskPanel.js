/**
 * 任务管理
 */
Ext.define('ssp.basic.TaskPanel', {
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
		this.initStore();
		this.initColumn();
		this.app = SSPApp.getApplication();
		//主面板 数据面板
		this.gridPanel = Ext.create('Ext.grid.Panel',{
			mask : true,
			border : false,
			columnLines : true,
			forceFit : true,
			enableColumnHide : false,//禁用增加选择列
			reserveScrollbar: true,//防止滚动条溢出
			//selModel : new Ext.selection.CheckboxModel({mode : 'SIMPLE',allowDeselect : true}),//单选可反选
			viewConfig: {stripeRows: true},
			store : this.taskStore,
			columns :this.columns,
			tbar: this.toolBar,
			bbar : {
				xtype : 'pagingtoolbar',
				pageSize : 25,
				store : this.userStore,
				displayInfo : true,
				plugins : new Ext.ux.ProgressBarPager()
			}
		});
		
		Ext.apply(this, {
			layout: 'fit',
			items: [this.gridPanel]
		});
		
		this.callParent();
	},
	initEvents:function(){
		this.items.on('afterrender',this.initMethod(),this);
	},
	initMethod:function(){
		this.gridPanel.on('celldblclick',function(){this.gridPanel.getSelectionModel().deselectAll()},this);
		this.taskStore.load({params:{"extLimit.start":0,"extLimit.limit":25}});
		this.app.setModuleFunction(this.toolBar);//按钮权限设置
	},
	/*
	 * 初始化Store
	 * */
	initStore : function() {
		Ext.define('task', {
			extend : 'Ext.data.Model',
			idProperty : 'id'
		});
		//数据列表 Store
		this.taskStore = Ext.create('Ext.data.JsonStore', {
			model : 'task',
			pageSize : 25,
			proxy : {
				type : 'ajax',
				actionMethods: {  
		            read: 'POST'  
		        }, 
				url:globalCtx+'/task/TaskController/getAllTask.sdo',
				reader : {type : 'json',totalProperty:'total',rootProperty : 'invdata'}
			}
		});
		
		//按钮toolbar
		this.toolBar = Ext.create('Ext.toolbar.Toolbar',{
			items:[{
				text : '执行任务',
				iconCls:'add',
				scope : this,
				code:'rwgl',
				handler:function(){
					var rs = this.gridPanel.getSelectionModel().getSelection();
					if(rs.length == 0 ) Ext.MessageBox.alert("提示", "请选择需要执行的任务!");
					else if(rs[0].data.state == 1) {
						Ext.MessageBox.alert("提示", "任务正在执行!");
					}
					else
            			this.runTask(rs[0].data.jobDetail);
				}
			}]
		});
		
	},
	/*
	 * 初始化column
	 * */
	initColumn:function(){
		var renderState = function(v){
			if(v == 0 ) return '<font style="font-weight: bold;color:#3D963A">等待执行</font>';
			else if(v == 1)return '<font style="font-weight: bold;color:#FF0000"">正在执行</font>';
		};
		this.columns = [
			{text : '名称', flex: 2,dataIndex : 'description'}, 
			{text : 'JobDetail',flex: 2,dataIndex : 'jobDetail'}, 
			{text : '状态',flex: 1,dataIndex : 'running',renderer:renderState}, 
			{text : '下次执行时间',flex: 2,dataIndex : 'nextRunTime'},
			{text : 'expression',flex: 2,dataIndex : 'cronExpression'}
		]
	},
	runTask:function(jobDetail) {
		var th = this;
		Ext.MessageBox.confirm('重要提示', '<font color="#FF0000" style="font-weight: bold;">如果任务执行时间超过五分钟，将不会有任何返回消息！</font><br><br>确定执行  ' + jobDetail + ' ?', function(btn) {
			if(btn != 'yes') {
				return;
			}
			
			Ext.MessageBox.show({
				title:'请等待',  
	            msg:'定时任务' + jobDetail + '执行中……',  
	            width:240,  
	            progress:false,  
	            closable:false  
			});
			
			Ext.Ajax.request({
				method: 'post',
				url:globalCtx+'/task/TaskController/runTask.sdo',
				params: {jobDetail: jobDetail},
				timeout: 300000,//五分钟
				success:function(resp){
					Ext.MessageBox.hide();
					var obj=Ext.util.JSON.decode(resp.responseText);
					if(obj.result == 'success') {
						Ext.MessageBox.alert('提示', '定时任务执行成功！', function(){
							th.taskStore.reload();
						});
					}
					else if(obj.result == 'error') {
						Ext.MessageBox.alert('提示', '定时任务执行失败！'+obj.info);
					}
					else {
						Ext.MessageBox.alert('提示', '定时任务执行失败' + obj.info);
					}
				}
			});
		});
	}
	
})