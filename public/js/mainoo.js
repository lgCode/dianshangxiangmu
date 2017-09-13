/****************************
 *date:2017/07/31;
 *name:电商项目入口      重构;
 *author:lg;
 */
 $(function(){
	 //首页header头的搜索框
	 
	 new SearchFn( $('#searchId') );

	  //首页左侧产品导航
	  new SubNavFn( $('#subNavProduct') );

	  //首页轮播图
	  var _slideIdConfig = {
		 	imageDivId 		: $('#imageDivId'),//ul列表ID
			iconListId 		: $('#iconListId'),//小圆点ID
			sildePointBgId 	: $('#sildePointBgId'),//小圆点父容器背景id
			toLeftBtnId 	: $('#toLeftBtnId'),//左按钮
			toRightBtnId 	: $('#toRightBtnId')//右按钮
		}
	 new SlideWrapFn( _slideIdConfig );

	 //首页的'享品质'
	 new ProductBlock( $('#productId') );
});
