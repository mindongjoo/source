/* script.js - 스크립트, 2012 © yamoo9.com
---------------------------------------------------------------- */
(function($) { 
	// 문서가 준비되면, 초기화 함수 실행.
	$(document).ready(init);
	
	// 초기화 함수.
	function init() {
		hideLabel(); 							// 스크립트 지원 시, label 요소 감추기
		addRequiredStar(); 						// '필수 작성' input에 *를 붙임
		altPlaceholder('input:not(:checkbox)');	// HTML5 placeholder 대체 
		IE_PIE('#reg, #add_count, #reg_new'); 	// IE 성능 향상 라이브러리 활용
	};
	
	function hideLabel() {
		$('label', '#reg').not('[for=accept_terms]').addClass('blind');
	};
	
	function addRequiredStar() {
		var target = $('[required]', '#reg');
		$('<span/>', {
			text: '*',
			css: {
				'color': '#ff4248',
				'font': 'bold 12px Verdana',
				'vertical-align': 'middle',
				'margin-left': '5px'
			}
		}).insertAfter(target);
	};
	
	function altPlaceholder(target) {
		if(Modernizr.input.required) return;
		$(target).each(function() {
			var $this = $(this),
				input_holder = $this.attr('placeholder');
				$this
				.val(input_holder)
				.bind('focus', function() {
					if($this.val() !== '') $this.val('');
				})
				.bind('blur', function() {
					if($this.val() === '') $this.val(input_holder);
				});
		});
	};
	
	function IE_PIE(target) {
		if($.browser.msie && $.browser.version < 10) {
			if($.browser.version < 9) $.getScript('include/js/libs/IE9.min.js');
			$.getScript('include/js/libs/PIE.min.js', function() {
				$(target).each(function() { PIE.attach(this); });
			});
		};
	};
	
})(jQuery);