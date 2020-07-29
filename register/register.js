	document.querySelector('input.btn-reg').onclick = function() {
		var number = document.querySelector('input.inputNumber').value;
		var pwd = document.querySelector('input.inputpassword').value;
		var user = JSON.parse(Cookies.get('user'));
		user.push({														
			name:number,
			pwd:pwd
		});		
		Cookies.set('user', JSON.stringify(user));
		alert('注册成功');
		window.location.replace('../login/login.html');
	}