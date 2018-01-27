define(["jquery","jquery-cookie"],function($){
	var register = function(){
		$(function(){
			//手机号码
			var arr = [0,0,0,0];
			
			console.log(arr);
			$(".new-login-account").blur(function(){
				
				var reg = /^[1][3578]\d{9}$/;
				if(!reg.test($(this).val())){
					var html = `<span for="phone" generated="true" class="new-register-error">不是正确的手机号</span>`;
					$(this).next().html(html);
				}else{
					//成功
					var html = `<span class="regist-success" style="width:40px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
					$(this).next().html(html);
					arr[0] = 1;
					/*alert(arr);*/
				}
				if($(this).val() == ""){
					var html =`<span for="phone" generated="true" class="new-register-error">请输入手机号</span>`;
					$(this).next().html(html);
				}
				
			})
			//输入密码
			$("#confirm-pwd").blur(function(){
				var reg1 = /\d+/g;
				var reg2 = /[azAZ]+/g
				var len = $(this).val().length;
				console.log(len);
				if(!(reg1.test($(this).val())&&reg2.test($(this).val())&& len >=8 &&len<=16)){
					
					$(".registered-pw-tips").css({display:'block'});
				}else{
					$(".registered-pw-tips").css({display:'none'});
					var html = `<span class="regist-success" style="width:40px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
					$(".confirm-pwd-success").html(html);
					arr[1] = 1;
					/*alert(arr);*/
				}
				if($(this).val() == ""){
					$(".registered-pw-tips").css({display:'none'});
					var html =`<span for="confirm-pwd" generated="true" class="new-register-error" style="display: block;">请输入密码</span>`;
					$(".confirm-pwd-success").html(html);
				}
			})
			//确认密码
			$("input[name='checkpwd']").blur(function(){

				var pre = $("input[name = 'password']");
				if($(this).val() != pre.val()){
					var html = `<span for="checkpwd" generated="true" class="new-register-error">
					两次密码不一致</span>`;
					$(".check_pwd_msg").html(html);

				}else{
					var html = `<span class="regist-success" style="width:40px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
					$(".check_pwd_msg").html(html);
					arr[2] = 1;
					/*alert(arr);*/
				}
			})
			//图片验证
			$("#registCode").blur(function(){
				
				var len = $(this).val().length;
				if ($(this).val() == "") {
					var html =`<span class="new-register-error" >验证码不能为空</span>`;
					$(".register-validation-pic-msg").html(html);
				}else{
					if (len!=4) {
						var html = `<span class="new-register-error" >验证码只能是4位</span>`;
						$(".register-validation-pic-msg").html(html);
						
					}else{
						if (!/^5y2y$/ig.test($(this).val())) {
							var html = `<span class="new-register-error" >验证码不正确</span>`;
							$(".register-validation-pic-msg").html(html);
						}else{
							var html = `<span class="regist-success" style="width:40px;">&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
							$(".register-validation-pic-msg").html(html);
							arr[3] = 1;
							/*alert(arr);*/
						}
					}
				}
				
				
			})
			console.log(arr);
			//页面加载进来鼠标默认选中手机号的输入框;
			$(".new-login-account").focus();
			//sum = 4时提交数据
			
			
			$(".new-register-btn").click(function(){
				var sum = 0;
				for(var i in arr){
					sum+= arr[i];
				}
				/*$.cookie('user',null)*/
				console.log('arr:'+arr)
				console.log("sum ="+sum);
				var phone =$('.new-login-account').val();
				var password = $('#confirm-pwd').val();
				if (sum == 4) {
					if($.cookie("user")){
						var str = $.cookie("user");
						var arr1 = eval(str);
						console.log(arr1)
						var obj = {phone:`${phone}`,password:`${password}`};

						
						arr1.push(obj);
						$.cookie("user",JSON.stringify(arr1),{expires:7});
						
					}else{
						
						$.cookie("user",`[{phone:"${phone}",password:"${password}"}]`,{
						expires:7
					});
					}
					
					alert("注册成功");
					console.log($.cookie("user"));
				}else{
					console.log($.cookie("user"))
					alert("error")
					return false;
				}
			})
			
		})
	}
	return {register:register};
})