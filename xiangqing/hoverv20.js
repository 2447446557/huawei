
if(! Cookies.get("init"))window.location.replace("../login/login.html");

var id = location.search.slice(location.search.lastIndexOf("=") + 1);
id = id ? parseInt(id) : 2;
var pro = product.find(function(item) {return item.id === id;});

document.querySelector(".add").onclick = function() {
	var uName = Cookies.get("uName");
	if(!uName) {
		Cookies.set("target",window.location.href);
		window.location.href = "../home/home.html"
	}else {
		var cart = JSON.parse(Cookies.get('cart'));
		var temp = cart.find(function(item) { return item.uName === uName && item.pid === id;});
		if(temp) {
			var count= temp.count + parseInt(document.querySelector("input.count").value);
			if(count > 5) {
				alert("最多再买" + (5 - temp.count) + "个");
				return;
			} else {
				temp.count = count;
			}
		} else {
			var count = parseInt(document.querySelector("input.count").value);
			if(count > 5) {
				alert("最多买5个");
				return;
			} else {
				cart.push( {
					id: cart[cart.length - 1].id + 1,
					uName: uName,
					pid: id,
					count: count
				});
			}
		
		}
		Cookies.set('cart', JSON.stringify(cart));
		console.log(JSON.parse(Cookies.get('cart')));
	}
	alert("加入购物车成功");
};
var ids = [];
document.querySelector('.xiadan').onclick = function() {
	ids.push(pro.id);	
	window.location.href = `../orderConfirm/index.html?ids=${JSON.stringify(ids)}`;
};
var titles = document.querySelectorAll("ul.tab-title>li");
for(var i = 0; i < titles.length; i++) {
	titles[i].index = i;
	titles[i].onclick = function() {
		if(this.className ==="active") return;
		document.querySelector("ul.tab-title>li.active").className = "";
		this.className= "active";
		document.querySelector("ul.tab-content>li.show").className = "";
		document.querySelectorAll("ul.tab-content>li")[this.index].className= "show";
	}	
};
var imgs = ["../images/xiangqing/hoverv20_small1.png", "../images/xiangqing/hoverv20_small2.png", "../images/xiangqing/hoverv20_small3.png", "../images/xiangqing/hoverv20_small4.png", "../images/xiangqing/hoverv20_small5.png", "../images/xiangqing/hoverv20_small6.png"];
var index = 0;
var li = null, img = null;
var number = 5;
for(var i = 0; i < imgs.length; i++) {
	li = document.createElement("li");
	img = document.createElement("img");
	img.src = imgs[i];
	li.appendChild(img);
	document.querySelector(".phone-imgs").appendChild(li);
	
}
document.querySelector("ul.phone-imgs>li").className = "active";
var liImgs = document.querySelectorAll(".phone-imgs-list li");
for(var i = 0; i < liImgs.length; i++) {
	liImgs[i].onmouseover = function() {	
		document.querySelector("li.active").className = "";
		this.className = "active";
		var src = this.querySelector("img").src.replace("small","big");
		document.querySelector("img.big-image").src = src;		
	};
}

document.querySelector("input.prev").onclick = function() {
	document.querySelector("input.next").disabled = false;
	index = index - 1;
	document.querySelector("ul.phone-imgs").style.marginLeft = "-" + index * (100 / number) + "%";
	document.querySelector("input.prev").disabled = index === 0;
	
};
document.querySelector('input.next').onclick = function() {
	document.querySelector('input.prev').disabled = false;
	index = index + 1;
	document.querySelector('ul.phone-imgs').style.marginLeft = '-' + index * (100 / number) + '%';
	document.querySelector('input.next').disabled = liImgs.length;
	
};
function countChange(count) {
	document.querySelector("input.count").value = count;
	var account = parseInt(document.querySelector("span.price").innerText) * count;
	document.querySelector("span.account").innerText = account;
	document.querySelector("input.decrease").disabled = count === 1;
	document.querySelector("input.increase").disabled = count === 5;
	
}
document.querySelector("input.decrease").onclick = function() {
	var count = parseInt(document.querySelector("input.count").value) - 1;
	countChange(count);
};
document.querySelector("input.increase").onclick = function() {
	var count = parseInt(document.querySelector("input.count").value) + 1;
	countChange(count);
};
document.querySelector("input.count").onfocus = function() {
	this.oldValue = this.value;
};
document.querySelector("input.count").onblur = function() {
	var count = parseInt(this.value);
	if(count >= 1 && count <= 5) countChange(count);
	else {
		this.value = this.oldValue;
		alert("购买数量1-5");		
	};	
};
window.onscroll = function() {
	// 1.获取当前滚动的距离
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	// 2.判断滚动的距离有没有超过临界值,大于就显示top按钮,小于就就隐藏
	document.querySelector(".top").style.display = scrollTop >= 300 ? "block" : "none";
};
document.querySelector(".top").onclick = function() {
	window.scrollTo(0,0);
};



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
