/*
 * 叶子结点check的tree:只限制在叶子结点上有checkbox
 * 参数说明：
 * treeStoreUrl：数据加载的url：格式符合extjs-tree的标准格式：id:,text,value,children
 * isSelectedOne：叶子结点是否多选
 * 其他：为了以防id的重复（数据往往从多个数据库联合查询，id很可能重复），叶子结点的值存放在value属性
 * 
 */
Ext.define('ssp.util.selector.areaSelectorPanel', {
	extend: 'Ext.panel.Panel',
	title: '地区选择',
	layout:'fit',
	autoScroll:'auto',
	unstyled:false,
	valueData:{},
	//isSelectedOne:true, //节点选择方式:，单选或多选
	initComponent: function() {
		Ext.define('TreeItemDataModel', {
			extend : 'Ext.data.TreeModel',
			idProperty : 'id'
		});
		//地区树
		this.areaStore = Ext.create('Ext.data.TreeStore', {
			clearOnLoad : true,
			model: 'TreeItemDataModel',
			nodeParam : 'id',
			autoSync : false,
			root:{
				id:86,
				expanded: true
			},
	        proxy: {
	            type: 'ajax',
	            actionMethods: {  
		            read: 'POST'  
		        }, 
	            url:globalCtx+'/area/AreaController/getAreaTree.sdo'
	        },
	        folderSort: true
		});
		
		this.areaTree = Ext.create('Ext.tree.TreePanel', {
		 	//xtype: 'check-tree',
			store : this.areaStore,
			rootVisible : false,
			border : false,
			//multiSelect: false,			
			reserveScrollbar: true,//防止滚动条溢出
			useArrows : true,
			frame : false,
			scope:this,
			listeners:{
				scope:this,
				load:function(node,childs){
					for(var i = 0; i < childs.length; i++){
						if(this.valueData[childs[i].data.id] != undefined) {
							childs[i].set('checked',true);
   		 				}
					}
				},
   				checkchange:{
   	 				fn:function(n, checked){
   	 					this.setValueData(n.data, checked);
						if(checked) {
							this.mutex(n);
						}
       	 			},
   	 				scope: this
       	 		}
		    }
		});
		
		Ext.apply(this, {
			items:[this.areaTree]
		});
		this.callParent();
		
	},
	
	
	mutex: function(node) {
		if ((node.parentNode && node.parentNode.id != '-1') && !node.isLeaf()) {
			this.up(node);
			this.down(node);
		} else if (node.isLeaf()) {
			this.up(node);
		} else if (node.parentNode.id == '-1') {
			this.down(node);
		}
	},
	
	up: function(node) {
		if (node.id == '-1') return;
		
		if(!node.parentNode) return;
		
		if (node.parentNode.data.checked) {
			node.parentNode.set('checked',false);
			this.setValueData(node.parentNode.data, node.parentNode.data.checked);
		}
		if (node.parentNode.parentNode) {
			this.up(node.parentNode);
		}
	},
	
	down: function(node) {
		for (var i = 0; i < node.childNodes.length; i++) {
			if (node.childNodes[i].data.checked) {
				node.childNodes[i].set('checked',false);
				this.setValueData(node.childNodes[i].data, node.childNodes[i].data.checked);
			}
			if (node.childNodes[i].childNodes.length > 0) {
				this.down(node.childNodes[i]);
			}
		}
	},
	
	setValueData: function(nodeAttr, checked) {
		if(!nodeAttr.id || nodeAttr.id < 0) {
			return;
		}
		
		if(checked) {
			this.valueData[nodeAttr.id] = nodeAttr.id;
		}
		else {
			delete this.valueData[nodeAttr.id];
		}
	},
	
	getValue: function(){
    	var retArr = [];
		for(p in this.valueData) {
			retArr.push(p);
		}
		return retArr.join(',');
    },
    
    setValue:function(values){
		this.reset();
		this.areaTree.getSelectionModel().deselectAll();
		var ids = values.toString().split(","); //统一转字符串
		for(var i =0; i < ids.length; i++) {
			this.valueData[ids[i]] = ids[i];
		}
		var rootNode = this.areaTree.getRootNode();
		rootNode.eachChild(function(child) {
			if(this.valueData[child.data.id] != undefined) {
				child.set('checked',true);
			}
		},this);
	},

	
	reload:function() {
		this.areaStore.load();
	},
	/*
	 * 清空
	 */
	reset : function() {
		var nodes =  this.areaTree.getChecked();
		if(nodes && nodes.length) {
			for(var i =0; i < nodes.length; i++) {
				nodes[i].set("checked",false); //设置节点属性未选中
			}
		}
		this.valueData = {};
	}
});
