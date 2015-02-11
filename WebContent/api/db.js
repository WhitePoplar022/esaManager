var db = {
	"name" : "ssp",
	"tables" :[
    {
        "name": "dmp_Log",
        "remark": "日志表",
        "engine": null,
        "columns": [
            {
                "name": "Id",
                "type": "int",
                "iskey": "PRI",
                "notnull": "NO",
                "remark": "LogID",
                "defaults": null,
                "extra": null
            },
            {
                "name": "type",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "日志类型",
                "defaults": null,
                "extra": null
            },
            {
                "name": "labelId",
                "type": "int",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "operationUserId",
                "type": "int",
                "iskey": "",
                "notnull": "YES",
                "remark": "用户ID",
                "defaults": null,
                "extra": null
            },
            {
                "name": "operationUserName",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "操作用户",
                "defaults": null,
                "extra": null
            },
            {
                "name": "operationTime",
                "type": "datetime",
                "iskey": "",
                "notnull": "YES",
                "remark": "操作时间",
                "defaults": null,
                "extra": null
            }
        ],
        "indexs": [
            {
                "name": "PRIMARY",
                "columnName": "Id",
                "asc_or_desc": null,
                "non_unique": "0",
                "remark": ""
            }
        ]
    },
    {
        "name": "dmp_attributeType",
        "remark": "属性类别表",
        "engine": null,
        "columns": [
            {
                "name": "id",
                "type": "int",
                "iskey": "PRI",
                "notnull": "NO",
                "remark": "属性ID",
                "defaults": null,
                "extra": null
            },
            {
                "name": "name",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "属性所属名称",
                "defaults": null,
                "extra": null
            },
            {
                "name": "value",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "属性值",
                "defaults": null,
                "extra": null
            },
            {
                "name": "type",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "属性类别\n级联：有选择按钮\n文本：单纯文本\n文本可查：文本并带查询",
                "defaults": null,
                "extra": null
            },
            {
                "name": "loadUrl",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "加载地址: 下拉框或文本可查的模式需要动态访问接口",
                "defaults": null,
                "extra": null
            },
            {
                "name": "status",
                "type": "int",
                "iskey": "",
                "notnull": "YES",
                "remark": "状态 1.正常 0不活跃",
                "defaults": "1",
                "extra": null
            }
        ],
        "indexs": [
            {
                "name": "PRIMARY",
                "columnName": "id",
                "asc_or_desc": null,
                "non_unique": "0",
                "remark": ""
            },
            {
                "name": "idx_attributeType_id",
                "columnName": "id",
                "asc_or_desc": null,
                "non_unique": "1",
                "remark": ""
            }
        ]
    },
    {
        "name": "dmp_capacityTask",
        "remark": "容量任务列表",
        "engine": null,
        "columns": [
            {
                "name": "Id",
                "type": "int",
                "iskey": "PRI",
                "notnull": "NO",
                "remark": "任务ID",
                "defaults": null,
                "extra": null
            },
            {
                "name": "subTime",
                "type": "datetime",
                "iskey": "",
                "notnull": "YES",
                "remark": "提交任务时间",
                "defaults": null,
                "extra": null
            },
            {
                "name": "operationUserId",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "操作用户ID",
                "defaults": null,
                "extra": null
            },
            {
                "name": "operationUserName",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "操作用户",
                "defaults": null,
                "extra": null
            },
            {
                "name": "status",
                "type": "int",
                "iskey": "",
                "notnull": "YES",
                "remark": "任务状态 默认0  未完成   如果为1则表示完成  2 表示 异常",
                "defaults": "0",
                "extra": null
            },
            {
                "name": "crowdId",
                "type": "int",
                "iskey": "",
                "notnull": "YES",
                "remark": "人群ID",
                "defaults": null,
                "extra": null
            },
            {
                "name": "content",
                "type": "mediumtext",
                "iskey": "",
                "notnull": "YES",
                "remark": "永强返回的JSON数据",
                "defaults": null,
                "extra": null
            },
            {
                "name": "queryConditionName",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "查询条件名称显示json",
                "defaults": null,
                "extra": null
            },
            {
                "name": "queryConditionId",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "查询条件的id json",
                "defaults": null,
                "extra": null
            },
            {
                "name": "gpByAttrs",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "汇总条件",
                "defaults": null,
                "extra": null
            }
        ],
        "indexs": [
            {
                "name": "PRIMARY",
                "columnName": "Id",
                "asc_or_desc": null,
                "non_unique": "0",
                "remark": ""
            },
            {
                "name": "idx_capacityTask_id",
                "columnName": "Id",
                "asc_or_desc": null,
                "non_unique": "1",
                "remark": ""
            }
        ]
    },
    {
        "name": "dmp_crowdLabel",
        "remark": "人群标签表",
        "engine": null,
        "columns": [
            {
                "name": "Id",
                "type": "int",
                "iskey": "PRI",
                "notnull": "NO",
                "remark": "人群ID",
                "defaults": null,
                "extra": null
            },
            {
                "name": "labelName",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "标签名称",
                "defaults": null,
                "extra": null
            },
            {
                "name": "platform",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "所属平台",
                "defaults": null,
                "extra": null
            },
            {
                "name": "createTime",
                "type": "datetime",
                "iskey": "",
                "notnull": "YES",
                "remark": "创建时间",
                "defaults": null,
                "extra": null
            },
            {
                "name": "updataTime",
                "type": "datetime",
                "iskey": "",
                "notnull": "YES",
                "remark": "更新时间",
                "defaults": null,
                "extra": null
            },
            {
                "name": "content",
                "type": "varchar",
                "iskey": "",
                "notnull": "NO",
                "remark": "人群标签内容",
                "defaults": null,
                "extra": null
            },
            {
                "name": "creator",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "创建人",
                "defaults": null,
                "extra": null
            },
            {
                "name": "type",
                "type": "int",
                "iskey": "",
                "notnull": "YES",
                "remark": " 0—电商人群    1---观影/点击人群",
                "defaults": null,
                "extra": null
            },
            {
                "name": "contentNames",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "人群定向内容 存的行业 子行业 品类 内容偏好的name 其他的存id ",
                "defaults": null,
                "extra": null
            }
        ],
        "indexs": [
            {
                "name": "PRIMARY",
                "columnName": "Id",
                "asc_or_desc": null,
                "non_unique": "0",
                "remark": ""
            }
        ]
    },
    {
        "name": "dmp_populationAnalysis",
        "remark": "人群分析-结果数据保存",
        "engine": null,
        "columns": [
            {
                "name": "id",
                "type": "int",
                "iskey": "PRI",
                "notnull": "NO",
                "remark": "自增id",
                "defaults": null,
                "extra": null
            },
            {
                "name": "crowdId",
                "type": "int",
                "iskey": "",
                "notnull": "YES",
                "remark": "人群id",
                "defaults": null,
                "extra": null
            },
            {
                "name": "age",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "年龄",
                "defaults": null,
                "extra": null
            },
            {
                "name": "gender",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "性别",
                "defaults": null,
                "extra": null
            },
            {
                "name": "uv",
                "type": "int",
                "iskey": "",
                "notnull": "YES",
                "remark": "UV",
                "defaults": null,
                "extra": null
            },
            {
                "name": "status",
                "type": "int",
                "iskey": "",
                "notnull": "YES",
                "remark": "状态 0 正常 1 删除",
                "defaults": "0",
                "extra": null
            }
        ],
        "indexs": [
            {
                "name": "PRIMARY",
                "columnName": "id",
                "asc_or_desc": null,
                "non_unique": "0",
                "remark": ""
            }
        ]
    },
    {
        "name": "resources",
        "remark": "菜单资源",
        "engine": null,
        "columns": [
            {
                "name": "id",
                "type": "int",
                "iskey": "PRI",
                "notnull": "NO",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "nodeId",
                "type": "int",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "menuName",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "parantNodeID",
                "type": "int",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "icon",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "openIcon",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "actionPath",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "menuOrder",
                "type": "int",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "isValiDate",
                "type": "char",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "description",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "jsClassFile",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "type",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "namespace",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "mainClass",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            }
        ],
        "indexs": [
            {
                "name": "PRIMARY",
                "columnName": "id",
                "asc_or_desc": null,
                "non_unique": "0",
                "remark": ""
            }
        ]
    },
    {
        "name": "role",
        "remark": "角色表",
        "engine": null,
        "columns": [
            {
                "name": "id",
                "type": "int",
                "iskey": "PRI",
                "notnull": "NO",
                "remark": "自增id",
                "defaults": null,
                "extra": null
            },
            {
                "name": "roleName",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "describle",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "roleAuth",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "全国(all), 个人(person)",
                "defaults": "person",
                "extra": null
            }
        ],
        "indexs": [
            {
                "name": "PRIMARY",
                "columnName": "id",
                "asc_or_desc": null,
                "non_unique": "0",
                "remark": ""
            }
        ]
    },
    {
        "name": "roleresource",
        "remark": "",
        "engine": null,
        "columns": [
            {
                "name": "id",
                "type": "int",
                "iskey": "PRI",
                "notnull": "NO",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "roleId",
                "type": "int",
                "iskey": "MUL",
                "notnull": "NO",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "nodeId",
                "type": "int",
                "iskey": "MUL",
                "notnull": "NO",
                "remark": "",
                "defaults": null,
                "extra": null
            }
        ],
        "indexs": [
            {
                "name": "PRIMARY",
                "columnName": "id",
                "asc_or_desc": null,
                "non_unique": "0",
                "remark": ""
            },
            {
                "name": "index_crm_stat_roleresource_nodeId",
                "columnName": "nodeId",
                "asc_or_desc": null,
                "non_unique": "1",
                "remark": ""
            },
            {
                "name": "index_crm_stat_roleresource_roleId",
                "columnName": "roleId",
                "asc_or_desc": null,
                "non_unique": "1",
                "remark": ""
            }
        ]
    },
    {
        "name": "user",
        "remark": "",
        "engine": null,
        "columns": [
            {
                "name": "id",
                "type": "int",
                "iskey": "PRI",
                "notnull": "NO",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "userName",
                "type": "varchar",
                "iskey": "",
                "notnull": "NO",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "password",
                "type": "varchar",
                "iskey": "",
                "notnull": "NO",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "realName",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "email",
                "type": "varchar",
                "iskey": "",
                "notnull": "YES",
                "remark": "",
                "defaults": null,
                "extra": null
            }
        ],
        "indexs": [
            {
                "name": "PRIMARY",
                "columnName": "id",
                "asc_or_desc": null,
                "non_unique": "0",
                "remark": "id索引"
            }
        ]
    },
    {
        "name": "userrole",
        "remark": "用户角色表",
        "engine": null,
        "columns": [
            {
                "name": "id",
                "type": "int",
                "iskey": "PRI",
                "notnull": "NO",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "userId",
                "type": "int",
                "iskey": "MUL",
                "notnull": "NO",
                "remark": "",
                "defaults": null,
                "extra": null
            },
            {
                "name": "roleId",
                "type": "int",
                "iskey": "MUL",
                "notnull": "NO",
                "remark": "",
                "defaults": null,
                "extra": null
            }
        ],
        "indexs": [
            {
                "name": "PRIMARY",
                "columnName": "id",
                "asc_or_desc": null,
                "non_unique": "0",
                "remark": ""
            },
            {
                "name": "index_crm_stat_userrole_userId",
                "columnName": "userId",
                "asc_or_desc": null,
                "non_unique": "1",
                "remark": ""
            },
            {
                "name": "index_crm_stat_userrole_roleId",
                "columnName": "roleId",
                "asc_or_desc": null,
                "non_unique": "1",
                "remark": ""
            }
        ]
    }
]
}
$(function() {
	$(document).ready(function() {
		var icons = "fa-adn,fa-android,fa-apple,fa-behance,fa-behance-square,fa-bitbucket,fa-bitbucket-square,fa-bitcoin (alias),fa-btc,fa-codepen,fa-css3,fa-delicious,fa-deviantart,fa-digg,fa-dribbble,fa-dropbox,fa-drupal,fa-empire,fa-facebook,fa-facebook-square,fa-flickr,fa-foursquare,fa-ge (alias),fa-git,fa-git-square,fa-github,fa-github-alt,fa-github-square,fa-gittip,fa-google,fa-google-plus,fa-google-plus-square,fa-hacker-news,fa-html5,fa-instagram,fa-joomla,fa-jsfiddle,fa-linkedin,fa-linkedin-square,fa-linux,fa-maxcdn,fa-openid,fa-pagelines,fa-pied-piper,fa-pied-piper-alt,fa-pied-piper-square (alias),fa-pinterest,fa-pinterest-square,fa-qq,fa-ra (alias),fa-rebel,fa-reddit,fa-reddit-square,fa-renren,fa-share-alt,fa-share-alt-square,fa-skype,fa-slack,fa-soundcloud,fa-spotify,fa-stack-exchange,fa-stack-overflow,fa-steam,fa-steam-square,fa-stumbleupon,fa-stumbleupon-circle,fa-tencent-weibo,fa-trello,fa-tumblr,fa-tumblr-square,fa-twitter,fa-twitter-square,fa-vimeo-square,fa-vine,fa-vk,fa-wechat (alias),fa-weibo,fa-weixin,fa-windows,fa-wordpress,fa-xing,fa-xing-square,fa-yahoo,fa-youtube,fa-youtube-play,fa-youtube-square"
		var iconArr = icons.split(",");
		var names = new Array();
		var tables = db.tables;
		for (var i = 0; i < tables.length; i++) {
			names.push(tables[i].name)
			var icon = iconArr[Math.floor(Math.random() * iconArr.length + 1)- 1];
			//添加左侧快速访问栏
			$('.db-list').append('<li ><a href="#' + tables[i].name+ '" data-toggle="ping"><i class="fa ' + icon + '"></i>'+ tables[i].name + ' </a><span class="after"></span></li>')
			
			var columns = tables[i].columns;
			var indexs = tables[i].indexs;
			var str = new Array();
			for (var j = 0; j < columns.length; j++) {
				str.push('<tr><td>' + j.toString() + '</td>' + '<td>'
						+ columns[j].name + '</td>' + '<td>' + columns[j].type
						+ '</td>' + '<td>' + columns[j].iskey + '</td>'
						+ '<td>' + columns[j].notnull + '</td>' + '<td>'
						+ columns[j].defaults + '</td>' + '<td>'
						+ columns[j].remark + '</td>' + '</tr>')
			}
			var snn = str.join("").toString()
			var sr = '<div class="table-scrollable">'
					+ '<table class="table table-hover table-striped table-bordered">'
					+ '<thead>'
					+ '<tr><th class="font-red" style="width:50px;" >字段</th><th>列名</th><th>类型</th><th>主键</th><th>为空</th><th>默认值</th><th>备注</th></tr>'
					+ '</thead><tbody> ' + snn + '</tbody></table>' + '</div>';
			if(indexs!=null && indexs.length>0){
				var str = new Array();
				for (var j = 0; j < indexs.length; j++) {
					var non_unique = true;
					if(indexs[j].non_unique == 0){
						non_unique = false;
					}
					str.push('<tr><td>' + j.toString() + '</td>' + '<td>'
							+ indexs[j].name + '</td>' + '<td>' + indexs[j].columnName
							+ '</td>' + '<td>' + indexs[j].asc_or_desc + '</td>'
							+ '<td>' + non_unique + '</td>' + '<td>'
							+ indexs[j].remark + '</td>' + '</tr>')
				}
				var snn = str.join("").toString()
				sr += '<table class="table table-hover table-striped table-bordered">'
					+ '<thead>'
					+ '<tr><th class="font-red" style="width:50px;" >索引</th><th>索引名称</th><th>列名</th><th>asc_or_desc</th><th>non_unique</th><th>备注</th></tr>'
					+ '</thead><tbody> ' + snn + '</tbody></table>';
			}
					
			if (tables[i].remark == "") {
				tables[i].remark = tables[i].name
			}
			$('.db-panel').append('<div class="ping" style="height:55px;" id="'
							+ tables[i].name
							+ '" ></div><div class="portlet light bordered bg-inverse" ><div class="portlet-title"><div class="caption font-green-sharp">'
							+ '<i class="fa '
							+ icon
							+ ' font-green-sharp"></i>'
							+ '<span class="caption-subject bold">'
							+ tables[i].name
							+ '</span>'
							+ '<span class="caption-helper">【'
							+ tables[i].remark
							+ '】</span></div></div><div class="class="portlet-body"" >'
							+ sr + ' </div></div>')
		}
		$('body').scrollspy({target : '.sidebar'});
		$('.scroller').each(function() {
			if ($(this).attr("data-initialized")) {
				return; // exit
			}
			$(this).slimScroll({});
			$(this).attr("data-initialized", "1");
		});
		$('.db-search').typeahead({
			source : names,
			items : 18,
			autoSelect : true,
			width : 300,
			afterSelect : function() {
				var v = $('.db-search').val();
				window.location.href = 'db.html#' + v;
				$('.db-search').val("")
			}
		});
	});
})