/* tooltip.js - 툴팁 디자인 스크립트, 2012 © yamoo9.com	
---------------------------------------------------------------- */
(function($) {		// 자가 실행함수 내부에 jQuery 객체를 $에 참조 전달.
	$(function() {	// jQuery Ready()문.
	
		/* ///////////////////////////////////////////////////
		IE 7~8를 위한 PIE 라이브러리 활용.
		border-radius | box-shadow | linear-gradient
		/////////////////////////////////////////////////// */			
		if($.browser.msie && $.browser.version > 6 && $.browser.version < 9) {
			$.getScript('js/PIE.js', function() {
				$('.tooltip').each(function() {
					PIE.attach(this);
				});	
			});
		};
	
		// CSS 트렌지션을 지원하지 않는 브라우저 판별.
		if(!Modernizr.csstransitions) {
			// .tooltip-box 요소를 감춥니다.
			$('.tooltip-box').fadeTo(10, 0);
			
			// a.tooltip에 마우스가 올라가면
			$('a.tooltip').hover(function() {
				// 마우스가 올라왔을 때 처리 동작.
				$(this).stop().animate({'border-color': '#fff'}, 400)
				.find('.tooltip-box').stop().animate({'opacity': 1, 'bottom': '90px'}, 400);
			}, function() {
				// 마우스가 내려갔을 때 처리 동작.
				$(this).stop().animate({'border-color': '#4b4b4b'}, 400)
				.find('.tooltip-box').stop().animate({'opacity': 0, 'bottom': '100px'}, 400);
			});
		};
		
	});	
})(jQuery);