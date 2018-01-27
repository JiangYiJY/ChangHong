console.log("载入成功");

/*
	设置需要引入的js文件
*/
require.config({
	paths: {
		// 模块名字: 模块路径
		"jquery": "jquery-1.11.3", //遵从AMD规范
		"jquery-cookie": "jquery.cookie",
		"index": "index",

		"parabola": "parabola"
	},
	shim: {
		/*
			在实例的app中，还用到jquery以外的第三方库
			如果该类库不是一个标准AMD规范，我又不想去改代码
			需要通过下述方式定义该文件
		*/
		"parabola": {
			exports: "_"
		},
		//设置依赖关系
		"jquery-cookie": ["jquery"],
		"parabola": ["jquery"]
	}
})



//要去调用index.js中的main
require(["index"], function(index){
	console.log(index.main());
})
require(["goodsDetail"],function(goodsDetail){
	
	goodsDetail.goodsDetail();
})
require(["scroll"],function(scroll){
	scroll.scroll();
})
//放大镜
require(["mirror"],function(mirror){
	mirror.mirror();
})
//切换放大镜的图片
require(["tab"],function(tab){
	tab.tab();

})
//配送地址的城市选择
require(['city'],function(city){
	city.city();
})
//商品列表页加载
require(["list"],function(list){
	list.list();
})
//购物车cookie
require(["goodsCookie"],function(cookie){
	cookie.cookie();
})


/*//调用slide.js 中的 slide函数
require(["slide"], function(slide){
	console.log(slide.slide());
})*/
//注册
require(["register"],function(register){
	register.register();
})
//登录验证
require(["login"],function(login){
	login.login();
})















