define(["jquery","slide","public"],function($,slide,public){
	var main = function(){
		$(function(){
			
			//调用ajaxGoods
			for(var i = 0;i<5;i++){
				public.ajaxGoods(i)
			}
			//轮播图
			slide.slide();


		})
		//商品详情页左侧导航特效
		var count =0;
		$(".home-inner-edit").on("click",function(){
			if(count%2 == 0){
				$(".home-nav-inner-show ul").slideDown(300).css({border:"1px solid red",background:"#fff"});
				$(".home-nav-inner-show ul").find(".home-inner-menu").find("a").css({color:"black"})
			}else{
				$(".home-nav-inner-show ul").slideUp(300)
			}
			count++;
			
		})
		
		
		
	}
	return {
		main:main
	}
})