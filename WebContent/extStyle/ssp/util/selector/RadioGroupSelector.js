/**
 * RadioGroup 的定义
 * datas : 显示的内容，格式:[['0','不允许',true],['1','允许']]，二维数组形式
 * value : check的值，默认空
 * fieldLabel : RadioGroup组的名称
 * name : RadioGroup组的属性，参数标记
 * columns ：一行最多数
 */
Ext.define('ssp.util.selector.RadioGroupSelector', {
	extend: 'Ext.form.RadioGroup',
	items:[],
	datas:[],
	value:"", //默认值
	fieldLabel:"Label",
	name:"name",
	labelWidth:70,
	columns : 2, 
	initComponent : function() {
		this.addRadioItem();
		Ext.apply(this);
		this.callParent();
	},	
	addRadioItem : function() {
		var _items = this.datas;
		this.items = []; //初始化
	    var radioItem;
	    if(_items !=null){
	        for(var i = 0 ;i<_items.length; i++)
	        {
	        	radioItem = { boxLabel:'名称',name:'fieldId',inputValue:'value',labelAlign:'right',checked : false};
	        	radioItem.name = this.name;
	        	radioItem.inputValue = _items[i][0];
	        	radioItem.boxLabel = _items[i][1];
	        	if(radioItem.inputValue == this.value)
	        		radioItem.checked = true;
	        	this.items.push(radioItem);
	        }
	    }
	}
});
