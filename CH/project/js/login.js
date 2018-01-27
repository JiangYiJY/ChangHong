define(["jquery","jquery-cookie"],function($){
	var login = function(){
		$(function(){
			var arr_login = [0,0];
			$("#username").blur(function(){
				if ($.cookie("user")) {
					var str = $.cookie("user");
					var arr = eval(str);
					var isEqual = false;
					for(var i in arr){
						if(arr[i].phone == $(this).val() ){
							isEqual = true;
							arr_login[0]=1;
							break;

						}
					}
					if (!isEqual) {
						$(this).next().html("<span>用户名不存在</span>");
					}
				}else{
					$(this).next().html("<span>用户名不存在</span>");
				}
			})
			$("#password").blur(function(){
				if ($.cookie("user")) {
					var str = $.cookie("user");
					var arr = eval(str);
					var isEqual = false;
					for(var i in arr){
						if(arr[i].phone == $("#username").val() && arr[i].password == $(this).val() ){
							isEqual = true;
							var html = `<span class="regist-success" style="width:40px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
							$(".errorMsg").html(html);
							arr_login[1]=1;
							break;

						}
					}
					if (!isEqual) {
						var html = `<span class="regist-success" style="width:40px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
						$(".errorMsg").html(html);
						

					}
				}else{
					var html = `<a class="error-msg">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请输入正确的账号和密码</a>`;
					$(".errorMsg").html(html);
				}
			})
			//登录
			$("#loginDiv").click(function(){
				var sum = 0;
				for(var i in arr_login){
					sum+= arr_login[i];
				}
				if (sum ==2) {
					location.assign("pay.html");
				}else{
					alert("error");

				}
			})
			//注册
			$(".new-login-register").click(function(){
				location.assign("register.html");
			})
		})
	}
	return {
		login:login
	}
	
})