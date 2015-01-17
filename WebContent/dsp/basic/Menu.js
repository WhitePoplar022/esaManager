/*
 * 菜单管理
 * 
 * */
namespace('dsp.basic');
dsp.basic.Menu = Base.extend({
	table:null,//全局table
	addModal:null,//添加窗口
	constructor : function() {
		this.initTree();//初始化树
	},
	
	initTree: function() {
		jQuery("#list").jqGrid({
		   	url: ctx+'/basic/UserController/list.sdo',
			datatype: "json",
			mtype: "POST",
			rowNum:10, 
			page:1,
			multiselect: false,
		    rowList:[10,20,30,50], 
		   // viewrecords: true, 
			autowidth: true,
		    //postData:params,
			jsonReader: {  
			    root:"invdata",     
			    total: "total",
			    repeatitems : false  
			}, 
		   	colNames:["id","用户名","邮件", "所属部门", "注册时间","状态","性别"],
		   	colModel:[
		   		{name:'id',index:'id', key:true,  align:"center",editable:true},
		   		{name:'username',index:'username',  align:"center",editable:true},
		   		{name:'userphone',index:'userphone', align:"center",editable:true},
		   		{name:'useremail',index:'useremail',  align:"center",editable:true},
		   		{name:'description',index:'description', align:"center",editable:true},
		   		{name:'password',index:'password', align:"center",editable:true},
		   		{name:'sex',index:'sex', align:"right", align:"center",editable:true}
		   	],
			height:'auto',
			pager : "#pager",
		   // treeGrid: true,
		    pagerpos:'right',
			ExpandColumn : 'name'
		});
		jQuery("#list").jqGrid('navGrid',"#pager",{edit:false,add:false,del:false,search:false});
    
    }
	
});
jQuery(document).ready(function() {
	new dsp.basic.Menu();
}); 