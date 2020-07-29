//找到 detail-elevator中的所有的li绑定点击事件
var titles = document.querySelectorAll('ul.detail-elevator-title>li');
for(var j = 0; j < titles.length; j++){
	titles[j].index = j;
	titles[j].onclick = function() {
		document.querySelector('ul.detail-elevator-title>li.show').className ='';
		titles[this.index].className += ' show';
		document.querySelector('ul.detail-elevator-con>li.show').className ='';
		document.querySelectorAll('ul.detail-elevator-con>li')[this.index].className += ' show';
	};
}

var order = JSON.parse(Cookies.get('order'));
var orders = [];
var uName = Cookies.get('uName');
order.forEach(function(item) {
	if(item.uName === uName && item.id === id) {
		orders.push(item);
	}
});
var expireTime = parseInt(orders[0].expireTime);
var timer = null; //倒计时函数

function countDown() {
	timer = setInterval(function() {
		var date = new Date( );
		var milliseSeconds = date.getTime();
		if (milliseSeconds > expireTime) {
			alert('订单已取消!');
			clearInterval(timer);
		} else {
			var diff = expireTime - milliseSeconds;

			var minutes = Math.floor(diff / (60 * 1000));
			document.querySelector('span.minute').innerText = minutes;
			
			var seconds = Math.floor(diff % (60 * 1000) / 1000);
			document.querySelector('span.second').innerText = seconds;
		}
	}, 1000);
}
countDown();



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
