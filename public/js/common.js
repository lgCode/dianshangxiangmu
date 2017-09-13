/****************************
 *date:2017/08/15;
 *name:电商项目的公共方法 ;
 *author:lg;
 *单个商品复选按钮，计算选中checked的商品的总数量和总价
 */
function goodsCheckFnJsonp( _url,_data ,callback ){
 	$.ajax({
		//接口的调用
		url: _url,
		type: 'get',
		data:'goods=' + _data,
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		success:function( data ){
			callback( data );
		},
		error:function( data ){
			if( !data ){
				console.log('错误！');
			}
		}
	});
 }


 /***************************
 *date:2017/07/25;
 *name:电商项目的ajax公共方法 ;
 *author:lg;
 */
 function getAjax( _url, callback ){
 	$.ajax({
		//接口的调用
		url: _url,
		type: 'get',
		dataType: 'jsonp',
		jsonp: 'callback',
		success:function( data ){
			callback( data );
		},
		error:function( data ){
			if( !data ){
				console.log('错误！');
			}
		}
	});
 }

 /***************************
 *date:2017/08/14;
 *name:电商项目的ajax公共方法 ;
 *author:lg;
 *info:计算某单项商品的合计总价：数量*单价
 */
function cartFnJsonp( _url,_data,callback){
	$.ajax({
		//接口的调用
		url: _url,
		type: 'get',
		data:'cart=' + _data,
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		success:function( data ){
			callback( data );
		},
		error:function( data ){
			if( !data ){
				console.log('错误！');
			}
		}
	});
}
/***************************
 *date:2017/08/10;
 *name:电商项目的方法,接收参数，返回不同产品信息 ;
 *author:lg;
 */
function getParam( _url, _id, callback){
	$.ajax({
		//接口的调用
		url: _url,
		type: 'get',
		data:'cc=' + _id,
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		success:function( data ){
			callback( data );
		},
		error:function( data ){
			if( !data ){
				console.log('错误！');
			}
		}
	});
}

/****************************
 *date:2017/07/25;
 *name:获取页面dom节点 ;
 *param: id: 你要查找的dom的id
 */
 // function gId (id) {
 // 	return document.getElementById(id);
 // }

 /****************************
 *date:2017/07/26;
 *name:获取页面dom的子节点 ,过度优化;
 *param: _ths , n: 对象和下标
 */
 // function gEq( _ths , n ){
 // 	return _ths.children().eq(n);
 // }

/****************************
 *date:2017/07/27;
 *name:首页轮播广告的动画方法;
 *param: 
 */
 function slideAnimate(ele,i,n){
 	ele.stop().animate({
 		left: -(i * n)
 	},200);
 }

/****************************
 *date:2017/08/10;
 *name:获得产品pid的公共方法,只能获取一个参数;
 *author：lg
 *param: n ，当前要查找的url当中的属性名
 */
function getPid( n ){
	var _href 	= window.location.href;
	var _v 		= _href.indexOf( n );
	// console.log( _v );
	var _str  	= _href.substring( _v + n.length +1  );
	// console.log( _str );
	return _str;
}
// getPid( 'pidVal' );


/****************************
 *date:2017/08/10;
 *name:获得url当中多个参数的公共方法;
 *author：lg
 *param: n ，当前要查找的dom节点的id
 *http://127.0.0.1:7777/goodsDetail.html?pidVal=23548672&aa=1&bb=2&cc=3
 */
 function getHrefParam(){
 	var _href = window.location.href;
 	var _s = _href.indexOf('?');
 	var _u = _href.substring( _s + 1 );
 	var _arr = _u.split('&');
 	var _param =[];
 	// console.log(_arr);

 	for (var i = 0; i < _arr.length; i++) {
 		var _p = _arr[i].indexOf( '=' );
 		var _v = _arr[i].substring( _p +1 );
 		_param.push( _v );
 	};
 	// console.log( _param );
 }
getHrefParam();


