/*
 *行业选择 
 * */
Ext.define('ssp.util.field.IndustryField', {
	extend: 'Ext.panel.Panel',
    fieldLabel: '行业选择',
    parentPanel:null,
	inputValues:null,
    allowBlank:false,
    border:false,
    simpleCheck:false,
    layout: { 
        type: 'hbox',
        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
    },
    defaults: {
        hideLabel: true
    },
	initComponent: function() {
    	//左侧checkbox
		this.checkGroup = Ext.create('Ext.form.CheckboxGroup',{
			columns:5
		});
		if(this.simpleCheck) {
			this.checkGroup = Ext.create('Ext.form.RadioGroup',{
				columns:5
			});
		}
		//可选择panel 
		this.optionalPanel = Ext.create('Ext.panel.Panel',{
			region:'center',
			frame:true,
		    border:false,
			layout:'form',
			items:[this.checkGroup]
		});
		
		
		Ext.apply(this, {
			layout: 'fit',
			items: [this.optionalPanel]
		});
		this.callParent();
	},
	/*
	 * 初始化Store
	 * */
	initStore : function() {
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
	            url:globalCtx+'/advertiser/IndustryController/list.sdo'
	        }, 
	        root : {  
	        	 id : "-1" ,
	             expanded : true           
	        },
	        listeners:{
				scope:this,
				load:function(){
				  this.setLeftChenkByStore();
				}
		    }
		}); 
	},
	initMethod:function(inputValues){
		this.inputValues = inputValues;
		this.initStore();//初始化数据
	},
	/**
	 * 设置checkGroup数据
	 */
	setLeftChenkByStore:function(){
		this.checkGroup.removeAll();
		this.areaStore.getRoot().cascadeBy(function(node) {
			var nodeName = node.get('industryName');
			if(nodeName != undefined)
			   this.checkGroup.add({boxLabel:node.get('industryName'),name:'industryName',inputValue:node.get('id'),width:80});
		},this);
		var t = this;
		var s = function(){
		 	t.setOthervalue();
		}
		setTimeout(s,50)
		this.checkGroup.doLayout();
	},
	/**
	 * 设置它选中
	 */
	setOthervalue:function(){
		var vl = this.inputValues;
		if(null == vl || vl.toString().length < 1) return ;
		vl = vl.toString();
		
		var v = vl.split(",");
		for (var j = 0; j < v.length; j++) {
			this.checkGroup.items.each(function(item,i) {
				    if(v[j] == item.inputValue){
				        item.setValue(true);
				    }
			},this);
		}
		this.checkGroup.doLayout();
		this.inputValues = new Array();
	}
});
