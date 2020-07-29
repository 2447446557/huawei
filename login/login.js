if(!Cookies.get('init')) window.location.replace('../home/home.html');
document.querySelector('input.buttom-login').onclick = function() {
	var name = document.querySelector('input.name').value;
	var pwd = document.querySelector('input.password').value;
	var user = JSON.parse(Cookies.get('user'));
	var loginUser = user.find(function(item) { return item.name === name && item.pwd === pwd; });
	if(loginUser) {
		Cookies.set('uName',name);
		var target = Cookies.get('target');
		window.location.replace(target || '../home/home.html');
	} else {
		alert('用户名或面码错误');
	}
};