define(["jquery"],function($){
	
//请求logo区域的json数据
	var ajax1 = function(index){
		
		$.ajax({
			url:"../data/logo.json",
			type:"get",
			success:function(res){

				var arr = res[index];
				
				var html =``;
				
				for (var i = 0; i < arr.length; i++) {


					html += `<div class="home-sub-box">
   								<a href="#" class="home-goods-img"><img class="lazy-zt" src="${arr[i].img}">
   								</a>
   								<p><a href="#" target="_blank" title="${arr[i].desc}">${arr[i].desc}</a></p>
   								<h1>${arr[i].price}</h1>
   								<div class="home-sub-line"></div>
   							</div>`;
				}
				html1 =`
	       					<div class="com-with">
	       						<p class="home-sub-title">
	       							<a href="javascript:void(0);" style="cursor:default;">${res[0][0].title}</a>
	       						</p>
	       						<div class="home-nav-sub-cont">
	       							${html}
	       						</div>
	       					</div>
	       				`
				$(".home-nav li").eq(index).find(".home-nav-sub").html(html);
			}
		})
	}
	var ajax2 = function(index){

		$.ajax({
			url:"../data/logo.json",
			type:"get",
			success:function(res){

				var arr = res[index];
				
				var html =``;
				var html1 = ``;
				
				for (var i = 0; i < arr.length; i++) {


					html += `<div class="home-sub-box">
   								<a href="#" class="home-goods-img"><img class="lazy-zt" src="${arr[i].img}">
   								</a>
   								<p><a href="#" target="_blank" title="${arr[i].desc}">${arr[i].desc}</a></p>
   								
   								<div class="home-sub-line"></div>
   							</div>`;
				}
				html1 =`
	       					<div class="com-with">
	       						<p class="home-sub-title">
	       							<a href="javascript:void(0);" style="cursor:default;">${res[0][1].title}</a>
	       						</p>
	       						<div class="home-nav-sub-cont">
	       							${html}
	       						</div>
	       					</div>
	       				`
				$(".home-nav li").eq(index).find(".home-nav-sub").html(html1);
			}
		})

	}
	//加载商品
	var ajaxGoods = function(index){
		$.ajax({
			url:"../data/goods_list.json",
			type:"get",
			success:function(res){

				var arr = res[index+1];
				var arr_ul = res[index+6];
				
				var html =``;
				var html_ul = ``;
				
				for (var i in arr_ul) {
					html_ul+=`<li><a href="#" target="_blank">${arr_ul[i]}</a></li>`


					
				}
				for(var i in arr){
					html +=`<div class="home-ele-f ">
		                            <div class="home-ele-img">
		                                <a href="#" target="_blank">
		                                    <img class="lazy" alt="" src="${arr[i].img}">
		                                </a>
		                            </div>
		                            <div class="home-ele-text" r3code="CH5010224">
		                                <h1><a href="#" target="_blank" title="${arr[i].title}">${arr[i].title}</a></h1>
		                                <p>${arr[i].desc}</p>
		                                <h2>${arr[i].price}</h2>
		                            </div>
		                    </div>`
				}
				
				$(".home-series").eq(index).find(".home-series-content").find("ul").html(html_ul);
				$(".home-series").eq(index).find(".home-series-content").find(".home-goods-right").html(html);
			}
		})


	}
	//加载左侧导航
	var ajaxLeftNav = function(index){
		var _index = index;
		var index1 = 0;//取关键字
		$.ajax({
			url:"../data/left_nav_data.json",
			type:"get",
			success:function(res){
				var arr = [];

				if (index ==0) {
					arr=res[index];

				}else{
					index = index-1;
					index+=index*3;
					arr=res[index];
					index1 = index;

				}
				
				var html =``;
				var html_keywords = ``;
				for(var i in arr){
					index1++;
					
					var arr_keywords = res[index1];
					console.log(JSON.stringify(arr_keywords))
					for(var j in arr_keywords){
						html_keywords +=` <a href="#">${arr_keywords[j]}</a>`
					}
					html +=`<div class="inner-pro-list">
						         <a href="#" class="inner-list-name">
						             <img class="lazy-nav" alt="" src="${arr[i].img}" width="60" height="60">${arr[i].title}
						         </a>
						         <div class="inner-pro-content">
						             
						                 ${html_keywords}
						             
						         </div>
						     </div>`
													
					
				}
				console.log(index)
				$(".home-nav-inner ul li").eq(_index).find(".home-inner-secd").html(html);
			}
		})


	}
	var ajaxLeftNav_1 = function(index){
		
		$.ajax({
			url:"../data/left_nav_data.json",
			type:"get",
			success:function(res){
				var arr = res[22];
				var html =``;
				
				for(var i in arr){

					
					html +=`<div class="inner-pro-list">
						         <a href="#" class="inner-list-name">
						             <img class="lazy-nav" alt="" src="${arr[i].img}" width="60" height="60">${arr[i].title}
						         </a>
		
						     </div>`
													
					
				}
				console.log(index)
				$(".home-nav-inner ul li").eq(index).find(".home-inner-secd").html(html);
			}
		})


	}

	return{

		ajax1:ajax1,
		ajax2:ajax2,
		ajaxGoods:ajaxGoods,
		ajaxLeftNav:ajaxLeftNav,
		ajaxLeftNav_1:ajaxLeftNav_1
	}
})