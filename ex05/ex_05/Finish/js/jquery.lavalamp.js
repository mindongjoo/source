/* jquery.lavalamp.js - 라바 램프 네비게이션 플러그인, 2012 © yamoo9.com

	옵션 설정
	
		gap 	: lava 위, 아래로 추가되는 공간,
		bgColor	: lava의 배경 색,
		speed	: 애니메이션 속도 설정 1000 = 1초,
		easing 	: 이징 모션 설정 (참고 http://gsgd.co.uk/sandbox/jquery/easing/),
		reset 	: 마우스가 나가면 원래 위치로 돌아가는 속도 설정 1000 = 1초
		
		easeOutQuad   | easeOutQuad    | easeInOutQuad
		easeInCubic   | easeOutCubic   | easeInOutCubic
		easeInQuart   | easeOutQuart   | easeInOutQuart
		easeInQuint   | easeOutQuint   | easeInOutQuint
		easeInSine    | easeOutSine    | easeInOutSine
		easeInExpo    | easeOutExpo    | easeInOutExpo 
		easeInCirc    | easeOutCirc    | easeInOutCirc 
		easeInElastic | easeOutElastic | easeInOutElastic
		easeInBack    | easeOutBack    | easeInOutBack
		easeInBounce  | easeOutBounce  | easeInOutBounce 

---------------------------------------------------------------- */

;(function($) {
	$.fn.lavalamp = function(options) {
		options = $.extend({
			gap: 20,
			bgColor: '#eee',
			speed: 400,
			easing: 'easeInOutElastic',	
			reset: 2000
		}, options);
		
		return this.each(function() {
		
			// 대상 참조
			var $nav = $(this),
				$current_item = $(this).find('.focus'),
				$lava = $('<li class="lava"/>'),
				reset;
		
			// $lava의 기준요소 $(this) 설정 및 <a> z-index 높이 조정
			$nav.css('position', 'relative')
				.find('a').css({
					position: 'relative',
					zIndex: 1
				});
				
			// $lava 조작 및 스타일링
			$lava.css({
				position: 'absolute',
				top: $current_item.position().top - options.gap/2,
				left: $current_item.position().left,
				width: $current_item.outerWidth(),
				height: $current_item.outerHeight() + options.gap,
				backgroundColor: options.bgColor		
			}).appendTo($nav.find('ul'));
		
			// $nav의 li에 마우스/포커스 이벤트 핸들링 제어
			$nav.find('li')
			.bind('mouseover focusin', function() {
				// 마우스 오버, 포커스 상태에서 수행할 코드
				clearTimeout(reset);
				$lava.animate({ 
					left: $(this).position().left,
					width: $(this).outerWidth()
				}, {
					duration: options.speed,
					easing: options.easing,
					queue: false
				});
			})
			.bind('mouseout focusout', function() {
				// 마우스 오버, 포커스 상태에서 수행할 코드
				reset = setTimeout(function() {
					$lava.animate({
						left: $current_item.position().left,
						width: $current_item.outerWidth()					
					}, options.speed);
				}, options.reset);
			})
			// <li> 클릭 시, .focus 추가
			.click(function() {
				$(this)
					.siblings().removeClass('focus')
				.end().addClass('focus');
				$current_item = $(this);
			});
		});
	};
})(jQuery);