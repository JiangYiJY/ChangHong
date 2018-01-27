define(["jquery"],function($){
	var scroll = function(){
		$(function(){
			 $(".xhome-fixl").find("ul").find("li").eq(0).data("top",573);
			 $(".xhome-fixl").find("ul").find("li").eq(1).data("top",769);
			 $(".xhome-fixl").find("ul").find("li").eq(2).data("top",1452);
			  $(".xhome-fixl").find("ul").find("li").eq(4).data("top",2795);
			   $(".xhome-fixl").find("ul").find("li").eq(5).data("top",3479);
			     $(".xhome-fixl").find("ul").find("li").eq(3).data("top",2124);

			$(window).scroll(function(){

				var top = $(this).scrollTop();
				if(top >=573 && top <769){
	                //热门
	                $(".xhome-fixl").css({display:"block"})
	                $(".xhome-fixl").find("ul").find("li").eq(0).addClass("clicked").siblings().removeClass("clicked");
	               
	            }else if(top>=769 && top<1452){
	                //电视
	                $(".xhome-fixl").css({display:"block"})
	                $(".xhome-fixl").find("ul").find("li").eq(1).addClass("clicked").siblings().removeClass("clicked");
	                
	            }else if(top>=1452 && top<2124){
	                //空调
	                $(".xhome-fixl").css({display:"block"})
	                $(".xhome-fixl").find("ul").find("li").eq(2).addClass("clicked").siblings().removeClass("clicked");
	                
	            }else if(top >= 2124 && top < 2795){
	                //冰洗
	                $(".xhome-fixl").css({display:"block"})
	                $(".xhome-fixl").find("ul").find("li").eq(3).addClass("clicked").siblings().removeClass("clicked");
	              
	            }else if(top>=2795&&top<3479){
	                //生活家电
	                $(".xhome-fixl").css({display:"block"})
	                 $(".xhome-fixl").find("ul").find("li").eq(4).addClass("clicked").siblings().removeClass("clicked");
	                
	            }else if(top>=3479&&top<3875){
	            	//周边
	            	$(".xhome-fixl").css({display:"block"})
	            	 $(".xhome-fixl").find("ul").find("li").eq(5).addClass("clicked").siblings().removeClass("clicked");
	            	
	            }
	            else{
	                //消失
	                 $(".xhome-fixl").css({display:"none"})
	            }
	            
	            if (top<300) {
					$(".pro-float-box").find("ul").find("li").eq(0).css({display:"none"});
				}else{
					$(".pro-float-box").find("ul").find("li").eq(0).css({display:"block"});
				}
			})
			$(".pro-float-toTop").click(function(){
				$(window).scrollTop(0);
			})

		})
		//给滚动监听添加点击
		$(".xhome-fixl ul li").click(function(){
			/*$(window).off();*/
			console.log($(this).index());
			$(this).find("a").css({color:"#fff"});
			$(this).addClass("clicked").siblings().removeClass("clicked");
			$(".xhome-fixl ul li").not($(".xhome-fixl ul li").eq($(this).index())).find("a").css({color:"#666"});
			$(this).addClass("clicked").siblings().removeClass("clicked");
			
			var top = $(this).data("top");
			
			var timer = setInterval(function(){
				var nowTop =$(window).scrollTop();
				var speed = nowTop < top? 5:-5;

				if(Math.abs(nowTop-top)<5){
					clearInterval(timer);

					$(window).scrollTop(top);
					
					
					
				}else{
					$(window).scrollTop(nowTop +speed);
					
				}
				
			},10)

		})

	}
	return {
		scroll:scroll
	}
})
//573 热门，769，电视，1452空调，2124冰洗，2795生活家电，3479周边，3857消失
//300,