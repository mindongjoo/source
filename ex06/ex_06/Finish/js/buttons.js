/* buttons.js - 버튼 스크립트, 2012 © yamoo9.com
---------------------------------------------------------------- */
(function($) {
	
	if(!!Modernizr.audio) $('.button').sound();
	
	/* ///////////////////////////////////////////////////
		IE 9 이하 브라우저를 위한 PIE 라이브러리 활용.
		border-radius | box-shadow | linear-gradient
	/////////////////////////////////////////////////// */			
	if($.browser.msie && $.browser.version < 10) {
		$.getScript('js/libs/PIE.min.js', function() {
			$('.button').each(function() {
				PIE.attach(this);
			});
		});
	};

})(jQuery);