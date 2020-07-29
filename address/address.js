new Regions(document.querySelector('input.receive-region'));
// 先判断去过主页吗？没去过就跳到主页
if(!Cookies.get('init')) window.location.replace('../home/home.html');
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
// // 收货地址选择

// 找到toboy绑定点击事件
// var styleEl = document.querySelector('.address-style-wrapper');
// var noChoice = document.querySelector('.no-choice');
// var zhijieEl = document.querySelector('.zhijiexuanze');
// var dialog = document.querySelector('.address-style-popup-wrapper');
// styleEl.onclick = function() {
// 	var dialog = document.querySelector('.address-style-popup-wrapper');
// 	dialog.style.display = 'block';
// 	styleEl.style.display = 'none';
// 	noChoice.style.display = 'none';
// }
// zhijieEl.onclick = function() {
// 	var choice = document.querySelector('.choice-wapper');
// 	choice.style.display = 'block';
// 	styleEl.style.display = 'none';
// 	noChoice.style.display = 'none';
// 	dialog.style.display = 'none';
// }
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
	formEl["receiveZip"].value = target.receiveZip;
}
//清空按钮
document.querySelector('input.btn-cancel').onclick = function() {	
	var formEl = document.forms['address'];
	formEl["receiveName"].value = '';
	formEl["receiveTel"].value = '';
	formEl["receiveRegion"].value = '';
	formEl["receiveAddress"].value = '';
	formEl["receiveZip"].value = '';
};
document.querySelector('input.btn-add').onclick = function() {	
	isAdd = true;
	var formEl = document.forms['address'];
	formEl["receiveName"].value = '';
	formEl["receiveTel"].value = '';
	formEl["receiveRegion"].value = '';
	formEl["receiveAddress"].value = '';
	formEl["receiveZip"].value = '';
};
// 为添加地址按钮绑定点击事件
document.querySelector('input.btn-add').onclick = function() {
	var formEl = document.forms['address'];				// 先找表单
	var newAddress = {									// 搜集表单中的数据，整合成newAddress
		uName: uName,
		receiveName: formEl["receiveName"].value,
		receiveTel: formEl["receiveTel"].value,
		receiveRegion: formEl["receiveRegion"].value,
		receiveAddress: formEl["receiveAddress"].value,
		receiveZip: formEl["receiveZip"].value
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
		trEl.cells[3].innerText = newAddress.receiveZip;
		// 3. 提示用户新地址添加成功
		alert('地址修改成功');
	}
	Cookies.set('address', JSON.stringify(address));						// 将最新的地址数据更新到cookie中
	var formEl = document.forms['address'];
	formEl["receiveName"].value = '';
	formEl["receiveTel"].value = '';
	formEl["receiveRegion"].value = '';
	formEl["receiveAddress"].value = '';
	formEl["receiveZip"].value = '';
};
// 动态生成一个tr并附加到tbody中(参数的巧妙设计)
function generateTr(item) {
	var tbodyEl = document.querySelector('table.address-list>tbody');
	tbodyEl.innerHTML += `
		<tr data-id='${item.id}'>
			<td>${item.receiveName}</td>
			<td>${item.receiveRegion} - ${item.receiveAddress}</td>
			<td>${item.receiveZip}</td>
			<td>${item.receiveTel}</td>
			<td>
				<p class='btn-update'>修改</p>
				<p class='btn-remove'>删除</p>
				<input type='button' 
					value='${item.isDefault ? "默认地址" : "设为默认地址"}' 
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