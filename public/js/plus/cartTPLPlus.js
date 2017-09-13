/****************************
 *date:2017/08/14;
 *name:购物车页面--TPL模板;
 *author:lg;
 */

 $.extend({
 	cartTPL:function( _data ){
 		var _html ='';
 		for (var i = 0; i < _data.length; i++) {
 			// console.log( _data[i] );
 			_html += '<div class="border2px"></div>';
 			_html += '<div class="goodsItem">';


 			/*元素html的input单选按钮 20170816*/
 			// _html += '<input class="chkBtn" checked type="checkbox" data-goodsNum="'
 			// + _data[i].num +'" data-unit="'+ _data[i].unit +'"data-sum="'+ _data[i].total+'" />';


 			/*jQuery插件 input 20170816*/
 			_html +=  '<div class="checkboxSkin" checked data-goodsNum="'
 			 + _data[i].num +'" data-unit="'
 			 + _data[i].unit +'" data-sum="'
 			 + _data[i].total+'" data-isshow = "0"><img src="images/icon/selected.png" /></div>'

 			_html += '<label><img src="'+ _data[i].goodsimg +'" /></label>';
 			_html += '<span>'+ _data[i].name +'</span>';
 			_html += '<p class="p1">'+ _data[i].introduce +'</p>';
 			_html += '<p class="p2">￥'+ _data[i].unit +'</p>';	

 			_html += '<div class="goodsNumInput">';
 			_html += '<input class="a reduceGoodsBtn" type="button" value="-"/>';
 			_html += '<input class="b enterGoodsBtn" type="text" value="'+ _data[i].num +'"/>';
 			_html += '<input class="c addGoodsBtn" type="button" value="+"/>';
 			_html += '<span>有货</span>';
 			_html += '</div>';

 			_html += '<p class="p3">￥'+ _data[i].total +'</p>';
 			_html += '<p class="p4 delBtn">删除</p>';
 			_html += '</div>';
 		};
 		return _html;
 	}
 });
