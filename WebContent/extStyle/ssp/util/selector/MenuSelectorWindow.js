/*
 * 菜单配置selector Window
 * */
Ext.define('ssp.util.selector.MenuSelectorWindow', {
	extend : 'Ext.window.Window',
	requires : [
			'Ext.tree.*', 
			'Ext.data.*',
			'Ext.data.TreeStore'],
	value: null,//用于selector 的 getvalue
	nameValue:null,//用户selector 的getName
	roleId:null,
	initComponent : function() {
		//待选择列表
		this.addtoolBar = Ext.create('Ext.toolbar.Toolbar',{
			items:[
		       {
		    	   text:'菜单权限-待选择  => '
		       },
		       {
					text : '添加',
					iconCls:'add',
					scope : this,
					handler:function(){
						var r = this.showfunctionGrid.getSelectionModel().getSelection();
						if(r.length==0){ 
						  	Ext.Msg.alert("提示","请选择数据!"); 
						 	 return; 
						 } else{
							this.addFun(r);
						 }
					}
				}
		      ]
		});
		
		this.showcolumns = [
  			{header:'功能ID',flex:0.5, dataIndex:'id', sortable:true},
  			{header:'功能名称',flex:1.8, dataIndex:'name', sortable:true},
  			{header:'功能代码', flex:1.2,dataIndex:'code', sortable:true},
  			{header:'备注信息',flex:1.2, dataIndex:'description', sortable:true}
  		]
		
		Ext.define('showfunction', {
			extend : 'Ext.data.Model',
			idProperty : 'id'
		});
	
		this.showfunctionStore = Ext.create('Ext.data.JsonStore', {
			model : 'showfunction',
			sorters : 'id',
			pageSize : 25,
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
				url:globalCtx+'/basic/FunctionController/onSelectFunctionByRoleId.sdo',
				reader : {type : 'json',totalProperty:'total',rootProperty : 'invdata'}
			}
		});
		
		this.showfunctionGrid = Ext.create('Ext.grid.Panel',{
			mask : true,
			region:'north',
			border:true,
			height:230,
			columnLines : true,
			enableColumnHide : false,//禁用增加选择列
			forceFit : true,
			selModel : new Ext.selection.CheckboxModel({mode : 'SIMPLE',allowDeselect : true,showHeaderCheckbox : true}),//单选可反选
			reserveScrollbar: true,//防止滚动条溢出
			viewConfig: {stripeRows: true},
			store : this.showfunctionStore,
			columns :this.showcolumns,
			tbar :this.addtoolBar,
			bbar : {
				xtype : 'pagingtoolbar',
				pageSize : 25,
				store : this.showfunctionStore,
				displayInfo : true,
				plugins : new Ext.ux.ProgressBarPager()
			}
		});
		
		
		//待选择数据
		this.deltoolBar = Ext.create('Ext.toolbar.Toolbar',{
			items:[
			   {
				    text:'菜单权限-已选择  => '
			   },
		       {
					text : '删除',
					iconCls:'delete',
					scope : this,
					handler:function(){
						var r = this.selectfunctionGrid.getSelectionModel().getSelection();
						if(r.length==0){ 
						  	Ext.Msg.alert("提示","请选择数据!"); 
						 	 return; 
						 } else{
							this.delFun(r);
						 }
					}
				}
		    ]
		});
		
		this.selectcolumns = [
  			{header:'选择ID',flex:0.5, dataIndex:'id', sortable:true},
  			{header:'功能名称',flex:1.8, dataIndex:'name', sortable:true},
  			{header:'功能代码', flex:1.2,dataIndex:'code', sortable:true},
  			{header:'备注信息',flex:1.2, dataIndex:'description', sortable:true}
  		]
  		
  		Ext.define('selectfunction', {
  			extend : 'Ext.data.Model',
  			idProperty : 'id'
  		});

  		this.selectfunctionStore = Ext.create('Ext.data.JsonStore', {
  			model : 'selectfunction',
  			sorters : 'id',
  			pageSize : 25,
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
  				url:globalCtx+'/basic/FunctionController/selectFunctionByRoleId.sdo',
  				reader : {type : 'json',totalProperty:'total',rootProperty : 'invdata'}
  			}
  		});
  		
  		this.selectfunctionGrid = Ext.create('Ext.grid.Panel',{
  			mask : true,
  			region:'south',
  			border:true,
  			height:240,
  			columnLines : true,
  			enableColumnHide : false,//禁用增加选择列
  			forceFit : true,
  			selModel : new Ext.selection.CheckboxModel({mode : 'SIMPLE',allowDeselect : true,showHeaderCheckbox : true}),//单选可反选
  			reserveScrollbar: true,//防止滚动条溢出
  			viewConfig: {stripeRows: true},
  			store : this.selectfunctionStore,
  			columns :this.selectcolumns,
  			tbar :this.deltoolBar,
  			bbar : {
				xtype : 'pagingtoolbar',
				pageSize : 25,
				store : this.selectfunctionStore,
				displayInfo : true,
				plugins : new Ext.ux.ProgressBarPager()
			}
  		});
		
		
		this.centerfunctionPanel = Ext.create('Ext.panel.Panel',{
			region:'center',
			border:true,
			layout : 'border',
			width:600,
			items:[this.showfunctionGrid,this.selectfunctionGrid]
		});
		
		//菜单树数据
		this.menuStore = Ext.create('Ext.data.TreeStore', {
			proxy : {
				type : 'ajax',
				actionMethods: {read: 'POST'}, 
		        startParam: 'extLimit.start',
		        limitParam: 'extLimit.limit',
		        simpleSortMode: true,
		        sortParam : 'extLimit.sort',
		        directionParam :'extLimit.dir',
				url:globalCtx+'/basic/MenuController/list.sdo?id=0'
			}
		});
		Ext.define('function', {
			extend : 'Ext.data.Model',
			idProperty : 'id'
		});
		
		
		this.menuTree = Ext.create('Ext.tree.TreePanel', {
			store : this.menuStore,
			region:'west',
			border:true,
			width:220,
			height : 600,
			title:'配置菜单',
			rootVisible : false,
			unStyled:true,
			reserveScrollbar: true,
			useArrows : true,
			frame : false,
			scope:this,
			buttonAlign : 'center',
			buttons : [
	           {
					text : '确定',
					scope : this,
					iconCls : 'confirm',
					handler : this.configerMenu
				}
			],
			listeners:{
				scope:this,
				checkchange:function(node, checked){
					if (checked) {
						node.eachChild(function(child) {this.chd(child, true);},this);
					} else {
						node.eachChild(function(child) {this.chd(child, false);},this);
					}
					this.parentnode(node);
				},
				load:function(){
					var node =  this.menuTree.getRootNode();
					this.chd(node, false);
				}
		    }
		});
		
		Ext.apply(this, {
			width : 820,
			height : 530,
			layout : 'border',
			border : false,
			buttonAlign : 'center',
			title:'角色权限配置',
			modal : true,
			frame : true,
			listeners:{
				scope:this,
				close:this.cancel
			},
			buttons : [
	           {
					text : '关闭窗口',
					iconCls : 'cancel',
					scope : this,
					handler : this.cancel
				}
			],
			closeAction : 'hide',
			items : [this.menuTree,this.centerfunctionPanel]
		});
		this.callParent();
	},
	initMethod:function(roleId){
		this.roleId = roleId;
		this.gridPanelLoadData();
		this.menuTree.expandAll();
	},
	/**
	 * 临时添加功能按钮
	 */
	addFun:function(r){
		var idStr= "";
		for(var i=0;i<r.length;i++){
	    	var id = r[i].data.id;
			idStr = idStr==""?r[i].data.id:idStr+","+r[i].data.id;
	    }
		var s = this;
		Ext.Ajax.request({
			method: 'post',
			url:globalCtx+'/basic/FunctionController/addFun.sdo',
			params: {funIds: idStr,roleId:this.roleId},
			waitTitle: '请稍等片刻',
       		waitMsg: '正在删除...',
			scope:this,
			success: function(resp) {
				var obj = Ext.util.JSON.decode(resp.responseText);
				this.gridPanelLoadData();
			},
   			failure: function(response, opts) {
   				this.exception();
   			}
		});
	},
	/**
	 * 临时删除功能按钮
	 */
	delFun:function(r){
		var idStr= "";
		for(var i=0;i<r.length;i++){
	    	var id = r[i].data.id;
			idStr = idStr==""?r[i].data.id:idStr+","+r[i].data.id;
	    }
		var s = this;
		Ext.Ajax.request({
			method: 'post',
			url:globalCtx+'/basic/FunctionController/delFun.sdo',
			params: {funIds: idStr},
			waitTitle: '请稍等片刻',
       		waitMsg: '正在删除...',
			scope:this,
			success: function(resp) {
				var obj = Ext.util.JSON.decode(resp.responseText);
				this.gridPanelLoadData();
			},
   			failure: function(response, opts) {
   				this.exception();
   			}
		});
	},
	/*
	 *  列表加载数据
	 * */
	gridPanelLoadData:function(){
		//加载：未选择
		var params = {roleId:this.roleId}; 
		Ext.apply(this.showfunctionStore.proxy.extraParams, params);
		this.showfunctionStore.load({params:{"extLimit.start":0,"extLimit.limit":25}});
		
		//加载：已选择
		var params = {roleId:this.roleId}; 
		Ext.apply(this.selectfunctionStore.proxy.extraParams, params);
		this.selectfunctionStore.load({params:{"extLimit.start":0,"extLimit.limit":25}});
	},
	nodep : function(node) {
		var bnode = true;
		Ext.Array.each(node.childNodes, function(v) {
					if (!v.data.checked) {
						bnode = false;
						return;
					}
				});
		return bnode;
	},
	parentnode : function(node) {
		if (node.parentNode != null) {
			if (this.nodep(node.parentNode)) {
				node.parentNode.set('checked', true);
			} else {
				node.parentNode.set('checked', false);
			}
			this.parentnode(node.parentNode);
		}
	},
	chd : function(node, check) {
		node.set('text',node.get('menuName'));
		if(node.get('checked') == null){
			node.set('checked', false);
		}else{
			node.set('checked', check);
		}
		if (node.isNode) {
			node.eachChild(function(child) {
						this.chd(child, check);
					},this);
		}
	},
	//调用界面的方法返回选择的值
	configerMenu:function(){
		this.fireEvent('configerMenu',this.getValue());
		this.hide();
		this.reset();
	},
