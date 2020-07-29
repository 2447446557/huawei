
window.onscroll = function() {
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	document.querySelector('li.home-top').style.display = scrollTop >= 300 ? 'block' : 'none';
};
document.querySelector('li.home-top').onclick = function() {
	window.scrollTo(0,0);
};
	