/* jquery.galllery3d.js - 2012©yamoo9.com */

;(function($) {
	$.fn.gallery3d = function(options) {

		// 초기 값 및 덮어쓰기	설정.
		options = $.extend({
			current		: 0,	// 활성화 인덱스
			autoPlay	: false,// 자동 넘김 기능 활성화
			sec			: 5	  	// 자동 전환 초
		}, options);
		
		return this.each(function() {
		
			/* 초기화 */
			
			// html { overflow-x: hidden; } 설정.
			$('html').css('overflow-x', 'hidden');
			
			// 플러그인 대상 참조 및 변수 설정.
			var $this = $(this),
				$container = $('<div class="a-container"/>').prependTo($this),
				$links = $this.find('> a'),
				links_length = $links.length,
				$nav, $navPrev, $navNext,
				current = options.current,
				clear_autoplay;

			// gallery3d 클래스 추가.
			$this.addClass('gallery3d');
			
			// 생성한 컨테이너로 하이퍼링크 묶음.
			$container.append($links);
			
			// 하이퍼링크 내부의 이미지 바로 뒤에 인접한 요소에 desc 클래스 설정.
			$links.find('img+*').addClass('desc');
			
			// 하이퍼링크의 개수가 3개 이상일 경우, nav 생성.
			if(links_length > 2) {
				$nav = $('<nav/>').appendTo($this);
				// prev, next 버튼 생성.
				createBtn($nav, '&lt', 'prev');
				createBtn($nav, '&gt', 'next');
				// prev, next 버튼 참조.
				$navPrev = $nav.find('.prev'); 
				$navNext = $nav.find('.next');
				
				// 설정함수 호출.
				setLinks();	
				navigate();
				setTimeout(autoPlay, options.sec*1000);
				
			} else {
				// 하이퍼링크의 개수가 2개 이하일 경우, nav 생성하지 않음.
				delete $nav; delete $navPrev; delete $navNext;
				// 플러그인이 적용된 요소에 lack 클래스 설정.
				$this.addClass('lack clearfix');
				$container.css('margin-left', -$container.width()/2);
			};

			

		
		
			/* 헬퍼함수 */
			
			// 버튼 생성 함수.
			function createBtn(parent, text, className) {
				$('<button/>', {
					'type'	: 'button',
					'class' : className,
					'text'	: text
				}).appendTo(parent);
			};
			
			// 네비게이트 함수.
			function navigate() {
				$navPrev.on('click', prevSlide);
				$navNext.on('click', nextSlide);
				if(options.autoPlay) {
					$navPrev.add($navNext).on('click', function() {
						options.autoPlay = false;	
					});
				};
			};
			
			// 이전 슬라이드 함수.
			function prevSlide() {
				current--;				
				setLinks('prev');
			};			
			
			// 다음 슬라이드 함수.
			function nextSlide() {
				current++;				
				setLinks('next');
			};
			
			// 자동 실행 함수.
			function autoPlay() {
				if(options.autoPlay) {
					nextSlide();
					clear_autoplay = setTimeout(autoPlay, options.sec * 1000);
				} else {
					clearTimeout(clear_autoplay);
					delete clear_autoplay;
				};
			};
			
			// 세팅 함수.
			function setLinks(direction) {
				
				var $current, $prev, $next, $others, $desc;
				
				if(current < 0) current = links_length-1;
				if(current > links_length-1) current = 0;

				$current = $links.eq(current);
				$prev	 = (current === 0) ? $links.eq(links_length-1) : $links.eq(current-1);
				$next	 = (current === links_length-1) ? $links.eq(0) : $links.eq(current+1);

				if(!direction) {
					$current.addClass('g-center');
					$prev.addClass('g-prev');
					$next.addClass('g-next');
				} else if(direction === 'prev') {
					$prev.addClass('g-prev').fadeTo(200, 1);
					$current.removeClass('g-prev').addClass('g-center');
					$next.removeClass('g-center').addClass('g-next');
				} else {
					$prev.removeClass('g-center').addClass('g-prev');
					$current.removeClass('g-next').addClass('g-center');
					$next.addClass('g-next').fadeTo(200, 1);
				};
				
				$others	= $links.not($prev).not($current).not($next);
				$others.removeClass().fadeTo(1, 0);
				
			
			}; // e:setLinks
			
		}); // e:this.each
	}; // e:plugin
})(window.jQuery);