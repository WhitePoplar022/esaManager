/*
 * 广告位选择 selector
 * @openFunction 方法
 * 1.setValue(val)//param String "id,id"
 * 2.getValue()//return String "id,id"
 * 3.reset()//重置adPostationSelector
 * 4.reload();//刷新adPostationSelector store
 * 5.
 * 
 * @param 配置项
 * title:名称
 * headerPosition:header的位置
 * unstyled:去掉样式 true false
 * 
 * */
Ext.define('ssp.util.selector.adPostationSelectorPanel', {
	extend: 'Ext.panel.Panel',
	title: '广告位选择:<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
	alias: ['widget.adPostationSelectorPanel'],
	collection:new Ext.util.MixedCollection(),//存储选择的数据 用于翻页显示
	//headerPosition:'left',
	layout:'fit',
	anchor:'100%',
	autoScroll:true,
	value:new Array(),//用于getvalue的变量
	unstyled:true,
	initComponent: function() {
		
		Ext.define('adPostation', {
			extend : 'Ext.data.Model',
			idProperty : 'id'
		});
		//广告位树
		this.adStore = Ext.create('Ext.data.TreeStore', {
			clearOnLoad : true,
			model: 'adPostation',
			nodeParam : 'id',
			batchUpdateMode : 'complete',
			autoSync : false,
			parentIdProperty : "parentId",
			defaultRootProperty :'invdata',
	        proxy: {
	            type: 'ajax',
	            url:globalCtx+'/request/RequestPositionController/getRequestPositionTree.sdo'
	        }, 
	        root : {  
	        	 id : -1 ,
	            expanded : true           
	        },
	       // folderSort: true,
			listeners:{
				scope:this,
				nodeexpand:function(node, o){
					this.setPathValue(node);
				}
		    }
		});
		this.adTree = Ext.create('Ext.tree.TreePanel', {
			store : this.adStore,
			rootVisible : false,
			border : false,
			autoScroll:true,
			layout:'fit',
			reserveScrollbar: true,//防止滚动条溢出
			useArrows : true,
			frame : false,
			scope:this,
			listeners:{
				scope:this,
				checkchange:function(node, checked){
					if(checked){
						this.checkedChildNode(node,true);
						this.parentnodeCheck(node,true);
					}else{
						this.checkedChildNode(node,false);
						this.parentnodeCheck(node,false);
					}
				}
		    }
		});
		
		Ext.apply(this, {
			items:[this.adTree]
		});
		this.callParent();
	},
	parentnodeCheck : function(node,flg) {
		if(node.parentNode.get('id')==-1 || node.parentNode.get('id')=='-1'){
		    return;
		}
		if (node.parentNode != null  ) {
			node.parentNode.set('checked', flg);
			this.parentnodeCheck(node.parentNode,flg);
		}
	},
	checkedChildNode:function(node,checked){
		node.expand(true,function(){
			node.set('checked', checked);
			node.eachChild(function(child) {
				this.checkedChildNode(child,checked);
			},this);
		},this);
	},
	setPathValue:function(node){
		node.eachChild(function(child) {
			if(this.collection.containsKey(child.get('id'))){
				this.parentnodeCheck(child,true);
			    child.set('checked', true);
			}
		},this);
	},
	
	getIdsAndTexts:function(){//去掉父节点 
		this.value = new Array();
		this.text =  new Array();
		var node = this.adTree.getRootNode();
		this.getNode(node);
		var rs = {};
		rs.ids = this.value.join(',');
		rs.texts = this.text.join(',');
		return rs;
	},
	
	getValue:function(){//去掉父节点 
		this.value = new Array();
		var node = this.adTree.getRootNode();
		this.getNode(node);
		return this.value.join(',');
	},
	//private for getValue
	getNode:function(node){
		if(node.get('checked') == true &&node.get('leaf') == true ){
			this.value.push(node.get('id'));
			if(this.text){
				this.text.push(node.get('text'));
			}
		}
		if (node.isNode) {
			node.eachChild(function(child) {
				this.getNode(child);
			},this);
		}
	},
	setValue:function(value){
		this.reset();
		var ids = value.toString().split(",");
		var node = this.adTree.getRootNode();
		this.adTree.getSelectionModel().deselectAll();
		this.selectNodeById(ids);
		var thiss = this;
			 node.cascadeBy(function() {
			 	if(thiss.collection.containsKey(this.get('id'))){
			 	     this.set('checked',true);
			 	     thiss.parentnodeCheck(this,true);
			 	}
		 },null);
	},
	
	selectNodeById:function(ids){
		for (var i = 0; i < ids.length; i++) {
			this.collection.add(ids[i],ids[i])
		}
	},
	/*
	 * 数据重新加载
	 * */
	reload:function(){
		this.adTree.mask(["加载数据中"]);
		this.adStore.load({params : {id : -1},scope:this,callback:function(){
			this.adTree.unmask();
			this.adTree.getSelectionModel().deselectAll();
		}})
	},
	//private for reset
	resetNode:function(node){
		node.set('checked', false);
		node.eachChild(function(child) {
			this.resetNode(child);
		},this);
	},
	/*
	 * 清空
	 */
	reset : function() {
		this.adTree.selectPath(this.adTree.getRootNode());
		this.adTree.getSelectionModel().deselectAll();
		this.adTree.collapseAll();
		this.value = new Array();
		this.collection.clear(); 
		this.resetNode(this.adTree.getRootNode());
	}
})