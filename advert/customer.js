var timer = null;
// banner切换
function bannerToggle(index) {
	document.querySelector('.banner-indicator>li.active').className = '';
	indicators[index].className = 'active';
	document.querySelector('ul.banner-slide').style.marginLeft = '-' + index + '00%';
};
// banner,小按钮
var indicators = document.querySelectorAll('.banner-indicator>li');
for(var i = 0; i < indicators.length; i++) {
	indicators[i].index = i;
	indicators[i].onmouseover = function() {
		if(this.className === 'active') return;
		bannerToggle(this.index);
	}
};
// 自动播放
function autoPlay() {
	timer = setInterval(function() {
		var index = document.querySelector('ul.banner-indicator>li.active').index;
		index = index === indicators.length - 1 ? 0 : index + 1;
		bannerToggle(index);
	},3000);
}
document.querySelector('.banner').onmouseover = function() {
	clearInterval(timer);
}
document.querySelector('.banner').onmouseout = function() {
	autoPlay();
};
autoPlay();
// 1.尝试从cookie中获取用户的用户名,进而判断是否登录
var login = '请登录';
var exit = '注册';
var li = document.querySelector('.logins');
a = document.createElement('a');
a.className = 'unlogin';
a.href = "../login/login.html";
li.appendChild(a);
if(Cookies.get('uName')) {
	login = Cookies.get('uName');
	exit = '退出';
	a.href = "../personal/personal.html";
}
top1();
function top1() {
	document.querySelector('.unlogin').innerText = login;
	document.querySelector('.zc').innerText = exit;
}