//	getFunctionValue:function(){
//		var v = new Array();
//		this.functionGroup.items.each(function(item) {
//					if (item.getValue()) {
//						v.push(item.inputValue);
//					}
//				});
//		return v.join(',');
//	},
	getFunctionNames:function(){
		var v = new Array();
		this.functionGroup.items.each(function(item) {
					if (item.getValue()) {
						v.push(item.boxLabel);
					}
				});
		return v.join(',');
	},
	getValue:function(){
		this.value = new Array();
		var node = this.menuTree.getRootNode();
		this.featchNode(node);
		return this.value.join(',');
	},
	getNames:function(){
		this.nameValue = new Array();
		var node = this.menuTree.getRootNode();
		this.featchNodeName(node);
		return this.nameValue.join(',');
	},
	setValue:function(value,funId){
		this.reset();
		var ids = value.toString().split(",");
		var node = this.menuTree.getRootNode();
		for (var i = 0; i < ids.length; i++) {
			this.insetNode(node,ids[i]);//回填选择菜单
		};
//		this.clearFunction();
//		this.functionStore.load({
//			scope:this,
//			callback:function(){
//				this.setComValue(funId);//回填权限
//			}
//		});
	},
	setComValue : function(vals) {
		var a = [];
		if (Ext.isArray(vals)) {
			a = vals;
		} else {
			if(vals !==""&& vals !== undefined){
				a = vals.split(',');
			}
			this.functionGroup.items.each(function(item) {
				item.setValue(false);
				for (var i = 0; i < a.length; i++) {
					var val = a[i];
					if (val == item.inputValue) {
						item.setValue(true);
					}
				};
			});
		}
	},
