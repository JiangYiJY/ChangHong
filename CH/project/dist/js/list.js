define(["jquery","public"],function($,public){
	var list = function(){
		
		$(function(){
			public.ajax_list(0)
			
			
			
			/*$(".pro-result-page-num a").click(function(){
				var index = $(this).index();
				console.log(index);
				location.assign("list_"+1+".html");
				public.ajax_list($(this).index());
			})*/

		})
		

	}
	return {
		list:list
	}

})