/* action.js - 2012©yamoo9.com */
(function(w, d, $, undefined){

	// 루트객체 참조 및 trim 헬퍼함수 선언.
	var doc		= d.documentElement,
		trim	= function(str) { return str.replace(/^\s+/, '').replace(/\s+$/, ''); };
	
	// 루트객체 클래스 속성 값 앞, 뒤 공백 제거.
	doc.className = String.prototype.trim ? doc.className.trim() : trim(doc.className);
	
/*
	var $html = $('html');
	$html.attr('class', $.trim($html.attr('class'));
*/
	
	// 플러그인 호출 실행.
	$('#demo, #demo2').gallery3d();
	
})(window, window.document, window.jQuery);