//	clearFunction:function(){
//		this.functionGroup.removeAll()
//		this.functionStore.removeAll();
//	},
	//private for setvalue
	insetNode:function(node,id){
		if(node.get('id') == id){
			node.set('checked',true);
			this.menuTree.fireEvent('checkchange',node,true);
			this.parentnode(node);
			node.parentNode.expand();
		}
		if (node.isNode) {
			node.eachChild(function(child) {
						this.insetNode(child,id);
					},this);
		}
	},
	//private for getvalue
	featchNode:function(node){
		if(node.get('checked') == true && node.get('id') != 'root'){
			this.value.push(node.get('id'))
		}
		if (node.isNode) {
			node.eachChild(function(child) {
						this.featchNode(child);
					},this);
		}
	},
	//private for getname
	featchNodeName:function(node){
		if(node.get('checked') == true){
			this.nameValue.push(node.get('menuName'))
		}
		if (node.isNode) {
			node.eachChild(function(child) {
						this.featchNodeName(child);
					},this);
		}
	},
	/*
	 * 清空
	 */
	reset : function() {
		var node =  this.menuTree.getRootNode();
		this.menuTree.collapseAll();
		this.chd(node, false);
	},
	/*
	 * 关闭本页
	 */
	cancel : function() {
		this.reset();
		this.hide();
	}
});