/*
 * 用户管理
 * @openFunction:getUser();
 * */
namespace('dsp.basic');
dsp.basic.user = Base.extend({
	table:null,//全局table
	addModal:null,//添加窗口
	constructor : function() {
		this.initUI();//初始化界面
		this.initModel();//初始化数据模型
		this.initTable();//初始化表格
		this.initEvents();//初始化事件
		this.validateUser();//验证用户绑定
	},
	/*
	 *界面UI初始化 
	 * */
	initUI:function(){
		this.table = $('#sample_1');
	},
	/*
	 * 数据模型初始化
	 * */
	initModel:function(){
		
		this.userModel = [
		    { "mData": "id" },
			{ "mData": "username" },
	        { "mData": "userphone" },
	        { "mData": "sex" },
	        { "mData": "useremail" },
	        { "mData": "description" },
	        { "mData": "password" }
	    ],
	    this.checkBox = {'sTitle':'<input type="checkbox" class="group-checkable" data-set="#sample_1 .checkboxes">', "mRender": function ( data, type, full ) {
                return '<div class="checker"><span class=""><input type="checkbox" class="checkboxes" ></span></div>';
              }}
	    this.userColumn = [this.checkBox,
	        { "sTitle": "id","mDataProp": "id" },
        	{ "sTitle": "用户名","mDataProp": "username", "sClass": "center" },
            { "sTitle": "邮件","mDataProp": "userphone",  "sClass": "center" },
            { "sTitle": "所属部门","mDataProp": "useremail",  "sClass": "center" },
            { "sTitle": "注册时间","mDataProp": "description",  "sClass": "center" },
            { "sTitle": "状态","mDataProp": "password",  "sClass": "center" },
            { "sTitle": "性别","mDataProp": "sex",  "sClass": "center" }
         ]
	},
	/*
	 *列表初始化
	 * */
	initTable : function() {
		this.table.dataTable({
			"columns" : this.userModel,//数据模型
			"lengthMenu" : [[5, 15, 20, -1], [5, 15, 20, "全部"]],//分页选择
			"aoColumns":this.userColumn,//列表column 渲染
			"sAjaxSource": ctx+'/basic/UserController/list.sdo', //表格数据ajax地址
			'sAjaxDataProp':'invdata',//对应的json 数据列 默认数据返回的total为总数据条数
			"iDisplayLength" : 20,//默认分页
			"bServerSide": true,//远程数据读取
			'bStateSave': false, //是否保存状态--》保证页面刷新重新读取数据
			//"bPaginate": true, // 是否使用分页
			//"bProcessing": true, //是否显示正在处理的提示 
			"bLengthChange": true, //是否启用设置每页显示记录数 
			"pagingType" : "bootstrap_full_number",
			'fnInitComplete': function( oSettings ) {
				//ajax返回处理完成
			} ,
			"columnDefs" : [{ // set default column settings
				'orderable' : false,
				'targets' : [0]
			}, {
				"searchable" : false,
				"targets" : [0]
			}]
			//"order" : [[1, "asc"]] //排序选项
			});
	},
	/*
	 *事件绑定
	 * */
	initEvents:function(){
		var tableWrapper = jQuery('#sample_1_wrapper');
		this.table.find('.group-checkable').change(function() {
			var set = jQuery(this).attr("data-set");
			var checked = jQuery(this).is(":checked");
			jQuery(set).each(function() {
						if (checked) {
							$(this).attr("checked", true);
							$(this).parents('tr').addClass("active");
						} else {
							$(this).attr("checked", false);
							$(this).parents('tr').removeClass("active");
						}
					});
			jQuery.uniform.update(set);
		});

		this.table.on('change', 'tbody tr .checkboxes', function() {
					$(this).parents('tr').toggleClass("active");
				});

		tableWrapper.find('.dataTables_length select')
				.addClass("form-control input-xsmall input-inline");
		
		$('.user-btn-add-modal').on('click',function(){
			this.addModal = $('.user-modal').modal('show');
		});
		var ths = this; 
		//添加用户事件绑定
		$('.user-btn-add').on('click',function(){
			//ths.validateUser();
		});
		$('.user-btn-remove').on('click',function(){
			ths.removeUser();
		});
	},
	/*
	 *添加用户
	 * */
	addUser:function(){
		var tab =this.table;
		$.ajax({
		     type: "POST",
		     url: ctx+'/basic/UserController/add.sdo', 
		     data: $('.userForm').serialize(),
		     dataType: "json",
		     scope:this,
		     success: function(data){
		     	if(data.result=="success"){
		     		app.msg('success',"提示", "添加成功");
					tab.fnClearTable(0); //清空数据
					tab.fnDraw(); //重新加载数据
		     	}else{
		     		app.msg('error',"提示", "添加失败");
		     	}
		     }
		 });
		$('.user-modal').modal('hide')
	},
	/*
	 * 删除用户
	 * */
	removeUser:function(){
		var tab =this.table;
		var id = new Array();
		this.table.find('.active').each(function(){
			id.push(tab.fnGetData(this).id);
		})
		$.ajax({
		     type: "POST",
		     url: ctx+'/basic/UserController/delete.sdo', 
		     data: {id:id[0]},
		     dataType: "json",
		     scope:this,
		     success: function(data){
		     	if(data.result=="success"){
		     		app.msg('success',"提示", "删除成功");
					tab.fnClearTable(0); //清空数据
					tab.fnDraw(); //重新加载数据
		     	}else{
		     		app.msg('error',"提示", "删除失败");
		     	}
		     }
		 });
	},
	/*
	 * 修改用户
	 * */
	editUser:function(){},
	/*
	 * 用户信息验证
	 * */
	validateUser:function(){
		var thi = this;
	    var form2 = $('.userForm');
	    var error2 = $('.alert-danger', form2);
	    var success2 = $('.alert-success', form2);
	    form2.validate({
	        errorElement: 'span', //default input error message container
	        errorClass: 'help-block help-block-error', // default input error message class
	        focusInvalid: false, // do not focus the last invalid input
	        ignore: "",  // validate all fields including form hidden input
	        rules: {
	            name: {
	                minlength: 4,
	                required: true
	            },
	            userphone: {
	                required: true
	            },
	            password: {
	                required: true
	            }
	        },
	        invalidHandler: function (event, validator) {              
	            success2.hide();
	            error2.show();
	        },
	        errorPlacement: function (error, element) {
	            var icon = $(element).parent('.input-icon').children('i');
	            icon.removeClass('fa-check').addClass("fa-warning");  
	            icon.attr("data-original-title", error.text()).tooltip({'container': 'body'});
	        },
	        highlight: function (element) {
	            $(element).closest('.form-group').removeClass("has-success").addClass('has-error');   
	        },
	        success: function (label, element) {
	            var icon = $(element).parent('.input-icon').children('i');
	            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
	            icon.removeClass("fa-warning").addClass("fa-check");
	            
	        },
	        submitHandler: function (form) {
	            success2.show();
	            error2.hide();
	            thi.addUser();
	        }
	    });
	}
});
jQuery(document).ready(function() {
	new dsp.basic.user();
}); 