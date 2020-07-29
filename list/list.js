var imgs = [
	{ id: 001, img: "../images/list/mate301.png", name: "HUAWEI Mate X", faver: "多款可选", price: 16999},
	{ id: 002, img: "../images/list/mate302.png", name: "HUAWEI Mate 30 Pro 5G", faver: "整点赠送", price: 6399},
	{ id: 003, img: "../images/list/mate303.png", name: "HUAWEI Mate 30 5G", faver: "整点赠送", price: 4999},
	{ id: 004, img: "../images/list/mate304.png", name: "HUAWEI Mate 20", faver: "积分双倍抵现", price: 3199},
	{ id: 005, img: "../images/list/mate305.png", name: "HUAWEI Mate 30", faver: "整点赠送", price: 3999},
	{ id: 006, img: "../images/list/mate306.png", name: "HUAWEI Mate 30 RS", faver: "多款可选", price: 12999},
	{ id: 007, img: "../images/list/mate307.png", name: "HUAWEI Mate 20 pro", faver: "积分双倍抵现", price: 5099},
	{ id: 008, img: "../images/list/mate308.png", name: "HUAWEI Mate 20 X 5G", faver: "限时特价", price: 5199},
	{ id: 009, img: "../images/list/mate309.png", name: "HUAWEI Mate 30 Pro", faver: "整点赠送", price: 5799},
	{ id: 010, img: "../images/list/mate310.png", name: "HUAWEI Mate 20 RS", faver:"多款可选", price: 12999}
];
var i = null, a = null, img = null, h4 = null,span = null, p = null;
var ul =document.querySelector("ul.list1");
for(var i = 0; i <imgs.length; i++) {
	li = document.createElement("li");
	a = document.createElement("a");
	a.className = 'main-content' + i;
	img = document.createElement("img");
	img.src = imgs[i].img;
	a.appendChild(img);
	h4 = document.createElement("h4");
	h4.innerText = imgs[i].name;
	a.appendChild(h4);
	span = document.createElement("span");
	span.innerText = imgs[i].faver;
	a.appendChild(span);
	p = document.createElement("p");
	p.innerText = "￥" + imgs[i].price;
	a.appendChild(p);
	
	li.appendChild(a);
	ul.appendChild(li);	
}
// var aaa = document.querySelector('a.main-content1');
// aaa.href = '../xiangqing/detail1.html';

// var bbb = document.querySelector('a.main-content0');
// bbb.href = '../xiangqing/xiangqing.html';

// var bbb = document.querySelector('a.main-content2');
// bbb.href = '../xiangqing/xiangqing.html';
// var bbb = document.querySelector('a.main-content3');
// bbb.href = '../xiangqing/xiangqing.html';
// var bbb = document.querySelector('a.main-content4');
// bbb.href = '../xiangqing/xiangqing.html';
// var bbb = document.querySelector('a.main-content5');
// bbb.href = '../xiangqing/xiangqing.html';
// var bbb = document.querySelector('a.main-content6');
// bbb.href = '../xiangqing/xiangqing.html';
// var bbb = document.querySelector('a.main-content7');
// bbb.href = '../xiangqing/xiangqing.html';
// var bbb = document.querySelector('a.main-content8');
// bbb.href = '../xiangqing/xiangqing.html';
// var bbb = document.querySelector('a.main-content9');
// bbb.href = '../xiangqing/xiangqing.html';


var aaa = document.querySelectorAll('ul.list1 a');
for(var i = 0; i < aaa.length; i++) {
	aaa[i].onclick = function() {
		this.href = '../xiangqing/detail1.html';
	};
}
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