/****************************
 *date:2017/08/07;
 *name:产品详情页;
 *author:lg;
 */

 function GoodsDetailImg ( _goodsIdConfig ) {
 	for(var i in _goodsIdConfig){
 		this[i] = _goodsIdConfig[i];
 	}
 	this.temp		= 0;
 	this.lis 		= '';
 	this.init();
 }
 GoodsDetailImg.prototype = {
 	init:function(){
 		var _this = this;
 		_this.getJson();
 	},
 	getJson:function(){
 		var _this = this;
 		getAjax(APILIST.smallImgData,function( data ){
 			// console.log( data );
 			//加载完成后，默认打开第一张图
 			_this.defaultBigImg( data.smallImg[0].imgurl );
 			_this.createDom( data.smallImg );
 			
 			_this.eventLeftFn();
 			_this.eventRightFn();
 			_this.eventMouse();	

 			//大图显示局部
 			// _this.bigImgMove();
 		});
 	},
 	createDom:function( _imgs ){
 		var _this = this;
 		// console.log( _this.smallImgId );
 		for (var i = 0; i < _imgs.length; i++) {
 			$('<li/>',{})
 			.attr('data-bigImg', _imgs[i].bigImg)
 			.html(function(){
 				$('<img/>')
 				.attr('src', _imgs[i].imgurl)
 				.appendTo( $(this) );
 			})
 			.on('click',function(){
 				var _bigImg = $(this).attr('data-bigImg');
 				_this.eventBigImg( _bigImg );
 				_this.bigImgMove( _bigImg );
 			})
 			.appendTo( _this.smallImgId );
 		}
 		$('li').clone(true).appendTo( _this.smallImgId )
 		_this.smallImgId.width( _imgs.length * 2 * 75 );
 		_this.lis = _this.smallImgId.children();
 	},
 	eventBigImg:function( _imgSrc ){
 		//点击li切换大图
 		var _this = this;
 		_this.bigImgId.attr('src', _imgSrc);
 		// _this.bgImgWrapId.attr('src', _imgSrc);
 	},
 	defaultBigImg:function( _imgSrc ){
 		//页面打开的时候，默认显示第一张小图的大图
 		var _this  = this;
 		_this.bigImgId.attr('src', _imgSrc);

 		//页面打开的时候，自动加载第一个li图片的局部显示用的大图
 		_this.bigImgMove( _imgSrc );
 	},
 	eventLeftFn:function(){
 		var _this  	= this,
 		_left 	= _this.toLeft,
 		_lis 	= _this.lis,
 		_bigImg = '';
 		// console.log( _lis.length);
 		_left.on('click',function(){
 			if( _this.temp > 0){
 				_this.temp --;
 			}else{
 				_this.temp = _lis.length - 1;
 			}
 			console.log(_this.temp);
 			_this.smallImgId.css('left',-(_this.temp * 75));
 			_bigImg =  $(_lis[_this.temp]).attr('data-bigImg');
 			_this.eventBigImg( _bigImg );
 		});
 	},
 	eventRightFn:function(){
 		var _this  	= this,
 		_right 	= _this.toRight,
 		_lis 	= _this.lis,
 		_bigImg = '';
 		_right.on('click',function(){
 			if( _this.temp < _lis.length - 3 ){
 				_this.temp ++;
 			}else{
 				_this.temp = 0;
 			}
 			console.log(_this.temp);
 			_this.smallImgId.css('left',-(_this.temp * 73)); 
 			_bigImg =  $(_lis[_this.temp]).attr('data-bigImg');
 			_this.eventBigImg( _bigImg );

 		});
 	},
 	eventMouse:function(){
 		var _this = this;
 		_this.goodsBigImg.on({
 			mouseover:function(){
 				_this.bigImgMask.show();
 				_this.eventMouseMove();
 				_this.bgImgWrapId.show();
 			},
 			mouseout:function(){
 				_this.bigImgMask.hide();
 				_this.bgImgWrapId.hide();
 			}
 		});
 	},
 	eventMouseMove:function(){
 		var _this = this;
 		_this.goodsBigImg.on('mousemove',function(e){
 			// console.log(e.pageX + "," + e.pageY);
 			var _eL = e.pageX;
 			var _eT = e.pageY;
 			var _goodsBigImgXY = _this.goodsBigImg.offset();//大图区域离浏览器左上角的距离
 			
 			//把透明遮罩的一半宽度,因为小黄框是正方形
 			var _goodsBigImgXY_w = _this.bigImgMask.width() / 2;
 			
 			_eL = _eL - _goodsBigImgXY.left - _goodsBigImgXY_w;	//小黄框的left
 			_eT = _eT - _goodsBigImgXY.top - _goodsBigImgXY_w;  //小黄框的top

 			//小黄框可移动的最大范围,正方形，left/top一样
 			var _scopeL = _this.goodsBigImg.width() - _this.bigImgMask.width();
 			var _scopeT = _this.goodsBigImg.height() - _this.bigImgMask.width();
 			
 			// console.log( _eL );
 			if ( _eL <= 0 ) {//左右
 				_eL = 0;
 			}else if( _eL >= _scopeL ){
 				_eL = _scopeL;
 			}
 			//console.log(_eT)
 			if( _eT <= 0 ){//上下
 				_eT = 0;
 			}else if( _eT >= _scopeT ){
 				_eT = _scopeT;
 			}

 			//半透明遮罩
 			_this.bigImgMask.css({
 				'left':_eL,
 				'top' :_eT
 			});

 			//局部显示大图，按比例移动
 			var _bigImgLocalMove = _this.bgImgWrapId.children('img');
 			_bigImgLocalMove.css({
 				'left':-(_eL * 2.475),
 				'top' :-(_eT * 2.475)
 			});
 		});
	},
	bigImgMove:function( _img ){
		var _this = this;
		_this.bgImgWrapId.children('img').attr('src', _img );
	}

}


