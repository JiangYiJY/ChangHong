define(["jquery","public"],function($,public){
	var goodsDetail = function(){
		$(function(){
			//logo 区域的移入移出
			$(".home-nav li").mouseenter(function(){
				if ($(this).index() == 0 ||$(this).index()>5) {
					return false;
				}else if($(this).index() == 5){
					
					$(this).find(".home-nav-sub").css({display:"block"});
					public.ajax2($(this).index());

				}else{
					
					$(this).find(".home-nav-sub").css({display:"block"});
					public.ajax1($(this).index());
				}
					
				
			})
			$(".home-nav li").mouseleave(function(){
				$(this).find(".home-nav-sub").css({display:"none"});
				
			})
			
			//加载左边导航
			$(".home-nav-inner ul li").mouseenter(function(){
				if($(this).index()!=1){
					if($(this).index()>1){
						$(this).find(".home-inner-secd").css({display:"block"});
						
						
						public.ajaxLeftNav($(this).index());

					}else{
						$(this).find(".home-inner-secd").css({display:"block"});
						public.ajaxLeftNav($(this).index());

					}
					
						
					
					
				}else{
					$(this).find(".home-inner-secd").css({display:"block"});
						public.ajaxLeftNav_1($(this).index());
				}
				
				
			})
			$(".home-nav-inner ul li").mouseleave(function(){
				
					$(this).find(".home-inner-secd").css({display:"none"});
					
				
				
			})
		})
	}
	return {
		goodsDetail:goodsDetail
	}
})