						// 第三部分轮播图点击事件
var actives = document.querySelector('ul.carousel-one>li');
var index = 0;			// 记录当slide滑到了第几个位置
var number = 5;         // 一排放5个
var li = null, img = null;
	// 根据当前实际的li数量控制前一个和后一个是否需要禁用
		document.querySelector('input.carousel-one-btn-prev').disabled = true;
		document.querySelector('input.carousel-one-btn-next').disabled = index === 2;
	// 前一个（前提是没有被禁用）
	document.querySelector('input.carousel-one-btn-prev').onclick = function() {
		document.querySelector('input.carousel-one-btn-next').disabled = false; 
		index = index - 1;
		document.querySelector('ul.carousel-one').style.marginLeft = '-' + index * (100 / number) + '%';
		document.querySelector('input.carousel-one-btn-prev').disabled = index === 0;
	};
	// 后一个（前提是没有被禁用）
	document.querySelector('input.carousel-one-btn-next').onclick = function() {
		document.querySelector('input.carousel-one-btn-prev').disabled = false;
		index = index + 1;
		document.querySelector('ul.carousel-one').style.marginLeft = '-' + index * (100 / number) + '%';
		document.querySelector('input.carousel-one-btn-next').disabled = index === 2 ;
	};



         // 第五部分轮播图 
 var actives = document.querySelector('ul.carousel-two>li');
 var index = 0;			// 记录当slide滑到了第几个位置
 var number = 5;         // 一排放5个
 var li = null, img = null;
 // 根据当前实际的li数量控制前一个和后一个是否需要禁用
 	document.querySelector('input.carousel-two-btn-prev').disabled = true;
 	document.querySelector('input.carousel-two-btn-next').disabled = index === 2;
	// 前一个（前提是没有被禁用）
	document.querySelector('input.carousel-two-btn-prev').onclick = function() {
		document.querySelector('input.carousel-two-btn-next').disabled = false; 
		index = index - 1;
		document.querySelector('ul.carousel-two').style.marginLeft = '-' + index * (100 / number) + '%';
		document.querySelector('input.carousel-two-btn-prev').disabled = index === 0;
	};
	// 后一个（前提是没有被禁用）
	document.querySelector('input.carousel-two-btn-next').onclick = function() {
		document.querySelector('input.carousel-two-btn-prev').disabled = false;
		index = index + 1;
		document.querySelector('ul.carousel-two').style.marginLeft = '-' + index * (100 / number) + '%';
		document.querySelector('input.carousel-two-btn-next').disabled = index === 2 ;
	};

						// 最后一个大的轮播图
//不在函数中声明的变量就是全局变量
var timer = null;  //将来绑定interval计时器（全局变量）
//1.找到所有的indicators绑定点击事件
var indicators = document.querySelectorAll('ul.banner-indicators>li');
for(var i = 0; i < indicators.length; i++) {
	indicators[i].index = i
	indicators[i].onmouseover = function(){	
		var index = this.index;
		//判断你要看的是不是已经处于激活了，如果是什么也不做，直接return
		if(this.className.indexOf('active') !== -1) return;
		bannerToggle(index);
	};
}
//函数声明
 function bannerToggle(index) {
	 	//1.2让当前处于激活不激活
 	document.querySelector('ul.banner-indicators>li.active').className = '';
		//1.3让该激活的激活
		indicators[index].className = 'active';
		//2.控制slide滑动
		document.querySelector('ul.banner-slide').style.marginLeft = '-' + index + '00%';
 }
//自动播放
function autoplay() {
	//开启一个interval计时器
	timer = setInterval(function() {
		//算出合理的下一张的index的值
		var index = document.querySelector('ul.banner-indicators>li.active').index;
		index = index === indicators.length - 1 ? 0 : index + 1;
		//使用index值作为参数调用bannerToggle切换banner
		bannerToggle(index);	
	}, 5000);
}
//给整个banner绑定鼠标滑入和划出的事件（停止或者重新开启的轮播）
document.querySelector('.banner-four').onmouseover = function() {
	clearInterval(timer);
};
document.querySelector('.banner-four').onmouseout = function() {
	autoplay(); 
};
autoplay();   //调用autoplay开启自动播放