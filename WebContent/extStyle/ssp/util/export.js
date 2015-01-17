function doExport(column, url, otherInfo) {
	var strColoumnNames = "";
	var strColoumnIndexs = "";
	
	for(var i = 0; i < column.length; i++) {
		if(column[i].text == '' || column[i].text == '操作' || column[i].dataIndex == '')
			continue;
			
		strColoumnIndexs += column[i].dataIndex + ',';
		strColoumnNames += column[i].text + ',';
	}
	console.log(strColoumnIndexs);
	console.log(strColoumnNames);
	var paramStr = '?exp_name=data.xls&exp_column_names=' + encodeURI(encodeURI(strColoumnNames)) 
		+ '&exp_column_indexs=' + strColoumnIndexs
		+ '&' + otherInfo;
	var exportUrl = url + paramStr;
	
//	var isIE10 = Ext.checkBrowser(/msie 10/);
//	var isIE11 = Ext.checkBrowser(/rv:11/);
		
	//IE中最长长度为2048字符，包含http://crm.youku.com
	if((exportUrl.length + 22) > 2048) {//IE下地址长度大于2048，不能直接get方式下载
		Ext.Ajax.request({
			method: 'post',
			url:'../util/IeExportAction/ieExportParam.action',
			params: {
				exp_name: 'data.xls',
				exp_column_names: strColoumnNames,
				exp_column_indexs: strColoumnIndexs
			},
			success:function(resp){
				var obj=Ext.util.JSON.decode(resp.responseText);
				
				if(Ext.isIE6 || Ext.isIE7 || Ext.isIE8) {
					window.location.href = url + '?' + otherInfo + '&extParamFrom=session';
				}
				else {
					window.open(url + '?' + otherInfo + '&extParamFrom=session');
				}
			}
		});
	}
	else {//可以直接下载
		if(Ext.isIE6 || Ext.isIE7 || Ext.isIE8) {
			window.location.href = exportUrl;
		}
		else {
			window.open(exportUrl);
		}
	}
}
