;(function($) {
	
	$.fn.scrolledFix = function(options) {
		
		// 기본옵션 설정
		$.fn.scrolledFix.defaults = {
			
		}; 
		
		// 옵션 오버라이딩.
		options = $.extend($.fn.scrolledFix.defaults, options);
		
		// win, doc, html, body 참조 함수 설정.
		refInit();
		
		// 플러그인 코드 처리.
		return this.each(function() {
			
			// 플러그인 적용 대상 참조.
			var $this = $(this);
				
		}); // e: return
	}; // e: plugin
	
	// win, doc, html, body 참조 함수
	function refInit() {
		win 	= window, 
		doc 	= document,
		html 	= document.documentElement,
		body 	= document.body;
	};
	
})(jQuery);







