define(["jquery"],function($){
	var mirror = function(){
		$(function(){
			
			$("#ProDiemCp").hover(function(){
				$(".big-mirror").css("display","block");
				$("#ProDiemCp2").css("display","block");
				$(".big-pic").css("display","block");
			},function(){
				$(".big-mirror").css("display","none");
				$("#ProDiemCp2").css("display","none");
				$(".big-pic").css("display","none");
			})
			 $("#ProDiemCp").mousemove(function(ev){
			 	var left = ev.pageX -$(this).offset().left- $(".big-mirror").outerWidth()/2;
			 	var top = ev.pageY -$(this).offset().top- $(".big-mirror").outerHeight()/2;
			 	if(left < 0){
			 		left = 0;
			 	}else if(left > $(this).outerWidth() - $(".big-mirror").outerWidth()){
			 		left = $(this).outerWidth() - $(".big-mirror").outerWidth();
			 	}
			 	if(top < 0){
			 		top = 0;
			 	}else if(top >$(this).outerHeight() - $(".big-mirror").outerHeight()){
			 		top = $(this).outerHeight() - $(".big-mirror").outerHeight();
			 	}
			 	$(".big-mirror").css("left",left);
			 	$(".big-mirror").css("top",top);

			 	var proportionX = left / (this.offsetWidth - $(".big-mirror").outerWidth());
			 	var proportionY = top / (this.offsetHeight - $(".big-mirror").outerWidth());

			 	var mLeft = - proportionX * ($(".big-pic").outerWidth() - $(
			 		"#ProDiemCp2").outerWidth());
			 	var mTop = - proportionY * ($(".big-pic").outerHeight() - $("#ProDiemCp2").outerHeight())
			 	$(".big-pic img").css("left",mLeft);
			 	$(".big-pic img").css("top",mTop);
			 })
		})
		
	}
	return {
		mirror:mirror
	}
	

})