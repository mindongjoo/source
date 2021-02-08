/* jquery.lavalamp.js - 라바 램프 네비게이션 플러그인, 2012 © yamoo9.com
----------------------------------------------------------------- */
(function($) {
	$(function() {
			
		// 라바램프 플러그인 실행.	
		$('#navigation').lavalamp({
			gap: 20,
			speed: 600,
			easing: 'easeInOutElastic',
			reset: 1500
		});
		
		// <a> 클릭 시, href 주소로 연결 차단.
		$('#navigation').find('a').click(function(e) {
			e.preventDefault();						
		});
		
		/* ///////////////////////////////////////////////////
		IE 6-9 브라우저를 위한 PIE 라이브러리 활용.
		border-radius | box-shadow | linear-gradient
		/////////////////////////////////////////////////// */			
		if($.browser.msie && $.browser.version < 9) {
			$.getScript('js/PIE.js', function() {
				$('li.lava', '#nav').each(function() {
					PIE.attach(this);
				});	
			});
		};
			
	});	
})(jQuery);