/* jquery.videoPlayer.js - jQuery 비디오 플레이어 플러그인 문서, 2012 © yamoo9.com
------------------------------------------------------------------------------------ */
;(function($) {

	$.fn.videoPlayer = function(options) {
		
		// 셋팅 덮어쓰기.
		options = $.extend($.fn.videoPlayer.initSettings, options);
		
		// 플러그인 처리 코드.
		return this.each(function() {
			// 대상객체 참조.
			var $vp 				= $(this),
				$vp_container 		= $('<figure/>', { css: { width: $vp.width() } }),
				controls_html		= '',
				$vp_controls;				
				
			// HTML5 미지원 브라우저 플래시 대체 처리 함수.	
			if(fallbackFlash()) { return; }
				
			// change_theme 값이 true이면 inner-ui 클래스 추가, 아니면 빈 문자열 ''.	
			options.change_theme = options.change_theme ? 'inner-ui' : '';
			
			// $vp_container에 클래스 추가.
			$vp_container
				.addClass('video-container')
				.addClass(options.change_theme)
				.addClass(options.color)
				.addClass('clearfix');
			
			// $vp 요소를 $vp_container 요소로 감쌉니다.
			$vp.wrap($vp_container);
			
			// 동적으로 생성할 video-controls의 HTML 코드 문자열 조합.
			controls_html += '<div class="video-controls">';
			controls_html += '<a accesskey="p" class="play-btn" title="재생/일시정지 (P)"></a>';
			controls_html += '<div class="seek"></div>';
			controls_html += '<div class="timer">00:00</div>';
			controls_html += '<div class="volume-box"><div class="volume-slider"></div>';
			controls_html += '<a accesskey="m" class="volume-btn" title="음소거/음소거_해제 (M)"></a>';
			controls_html += '</div></div>';
			
			// vp_controls 문자열을 $() 내부에 넣어 동적으로 생성한 후, $vp 뒤에 추가.
			$vp_controls = $(controls_html).insertAfter($vp);
			
			// vp_controls 내부 대상 참조.
			var $play_btn		= $vp_controls.find('.play-btn'),
				$seek			= $vp_controls.find('.seek'),
				$timer			= $vp_controls.find('.timer'),
				$volume_box		= $vp_controls.find('.volume-box'),
				$volume_slider	= $vp_controls.find('.volume-slider'),
				$volume_btn		= $vp_controls.find('.volume-btn'),
				vp				= $vp[0],
				seek_sliding,
				video_volume	= 1;
			
			// $vp에 이벤트 핸들링 연결.
			$vp
				.bind('play pause', function() {
					$play_btn.toggleClass('pause-btn');
				})
				.bind('ended', function() {
					$play_btn.removeClass('pause-btn');
				})
				.bind('timeupdate', seekUpdate)
				.add($play_btn).bind('click', playPause);
			
			// 스페이스 키를 누르면 playPause 함수 호출.
			$(document).keydown(function(e) {
				if(e.keyCode == 32) playPause();
			});
			
			// 탐색 바 슬라이더 플러그인 활용. 동적생성 함수 호출.
			createSeek();
			
			// $volume_box에 slider UI 플러그인 설정.
			$volume_slider.slider({
				value: 1,
				orientation: "vertical",
				range: "min",
				max: 1,
				step: 0.05,
				animate: true,
				slide: function(e, ui){
						vp.muted = false;
						video_volume = ui.value;
						vp.volume = ui.value;
					}
			});
			
			// $volume_btn 클릭 이벤트핸들링 연결.
			$volume_btn.click(muteVolume);
			
			// 브라우저 기본 controls 제거.
			vp.controls = false;
			
				
			/* = 이벤트 핸들링	
			---------------------------------------------------------------- */
			
			// 재생/일시정지 함수.
			function playPause() {
				if(!vp.paused) vp.pause();
				else vp.play();
			};
			
			// seek 생성 함수.
			function createSeek() {
				if(vp.readyState) {
					var dur = vp.duration;
					$seek.slider({
						step: 0.01, 
						range: 'min', 
						max: dur,
						animate: true,
						slide: function() {
							seek_sliding = true; 
						},
						stop: function(e, ui) {
							seek_sliding = false;
							vp.currentTime = ui.value;
						}
					});
				} else {
					setTimeout(createSeek, 150);
				};
			};
			
			// seek 업데이트 함수.
			function seekUpdate() {
				var current_time = vp.currentTime;
				if(!seek_sliding) $seek.slider('value', current_time);
				$timer.text(timeFormat(current_time));	
			};
			
			// 재생시간 설정 함수.
			function timeFormat(sec) {
				var m = Math.floor(sec/60)<10 ? '0'+Math.floor(sec/60) : Math.floor(sec/60),
					s = Math.floor(sec-(m*60))<10? '0'+Math.floor(sec-(m*60)) : Math.floor(sec-(m*60));
				return m+':'+s;
			};
			
			// 음소거, 음소거 제거 함수.
			function muteVolume() {
				if(vp.muted) {
					vp.muted = false;
					$volume_slider.slider('value', video_volume);				
				} else {
					vp.muted = true;
					$volume_slider.slider('value', 0);
				};
				$volume_btn.toggleClass('volume-mute');
			};
			
			// Video 미지원 브라우저 대체.			
			function fallbackFlash(){
				if(!Modernizr.video || !document.createElement('video').canPlayType) {
				
					// flowplayer 라이브러리 호출.
					$.getScript('include/js/libs/flowplayer-3.2.6.min.js', function() {
						
						// 참조 대상 설정.
						var $fallback 		= $vp.find('a'),
							random_id 		= Math.floor(Math.random() * 100),
							flowplayer_path = 'include/js/libs/flowplayer-3.2.7.swf';
					
						// $fallback 요소 조작. - flowplayer 설정.
						$fallback
							.attr('id', 'fallback-' + random_id)
							.empty()
							.css({
								'display': 'block',
								'width'  : $vp.attr('width'), 
								'height' : $vp.attr('height'),
								'background' : '#fff',
								'padding' : 1,
								'border' : '1px solid #7c7c7c'
							})
							.after('<script>flowplayer("'+$fallback.attr('id')+'", "'+ flowplayer_path +'");</script>');
					});
						
					return true; // 함수 종료. true 반환.			
				};
			};
			
		});
	}; // 종료: 플러그인.
	
	// 외부에서 초기 셋팅을 변경할 수 있도록 처리.
	$.fn.videoPlayer.initSettings = {
		change_theme : false,	// 컨트롤 디자인 변경.
		color		 : 'pink'	// 슬라이더 영역 색상 변경. 	
	};
})(window.jQuery);