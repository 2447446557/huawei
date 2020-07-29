// 先判断去过主页吗？没去过就跳到主页
if(!Cookies.get('init')) window.location.replace('../home/home.html');

// 1. 购物车初始化
document.querySelector('a.goto-login').onclick = function() {
	Cookies.set('target', window.location.href);
	window.location.replace('../login/login.html');
};
// 尝试从Cookie中获取用户的用户名，进而判断是否登录
var uName = Cookies.get('uName');
if(uName) {	// 登录了
	var cart = JSON.parse(Cookies.get('cart'));
	var userCart = cart.filter(function(item) { return item.uName === uName; });
	if(userCart.length === 0) { // 当前登录用户购物车为空
		document.querySelector('.cart-empty').style.display = 'block';
	} else {					// 录前登录用户有购物信息
		var tr = null, tbody = document.querySelector('.cart-list tbody'), temp = null;
		for(var i = 0; i < userCart.length; i++) {
			temp = product.find(function(item) { return item.id === userCart[i].pid; });
			tr = document.createElement('tr');
			tr.dataset.id = userCart[i].id;
			tr.innerHTML = `
				<td><i class="checkbox checked"></i></td>
				<td><img src="${temp.avatar}" /></td>
				<td>${temp.name}</td>
				<td>${temp.price}</td>
				<td>
						<span class="btn-decrease${userCart[i].count === 1 ? ' disabled' : ''}">-</span>
						<span class="count">${userCart[i].count}</span>
						<span class="btn-increase${userCart[i].count === 10 ? ' disabled' : ''}">+</span>
			
					
				</td>
				<td><input type="button" class="btn-remove" value="删除" /></td>
			`;
			tbody.appendChild(tr);
		}
		document.querySelector('.cart-list').style.display = 'block';
		updateCountAndAccount();
	}
} else {	// 没登录
	document.querySelector('.unlogin').style.display = 'block';
}

//  2. 删除按钮绑定点击事件
var btnRemoves = document.querySelectorAll('input.btn-remove');
for(var i = 0; i < btnRemoves.length; i++) {
	btnRemoves[i].onclick = function() {
		if(!confirm('真删？')) return;
		// 获取当前要删除的购物记录的id值
		var removeTr = this.parentNode.parentNode;
		var id = parseInt(removeTr.dataset.id);
		// 从cookie中拿出所有购物记录，删除要删除的，再更新cookie
		var cart = JSON.parse(Cookies.get('cart'));
		var index = cart.findIndex(function(item) { return item.id === id; });
		cart.splice(index, 1);
		Cookies.set('cart', JSON.stringify(cart));
		// 删除tr
		removeTr.parentNode.removeChild(removeTr);
		// 更新总金额和总数量
		updateCountAndAccount();
		// 提示用户删除成功
		alert('删除成功');
		// 如果把所有的购物记录都删了，那么就显示cart-empty，让cart-list隐藏
		if(document.querySelectorAll('.cart-list tbody tr').length === 0) {
			document.querySelector('.cart-list').style.display = 'none';
			document.querySelector('.cart-empty').style.display = 'block';
		}
	};
}

// 3. 数量加减绑定点击事件(采用的是事件委托、冒泡来进行处理)
// 事件冒泡委托优点: 大大减少了页面中函数的数量和事件绑定，提高了页面的运行效率
document.querySelector('.cart-list tbody').onclick = function(e) {
	// 如果点的不是加或减，不做处理，直接return
	if(e.target.className.indexOf('btn-increase') === -1 && e.target.className.indexOf('btn-decrease') === -1) return;
	// 如果点的是加或减，但是自身是处于禁用状态，不做处理，直接return
	if(e.target.className.indexOf('disabled') !== -1) return;
	var id = parseInt(e.target.parentNode.parentNode.dataset.id);			// 找到要修改的购物记录id
	var cart = JSON.parse(Cookies.get('cart'));								// 从cookie中找到所有购物记录
	var target = cart.find(function(item) { return item.id === id; });		// 找到要修改的购物记录对象
	var count = 0;
	if(e.target.className.indexOf('btn-increase') !== -1) {	// 如果是数量增加
		e.target.parentNode.querySelector('span.btn-decrease').className = 'btn-decrease'; 	// 让数量减可以用
		count = target.count + 1;
		if(count === 10) e.target.className += ' disabled';									// 如果达到数量上限，自身禁用
	} else {												// 如果是数量减少
		e.target.parentNode.querySelector('span.btn-increase').className = 'btn-increase';	// 让数量加可以用
		count = target.count - 1;
		if(count === 1) e.target.className += ' disabled';									// 如果达到数量下限，自身禁用
	}
	e.target.parentNode.querySelector('span.count').innerText = count;		// 更新当前操作行的购物数量
	target.count = count;													// 修改本次操作相关的购物记录
	Cookies.set('cart', JSON.stringify(cart));								// 将最新购物记录放回cookie
	updateCountAndAccount();												// 更新总数量和总金额
};

// 4. 全选反选功能事件绑定
var allEl = document.querySelector('i.checkbox.all');
var allCheckboxEls = document.querySelectorAll('tbody i.checkbox');
// thead联动tbody
allEl.onclick = function() {
	if(this.className.indexOf('checked') !== -1) {		// 从选中到没选中
		this.className = 'checkbox all';
		for(var i = 0; i < allCheckboxEls.length; i++) {
				allCheckboxEls[i].className = 'checkbox';
		}
	} else {											// 从没选中到选中
		this.className = 'checkbox all checked';
		for(var i = 0; i < allCheckboxEls.length; i++) {
				allCheckboxEls[i].className = 'checkbox checked';
		}
	}
	updateCountAndAccount();
};
// tbody联动thead
for(var i = 0; i < allCheckboxEls.length; i++) {
	allCheckboxEls[i].onclick = function() {
		if(this.className.indexOf('checked') !== -1) {	// 从选中到没选中
			this.className = 'checkbox';
			allEl.className = 'checkbox all';
		} else {										// 从没选中到选中
			this.className = 'checkbox checked';
			var checkedNumber = document.querySelectorAll('tbody i.checkbox.checked').length;
			if(allCheckboxEls.length === checkedNumber) {
				allEl.className = 'checkbox all checked';
			}
		}
		updateCountAndAccount();
	};
}

// 5. 下单按钮点击事件
document.querySelector('input.btn-buy').onclick = function() {
	// 找到tbody中所有是checked状态的i
	var allCheckedEls = document.querySelectorAll('tbody i.checkbox.checked');
	if(allCheckedEls.length === 0) { 
		alert('请至少选择一件商品噢~');
		return;
	}
	var ids = [];
	for(var i = 0; i < allCheckedEls.length; i++) {
		ids.push(parseInt(allCheckedEls[i].parentNode.parentNode.dataset.id));
	}
	window.location.href = `../orderConfirm/index.html?ids=${JSON.stringify(ids)}`;
};


// 公共辅助函数: 更新选中的商品的总数量和总金额
function updateCountAndAccount() {
	var total = 0, account = 0;
	var trEl = null ,price = 0, count = 0;
	var checkedIEls = document.querySelectorAll('.cart-list tbody i.checkbox.checked');
	for(var i = 0; i < checkedIEls.length; i++) {
		trEl = checkedIEls[i].parentNode.parentNode;
		price = parseInt(trEl.querySelectorAll('td')[3].innerText);
		count = parseInt(trEl.querySelectorAll('td')[4].querySelector('span.count').innerText);
		total += count;
		account += price * count;
	}
	document.querySelector('span.total').innerText = total;
	document.querySelector('span.account').innerText = account;
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
