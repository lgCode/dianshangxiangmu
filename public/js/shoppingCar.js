/****************************
 *date:2017/08/14;
 *name:购物车页面;
 *author:lg;
 */
 function ShopCarFn( config ){
 	for(var i in config){
 		this[i] = config[i];
 	}
 	this.init();
 }
 ShopCarFn.prototype = {
 	init:function(){
 		var _this = this;
 		_this.getJson();
 	},
 	getJson:function(){
 		var _this = this;
 		getAjax( APILIST.cartUlLi, function( data ){
			// console.log( data );
			_this.cartTPLFn( data );
			if (data.error.code == 0) {
				_this.cartTPLFn( data.cartList );

				_this.eventCheckBoxGoods();	//每个商品的checkbox事件
				_this.isCheckGoodsInfo();//返回统计被选中的商品数量

				_this.goodsTotal.html( data.total.num );//全部商品
				_this.selectGoodsNumId.html( data.total.num );//已选择商品
				_this.goodsTotalMoneyId.html( data.total.totalMoney );//已选择总价
				
				_this.addGoodsEvent();//增加商品数量事件
				_this.enterGoodsNum();//商品数量的输入
				_this.reduceGoodsEvent();//减少商品数量事件

				_this.eventCheckAllBtn();//全选按钮
				_this.eventDelGoodsBtn();//删除按钮
				_this.eventDelAllChecked();//删除选中的
			}else{
				//打印错误信息
				console.log( data.error.msg );
			}
		});
 	},
 	cartTPLFn:function( _cartList ){
 		var _this  = this;
		//调用购物车模板
		var _html = $.cartTPL( _cartList )
		_this.cartWrap.html( _html );
		_this.skinPlusConfig();
	},
	skinPlusConfig:function(){
		var _this 			= this;
		var _checkboxPlus 	= _this.cartWrap.find('div.checkboxSkin');
		// console.log( _checkboxPlus )
		_checkboxPlus
		.checkPlus().setStyle({
			'float'		:'left',
			'margin'	:'30px 20px 30px 20px',
			'cursor'	:'pointer'
		});
	},
	//每个商品的checkbox事件
	eventCheckBoxGoods:function(){
		var _this 	= this;
		var _checkboxPlus = _this.cartWrap.find('div.checkboxSkin');
		
		_checkboxPlus.on('click',function(){
			$(this).checkPlus().eventFn();
			_this.goodsFooterInfo();
			_this.upDateCheckAllState();
		});
	},
	//点击单个商品复选按钮，计算选中checked的商品的总数量和总价,底部更新
	goodsFooterInfo:function(){
		var _this = this;
		var _data = _this.isCheckGoodsInfo();//调用判断是是否被点击的方法
		goodsCheckFnJsonp( APILIST.goodsCheck, JSON.stringify( _data ), function( _d ){
			_this.selectGoodsNumId.html( _d.num );
				_this.goodsTotal.html( _d.num );//全部商品
				_this.goodsTotalMoneyId.html( _d.price );

			});
	},
	//统计被选中的商品,返回对象数组
	isCheckGoodsInfo:function(){
		var _this 			= this;
		var _tempArr 		= [];
		var _checkboxPlus 	= _this.cartWrap.find('div.checkboxSkin');
		for (var i = 0; i < _checkboxPlus.length; i++) {
			if( _checkboxPlus.eq(i).attr('data-isshow') == 0 ){
				var _tem = {};
				_tem['price'] 	= _checkboxPlus.eq(i).attr('data-sum');
				_tem['num'] 	= _checkboxPlus.eq(i).attr('data-goodsNum');
				_tempArr.push( _tem );
			}
		};
		if ( _tempArr.length == 0 ) {
			var _tem = {};
			_tem['price'] 	= 0;
			_tem['num'] 	= 0;
			_tempArr.push( _tem );
		};
		// console.log( _tempArr );
		return _tempArr;
	},
	//增加商品数量事件
	addGoodsEvent:function(){
		var _this = this;
		var _addGoodsBtn = _this.cartWrap.find('input.addGoodsBtn');
		_addGoodsBtn.on('click',function(){
			var _that 	= $(this);
			var _checkboxPlus 	= _that.parent().siblings('.checkboxSkin');
			//商品数量
			var _num 	= _checkboxPlus.attr('data-goodsNum');
			//商品单价
			var _unit 	= _checkboxPlus.attr('data-unit');
			//单项商品总价显示区域
			var _sum  	= _that.parent().next();

			_num ++;
			_that.prev().val( _num );//更新数量
			_checkboxPlus.attr('data-goodsNum', _num);//保存更新后的数量

			//防止无效点击，每次点击后变成不可点击，获得到数据后可点击
			_that.attr('disabled','disabled');
			//计算某单项商品的合计总价：数量*单价
			_this.cartSingleTotal( _num, _unit, _sum, _that );
		});
	},
	//商品数量的输入块
	enterGoodsNum:function(){
		var _this = this;
		var _enterGoodsBtn = _this.cartWrap.find( 'input.enterGoodsBtn' );
		_enterGoodsBtn.on('blur',function(){
			var _that 	 = $(this);
			var _checkboxPlus 	= _that.parent().siblings('.checkboxSkin');
			var _blurVal = _that.val();
			//把商品输入框的值更新到check保存的数据
			_checkboxPlus.attr('data-goodsNum',_blurVal);	


			//商品数量
			var _num 	= _checkboxPlus.attr('data-goodsNum');
			//商品单价
			var _unit 	= _checkboxPlus.attr('data-unit');
			//单项商品总价显示区域
			var _sum  	= _that.parent().next();

			//防止无效点击，每次点击后变成不可点击，获得到数据后可点击
			_that.attr('disabled','disabled');
			//计算某单项商品的合计总价：数量*单价
			_this.cartSingleTotal( _num, _unit, _sum, _that );

		});
	},
	//减少商品数量事件
	reduceGoodsEvent:function(){
		var _this = this;
		var _reduceGoodsBtn = _this.cartWrap.find('input.reduceGoodsBtn');
		_reduceGoodsBtn.on('click',function(){
			var _that = $(this);
			var _checkboxPlus 	= _that.parent().siblings('.checkboxSkin');
			//商品数量
			var _num 	= _checkboxPlus.attr('data-goodsNum');
			//商品单价
			var _unit 	= _checkboxPlus.attr('data-unit');
			//单项商品总价显示区域
			var _sum  	= _that.parent().next();

			if ( _num > 1) {
				_num--;
			}else{
				_num = 1;  
			};
			_that.next().val( _num );//更新数量
			_checkboxPlus.attr('data-goodsNum', _num);//

			//防止无效点击，每次点击后变成不可点击，获得到数据后可点击
			_that.attr('disabled','disabled');
			//计算某单项商品的合计总价：数量*单价
			_this.cartSingleTotal( _num,_unit,_sum,_that );
		});
	},
	//计算某单项商品的合计总价：数量*单价
	//被加号、减号所调用
	cartSingleTotal:function( _num, _unit, _sum, _that ){
		var _this = this;
		//ajax
		var _data = '[{"num":'+ _num +',"price":'+ _unit +'}]';
			// console.log(_data);
			cartFnJsonp(APILIST.cart,_data,function( data ){
			_sum.html( '￥' + data );//单项商品的小计
			//把单项商品的小计保存在此商品所属的check上
			_sum.parent()
			.find('div.checkboxSkin')
			.attr('data-sum',data);

			_that.removeAttr('disabled');

			_this.goodsFooterInfo();//更新商品小计信息
		});
		},
	//全选按钮的点击事件
	eventCheckAllBtn:function(){
		var _this = this;
		var _checkboxPlus 	= _this.cartWrap.find('div.checkboxSkin');
		// console.log( _this.checkAllBtn.is(':checked'))
		_this.checkAllBtn.on('click',function(){
			var _is = $(this).is(':checked');
			// console.log( _is );
			if ( _is == false ) {
				_this.checkAllBtn.removeAttr('checked');
				//全选按钮未选中
				_checkboxPlus
						.attr('data-isshow',0)//不管单选什么状态，只要全选点击了，就给单选isshow赋值0
						.checkPlus().eventFn();		

			}else{
				_this.checkAllBtn.attr('checked',true);
				//全选按钮选中
				_checkboxPlus
						.attr('data-isshow',1)
						.checkPlus().eventFn();	
			};
			
			_this.goodsFooterInfo();//统计单个商品复选按钮
		});
	},
	//点击某个商品的check时，更新全选按钮的状态
	upDateCheckAllState:function(){
		var _this = this;
		var _checkboxPlus 	= _this.cartWrap.find('div.checkboxSkin');
		for (var i = 0; i < _checkboxPlus.length; i++) {
			if ( _checkboxPlus.eq(i).attr('data-isshow') == 1 ) {
				_this.checkAllBtn.removeAttr('checked');
				break;
			};
			_this.checkAllBtn.attr('checked',true);
		};
	},
	//删除商品按钮
	eventDelGoodsBtn:function(){
		var _this = this;
		var _delBtn  = _this.cartWrap.find('p.delBtn');

		_delBtn.on('click',function(){
			var _c = $(this).parent();
			_c.prev().remove();
			_c.remove();
			_this.goodsFooterInfo();
		})
	},
	//删除选中的全部商品
	eventDelAllChecked:function(){
		var _this = this;
		var _checkboxPlus 	= _this.cartWrap.find('div.checkboxSkin');
		_this.deleteCheckedId.on('click',function(){
			// console.log("2")
			for (var i = 0; i < _checkboxPlus.length; i++) {
				if ( _checkboxPlus.eq(i).attr('data-isshow') == 0 ) {//判断是否选中
					// console.log(_checkboxPlus.eq(i));
					var _c = _checkboxPlus.eq(i).parent();
					_c.prev().remove();
					_c.remove();
					_this.goodsFooterInfo();
				};
			}
		});
	}

}

var _ShopingCarConfig = {
	cartWrap			: $('#cartWrap'),
	goodsTotal			: $('#goodsTotal'),
	selectGoodsNumId	: $('#selectGoodsNumId'),
	goodsTotalMoneyId	: $('#goodsTotalMoneyId'),
	checkAllBtn 		: $('.checkAllBtn'),
	deleteCheckedId		: $('#deleteCheckedId')

}

new ShopCarFn( _ShopingCarConfig );