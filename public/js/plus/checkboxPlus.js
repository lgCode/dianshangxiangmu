/****************************
 *date:2017/08/16;
 *name:购物车页面---checkboxPlus;
 *author:lg;
 */
 (function($, win, undefined){
 	$.fn.checkPlus 	= function(){
 	
 		this.setStyle = function( _param ){
 			this.css( _param );
 		}
 		this.imgSwitch = function( n ){
 			// console.log( n );
 			if (n == 1) {
 				//选中
 				this.children('img').hide();
 			}else{
 				//未选中
 				this.children('img').show();
 			}; 
 		}
 		this.eventFn  = function(){
 			var _that   = $(this);
 			var _isShow = _that.attr('data-isshow');
 			if( _isShow == 0 ){
					//选中
					this.imgSwitch( 1 );
					_that.attr('data-isshow',1);
				}else{
					//未选中
					this.imgSwitch( 0 );
					_that.attr('data-isshow',0);
				}
		}
 		return this;
 	}
 })(jQuery,window);