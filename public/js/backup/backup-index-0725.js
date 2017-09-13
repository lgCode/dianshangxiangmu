
/****************************
 *date:2017/07/25;
 *name:搜索框点击 ;
 *author:lg;
 */
 function searchFn(){
 	var _searchId = document.getElementById('searchId');
		// 获取焦点
		_searchId.onfocus = function(){
			this.setAttribute("value"," ");
		};
		//失去焦点
		_searchId.onblur = function(){
			this.setAttribute("value","抢十亿神券");
		}
	}



/****************************
 *date:2017/07/25;
 *name:左侧产品列表移入移出效果;
 */
 function subNavFn(){		
 		//调用公共方法gId
 		var _subNavProduct = gId('subNavProduct');
 		var _lis = _subNavProduct.childNodes;

 		// 这里循环的是li
 		for (var i = 0; i < _lis.length; i++) {
 			if( _lis[i].nodeName =='LI'){
 				_lis[i].onmouseover = function(){
 					var _showshowNavPopup = this.getElementsByClassName('showNavPopup')[0];
 					_showshowNavPopup.style.display = "block";
					// console.log(_showshowNavPopup);
				}
				_lis[i].onmouseout = function(){
					var _showshowNavPopup = this.getElementsByClassName('showNavPopup')[0];
					_showshowNavPopup.style.display = "none";
				}
			}
		}

	}
	

