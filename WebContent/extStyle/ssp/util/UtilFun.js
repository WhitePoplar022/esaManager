/**
 * 单元格点击链接
 * @param {} v
 * @return {}
 */
function renderClickCell(v) {
	if(!v) {
		return '';
	}
	return '<font class="eddy-grid-link" style="cursor: pointer;text-decoration: underline;color: #379337;font-weight: bold;">' + v + '</font>';
}
