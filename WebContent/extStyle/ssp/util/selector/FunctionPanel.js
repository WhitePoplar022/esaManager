Ext.define('ssp.util.selector.FunctionPanel',{
	extend: 'Ext.window.Window',
	p_menu_id:0,
	requires : [
	    'Ext.ux.ProgressBarPager',
        'Ext.grid.*',
        'Ext.window.Window',
        'Ext.toolbar.Toolbar',
        'Ext.selection.CheckboxModel'
    ],
	initComponent : function() {
		this.initStore();//初始化数据
		this.initColumn();//初始化columns
		this.redTpl =  '<span style="color:red;font-weight:bold" data-qtip="必填">*</span>';
		this.newFunctionPanel = Ext.create('Ext.form.Panel',{
			frame : false,
			border:false,
			layout:'form',
			fieldDefaults : {labelAlign : 'right',labelWidth :90},
			items : [
			    {
			        xtype:'hidden',
			        name:'id',
			        id:'id'
			    },{
					fieldLabel: '权限名称',
					xtype: 'textfield',
					name: 'name',
					afterLabelTextTpl:this.redTpl,
					allowBlank:false
				},{
					fieldLabel: '权限代码',
					xtype: 'textfield',
					name: 'code',
					afterLabelTextTpl:this.redTpl,
					allowBlank:false,
					validationEvent: 'blur',
		            validationDelay: 500,
		            validator: vlidateUcode
				},{
					fieldLabel: '备注',
					xtype: 'textarea',
					name: 'description'
				}
			]
		});
		this.newFunctionWindow = Ext.create('Ext.window.Window',{
			autoHeight:true,
		    width: 300,
		    title: '新建权限',
		    bodyPadding: 5,
		    modal: true,
		    scope:this,
		    constrain : true,
		    constrainTo:this.getId(),
		    frame: true,
		    closeAction:'hide',
		    items:[this.newFunctionPanel],
		    buttonAlign:'center',
		    buttons:[{
		    	text:'确定',
		    	scope:this,
		    	iconCls:'confirm',
		    	handler:this.newFunction
		    },{
		    	text:'取消',
		    	iconCls:'cancel',
		    	scope:this,
		    	handler:function(){
		    		//this.newFunctionPanel.reset();
		    		this.newFunctionWindow.hide();
		    	}
		    }]
		});
		this.toolBar = Ext.create('Ext.toolbar.Toolbar',{
			items:[{
				text : '新建',
				iconCls:'add',
				scope : this,
				handler:function(){
					this.newFunctionWindow.setTitle('新建权限');
					this.newFunctionWindow.show();
				}
			},'-',{
				text : '修改',
				scope : this,
				iconCls:'edit',
				handler:function(){
					var r = this.functionSetpanel.getSelectionModel().getSelection();
					if(r.length > 0){
						var form = this.newFunctionPanel.getForm();
						form.loadRecord(r[0]);
						this.newFunctionWindow.setTitle('修改权限');
						this.newFunctionWindow.show();
					}else{
						Ext.Msg.alert("提示", "请选择数据");
					}
				}
			},{
				text : '删除',
				iconCls:'delete',
				scope : this,
				handler:this.deleteFunction
			}]
		});
		this.functionSetpanel = Ext.create('Ext.grid.Panel',{
			mask : true,
			region:'center',
			border : false,
			columnLines : true,
			enableColumnHide : false,//禁用增加选择列
			forceFit : true,
			reserveScrollbar: true,//防止滚动条溢出
			selModel : new Ext.selection.CheckboxModel({mode : 'SIMPLE',allowDeselect : true,showHeaderCheckbox : false}),//单选可反选
			viewConfig: {stripeRows: true},
			store : this.functionSetStore,
			columns :this.columns,
			tbar :this.toolBar
		});
		Ext.apply(this, {
			width:500,
            height:350,
			layout : 'border',
			border : false,
			modal : true,
			frame : true,
			listeners:{
				scope:this,
				close:this.cancel
			},
			closeAction : 'hide',
			buttonAlign : 'center',
			items:[this.functionSetpanel],
			buttons : [
	            {
					text : '关闭刷新',
					scope : this,
					iconCls : 'confirm',
					handler : this.configerFunctionSet
				},
				{
					text : '关闭',
					scope : this,
					iconCls : 'cancel',
					handler:function(){
						this.hide();
					}
				}
			]
		});
		this.callParent();
	},
	initEvents:function(){
		this.items.on('afterrender',this.initMethod(),this);
		this.functionSetpanel.on('select',function(row,record){this.functionSetpanel.getSelectionModel().select(record)},this);
		this.functionSetpanel.getSelectionModel().on('selectionchange',function(sm) {this.setBtn(sm.getCount())},this);
	},
	/*
	 * 用户管理init 方法
	 * */
	initMethod:function(){
		this.setBtn(0);
	},
	initStore : function() {
		Ext.define('functionSet', {
			extend : 'Ext.data.Model',
			idProperty : 'id'
		});
		this.functionSetStore = Ext.create('Ext.data.JsonStore', {
			model : 'functionSet',
			sorters : 'id',
			pageSize : 25,
			proxy : {
				type : 'ajax',
				actionMethods: {  
		            read: 'POST'  
		        }, 
				url:globalCtx+'/basic/FunctionController/selectFunctionListByMenuId.sdo',
				reader : {type : 'json',totalProperty:'total',rootProperty : 'invdata'}
			}
		});
	},
	initColumn:function(){
		this.tipRenders = function(v,m,r){if(v != ""){m.tdAttr = 'data-qtip=”' + v + '”';}return v;};
		this.columns = [
			new Ext.grid.RowNumberer(),
			{header:'功能ID',flex:0.8, dataIndex:'id', sortable:true},
			{header:'功能名称',flex:1, dataIndex:'name', sortable:true},
			{header:'功能代码', flex:1.5,dataIndex:'code', sortable:true},
//			{header:'添加时间',flex:1.5,xtype:'datecolumn',format:'Y-m-d H:i:s', dataIndex:'create_date', sortable:true},
			{header:'备注信息',flex:1, dataIndex:'description', sortable:true,renderer:this.tipRenders}
		]
	},
	/*
	 * 新建功能
	 * */
	newFunction:function(){
		var form = this.newFunctionPanel.getForm();
		var baseParams = form.getFieldValues();
		baseParams.p_menu_id = this.p_menu_id;
		var id = form.findField('id').getValue();
		var name = form.findField('name').getValue();
		
		if(form.isValid()){
			Ext.Ajax.request({
				method: 'post',
				url:globalCtx+'/basic/FunctionController/add.sdo',
				params: baseParams,
				waitTitle: '请稍等片刻',
	       		waitMsg: '正在提交...',
				scope:this,
				success: function(resp) {
					var obj = Ext.util.JSON.decode(resp.responseText);
					if (obj.result == 'success') {
						var msg = id == ""?'新建 ':'修改';
						SSPApp.getApplication().msg('提示', msg+'功能[ <font>'+name+'</font> ]成功');	
//						this.newFunctionPanel.reset();
		    			this.newFunctionWindow.hide();
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
	deleteFunction:function(){
		
		var r = this.functionSetpanel.getSelectionModel().getSelection()[0];
		var s = this;
		var userStr = '删除功能[ <font color="blue" >'+r.get('name')+'</font> ]';
		Ext.MessageBox.confirm('提示', '确定'+userStr+' ？', function(btn) {
			if (btn != 'yes') {
				return;
			}
			Ext.Ajax.request({
				method: 'post',
				url:globalCtx+'/basic/FunctionController/delete.sdo',
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
					s.gridPanelLoadData();
				},
	   			failure: function(response, opts) {
	   				this.exception();
	   			}
			});
		});
	},
	
	selectByMenuId:function(menuId){
		this.p_menu_id = menuId;
		this.gridPanelLoadData();
	},
	configerFunctionSet:function(){
		this.cancel();
		this.functionSetStore.removeAll();
		this.fireEvent('treePanelLoadData',this.p_menu_id);
	},
	setBtn:function(sm){
		var items = Ext.ComponentQuery.query('button',this.toolBar); 
		if(sm<1){
			items[0].setDisabled(false);
			items[1].setDisabled(true);
			items[2].setDisabled(true);
		}else{
			items[0].setDisabled(true);
			items[1].setDisabled(false);
			items[2].setDisabled(false);
		}
	},
	gridPanelLoadData:function(){
		var params = {p_menu_id:this.p_menu_id}; 
		Ext.apply(this.functionSetStore.proxy.extraParams, params);
		this.functionSetStore.load();
	},
	cancel : function() {
		this.hide();
	}
})

var bool = false;
function vlidateUcode(code){
	var funId = Ext.getCmp("id").value;
	Ext.Ajax.request({
		url: globalCtx + '/basic/FunctionController/vlidateUcode.sdo',
		method: 'post',
		waitTitle:'请等待',
		async : true,
		waitMsg: '正在提交...',
		params:{code:code,funId:funId},
		success: function(ret) {
			var obj = Ext.util.JSON.decode(ret.responseText);
			if(obj.success == false)
				setValue("code值不能重复，请重新输入！");
			else
				setValue(true);
		}
	})
	function setValue(retBool){
		bool = retBool;
	}
	return bool;
}