// 先判断去过主页吗？没去过就跳到主页
if(!Cookies.get('init')) window.location.replace('../home/index.html');