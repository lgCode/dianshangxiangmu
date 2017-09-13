/****************************
 *date:2017/07/25;
 *name:首页的header搜索框;
 *author:lg;
 */
 function searchFn(){
 	var _searchId = $('#searchId');
 	function searchOn(ele,event,value){
 		ele.on(event,function(){
 			ele.val(value);
 		})
 	}
 	searchOn(_searchId,'focus','');
 	searchOn(_searchId,'blur','抢十亿神券');
	// 获得焦点、失去焦点	
	// $('#searchId').on('focus',function(){
	// 	$(this).val(" ");
	// }).on('blur',function(){
	// 	$(this).val("抢十亿神券");
	// })
}

/****************************
 *date:2017/07/26;
 *name:首页左侧产品导航移入移出效果;
 *author:lg;

 */
 function subNavFn(){		
 	var _subNavProduct = $('#subNavProduct');
 	var _lis = _subNavProduct.children();

 	
 	_lis.on('mouseover',function(){
 		var _popUp = $(this).children().eq(1)
 		_popUp.toggle();

 	}).on('mouseout',function(){
 		var _popUp = $(this).children().eq(1)
 		_popUp.toggle();
 	})

}


/****************************
 *date:2017/07/26;
 *name:首页轮播图;
 *author:lg;
 */
 function slideWrapFn(){
 	//ul容器,生成轮播图列表
 	var _imageDivId = $('#imageDivId');

 	//获取img图片，并添加进页面
 	var urls = sliderImgUrl.urls;
 	// console.log(sliderImgUrl.urls.length);//4
 	for (var i = 0; i <urls.length; i++) {
 		$('<\li>')
 		.html('<img src='+ urls[i] +' />')
 		.appendTo(_imageDivId);
 	};


 	//=============================
 	//这是小圆点的父容器
 	var _iconListId = $('#iconListId');

 	//一共多少个li
 	var _liLength = _imageDivId.children();

 	//这是li的宽度
 	var _liWidth = _liLength.eq(0).width();

 	//用来计数
 	var _tempI = 0;
 	var time = 500;

 	//ul容器的宽度
 	_imageDivId.width(_liLength.length*_liWidth);

 // ================================================
	 //动态加小圆点
	 for (var i = 0; i < _liLength.length; i++) {
	 	$('<p></p>').appendTo(_iconListId);
	 };

 	//这是小圆点的添加事件
 	var _icon = _iconListId.find('p');
 	_icon.eq(0).addClass('redP');

 	//动态计算小圆点容器的背景宽度,位置
 	var _slidePointWidth = _liLength.length*28;

 	$('.slidePoint').width(_slidePointWidth);
 	$('.slidePoint').css('margin-left',-(_slidePointWidth/2 + 10));

//=================================================
	//小白点点击
	_icon.on('click',function(){
	 		_tempI = $(this).index();//当前点击的下标
	 		$($(this).siblings()).removeClass('redP');
	 		$(this).addClass('redP');
	 		
	 		// _imageDivId.stop().animate({
	 		// 	left:-_liWidth*_tempI
	 		// },time);
	slideAnimate(_imageDivId,_tempI,_liWidth,time);
	})


 	//左按钮
 	$('#toLeftBtnId').on('click',function(){
		if(_tempI < (_liLength.length-1) ){//-3
			_tempI++;
		}else{
			_tempI = 0;	
		}
		// _imageDivId.stop().animate({
		// 	left:-_liWidth*_tempI
		// },time);
	 	slideAnimate(_imageDivId,_tempI,_liWidth,time);
	 	_icon.eq(_tempI).siblings().removeClass('redP');
	 	_icon.eq(_tempI).addClass('redP');
 	});

 	//右按钮
 	$('#toRightBtnId').on('click',function(){
 		//当tempI>0意味着没有显示第一张图片
 		if(_tempI > 0 ){
 			_tempI--;
 		}else{
 			//当temp不大于0时，就意味着此时显示
 			//的是第一张图片，但因为你点击了右
 			//按钮，所以直接显示最后一张图片
 			_tempI = _liLength.length -1;//3
 		}
 		// _ulLeft = -_liWidth*_tempI;
 		// _imageDivId.stop().animate({
 		// 	left:_ulLeft
 		// },500);
	 	slideAnimate(_imageDivId,_tempI,_liWidth,time);
	 	_icon.eq(_tempI).siblings().removeClass('redP');
	 	_icon.eq(_tempI).addClass('redP');
	 });
 	
 	


 }