var _goodsIdConfig = {
	goodsBigImg : $('#goodsBigImg'),
	bigImgMask  : $('#bigImgMask'),
	bigImgId 	: $('#bigImgId'),
	bgImgWrapId	: $('#bgImgWrapId'),	
	smallImgId 	: $('#smallImgId'),
	toLeft 		: $('#toLeft'),
	toRight		: $('#toRight')
}


new GoodsDetailImg( _goodsIdConfig );

//=================================

/****************************
 *date:2017/08/10;
 *name:产品信息页,根据不同商品的pid,获得不同商品的信息;
 *author:lg;
 */

function GoodsDetailInfo( n ){
 	for(var i in n){
 		this[i] = n[i];
 	}
 	this.init();
 }
 GoodsDetailInfo.prototype ={
 	init:function(){
 		var _this = this;
 		_this.getData();
 	},
 	getData:function(){
 		var _this = this;
 		var _pid = getPid('pidVal');
 		// console.log( _pid );
 		getParam( APILIST.param, _pid, function(data){
 			// console.log(data.productInfo);
 			var _productInfo = data.productInfo;
 			_this.createDom( _productInfo );
 		});
 	},
 	createDom:function( _data ){
 		var _this = this;
 		var _dataArr;
 		_dataArr = _this.resolveJson( _data );
 		// console.log( _dataArr );
 		/*方法一
 		for (var i = 0; i < _dataArr.length; i++) {
 			$('<p/>',{})
 			.html( _dataArr[i] )
 			.appendTo( _this.goodsInfoId );
 		};
 		*/
 		/*方法二*/
 		for (var i = 0; i < _dataArr.length; i++) {
 			if(i == 0){
 				$('<h1/>',{})
 				.html( _dataArr[i] )
 				.appendTo( _this.goodsInfoId );
 			}else if(i == 3){
 				$('<p/>',{})
 				.html( _dataArr[i] )
 				.css('display','none')
 				.appendTo( _this.goodsInfoId );
 			}else{
 				$('<p/>',{})
 				.html( _dataArr[i] )
 				.appendTo( _this.goodsInfoId );
 			}
 		};
 		// $('<p/>',{})
 		// .html( _data[1].pInfo )
 		// .appendTo( _this.goodsInfoId );

 		// $('<p/>',{})
 		// .html( _data[2].info )
 		// .appendTo( _this.goodsInfoId );
 		// $('<p/>',{})

 		// .html( _data[3].pid )
 		// .appendTo( _this.goodsInfoId );
 	},
 	resolveJson:function( _data ){
 		//解析json数据，定位此对象内的公共方法
 		var _this 	= this;
 		var _temArr = [];
 		for (var i = 0; i < _data.length; i++) {
 			//_data的object
 			// console.log( _data[i] );
 			for(var j in _data[i]){
 				//单个object的值
 				// console.log( _data[i][j] );
 				_temArr.push( _data[i][j] );
 			};
 		};
 		return _temArr;
 	}
 }


 var goodsDetailInfoConfig = {
 	goodsInfoId : $('#goodsInfoId')
 }

 new GoodsDetailInfo( goodsDetailInfoConfig );


/****************************
 *date:2017/08/14;
 *name:产品信息页,加入购物车;
 *author:lg;
 */
function GotoShopFn( _toShopingCarConfig ){
	for(var i in _toShopingCarConfig){
		this[i] = _toShopingCarConfig[i];
	}
	this.init();
}
GotoShopFn.prototype = {
	init:function(){
		var _this = this;

		_this.eventBtnB();
		_this.eventBtnC();
	},
	//加号
	eventBtnB:function(){
		var _this = this;
		_this.input_btnB.on('click',function(){
			_this.inputVal ++;
			_this.input_btnA.val( _this.inputVal );
		});
	},
	//减号
	eventBtnC:function(){
		var _this = this;
		_this.input_btnC.on('click',function(){
			if ( _this.inputVal > 1) {
				_this.inputVal --;
				_this.input_btnA.val( _this.inputVal );
			};
		});
	}
}

var _toShopingCarConfig = {
	input_btnA	: $('#input_btnA'),
	input_btnB	: $('#input_btnB'),
	input_btnC	: $('#input_btnC'),
	inputVal	: 1
}

new GotoShopFn( _toShopingCarConfig );