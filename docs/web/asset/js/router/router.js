page('/base.html',function(cnt,next){
	$('#view').load('./base.html');
});

$('a').on('click',function(e){
	e.preventDefault();
	var href = $(this).data('href');
	page(href);
	console.log(href);
});