/*
 * 地区选择 selector
 * @openFunction 方法
 * 1.setValue(val)//param String {"type":"city","value":"31,32"}
 * 2.getValue()//return String {"type":"city","value":"31,32"}
 * 3.reset()//重置adPostationSelector
 * 5.
 * 
 * @param 配置项

 * 
 * */
Ext.define('ssp.util.field.CityField', {
	extend: 'Ext.form.FieldContainer',
    fieldLabel: '地区选择',
    requires:['Ext.ux.DataView.LabelEditor'],
    alias: ['widget.cityField'],
    allowBlank:false,
    layout: { 
        type: 'hbox',
        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
    },
    inputValues:new Array(),
    defaults: {
        hideLabel: true
    },
	initComponent: function() {
    	this.initModel();//初始化数据
		//分类切换按钮组
		this.areaChangeGroup = Ext.create('Ext.form.RadioGroup',{
			columns:3,
			height:20,
			items:[{
				boxLabel:'省份',
				inputValue:'province',
				checked:true,
				name:'areaChange'
			},{
				boxLabel:'城市',
				inputValue:'city',
				name:'areaChange'
			},{
				boxLabel:'国外',
				inputValue:'state',
				name:'areaChange'
			}],
			listeners:{
				scope:this,
				change:function(){
					this.initData();
				}
			}
		}); 
		//全选按钮组
		this.checkAllGroup = Ext.create('Ext.form.Checkbox',{
			boxLabel:'全选',
			listeners:{
				scope:this,
				change:this.selectAll
			}
		}); 
		//左侧checkbox
		this.checkGroup = Ext.create('Ext.form.CheckboxGroup',{
			columns:5,
			listeners:{
				scope:this,
				change:this.setSelectValue
			}
			
		});
		//可选择panel 
		/**
		this.optionalPanel = Ext.create('Ext.panel.Panel',{
			region:'center',
			title:'可选',
			border:true,
			layout:'form',
			items:[this.checkGroup]
		});
		 * 
		 */
		this.optionalPanel = Ext.create('ssp.util.selector.areaSelectorPanel',{
			region:'center',
			header:false,
			border:false,
			frame:false,
			title: ' '
		});
		this.checkedCityTree = Ext.create('Ext.tree.TreePanel',{
			rootVisible : false,
			border : false,
			reserveScrollbar: true,
			useArrows : true,
			layout:'fit',
			region:'east',
			width:250,
			frame : false,
			hideHeaders : true,
			columns:this.columns,
            store: this.citySelectStore
		});
		
		this.cityPanel = Ext.create('Ext.form.Panel',{
			frame : false,
			border:false,
		//	layout:'border',
			height:350,
	//		tbar:[this.checkAllGroup],
			defaults : {xtype:'panel',layout:'form',height:320,border:true,defaults:{margin : 2,anchor:'100%'}},
			fieldDefaults : {labelAlign : 'right',labelWidth :90},
			items : [this.optionalPanel]
		});
		this.cityWindow = Ext.create('Ext.window.Window',{
			autoHeight:true,
		    width: 700,
		    title: '地区选择',
		    bodyPadding: 5,
		    modal: true,
		    frame: true,
		    scope:this,
		    closeAction:'hide',
		    items:[this.cityPanel],
		    buttonAlign:'center',
		    buttons:[{
		    	text:'确定',
		    	scope:this,
		    	iconCls:'confirm',
		    	handler:this.setInpitValue
		    },{
		    	text:'清空',
		    	iconCls:'cancel',
		    	scope:this,
		    	handler:function(){
		    		//this.setValue('{"type":"city","value":"31,32"}')
		    		this.reset();
		    	}
		    }]
		});
		Ext.apply(this, {
			items:[{
	            	xtype: 'hidden',
	            	name: 'city'
	        	},{
	            	xtype: 'textfield',
	            	readOnly:true,
	            	allowBlank:this.allowBlank,
	            	name: 'city_Name'
	        	},{
	            	xtype: 'displayfield',
	            	width:10
			    },{
	            	xtype: 'button', 
	                text: '选择',
					scope : this,
					handler : function(){
						this.cityWindow.show();
					}
			}]
		});
		this.callParent();
	},
	/*
	 * 界面全局事件初始化
	 * */
	initEvents:function(){
		this.items.on('afterrender',this.initMethod(),this);
	},
	/*
	 *init 方法
	 * */
	initMethod:function(){
		//this.initData();
	},
	initData:function(){
		this.checkedCityTree.getStore().removeAll();
		
		var type= this.getComboxValue(this.areaChangeGroup);
		var params = {type:type}; 
		Ext.apply(this.areaStore.proxy.extraParams, params);
		this.areaStore.load();
	},
	setLeftChenkByStore:function(){
		this.reset();
		this.checkGroup.removeAll();
		var type= this.getComboxValue(this.areaChangeGroup);
		this.areaStore.getRoot().cascadeBy(function(node) {
			if(type == "province" ||type == "state" ){
				if(!node.isRoot()){
					this.checkGroup.add({boxLabel:node.get('name'),inputValue:node.get('id'),width:80});
				}
			}else{
			   if(!node.isRoot()&&node.get('leaf')==false){
					this.checkGroup.add({boxLabel:node.get('name'),inputValue:node.get('id'),width:80});
				}
			}
		 },this);
		 var t = this;
		 var s = function(){
		 	t.setOthervalue();
		  }
		 setTimeout(s,50)
		 
		 this.checkGroup.doLayout();
		 this.cityPanel.doLayout();
	},
	setSelectValue:function(){
		var values = this.getComboxValue(this.checkGroup);
		this.citySelectStore.loadData(this.getNodeFromAreaStoreById(values));
	},
	getNodeFromAreaStoreById:function(values){
		var nodes=  new Array();
		var type= this.getComboxValue(this.areaChangeGroup);
		for (var i = 0; i < values.length; i++) {
			this.areaStore.each(function(r) {
				if(values[i] == r.get('id')){
					if(type == "province" ||type == "state" ){
						nodes.push(r);
					}else{
						var s = r.get('children')
						for (var j = 0; j < s.length; j++) {
					    	nodes.push(s[j]);
					    }
					} 
				}
			},this);
		}
		 return nodes;
	},
	
	getLeftSelectValue:function(){
		
	},
	getComboxValue:function(combox){
		var v = new Array();
		combox.items.each(function(item) {
			if (item.getValue()) {
				v.push(item.inputValue);
			}
		});
		return v;
	},
	selectAll:function(v,c){
		/**
		this.checkGroup.items.each(function(item,i) {
			    if(i<this.checkGroup.items.length-1){
				    this.checkGroup.suspendEvent('change');
	        		item.setValue(c==true?true:false);
	    		    this.checkGroup.resumeEvent('change');
		        }else{
		            item.setValue(c==true?true:false);
		        }
		},this);
		*/
	},
	/*
	 * 初始化Store
	 * */
	initModel : function() {
		this.columns = [{
            xtype: 'treecolumn',
            text: '菜单名称',
            flex: 2,
            dataIndex: 'text'
        },{
            menuDisabled: true,
            sortable: false,
            xtype: 'actioncolumn',
            width: 28,
            items: [{
                iconCls: 'delete',
                scope:this,
                tooltip: '删除',
                handler: this.deleteColumn
            }]
        }]
		Ext.define('areaField', {
			extend : 'Ext.data.Model',
			idProperty : 'id'
		});
		this.areaStore = Ext.create('Ext.data.TreeStore', {
			clearOnLoad : true,
			autoLoad:false,
			model: 'areaField',
	        proxy: {
	            type: 'ajax',
	            extraParams:{type:'province'},
		        reader: {
		            type: 'json',
		            rootProperty: 'invdata'
	            },
	            url:globalCtx+'/common/CommonController/getArea.sdo'
	        }, 
	        root : {  
	        	 id : "-1" ,
	            expanded : true           
	        },
	        
			listeners:{
				scope:this,
				nodeexpand:function(node, o){
					//this.setPathValue(node);
				},
				load:function(){
				  this.setLeftChenkByStore();
				}
		    }
		}); 
		Ext.define('areaSelectField', {
			extend : 'Ext.data.Model',
			idProperty : 'id'
		});
        this.citySelectStore = Ext.create('Ext.data.TreeStore', {
        	model: 'areaSelectField',
	        clearOnLoad : true,
	          proxy: {
        type: 'localstorage',
        id  : 'twitter-Searches'
    }
		});
	},
	getCityChangeName:function(){
		var v;
		this.areaChangeGroup.items.each(function(item) {
			if (item.getValue()) {
				v = item.boxLabel;
				return false;
		    }
        })
		return v;
	},
	setInpitValue:function(){
		var values = this.optionalPanel.getValue();
		var index = values.split(",").length;
//		var type= this.getComboxValue(this.areaChangeGroup).join(",");
		if(index>0){
			this.query('textfield')[0].setValue('共选择'+index+"个地区！"); //+this.getCityChangeName()
			this.query('hidden')[0].setValue(values); //Ext.encode({"type":type,"value":values.join(',')}
		}else{
		    this.query('textfield')[0].reset();
		    this.query('hidden')[0].setValue("");
		};
		
		this.cityWindow.close();
	},
	getValue:function(){
	   // return this.durValue().join(',');
		return this.optionalPanel.getValue();
	},
	durValue:function(){
		var nodeArray = new Array();
		var store = this.checkedCityTree.getStore();
		store.each(function(rec){
		    nodeArray.push(rec.get('id'));
		})
		return nodeArray;
	},
	setValue:function(backJson){
		if(backJson == null || backJson == ""){
			this.reset();
			this.setAreaChangeValue('province');
			return;
		}
		var val = Ext.decode(backJson);
        var type = val.type;
        this.inputValues = val.value.split(",");
		this.query('textfield')[0].setValue('共选择'+this.inputValues.length+"个"+this.getCityChangeName());
		this.query('hidden')[0].setValue(backJson);
        if(type == this.getComboxValue(this.areaChangeGroup)){
            this.initData();
        }else{
        	this.setAreaChangeValue(type);
        }
        
	},
	setOthervalue:function(){
		var v = this.inputValues;
		for (var j = 0; j < v.length; j++) {
			
			this.checkGroup.items.each(function(item,i) {
			    if(v[j] == item.inputValue){
			        item.setValue(true);
			    }
		},this);
		}
		
		 this.checkGroup.doLayout();
		 this.cityPanel.doLayout();
		this.inputValues = new Array();
	},
	setAreaChangeValue:function(v){
		if (this.rendered)
			this.areaChangeGroup.items.each(function(item) {
				item.setValue(v);
			});
	},
	deleteColumn:function(grid, rowIndex, colIndex){
		var rec = grid.getStore().getAt(rowIndex);
		var type= this.getComboxValue(this.areaChangeGroup);
		if(type == "province" ||type == "state" ){
		this.checkGroup.items.each(function(item) {
			if (rec.get('id') == item.inputValue) {
				item.setValue(false);
				grid.getStore().removeAt(rowIndex);
		    }
		}); 
		}else{
			grid.getStore().removeAt(rowIndex);
		}
	},
	reset:function(){
		this.checkedCityTree.getStore().removeAll();
		this.checkAllGroup.setValue(false);
		this.checkGroup.items.each(function(item,i) {
		    if(i<this.checkGroup.items.length-1){
			    this.checkGroup.suspendEvent('change');
        		item.setValue(false);
    		    this.checkGroup.resumeEvent('change');
	        }else{
	            item.setValue(false);
	        }
		},this);
	}
});
