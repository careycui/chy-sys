$(function(){
	var navW = $('.left-nav').width(),
		navH = $('.left-nav').height() + 170,
		timeId = '';
	
	$(window).on('scroll',function(){
		if(timeId){
			clearTimeout(timeId);
			timeId = '';
		}
		timeId = setTimeout(function(){
			var scrollTop = $(window).scrollTop();
			if(scrollTop > navH){
				$('.left-nav .ys-nav').css({
					position: 'fixed',
					top: '10px',
					width: navW+'px'
				});
			}else{
				$('.left-nav .ys-nav').css({
					position: 'static',
					top: '0',
					width: 'auto'
				});
			}
			timeId = '';
		},16);
	});
});