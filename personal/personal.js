var recents =  document.querySelector('div.recent-preview-carousel>ul');
var index = 0;			// 记录当slide滑到了第几个位置
var number = 4;         // 一排放4个
var li = null;
for(var i = 0; i < recents.length; i++) {}

// 根据当前实际的li数量控制前一个和后一个是否需要禁用
document.querySelector('input.recent-preview-btn-prev').disabled = true;
document.querySelector('input.recent-preview-btn-next').disabled = index === 5;

// 前一个（前提是没有被禁用）
document.querySelector('input.recent-preview-btn-prev').onclick = function() {
	document.querySelector('input.recent-preview-btn-next').disabled = false; 
	index = index - 1;
	document.querySelector('.recent-preview-carousel>ul').style.marginLeft = '-' + index * (100 / number) + '%';
	document.querySelector('input.recent-preview-btn-prev').disabled = index === 0;
};
// 后一个（前提是没有被禁用）
document.querySelector('input.recent-preview-btn-next').onclick = function() {
	document.querySelector('input.recent-preview-btn-prev').disabled = false;
	index = index + 1;
	document.querySelector('.recent-preview-carousel>ul').style.marginLeft = '-' + index * (100 / number) + '%';
	document.querySelector('input.recent-preview-btn-next').disabled = index === 5 ;
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
