var timer = null;
function bannerToggle(index) {
	document.querySelector("ul.banner-indicators>li.active").className= "";
	indicators[index].className = "active";
	document.querySelector("ul.banner-slide").style.marginLeft = "-" + index + "00%";
};
var indicators = document.querySelectorAll("ul.banner-indicators>li");
for(var i = 0; i < indicators.length; i++) {
	indicators[i].index = i ;
	indicators[i].onclick = function() {
		bannerToggle(this.index);
	};
}
document.querySelector(".banner-btn-prev").onclick = function() {
	// 1.1获取要让第几个激活
	var index = document.querySelector("ul.banner-indicators>li.active").index;
	index = index === 0 ?3 : index - 1;
	// 1.2 让当前激活的不激活
	bannerToggle(index);
};
document.querySelector(".banner-btn-next").onclick = function() {
	// 1.1获取要让第几个激活
	var index = document.querySelector("ul.banner-indicators>li.active").index;
	index = index === 3 ? 0 : index + 1;
	// 1.2 让当前激活的不激活
	bannerToggle(index);
};
function autoPlay() {
	timer = setInterval(function() {
		var index = document.querySelector("ul.banner-indicators>li.active").index;
		index = index === 3 ? 0 : index + 1;
		bannerToggle(index);
	}, 5000);
}
document.querySelector(".banner").onmouseover = function() {
	clearInterval(timer);
};
document.querySelector(".banner").onmouseout = function() {
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


// var aaa = document.querySelectorAll('ul.list1 a');
// for(var i = 0; i < aaa.length; i++) {
// 	aaa[i].onclick = function() {
// 		this.href = '../qiyegou/hoverv20.html';
// 	};
// }