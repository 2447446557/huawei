// 先判断去过主页吗？没去过就跳到主页
if(!Cookies.get('init')) window.location.replace('../home/home.html');

// 订单确认页面, 只有通过商品详情页（直接下单按钮）和购物车页面（下单按钮）才能跳过来
// 你是不是从购物车页面来的,不是那么跳转至购物车
// if(document.referrer.indexOf('/cart/index.html') === -1) window.location.replace('../cart/index.html');
// if(document.referrer.indexOf('/cart/index.html' && '/xiangqing/xiangqing.html') === -1) window.location.replace('../cart/index.html');
// 统一从cookie中取出所有的相关数组
var cart = JSON.parse(Cookies.get('cart'));
var order = JSON.parse(Cookies.get('order'));									
var orderDetail = JSON.parse(Cookies.get('orderDetail'));
var address = JSON.parse(Cookies.get('address'));
var uName = Cookies.get('uName');

// 获取要下单的购物车记录的id的数组
var index = window.location.href.lastIndexOf('=');
var ids = JSON.parse(window.location.href.slice(index + 1));  // [1,2]
// 找出当前要下单的对应的购物记录
var buyList = [], buyListItem = null;
cart.forEach(function(item) {
	if(ids.indexOf(item.id) !== -1) buyList.push(item);
});

// 3. 动态展示buyList对应的购物记录(也就是马上要下单的商品)
var ulEl = document.querySelector('ul.buy-list'), account = 0;
buyList.forEach(function(item) {
	var temp = product.find(function(item2) { return item2.id === item.pid; });
	ulEl.innerHTML += `
		<li>
			<img src="${temp.avatar}" />
			<h4>${temp.name}</h4>
			<span>*${item.count}</span>
			<span>￥${temp.price}.00</span>
		</li>
	`;
	account += temp.price * item.count;
});
document.querySelector('span.account').innerText = account;

// 订单提交
document.querySelector('input.btn-confirm').onclick = function() {
	// 1. 向订单数组中加入新的订单相关数据
	var date = new Date();
	var orderId = 'jd' + date.getTime();											// 订单的编号
	var uName = Cookies.get('uName');												// 订单相关用户的名字
	var addressId = parseInt(addressListEl.querySelector('li.select').dataset.id);	// 订单相关地址的编号
	var account = parseInt(document.querySelector('span.account').innerText);		// 订单总金额
	var isPay = false;																// 订单是否付款
	var expireTime = date.getTime() + 60 * 60 * 1000;								// 订单最后付款时间（毫秒数）
	var time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	
	order.push({																	// 更新order数组
		id: orderId, uName: uName, addressId: addressId, account: account, isPay: isPay, time: time, expireTime: expireTime
	});
	Cookies.set('order', JSON.stringify(order));									// 将更新后的order放回COOKIE中
	// 2. 向订单详情数组中加入新的订单相关数据
	buyList.forEach(function(item) {
		// 更新ordeDetail数组（向其中插入数据）
		orderDetail.push({ 
			id:orderDetail[orderDetail.length - 1].id + 1,
			orderId: orderId,
			productId: item.pid,
			count: item.count
		});
		// 更新cart数组（删除当前要下单的购物记录）
		var index = cart.findIndex(function(item2) { return item2.id === item.id; });
		cart.splice(index, 1);
	});
	Cookies.set('orderDetail', orderDetail);
	Cookies.set('cart', cart);
	// 3. 跳转至付款页面(传订单编号到下一个页面)
	window.location.replace(`../cart-order-success/index.html?id=${orderId}`);

};




new Regions(document.querySelector('input.receive-region'));
// // 先判断去过主页吗？没去过就跳到主页
// if(!Cookies.get('init')) window.location.replace('../home/index.html');
var address = JSON.parse(Cookies.get('address'));
// 尝试从Cookie中获取用户的用户名，进而判断是否登录
var uName = Cookies.get('uName');
if(uName) {		// 如果登录
	// 从address数组中筛选顺当前登录用户相关的所有送货址userAddress
	var userAddress = address.filter(function(item) { return item.uName === uName; });
	// 迭代userAddress动态拼接展示数据
	userAddress.forEach(function(item) { generateTr(item); });
} else {		// 如果没登录
	Cookies.set('target', window.location.href);
	window.location.replace('../login/login.html');
}

