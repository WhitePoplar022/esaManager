Ext.define('ssp.widget.ActionTextColumn', {
    extend: 'Ext.grid.column.Action',
    constructor: function(config) {
        var me = this,
            cfg = Ext.apply({}, config),
            items = cfg.items || [me],
            l = items.length,
            i,
            item;
        delete cfg.items;
        me.callParent([cfg]);
        me.items = items;
        me.innerCls= Ext.baseCSSPrefix + 'grid-cell-inner-action',
        me.renderer = function(v, meta) {
        	
        	
            v = Ext.isFunction(cfg.renderer) ? cfg.renderer.apply(this, arguments)||'' : '';
            meta.tdCls += ' ' + Ext.baseCSSPrefix + 'action-col-cell';
            for (i = 0; i < l; i++) {
                item = items[i];
                
                var style = "color:blue;cursor:point;"
                	
                item.disable = Ext.Function.bind(me.disableAction, me, [i]);
                item.enable = Ext.Function.bind(me.enableAction, me, [i]);
                var attribute = item.attribute;//对哪个属性值进行判断
                
                var dd = eval(meta.record.data);
                var status = dd[attribute];//当前状态
                
                var showStatus = item.showstatus;
                if(status != null && showStatus.indexOf(status) >= 0){
                	 v += '<a style='+style+' href="javascript:void(0);"' + 
                     ' class="' + Ext.baseCSSPrefix + 'action-col-icon ' + Ext.baseCSSPrefix + 'action-col-' + String(i) + ' ' + (item.disabled ? Ext.baseCSSPrefix + 'item-disabled' : ' ') + (item.iconCls || '') +
                     ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope||me.scope||me, arguments) : (me.iconCls || '')) + '"' +
                     ((item.tooltip) ? ' data-qtip="' + item.tooltip + '"' : '') + '>' + (item.text || me.text) + '</a>&nbsp;|&nbsp;';
                }
                else if( showStatus.indexOf('!=null') >= 0 && status != null){
	               	 v += '<a style='+style+' href="javascript:void(0);"' + 
	                 ' class="' + Ext.baseCSSPrefix + 'action-col-icon ' + Ext.baseCSSPrefix + 'action-col-' + String(i) + ' ' + (item.disabled ? Ext.baseCSSPrefix + 'item-disabled' : ' ') + (item.iconCls || '') +
	                 ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope||me.scope||me, arguments) : (me.iconCls || '')) + '"' +
	                 ((item.tooltip) ? ' data-qtip="' + item.tooltip + '"' : '') + '>' + (item.text || me.text) + '</a>&nbsp;|&nbsp;';
                }else{
                	style = "color:grey;cursor:point;";
                	 v += '<a style='+style+
                     ' class="' + Ext.baseCSSPrefix + 'action-col-icon ' + Ext.baseCSSPrefix + 'action-col-' + String(i) + ' ' + (item.disabled ? Ext.baseCSSPrefix + 'item-disabled' : ' ') + (item.iconCls || '') +
                     ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope||me.scope||me, arguments) : (me.iconCls || '')) + '"' +
                     ((item.tooltip) ? ' data-qtip="' + item.tooltip + '"' : '') + '>' + (item.text || me.text) + '</a>&nbsp;|&nbsp;';
                }
               
            }
            return v;
        };
    }
});