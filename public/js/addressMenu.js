/****************************
 *date:2017/08/10;
 *name:产品详情页-配送地址切换菜单;
 *author:lg;
 */
 function AddressMenuFn ( _configEle ) {
 	for(var i in _configEle){
 		this[i] = _configEle[i];
 	}
 	this.init();
 }
 AddressMenuFn.prototype = {
 	init:function(){
 		var _this = this;

		//地址菜单显示隐藏
		_this.addressTitleEvent();

		//获取省json
		_this.getData( _this.provinceId, APILIST.province);
		//获取市json
		_this.getData( _this.cityId, APILIST.city );
		//获取区json
		_this.getData( _this.areaId, APILIST.area );


		//省市区tabs选择
		_this.eventTabA();
		_this.eventTabB();
		_this.eventTabC();
	},
	//地址列表下拉，收起
	addressTitleEvent:function(){
		var _this = this;
		_this.addressTitleId.on('click',function(){
			_this.addressListId.toggle();
		});
	},
	//获取json数据
	getData:function( _id, _inter ){
		var _this = this;
		//获取省市区json
		getAjax( _inter,function(data){
			switch( _inter ){
				case APILIST.province:
					_this.createDom( data.province, _id );
					_this.provinceEvent();
				break;
				case APILIST.city:
					_this.createDom( data.city, _id );
					_this.cityEvent();
				break;
				case APILIST.area:
					_this.createDom( data.area, _id );
					_this.areaEvent();
				break;
				default:
					console.log('接口有误!')
			}
		});
	},
	//根据json数据创建dom元素
	createDom:function( _data, _wrap ){
		var _this = this;
		//生成省 市 区的dom子节点，本对象内的公共方法
		for (var i = 0; i < _data.length; i++) {
			$('<p/>',{})
			.html( _data[i].name )
			.appendTo( _wrap );
		};
	},
	//省的tab菜单
	provinceEvent:function(){
		var _this = this;
		_this.addressEventFn( _this.provinceId,function( _currEle ){
			var _html = _currEle.html();
			_this.tabA
				.html( _html )
				.removeClass( 'yellow' );

			_this.provinceId.hide();
			_this.cityId.show();

			_this.tabB
				.addClass( 'yellow' )
				.show();

			_this.arr.province = _html;
			_this.arr.city = '';
			_this.arr.area = '';
			_this.addressTitle();

		});
	},
	//市的tab菜单
	cityEvent:function(){
		var _this = this;
		_this.addressEventFn( _this.cityId,function( _currEle ){
			var _html = _currEle.html();
			_this.tabB
				.html( _html )
				.removeClass( 'yellow' );

			_this.cityId.hide();
			_this.areaId.show();

			_this.tabC
				.addClass( 'yellow' )
				.show();

			_this.arr.city = _html; 
			_this.arr.area = '';
			_this.addressTitle();
		})
	},
	//区的tab菜单
	areaEvent:function(){
		var _this = this;
		_this.addressEventFn( _this.areaId,function( _currEle ){
			var _html = _currEle.html();
				_this.tabC.html( _html );
				_this.addressListId.toggle();

				_this.arr.area = _html; 
				_this.addressTitle();
			})
	},
	//省市区的公共方法
	addressEventFn:function( _id ,callback ){
		var _this = this;
		_id.children().on('click',function(){
			//当前点击p
			var _currEle = $(this);
			callback( _currEle );
		});
	},
	//操作省市区的选择
	addressTitle:function(){
		var _this 	 = this;
		var _address = _this.judgeNull();
			_this.addressTitleId.find('p').html( _address );
	},
	//判断省市区是否为空
	judgeNull:function(){
		var _this = this;
		var _province 	= _this.arr.province;
		var _city 		= _this.arr.city;
		var _area 		= _this.arr.area;

		if ( _province =='' ) {
			alert('省份不能为空！');
			_this.tabsEvent(_this.tabA, _this.provinceId);
			_this.provinceEvent();
		}else if(( _city =='' )&&( _area !=='')){
			alert('市区不能为空！');
			_this.tabsEvent( _this.tabB, _this.cityId );
			_this.cityEvent();
		}else{
			return ( _province + _city + _area );
		}
	},
  	//点击地区的tab按钮时,下级地区tab隐藏，具体城市出现
  	tabsEvent:function( _tab, _id ){
  		var _this = this;

		//当前tab的添加yellow，同级删除yellow类
		_tab.addClass('yellow')
			.siblings().removeClass('yellow');

		//当前的下级地区都隐藏	
		_tab.nextAll().hide();

		//当前tab对应的城市列表显示，兄弟tab城市列表隐藏
		_id.show()
		   .siblings('div').hide();
	},
	eventTabA:function(){
		var _this = this;
		_this.tabA.on('click',function(){
			_this.tabsEvent( _this.tabA, _this.provinceId );
		})
	},
	eventTabB:function(){
		var _this = this;
		_this.tabB.on('click',function(){
			_this.tabsEvent( _this.tabB, _this.cityId );
		})
	},
	eventTabC:function(){
		var _this = this;
		_this.tabC.on('click',function(){
			_this.tabsEvent( _this.tabC, _this.areaId );
		})
	}
}

var _configEle ={
	addressTitleId 	: $('#addressTitleId'),
	addressListId	: $('#addressListId'),

	provinceId		: $('#provinceId'),
	cityId			: $('#cityId'),
	areaId			: $('#areaId'),

	tabA			: $('#tabA'),
	tabB			: $('#tabB'),
	tabC			: $('#tabC'),

	arr : {
		province 	:'',
		city 		:'',
		area 		:''
	}
}


new AddressMenuFn( _configEle );






