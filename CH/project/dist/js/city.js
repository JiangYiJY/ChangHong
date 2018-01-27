define(["jquery"],function($){
	var city = function(){
		$(function(){
			$("#receiveAddr").mouseenter(function(){
				$(".address-select-content").css({display:"block"})
			})
			$(document).click(function(){
				$(".address-select-content").css({display:"none"})
			})
			
		})
	}
	return {
		city:city
	}
})