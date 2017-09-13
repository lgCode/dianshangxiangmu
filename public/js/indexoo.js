/****************************
 *date:2017/08/07;	
 *name:首页的header搜索框           	重构;
 *author:lg;
 */
 function SearchFn(obj){
 	this.init(obj);
 	//传过来一个JQ对象
 	// this._searchId = obj ;
 }
SearchFn.prototype = {
 	init:function(obj){//初始化
 		var _this = this;
 		_this.focusFn(obj);
 		_this.blurFn(obj);
 	},
 	focusFn:function(obj){
 		obj.on('focus',function(){
 			$(this).val('');
 		})
 	},
 	blurFn:function(obj){
 		obj.on('blur',function(){
 			$(this).val('抢十亿神券');
 		})
 	}
 	
 }

/****************************
 *date:2017/08/07;
 *name:首页左侧产品导航移入移出效果  	重构 ajax获取;
 *author:lg;
 */
 function SubNavFn( obj ){	
 	this.subNavProductId 	= obj;//获取Ul
 	this.init();
 }
 SubNavFn.prototype = {
 	init:function(){
 		var _this 	= this;
 		_this.getJson( _this.subNavProductId );
 	},
 	getJson:function( _UlId ){
 		var _this = this;
 		// console.log( _UlId );
 		getAjax(APILIST.subNavApi,function( data ){
 			// console.log( data );
 			// console.log( data.productList );
 			var _productList 	= data.productList,
 			_len 			= _productList.length;
 			//for start
 			for (var i = 0; i < _len; i++) {
 				// console.log( _productList[i].type );
 				$('<li/>',{}).html(function(){
 					var _this = this;

 					$('<a/>',{}).html(_productList[i].type)
 					.appendTo( _this );

 					$('<div/>',{'class':'showNavPopup'}).html(function(){
 						// console.log( _productList[i].products );
 						var _products = _productList[i].products;

 						for (var j = 0; j < _products.length; j++) {
 							// console.log( _products[j].name );
 							$('<p/>',{}).html( _products[j].name )
 							.appendTo( $(this) );
 						};

 					})
 					.appendTo( _this );

 				}).appendTo( _UlId );
 			}//for end
 			// console.log( _UlId.children() );
 			_this.mouseoverFn( _UlId.children() );	
 			_this.mouseoutFn( _UlId.children() );
 		});
 		
 	},
 	mouseoverFn:function( _lis ){
 		var _this = this;
 		_lis.on('mouseover',function(){
 			_this.gEq( $(this) ).toggle();
 		});
 	},
 	mouseoutFn:function( _lis ){
 		var _this = this;
 		_lis.on('mouseout',function(){
 			_this.gEq( $(this) ).toggle();
 		});
 	},
 	gEq:function( _ths ){
 		//获取子菜单的第一个
 		var _this = this;
 		return _ths.children().eq(1);
 	}
 }

/****************************
 *date:2017/08/01;
 *name:首页轮播图            			重构;
 *author:lg;
 */
 function SlideWrapFn( _slideIdConfig ){
 	for(var i in _slideIdConfig){
		this[i] = _slideIdConfig[i];//对象直接量
	}
	this.tempI 		= 0;//计数器
	this.liLength 	= 0;
	this.liWidth 	= 0;
	this.timer		= null;
	this.init();
	}