// 找到toboy绑定点击事件
function removeHandler(e) {
	if(!confirm('真删？')) return;
	// 先拿到地址编号
	var trEl = e.target.parentNode.parentNode;
	var id = parseInt(trEl.dataset.id);
	// 删除对应的tr
	trEl.parentNode.removeChild(trEl);
	// 更新cookie中的address
	var index = address.findIndex(function(item) { return item.id === id; });
	address.splice(index, 1);
	Cookies.set('address', address);
	// 提示示用户删除成功
	alert('删除成功');
}
function setDefaultHandler(e) {
	if(e.target.className === 'btn-default default') return;
	// 获取当前行
	var target = null, id = 0;
	var trEl = e.target.parentNode.parentNode;
	var defaultInputEl = trEl.parentNode.querySelector('input.btn-default.default');
	if(defaultInputEl) { // 当前存在默认地址
		defaultInputEl.className = 'btn-default';
		defaultInputEl.value = '设为默认地址';
		id = parseInt(defaultInputEl.parentNode.parentNode.dataset.id);
		target = address.find(function(item) { return item.id === id });
		target.isDefault = false;
	}
	e.target.className = 'btn-default default';
	e.target.value = '默认地址';
	id = parseInt(trEl.dataset.id);
	target = address.find(function(item) { return item.id ===id; });
	target.isDefault = true;
	Cookies.set('address', address);
}
document.querySelector('table.address-list>tbody').onclick = function(e) {
	if(e.target.className.indexOf('btn-remove') !== -1) {
		removeHandler(e);
	}
	if(e.target.className.indexOf('btn-update') !== -1) {
		updateHandler(e);
	}
	if(e.target.className.indexOf('btn-default') !== -1) {
		setDefaultHandler(e);
	}
};
// 地址修改
var id = 0;					// 记录当前修改的地址对应的编号是多少
var isAdd = true;			// 标识当前是新增还是修改（真表示新增，假表示修改）
var trEl = null;			// 关联当前正处于修改状态的行对象
function updateHandler(e) {
	isAdd = false;
	trEl = e.target.parentNode.parentNode;
	id = parseInt(trEl.dataset.id);
	var target = address.find(function(item) { return item.id === id; });
	var formEl = document.forms['address'];
	formEl["receiveName"].value = target.receiveName;
	formEl["receiveTel"].value = target.receiveTel;
	formEl["receiveRegion"].value = target.receiveRegion;
	formEl["receiveAddress"].value = target.receiveAddress;
	document.querySelector('.edit-dialog-wrapper').style.display = 'block';
}
// 地址新增
document.querySelector('input.btn-add').onclick = function() {	
	isAdd = true;
	var formEl = document.forms['address'];
	formEl["receiveName"].value = '';
	formEl["receiveTel"].value = '';
	formEl["receiveRegion"].value = '';
	formEl["receiveAddress"].value = '';
	document.querySelector('.edit-dialog-wrapper').style.display = 'block';
};

// 取消按钮绑定点击事件
document.querySelector('input.cancel').onclick = function() {
	var dialog = document.querySelector('.edit-dialog-wrapper');
	dialog.style.display = 'none';
};

// 为保存按钮绑定点击事件
document.querySelector('input.btn-save').onclick = function() {
	var formEl = document.forms['address'];				// 先找表单
	var newAddress = {									// 搜集表单中的数据，整合成newAddress
		uName: uName,
		receiveName: formEl["receiveName"].value,
		receiveTel: formEl["receiveTel"].value,
		receiveRegion: formEl["receiveRegion"].value,
		receiveAddress: formEl["receiveAddress"].value
	};
	if(isAdd) {	// 新增
		newAddress.id = address[address.length - 1].id + 1;
		newAddress.isDefault = false;
		// 1. 数据的新增(address中多了一个对象)
		address.push(newAddress);
		// 2. dom的更新
		generateTr(newAddress);
		// 3. 提示用户新地址添加成功
		alert('新地址添加成功');
	} else {	// 修改
		var index = address.findIndex(function(item) { return item.id === id; });
		newAddress.id = id;
		newAddress.isDefault = address[index].isDefault;
		// 1. 数据的更新（用newAddress替换掉修改前对应的地址）
		address.splice(index, 1, newAddress);
		// 2. dom的更新
		trEl.cells[0].innerText = newAddress.receiveName;
		trEl.cells[1].innerText = `${newAddress.receiveRegion} - ${newAddress.receiveAddress}`;
		trEl.cells[2].innerText = newAddress.receiveTel;
		// 3. 提示用户新地址添加成功
		alert('地址修改成功');
	}
	Cookies.set('address', JSON.stringify(address));						// 将最新的地址数据更新到cookie中
	document.querySelector('.edit-dialog-wrapper').style.display = 'none';	// 关闭地址管理编辑弹窗
};


// 公共的辅助函数
function generateTr(item) {
	var tbodyEl = document.querySelector('table.address-list>tbody');
	tbodyEl.innerHTML += `
		<tr data-id='${item.id}'>
			<td>${item.receiveName}</td>
			<td>${item.receiveRegion} - ${item.receiveAddress}</td>
			<td>${item.receiveTel}</td>
			<td>
				<input type='button' value='修改' class='btn-update' />
				<input type='button' value='删除' class='btn-remove' />
				<input type='button' 
					value='${item.isDefault ? "默认地址" : "设为默认址"}' 
					class='btn-default ${item.isDefault? "default" : ""}' />
			</td>
		</tr>
	`;
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


