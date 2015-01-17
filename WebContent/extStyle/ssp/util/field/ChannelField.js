/*
 * 频道选择 selector
 * @openFunction 方法
 * 1.setValue(val)//param String "id,id"
 * 2.getValue()//return String "id,id"
 * 3.reset()//重置adPostationSelector
 * 4.reload();//刷新adPostationSelector store
 * 5.
 * 
 * @param 配置项
 * fieldLabel:名称
 * title:名称 打开的窗口
 * openChannelSearch:true 打开搜索功能 false 关闭搜索功能 默认false
 * width：窗口宽度
 * height:窗口高度
 * allowBlank：是否允许为空
 * maxLength:允许用户选择的最多频道数 -1为不限制
 * */
Ext.define('ssp.util.field.ChannelField', {
	extend: 'Ext.form.FieldContainer',
    fieldLabel: '频道选择',
    requires:['Ext.ux.DataView.LabelEditor'],
    alias: ['widget.channelField'],
    title: '频道选择',
    windowWidth: 380,
    windowHeight:450,
    collection:new Ext.util.MixedCollection(),
    value:new Array(),//用于getvalue的变量
    allowBlank:false,
    openChannelSearch:false,
    maxLength:-1,
    layout: {
        type: 'hbox',
        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
    },
    defaults: {
        hideLabel: true
    },
    initComponent: function() {
    	Ext.define('channelField', {
			extend : 'Ext.data.Model',
			idProperty : 'id'
		});
		this.channelStore = Ext.create('Ext.data.TreeStore', {
			clearOnLoad : true,
			model: 'channelField',
			nodeParam : 'id',
			batchUpdateMode : 'complete',
			autoSync : false,
			parentIdProperty : "parentId",
			defaultRootProperty :'invdata',
	        proxy: {
	            type: 'ajax',
	            url:globalCtx+'/common/CommonController/getChannel.sdo'
	        }, 
	        root : {  
	        	 id : "-1" ,
	            expanded : true           
	        },
			listeners:{
				scope:this,
				nodeexpand:function(node, o){
					this.setPathValue(node);
				}
		    }
		});
		this.toolBar = Ext.create('Ext.toolbar.Toolbar',{
			items:[{ 
				labelWidth: 60,
		        xtype: 'textfield',
		        fieldLabel: '智能搜索',
		        triggers:{
			        bar: {
			        	scope:this,
				        cls: 'x-form-clear-trigger',
				        handler: function() {
				           this.reset();
				        }
		    		}
		        },
		        listeners: {
		        	scope:this,
		            change: function() {
		                var tree =this.channelTree, v,matches = 0;
		                try {
		                    v = new RegExp(this.getValue(), 'i');
		                    Ext.suspendLayouts();
		                    tree.store.filter({
		                        filterFn: function(node) {
		                        	
		                        }
		                    },this);
		                    tree.down('#matches').setValue(matches);
		                    Ext.resumeLayouts(true);
		                } catch (e) {
		                    this.markInvalid('Invalid regular expression');
		                }
		            },
		            buffer: 100
		        }
   	 		},{
        xtype: 'displayfield',
        itemId: 'matches',
        fieldLabel: '得到的条数',
        labelWidth: 80,
        listeners: {
        	scope:this,
            beforerender: function() {
                var me = this,
                    tree = this.channelTree,
                    root = tree.getRootNode(),
                    leafCount = 0;

                tree.store.on('fillcomplete', function(store, node) {
                    if (node === root) {
                        root.visitPostOrder('', function(node) {
                            if (node.isLeaf()) {
                                leafCount++;
                            }
                        });
                        me.setValue(leafCount);
                    }
                });
            },
            single: true
        }
    }]
		});
		this.channelTree = Ext.create('Ext.tree.TreePanel', {
			store : this.channelStore,
			rootVisible : false,
			border : false,
			tbar :this.openChannelSearch == true ?this.toolBar:null,
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
					}
				}
		    }
		});
		this.channelWindow = Ext.create('Ext.window.Window',{
			height:this.windowWidth,
		    width: this.windowHeight,
		    title: this.title,
		    bodyPadding: 5,
		    modal: true,
		    frame: true,
		    layout:'fit',
			anchor:'100%',
		    scope:this,
		    closeAction:'hide',
		    listeners:{
				scope:this,
				close:function(win, e){
				   // this.reset();
				}
			},
		    items:[this.channelTree],
		    buttonAlign:'center',
		    buttons:[{
		    	text:'确定',
		    	scope:this,
		    	iconCls:'confirm',
		    	handler:this.confirmValue
		    },{
		    	text:'清空',
		    	iconCls:'cancel',
		    	scope:this,
		    	handler:function(){
		    		this.reset();
		    	}
		    }]
		
		});
    	Ext.apply(this, {
			items:[{
	            	xtype: 'hidden',
	            	name: 'channel'
	        	},{
	            	xtype: 'textfield',
	            	readOnly:true,
	            	allowBlank:this.allowBlank,
	            	name: 'channel_Name'
	        	},{
	            	xtype: 'displayfield',
	            	width:10
			    },{
	            	xtype: 'button', 
	                text: '选择',
					scope : this,
					handler : function(){
						this.channelWindow.show();
				  }
			}]
		});
		this.callParent();
    },
	/*
	 * 界面全局事件初始化
	 * */
	initEvents:function(){
		//this.items.on('afterrender',this.initMethod(),this);
	},
	init:function(){
		
	},
	searchChannel:function(){
		
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
	confirmValue:function(){
		var vla = this.getNodeArray();
		var length = vla.length;
		if(this.maxLength != -1){
		    if(length>this.maxLength){
		    	Ext.Msg.alert("提示", "允许用户选择的最大频道数为:"+this.maxLength+"!请重新选择");
		        return;
		    }
		}
		this.query('hidden')[0].setValue(vla.join(','));
		if(length>0){
			this.query('textfield')[0].setValue('共选择'+length+"个频道");
		}else{
		    this.query('textfield')[0].reset();
		};
		this.channelWindow.close();
	},
	getValue:function(){//去掉父节点 
		return this.getNodeArray().join(',');
	},
	getNodeArray:function(){
		this.value = new Array();
		var node = this.channelTree.getRootNode();
		this.getNode(node);
		return this.value;
	},
	//private for getValue
	getNode:function(node){
		if(node.get('checked') == true &&node.get('leaf') == true ){
			this.value.push(node.get('id'))
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
		var node = this.channelTree.getRootNode();
		this.channelTree.getSelectionModel().deselectAll();
		this.selectNodeById(ids);
		var thiss = this;
		this.query('hidden')[0].setValue(value);
		this.query('textfield')[0].setValue('共选择'+ids.length+"个频道");
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
	 * 清空
	 */
	reset : function() {
		var node = this.channelTree.getRootNode();
		this.channelTree.selectPath(node);
		this.channelTree.getSelectionModel().deselectAll();
		this.channelTree.collapseAll();
		this.value = new Array();
		this.collection.clear(); 
		this.resetNode(node);
	},
	//private for reset
	resetNode:function(node){
		node.set('checked', false);
		node.eachChild(function(child) {
			this.resetNode(child);
		},this);
	},
	/*
	 * 数据重新加载
	 * */
	reload:function(){
		this.channelTree.mask(["加载数据中"]);
		this.channelStore.load({params : {id : "-1"},scope:this,callback:function(){
			this.channelTree.unmask();
			this.channelTree.getSelectionModel().deselectAll();
		}})
	}
})