SlideWrapFn.prototype = {
	init:function(){
		var _this = this;
		var _ulId = _this.imageDivId;

		//调用生成ul方法，传入父容器id
		_this.ulDom( _ulId );
		
		_this.eventInterval();
		_this.leftBtn();
		_this.rightBtn();
		_this.pointerBtn();
	},
	ulDom:function( _ulId ){
 		//生成ul中的li和图片
 		var _this = this;
 		var _chi  = ' ';
 		_this.createDom( _ulId );//生成li

 		_chi 			= _ulId.children();//得到li
 		_this.liLength 	= _chi.length;//li的数量
 		_this.liWidth 	= _chi.eq(0).width();

 		_ulId.width(_this.liLength * _this.liWidth);//ul的宽度

 		//调用生成小圆点的方法
 		_this.createPointer( _this.liLength );
 		
 		//调用设置小圆点父容器的方法
 		_this.pointerWrapWidth( _this.liLength );
 		
 		//调用设置透明背景的方法
 		_this.opacityPointerBg( _this.liLength );		
 	},
 	createDom:function( _dom ){
 		//生成DOM的公共方法
 		var _this 	= this;
 		var _urls 	= _this.getDate();

 		for (var i 	= 0; i <_urls.length; i++) {
 			$('<li/>')
 			.html('<img src='+ _urls[i] +' />')
 			.appendTo( _dom );
 		}
 	},
 	getDate:function(){
 		//这是用来获取数据的对象内公共方法
 		var _this = this;
 		var _urls = slideImgUrl.urls;
 		return _urls;
 	},	
 	createPointer:function(_liNum){
 		//生成白色小圆点
 		var _this  = this;
 		for (var i = 0; i < _liNum; i++) {
 			$('<p></p>',{}).appendTo(_this.iconListId);
 		};
 		var _icons = _this.iconListId.find('p');
 		_icons.eq(0).addClass('redP');//给第一个变红
 	},
 	pointerWrapWidth:function(_liNum){
 		//设置小圆点的父容器的宽度和位置
 		var _this  = this;
 		var _iconWrapWidth = _liNum * 28;
 		_this.iconListId.width( _iconWrapWidth );
 		_this.iconListId.css('margin-left',-( _iconWrapWidth/2 + 10 ));
 	},
 	opacityPointerBg:function( _liNum ){
 		//设置白色小圆点的半透明背景
 		var _this 		 = this;
 		var _iconBgWidth = _liNum * 28;
 		_this.sildePointBgId.width( _iconBgWidth );
 		_this.sildePointBgId.css('margin-left',-( _iconBgWidth/2 + 10 ));
 	},
 	leftBtn:function(){
 		var _this = this;
 		var _ulId = _this.imageDivId;

 		_this.toLeftBtnId.on('click',function(){
 			if(_this.tempI < (_this.liLength - 1) ){//3
 				_this.tempI ++;
 			}else{
 				_this.tempI = 0;	
 			}
 			//调用动画公共方法
 			slideAnimate(_ulId, _this.tempI, _this.liWidth);

 			//调用设置小圆点的方法
 			_this.iconSty();
 			_this.eventInterval();//自动移动
 		});
 	},
 	rightBtn:function(){
 		var _this = this;
 		var _ulId = _this.imageDivId;
 		
 		_this.toRightBtnId.on('click',function(){
 			if(_this.tempI > 0 ){
 				_this.tempI --;
 			}else{
 				_this.tempI = _this.liLength - 1;//3
 			}
 			//调用动画公共方法
 			slideAnimate(_ulId,_this.tempI,_this.liWidth);

 			//调用设置小圆点样式的方法
 			_this.iconSty();
 			_this.eventInterval();//自动移动
 		});
 	},
 	pointerBtn:function(){
 		//给小圆点添加事件
 		var _this 	= this;
 		var _ulId 	= _this.imageDivId;
 		var _icons 	= _this.iconListId.find('p');

 		_icons.on('click',function(){
 			_this.tempI  = $(this).index();
 			//调用动画公共方法
 			slideAnimate(_ulId,_this.tempI,_this.liWidth);

 			//调用设置小圆点样式的方法
 			_this.iconSty();
 			_this.eventInterval();//自动移动
 		});
 	},
 	iconSty:function(){
 		//设置小圆点样式,变红
 		var _this 	= this;
 		var _icons 	= _this.iconListId.find('p');
 		_icons.eq( _this.tempI )
 		.addClass('redP')
 		.siblings()
 		.removeClass('redP');
 	},
 	eventInterval:function(){
 		var _this = this;
 		clearInterval( _this.timer );
 		_this.timer = setInterval(function(){
 			if(_this.tempI < (_this.liLength - 1) ){//3
 				_this.tempI ++;
 			}else{
 				_this.tempI = 0;	
 			}
 			//调用动画公共方法
 			slideAnimate(_this.imageDivId, _this.tempI, _this.liWidth);

 			//调用设置小圆点的方法
 			_this.iconSty();
 		},1000);
 	}
 }

/****************************
 *date:2017/08/07;
 *name:首页享品质   ajax获取;
 *author:lg;
 */
 function ProductBlock( obj ){
 	this.productId = obj;
 	this.init();
 }
 ProductBlock.prototype = {
 	init:function(){
 		var _this = this;
 		_this.getJson();
 	},
 	getJson:function(){
 		var _this = this;
 		getAjax(APILIST.productBlock,function( data ){
 			_this.creatDom( data.pb );
 		});
 	},
 	creatDom:function( pb ){
 		var _this = this;
 		var _pb 	= pb,
 		_len 	= _pb.length;
 			//console.log( _pb );
			//for start
			for (var i = 0; i < _len; i++) {
				// console.log( _pb[i] );
				$('<a/>',{
					'class':'productItem'
					})
					.html(function(){
						var _that = this;
						$('<dl/>',{
							'class':'bg_' + (i+1)
							})
							.html(function(){
								var _that = this;
									// console.log( _pb[i].name );
									// console.log( _pb[i].describe );
									$('<dt/>',{})
									.html( _pb[i].name )
									.appendTo( _that );
									$('<dd/>',{})
									.html( _pb[i].describe )
									.appendTo( _that );
							})
							.appendTo( _that );
						// console.log( _pb[i].productImg );
						$('<img/>',{})
							.attr('src',_pb[i].productImg)
							.appendTo( _that );
					})
					.attr({
						'data-pid'	 : _pb[i].pid,
						'data-price' : _pb[i].price,
						'target'	 : '_blank',
						'href'		 : TEMPURL.hrefs + '?pidVal=' +_pb[i].pid
					})
					.appendTo( _this.productId );
			}
			//for end
	}
}

