define(["jquery"],function($){
	var slide = function(){
		$(function(){
			var index = 0;
			function change(index){
				$(".banner li").eq(index).addClass('active').siblings().removeClass('active');
				$(".indicator li").eq(index).addClass('bg_blue').siblings().removeClass('bg_blue');

			}
			
			$(".indicator li").click(function(){
				index = $(this).index();
				change(index);
				
			});
			setInterval(function(){
				index++;
				index = index % $(".banner li").size();
				change(index);

			},4000)

		})
	}
	
	return {
		slide:slide
	}
})