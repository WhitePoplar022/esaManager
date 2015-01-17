/*
 * 叶子结点check的tree:只限制在叶子结点上有checkbox
 * 参数说明：
 * treeStoreUrl：数据加载的url：格式符合extjs-tree的标准格式：id:,text,value,children
 * isSelectedOne：叶子结点是否多选
 * 其他：为了以防id的重复（数据往往从多个数据库联合查询，id很可能重复），叶子结点的值存放在value属性
 * 
 */
Ext.define('ssp.util.selector.LeafCheckTreePanel', {
	extend: 'Ext.panel.Panel',
	title: '自定义标题',
	layout:'fit',
	autoScroll:'auto',
	unstyled:false,
	treeStoreUrl:"", //treeStrore加载的url路径
	isSelectedOne:true, //节点选择方式:，单选或多选
	initComponent: function() {
		Ext.define('TreeItemDataModel', {
			extend : 'Ext.data.TreeModel',
			mode:'SINGLE',
			idProperty : 'id'
		});
		//广告位树
		this.adStore = Ext.create('Ext.data.TreeStore', {
			clearOnLoad : true,
			model: 'TreeItemDataModel',
			clearOnLoad : true,
			nodeParam : 'id',
			autoSync : false,
			parentIdProperty : "parentId",
			root:{
				id:-1
			},
	        proxy: {
	            type: 'ajax',
	            actionMethods: {  
		            read: 'POST'  
		        }, 
	            url:this.treeStoreUrl
	        },
	        folderSort: true
		});
		this.adTree = Ext.create('Ext.tree.TreePanel', {
		 	xtype: 'check-tree',
			store : this.adStore,
			rootVisible : false,
			border : false,
			multiSelect: false,			
			reserveScrollbar: true,//防止滚动条溢出
			useArrows : true,
			frame : false,
			scope:this,
			listeners:{
				scope:this,
				checkchange:function(node, checked){
					if (checked && this.isSelectedOne) {
						this.simpleCheck(node.get("value"));
					}
				},
				load:function(){
					var node =  this.adTree.getRootNode();
					node.firstChild.expand(true);//默认第一个展开
				}
		    }
		});
		
		Ext.apply(this, {
			items:[this.adTree]
		});
		this.callParent();
		
	},
	getValue:function(){
		var values = [];
		var nodes =  this.adTree.getChecked();
		if(!nodes || !nodes.length)  return "";
		Ext.Array.each(nodes,function(node) {
			values.push(node.data.value); //为了避免上下级中id重复，节点的id值存放在value属性中
		});
		return values.join(',');
	},
	setValue:function(values){
		this.reset();
		this.adTree.getSelectionModel().deselectAll();
		var rootNode = this.adTree.getRootNode();
		this.setLeafValue(rootNode,values);
	},
	setLeafValue:function(node,values) {
		var ids = values.toString().split(",");; //统一转字符串
		for(var i =0; i < ids.length; i++) {
			this.setLeafCheck(node,ids[i]);
		}
	//	this.selectNodeById(values);
	},
	//private for setLeafValue
	setLeafCheck:function(node,v) {
		node.eachChild(function(child) {
			if(child.child()) this.setLeafCheck(child,v);
			if(child.isLeaf() && child.get("value") == v) {
				if(!child.parentNode.isExpanded()) child.parentNode.expand(true);
				child.set('checked',true);
			}
		},this);
	},
	selectNodeById:function(ids){
		for (var i = 0; i < ids.length; i++) {
			this.adStore.each(function(rec){
				if(rec.get('value')==ids[i] && rec.get("checked")){
				//   rec.set('checked',true);
				   this.adTree.getSelectionModel().select(rec,true);
				}
			},this)
			
		}
	},
	getParentRootNode : function(node) {
		if(node.parentNode && node.parentNode.get("id") == -1) {
			alert(node.get("text"));
			return false;
		} else //root的id是-1
		 this.getParentRootNode(node);
	},
	getParentNodeByStore : function(node) {
		if(node.parentNode.id == -1) return node; //root的id是-1
		if(node.parentNode && node.id != -1) return getParentNode(node);
	},
	getNameById:function(ids){
		ids = ids.toString();
		var names = new Array();
		if(ids == undefined || ids == "" ){return;};
		var idsArray =  ids.split(",");
		var node = this.adTree.getRootNode();
		for (var i = 0; i < idsArray.length; i++) {
			this.getNameByIdNode(node,idsArray[i],names);
		}
		return names.join(',');
	},
	//private for getNameById
	getNameByIdNode : function(node,id,names){
		node.eachChild(function(child) {
			if(child.child()) this.getNameByIdNode(child,id,names);
			if(child.isLeaf() && child.get("value") == id) {
				names.push(child.get("text"));
			}
		},this);
	},
	
	getIdsAndTexts:function(){//去掉父节点 
		var value = new Array();
		var text =  new Array();
		var nodes =  this.adTree.getChecked();
		if(!nodes || !nodes.length)  return "";
		Ext.Array.each(nodes,function(node) {
			value.push(node.data.value); 
			text.push(node.data.text);
		});
		var rs = {};
		rs.ids = value.join(',');
		rs.texts = text.join(',');
		return rs;
	},
	
	reload:function() {
		this.adStore.load();
	},
	/*
	 * 清空
	 */
	reset : function() {
		var nodes =  this.adTree.getChecked();
		if(nodes && nodes.length) {
			for(var i =0; i < nodes.length; i++) {
				nodes[i].set("checked",false); //设置节点属性未选中
			}
		}
	},
	simpleCheck : function(id){
		var rootNode =  this.adTree.getRootNode();
		this.setSingleCheck(rootNode,id);
	},
	//private for simpleCheck
	setSingleCheck : function(node,id) {
		node.eachChild(function(child) {
			if(child.child()) this.setSingleCheck(child,id);
			if(child.isLeaf() && child.get("value") != id) {
				child.set('checked',false);
			}
		},this);
	}
});
