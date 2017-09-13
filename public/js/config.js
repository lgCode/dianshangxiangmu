/****************************
 *date:2017/07/28;
 *name:整个网站的公共资源;
 *author:lg;
 */


 //首页轮播图的图片
 var slideImgUrl = {
 	urls:[
 		'images/temp/temp1.jpg',
 		'images/temp/temp2.jpg',
 		'images/temp/temp3.jpg',
 		'images/temp/temp12.jpg'
 	]
 	
 }

/****************************
 *date:2017/08/04;
 *name:整个网站的配置与接口的统一管理;
 *author:lg;
 */
 var SITEURL = 'http://www.webfeel.org';
 var APILIST = {
 	oneapi			: SITEURL + '/zuoye/php/oneapi.php',
 	subNavApi		: SITEURL + '/zuoye/php/subNavApi.php',
 	productBlock	: SITEURL + '/zuoye/php/productBlock.php',
 	smallImgData	: SITEURL + '/zuoye/php/smallImgData.php',
 	param 			: SITEURL + '/zuoye/php/param.php',

 	//省市区,三级菜单切换，产品详情页
 	province 		: SITEURL + '/zuoye/php/province.php',
	city 			: SITEURL + '/zuoye/php/city.php',
	area 			: SITEURL + '/zuoye/php/area.php',

	//购物车，获取购物车中的商品列表
	cartUlLi		: SITEURL + '/zuoye/php/cartUlLi.php',

	//计算某单项商品的合计总价：数量*单价
	cart 			: SITEURL + '/zuoye/php/cart.php',

	//单个商品复选按钮，计算选中checked的商品的总数量和总价
	goodsCheck		: SITEURL + '/zuoye/php/goodsCheck.php'
 }

/****************************
 *date:2017/08/09;
 *name:整站的开发路径;
 *author:lg;
 */
var TEMPURL = {
	hrefs:'http://127.0.0.1:7777/goodsDetail.html'
}


