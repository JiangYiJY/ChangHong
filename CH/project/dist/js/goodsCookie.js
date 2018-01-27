define(["jquery","jquery-cookie"],function($){
	var cookie = function(){


		$(function(){
			var totalnum =0;
			var _total_price =0;
			/*var n = 0;//多少种商品*/
			
			showNum();
			showDetail();
			//加载商品数据
			load();
			checkbox();
			add_delete();
			msg();
			allCheck();
			cart_detail();
			$(".pro-result-container").on("click",".pro-goods-car",function(){
				//点击加入购物车
				
				add($(this));
				showNum();
				showDetail();
				
				console.log($.cookie("goods"));
			})
			//商品详情页点击加入购物车
			$(".pro-ditem-addin").click(function(){
				add($(this));
				showNum();
				/*showDeatil();*/
				
				console.log($.cookie("goods"));
			})
			//hover
			$(".tool-container-row").mouseenter(function(){
				showNum();
				showDetail();
			})
			//购物车移入移出特效
			/*$(".shop_cart").hover(function(){
				$(this).find(".tool-container-tips").css({display:"block"});
			},function(){
				$(this).find(".tool-container-tips").css({display:"none"});
			})*/
			$(".shop_cart").mouseenter(function(){
				$(this).find(".tool-container-tips").css({display:"block"});
			})
			$(".shop_cart").mouseleave(function(){
				$(this).find(".tool-container-tips").css({display:"none"});
			})

			//删除商品
			$(".tool-container-tips").on("click",".delete",function(){
				

				deleteGoods($(this));
				if (totalnum == 0) {
					return false;
				}
				
				load();
				showDetail();
				showNum();
			})
			//添加cookie；
			function add(obj){
				var id = obj.attr("code");
				var first = $.cookie("goods") == null ? true :false;//判断是否是第一次加入购物车
				if (first) {
					//创建cookie
					$.cookie("goods","[{id:"+id+",num:1"+"}]",{
						expires:7
					});
				}else{
					//不是第一次添加商品，判断是否有同类型商品
					var cookieStr = $.cookie("goods");
					var arr = eval(cookieStr);
					
					$("#total_num").html(arr.length);
					if (arr.length ==0) {
						$("#total_num").html(0);
					}

					var same = false;//默认没有同类型商品
					for (var i in arr) {
						if(arr[i].id == id ){
							same = true;
							arr[i].num++;
							$.cookie("goods",JSON.stringify(arr),{expires:7});
							break;
						}
					}
					if (!same) {
						var obj = {id:id,num:1};
						var cookieStr = $.cookie('goods');
						var arr = eval(cookieStr);
						arr.push(obj);
						$.cookie("goods",JSON.stringify(arr),{
							expires:7
						});
					}
				}
			}
			//计算数量
			function showNum(){
				var str = $.cookie('goods');
				var arr = eval(str);
				var sum = 0;//计算总数
				for(var i in arr){
					sum += arr[i].num;
					$("#floadt_cart_totalNum").html(sum);
					$("#mycartNum").html(sum);
				}
				totalnum = sum;
				if (sum == 0) {
					var html = `<h1 class="tips-nogoods" style="display: block;">购物车中还没有商品，赶紧选购吧</h1>`;
					$(".tool-container-tips").html("");
					$(".tool-container-tips").html(html);
					$("#mycartNum").html(0);
				}

			}
			//购物车中对上商品数量减少
			function deleteGoods(obj){
				var str = $.cookie('goods');
				console.log(str);
				var arr = eval(str);
				$("#total_num").html(arr.length);
				if (arr.length ==0) {
					$("#total_num").html(0);
				}
				for(var i in arr){
					if(arr[i].id == obj.attr("code")){
						
						
						if (arr[i].num == 1) {
							
							arr.splice(i,1);
							$.cookie("goods",JSON.stringify(arr),{expires:7});
							obj.parents(".tool-container-tips-warp").remove();
							
							break;
						}else{
							
							arr[i].num --;
							$.cookie("goods",JSON.stringify(arr),{expires:7});
							break;
						}
						
					}
				}
				
				
			}
			//右上角购物车展示详情
			 function showDetail(){
				$.ajax({
					url:"../data/goods_list.json",
					type:"get",
					success:function(res){
						$(".tool-container-tips").html("");

						var arr = res[1];
						var str = $.cookie("goods");
						var arrCookie = eval(str);
						var html = ``;
						var html1 = ``;
						var totalPrice = 0;
						for (var i in arrCookie) {
							for(var j in arr){
								if (arrCookie[i].id == arr[j].id) {
									html+=`
										    <div class="tool-tips-row">
										            <p>
										                <a class="cart_url" target="_blank"  href="goodsDetail.html">
										                	${arr[j].title}
										                </a>
										            </p>
										            <h1>单价<span>${arr[j].price}</span>元 <b>x ${arrCookie[i].num}</b>
										                <a href="javascript:;" class="delete" code = "${arr[j].id}">删除</a><a href="" class="tool-goods-tips"></a>
										            </h1>
										        </div>`; 
										    
									var price = arr[j].price.slice(1);
									totalPrice += (arrCookie[i].num *price);
								}

							}
						}
						_total_price = totalPrice;
						console.log(_total_price);
						html +=`<div class="tool-goods-pay" style="display: block;">
							        <div class="tool-car-infor">
							            <p><span id="totalNum">${totalnum}</span>件商品</p>
							            <h1>总价：<span id="totalPrice">${totalPrice}</span></h1>
							        </div>
							        <a href="pay.html" class="goods-pay-btn" id="goods-pay-btn">立即结算</a>
							    </div>
							    <h1 class="tips-nogoods" style="display:none">
							        购物车中还没有商品，赶紧选购吧
							    </h1>`
						html1 = `<div class="tool-container-tips-warp" style="display: block;"> 

									${html}	        
										        
								</div>`
						if (!totalnum) {
							$(".tool-container-tips").html("");
						}else{
							$(".tool-container-tips").html(html1);
						}
						
						
						
						
						
						
					}

				})
				
			}
			//结算页面操作
			//全选时
			function allCheck(){
				var count = 0;//点击计数
				
				$(".car-all-check").click(function(){

					if(count%2 == 0){
						
						$(this).addClass("car-checked");
						$(".car-check-box").addClass("car-checked");
						$("#goods_num").html(totalnum);
						$("#cartTotal").html(_total_price);
					}else{
						
						$(this).removeClass("car-checked");
						$(".car-check-box").removeClass("car-checked");
						$("#goods_num").html(0);
						$("#cartTotal").html(0);
					}
					count ++;


				})
			}
			
			//加载结算页选中的商品
			function load(){
				
				$.ajax({
					url:"../data/goods_list.json",
					type:"get",
					success:function(res){
					
						var arr = res[1];
						var str = $.cookie("goods");
						var arrCookie = eval(str);
						if (arrCookie) {
							n = arrCookie.length;
							$("#total_num").html(arrCookie.length);
							
							if (arrCookie.length ==0) {
								$("#total_num").html(0);
							}
						}
						
						


						var html = ``;
						var totalPrice = 0;
						for (var i in arrCookie) {
							for(var j in arr){
								if (arrCookie[i].id == arr[j].id) {
									html+=`<!--商品列表-->
										<div class="car-item-ls">
										<!--商品块1-->

										    <div class="car-item-deal">
										        <div class="car-check-box" tab_count = ${i}>
										            <input type="checkbox"/>

										        </div>

										       
										        <div class="car-deal-rt">

										            <!--参加活动的信息-->
										            <div class="car-deal-top">
										                <div class="car-sp-lf">
										                 <!--促销活动内容 END-->
										                </div>

										                <div class="car-opt-bk">
										                    <a href="javascript:;" class="opt-like " id="sc_CH6003712"></a>
										                    <a href="javascript:;" class="opt-del"></a>
										                </div>
										            </div>
										            <!--参加活动的信息 END-->

										            <!--购买商品详情-->
										            <div class="car-deal-sp clearfix">
										                <a href="goodsDetail.html" title="${arr[j].title}" class="car-deal-pc">
										                 <img src="${arr[j].img}" alt="${arr[j].desc}" width="60px" height="60px">
										                </a>
										                 <div class="car-deal-name ">
										                     <a href="goodsDetail.html" class="h3">${arr[j].title}</a>
										                </div>
										                <div class="car-deal-price">
										                    <p class="del-price"></p>
										                    <p class="now-price">
										                        单价<span id="item11303441_price">
										                                ${arr[j].price}</span>元
										                    </p>
										                    
										                    <p class="rec-price">
										                                                                </p>
										                </div>
										                <input class="r3code" name="r3code" value="CH6003712" type="hidden">
										                <div class="car-deal-qt">
										                    <label>数量</label>
										                    <div class="car-quantity-form">
										                        <a href="javascript:;" class="decrement" code ="${arr[j].id}"></a>
										                        <input id="input_item" value="${arrCookie[i].num}"  class="text w20" type="text">
										                        <a href="javascript:;" class="increment" code ="${arr[j].id}"></a>
										                    </div>
										                    <input id="item11303441_subtotal" nc_type="eachGoodsTotal" value="16797" type="hidden">

										                </div>
										                <p class="car-item-sta">
										                    
										                    <span id="show_sto_msg11303441">
										                    有货                                    </span>
										                </p>

										          </div>

										            <!--购买商品详情 END-->
										        </div>
										    </div>

										</div>`;
									
									var price = arr[j].price.slice(1);
									totalPrice += (arrCookie[i].num *price);
									$(".goods_list").html(html);

								}

							}
						}
						
						
						/*$("#goods_num").html(totalnum);*/
						/*$("#cartTotal").html(totalPrice);*/
						/*checkbox();*/

						
						
						
						
						
						
						
					}
				})
				
			}
			

			//分别选中单选框
			/*$(".car-check-box").click(function(){
				alert(111)
				$(this).toggleClass("car-checked");
			})


*/				/*var tab_count = 0;*/
			
			
			//单选
			function checkbox(){
				var tab_sum = 0;
				var tab_totalPrice = 0;
				
				
				var arr_count = [];//每个单选框的计数；
				for(var i = 0;i<100;i++){
					arr_count[i] = 0;
				}
				
			
				$(".goods_list").on("click",".car-check-box",function(){
					

					$(this).toggleClass('car-checked');
					
					
					var tab_count =Number($(this).attr("tab_count")) ;
					var number = Number($(this).parents(".car-item-deal").find("#input_item").val());
						
					var price = $(this).parents(".car-item-deal").find("#item11303441_price").html();
					var new_price = 0;
					var reg = /\d+/;
					var arr =price.match(reg);
					var str =arr.join("");
					new_price = parseInt(str);
					if (number == 0) {
						return false;
					}

					/*console.log( $(this).attr("tab_count") +'tab_count');
					console.log(tab_count)*/
					if(arr_count[tab_count] % 2 == 0){
						
						//选中

						tab_sum += number;
						tab_totalPrice += (new_price*number);
						console.log(tab_totalPrice +'添加');

						
					}else{
						//不选
						
						tab_sum -= number;	
						tab_totalPrice -= (new_price*number);
						console.log(tab_totalPrice +'delete');

						
						
						
						
					}
					$("#goods_num").html(tab_sum);
					$("#cartTotal").html(tab_totalPrice);
					
					
					arr_count[tab_count]++;
					
					

				})

			}
			//按钮实现商品加减
			function add_delete(){
				//加
				$(".goods_list").on("click",".increment",function(){
					add($(this));
					showNum();
					var val =Number($(this).prev().val())+1;
					$(this).prev().val(val);
					showDetail();

					

				})
				//减
				$(".goods_list").on("click",".decrement",function(){
					deleteGoods($(this));
					showNum();
					showDetail();
					var val =Number($(this).next().val());
					if (val == 0) {
						$(this).parents(".car-item-ls").remove();
						deleteGoods($(this));
						load();
						console.log($.cookie("goods"));
						return false;
					}
					val = val-1;
					$(this).next().val(val);
				})
			}
			//点击x号是弹出提示信息
			function msg(){
				$(".goods_list").on("click",".opt-del",function(){
					var html = `<div style="position: fixed; z-index: 1701; left: 511.5px; top: 50%;" 
									class="dialog_body" id="fwin_dialog" initialized="true">
									<style type="text/css">object{visibility:hidden;}</style>
									<h3 class="dialog_head"><span class="dialog_title">
									<span class="dialog_title_icon">提示信息</span></span>
									<span class="dialog_close_button" id="fwin_dialog_close" onclick="hideMenu('fwin_dialog', 'dialog')"
									 title="关闭">X</span></h3><div class="eject_con"><div class="dialog_message_contents">
									 <i class="alert_info"></i>确认删除吗?</div></div><div class="dialog_buttons_bar">
									 <a href="javascript:void(0)" id="fwin_dialog_submit" class="dialog-bottom-btn dialog-bottom-btn mr10">确定</a>
									 <a href="javascript:void(0)" id="fwin_dialog_cancel" class="dialog-bottom-btn" >取消</a></div>
									 </div><div id="fwin_dialog_cover" style="position: fixed; z-index: 1700; top: 0px; left: 0px; width: 100%; height: 1624px; opacity: 1;">
								 </div>`;
					$("#append_parent").html(html);
					//点击确定
					var _this = this;
						$("#append_parent").on("click","#fwin_dialog_submit",function(){
							$(_this).parents(".car-item-ls").remove();
							$(this).parents("#append_parent").html("");
							var str = $.cookie("goods");
							var arr = eval(str);
							for(var i in arr){
								if ($(_this).parents(".car-item-ls").find(".increment").attr("code") == arr[i].id ){
									arr.splice(i,1);
									$.cookie("goods",JSON.stringify(arr),{expires:7});
									showNum();
									showDetail();
									checkbox();
									allCheck();
									break;
								}
							}
							
							
						})
				})
				/*$(".dialog_close_button").mouseenter(function(){
					$(this).css({color:"#27A9E3!important;"})
				})*/
				$("#append_parent").on("mouseenter",".dialog_close_button",function(){
					$(this).css({color:"blue"});
					
					
				})
				$("#append_parent").on("mouseleave",".dialog_close_button",function(){
					$(this).css({color:"#a9a9a9"});
					
				})
				$("#append_parent").on("click",".dialog_close_button",function(){
					$(this).parents("#append_parent").html("");
					
				})
				//点击取消
				$("#append_parent").on("click","#fwin_dialog_cancel",function(){
					$(this).parents("#append_parent").html("");
					
				})


			}
			//商品详情页购物车
			function cart_detail(){
				$("#nextCount").click(function(){
					//加
					
						add($(this));
						showNum();
						var val =Number($(this).prev().val())+1;
						$(this).prev().val(val);
						showDetail();


				})
				$("#preCount").click(function(){
					//减
					
						deleteGoods($(this));
						showNum();
						showDetail();
						var val =Number($(this).next().val());
						if (val == 0) {
							$(this).parents(".car-item-ls").remove();
							deleteGoods($(this));
							load();
							console.log($.cookie("goods"));
							return false;
						}
						val = val-1;
						$(this).next().val(val);
					
				})
			}
			

				

		})
			
	}
	return {
		cookie:cookie
	}
})