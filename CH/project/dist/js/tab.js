define(["jquery","mirror"],function($,mirror){
	var tab = function(){
		var arr =
		[{img:"http://images.changhong.com/chgw/cpzx/chiq/chiq_televisions/chiq_q5k/201710/W020171001457592018510.jpg"},
		{img:"http://images.changhong.com/chgw/cpzx/chiq/chiq_televisions/chiq_q5k/201710/W020171001457593864712.jpg"},
		{img:"http://images.changhong.com/chgw/cpzx/chiq/chiq_televisions/chiq_q5k/201710/W020171001457595604718.jpg"},
		{img:"http://images.changhong.com/chgw/cpzx/chiq/chiq_televisions/chiq_q5k/201710/W020171001457597868393.jpg"},
		{img:"http://images.changhong.com/chgw/cpzx/chiq/chiq_televisions/chiq_q5k/201710/W020171001457598804919.jpg"}];
		var html = ``;
		var html_big = ``;
		var src = ``;
		$("#daxiaocontrol li").mouseenter(function(){
			$(this).css({border:"1px solid red"}).siblings().css({border:0});

			src = arr[$(this).index()].img;
			$('#ProDiemCp').html("");
			$(".big-pic").html("");
			html =` <img id="" src="${src}" alt="" width="510" height="510">
    				<div class="big-mirror" style="display: none; left: 306px; top: 299px;"></div>`;
    		$('#ProDiemCp').html(html);
    		html_big =`<img src="${src}" alt="" style="left: -765px; top: -747.5px;" width="1275" height="1275">`;
    		$(".big-pic").html(html_big);

		})
		
	}
	return {
		tab:tab
	}

})
/*<div id="ProDiemCp">
	
    <img id="" src="http://images.changhong.com/chgw/cpzx/chiq/chiq_televisions/chiq_q5k/201710/W020171001457592018510.jpg" alt="" width="510" height="510">
    <div class="big-mirror" style="display: none; left: 306px; top: 299px;"></div>
</div>
<div class="big-pic" style="display: none;">
    <img src="http://images.changhong.com/chgw/cpzx/chiq/chiq_televisions/chiq_q5k/201710/W020171001457592018510.jpg" alt="" style="left: -765px; top: -747.5px;" width="1275" height="1275">

</div>*/