/*------------------------------------------------------------------
[ Initializer ]
*/

var timer;

var refresh;

var autoSlider;

var counter = 1;

var paused = false;

function loadContent(){
	if ($('#progress').is(":visible")){

	}else{
		//slideShow();
		//orientationInit();
		sizeWrappers();
		//arrangeForDeposit();
		/*autoSlider = setInterval(activateSlider, 4000);*/
		$('.nocars_image_box').after($('#nocars_tx1'));

		/*$('#searchDiv').on('click', '#submitbutton', function(){
			timer = setInterval(loadContent, 100);
		});*/

		/*clearInterval(timer);*/
	}
}

function refreshContent(){

	if ($('#progress').is(":visible")){

	}else{
		sizeWrappers();
		//arrangeForDeposit();
		clearInterval(autoSlider);
		autoSlider = setInterval(activateSlider, 4000);
		$('.pause').removeClass("paused");
		paused = false;
	}

}

$(document).ready(function(){

	$.ajaxSetup({
		cache: false
	});

	moveText();
});



/*------------------------------------------------------------------
[ Tooltips ]
*/

function tooltipshow(e, dunno, tip){

	var ePos = $(e).offset();
	var eWidth = $(e).width();
	var newWidth = eWidth * 1.05;

	var tooltip = $("<div></div>");
	var tooltipText = jQuery(e).find('.tooltipText').text();
	
	$(tooltip)
		.addClass("tooltip")
		.text(tooltipText)
		.appendTo($(".bodyWrapper"))
		.css("width", newWidth)
		.position({
			my: "center bottom",
			at: "center top",
			of: $(e)
		});
}

function tooltiphide(e){
	$(".tooltip").remove();
}


/*------------------------------------------------------------------
[ Search for url variables ]
*/

function find(el) {
	var exp = "[\\?&]" + el + "=([^&#]*)";
	var regex = new RegExp(exp);
	var results = regex.exec(window.location.href);
	if (results == null){
		return false;
	}else{
		return results[1];
	}
}



/*------------------------------------------------------------------
[ Return orientation ]
*/

//function orientationCheck(){
//
//	var orientation = find("orientation");
//
//	if (orientation){
//		return orientation;
//	} else {
//		return "landscape";
//	}
//
//}


/*------------------------------------------------------------------
[ Orientation CSS & elements ]
*/


//function orientationInit(){
//
//	var orientation = orientationCheck();
//
//	if(orientation == "landscape"){
//		$('.icons > div').each(function () {
//			var newDiv = $('<div></div>');
//			$(this).append(newDiv);
//		});
//
//		if(find("results")){
//			var numResults = $("#results > div").length;
//			var reqResults = find("results");
//
//			if(numResults > reqResults){
//				for(var i = numResults; i > reqResults; i-- ){
//					$('#wrapper' + i).css('display', 'none');
//				}
//			}
//		}
//	}
//}




/*------------------------------------------------------------------
[ On resize ]
*/

var winWidth = $(window).width();

$(window).resize(function(){

	var resizeTimeout;

	var onResize = function() {
		refreshContent();
	}

	//New width
	var winNewWidth = $(window).width();

	// compare the new width with old one
	if(winWidth!=winNewWidth){
			window.clearTimeout(resizeTimeout);
			resizeTimeout = window.setTimeout(onResize, 10);
	}

	//Update the width
	winWidth = winNewWidth;
});



/*------------------------------------------------------------------
[ Size Wrappers ]
*/

function sizeWrappers(){

	var docWidth = $(document).width();

	var numResults = $("#results > div").length;

	var fireSlides = (docWidth <= 480) ? true : false;

	var resultsWidth = (fireSlides) ? ((numResults * 100) + '%') : 100 + '%';

	var wrapperWidth = (fireSlides) ? (100 / numResults) + '%' : 99 + '%';

	counter = 1;

	$('#results').css({
		left: 0,
		width: resultsWidth
	});

	$('.wrapper').css({
		width: wrapperWidth
	});

}



/*------------------------------------------------------------------
[ Size Wrappers ]
*/

//function arrangeForDeposit(){
//
//	var docWidth = $(document).width();
//
//	var looong = (docWidth > 700) ? true : false;
//
//	var smaaall = (docWidth <= 480) ? true : false;
//
//	$('.car, .result_info, .prices, .btn').attr( "style", "" );
//
//	var depositExists = false;
//
//	var newDeposit = '<div class="deposit_book"><span class="whiteBox">BOOK NOW</span>PAY LATER</div>'
//
//	$('.deposit_book').each(function(){
//		$(this).replaceWith(newDeposit);
//	})
//
//	if (looong) {
//		$('[id=deposit]').each( function(){
//			depositExists = true;
//		});
//
//		if (depositExists) {
//			$('.wrapper').each( function(){
//
//				var childDivs = $(this).children().length;
//
//				var placement = $(this).children('.result_info');
//
//				if(childDivs == 4){
//					var sellPanel = $('<div></div>').addClass('sellPanel').css({width: '11%'});
//					var sellPanelInner = $('<div></div>').addClass('sellPanelInner').text('Don\'t wait until it\'s too late!').appendTo(sellPanel);
//					$(sellPanel).insertAfter(placement);
//				}
//
//				$(this)
//					.children('.car').css({width: '18%'})
//					.siblings('.result_info').css({width: '27%'})
//					.siblings('.prices').css({width: '21%'})
//					.siblings('.btn').css({width: '21%'});
//			});
//		}
//	}
//
//	if (smaaall) {
//
//		$('.sellPanel').remove();
//
//		$('[id=deposit]').each( function(){
//			$(this).siblings('.prices').css({width: '50%'});
//		});
//	}
//
//}



/*------------------------------------------------------------------
[ Slideshow ]
*/

function createButton(pos){
	var slideButton = document.createElement('div');

	var caret;

	if (pos == 'left'){
		caret = '<';
	} else if (pos == 'right') {
		caret = '>';
	} else {
		caret = '||';
	}

	$(slideButton).addClass('slideButton').addClass(pos).text(caret).appendTo($('#resultsDiv'));

}
/*
function slideShow(){

	if($('.nocars_container').length == 0){
		createButton('left');
		createButton('right');
		createButton('pause');
	}

	var smallBox = document.createElement('div');

	$(smallBox).addClass('addText').text("Book with a low deposit from only £15").appendTo($('.nocars_container'));

	$('#results').css({left: 0});

	var numResults = $("#results > div").length;

	var resultsWidth = ((numResults) * 100) + '%';

	var maxWidth = ((numResults - 1) * 100) + '%';

	var negWidth = '-' + maxWidth;

	$('.left').bind({
		click: function() {
			var curLeft = $('#results').css('left');
			if(curLeft == '0%' || counter == 1){
				$('#results').animate({left: '-=' + maxWidth}, 100);
				counter = numResults
			}else{
				$('#results').animate({left: '+=100%'}, 100);
				counter -= 1;
			}
		}
	});

	$('.right').bind({
		click: function() {
			var curLeft = $('#results').css('left');
			if(curLeft == negWidth || counter == numResults){
				$('#results').animate({left: '+=' + maxWidth}, 100);
				counter = 1;
			}else{
				$('#results').animate({left: '-=100%'}, 100);
				counter += 1;
			}
		}
	});

	$('.pause').bind({
		click: function() {
			if (paused){
				autoSlider = setInterval(activateSlider, 4000);
				$('.pause').removeClass("paused");
				paused = false;
			} else {
				clearInterval(autoSlider);
				$('.pause').addClass("paused");
				paused = true;
			}
		}
	});

}
*/
function activateSlider(){

	var docWidth = $(document).width();

	if(docWidth <= 480){
		$('.right').trigger('click');
	} else {
		clearInterval(autoSlider);
		paused = true;
	}
}



function moveText(){

	var hold = $('<div></div>');
	$(hold).addClass('headlines').appendTo($('.headDiv'));
	($('.titlePt1, .titlePt2')).appendTo('.headlines');

}




/*------------------------------------------------------------------
[ Additional libraries ]
*/

window.onload = function(){

	timer = setInterval(loadContent, 100);

	/*! Responsive JS Library v1.1.0 */
	/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
	/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
	window.matchMedia=window.matchMedia||(function(doc,undefined){var bool,docElem=doc.documentElement,refNode=docElem.firstElementChild||docElem.firstChild,fakeBody=doc.createElement("body"),div=doc.createElement("div");div.id="mq-test-1";div.style.cssText="position:absolute;top:-100em";fakeBody.style.background="none";fakeBody.appendChild(div);return function(q){div.innerHTML='&shy;<style media="'+q+'"> #mq-test-1 { width: 42px; }</style>';docElem.insertBefore(fakeBody,refNode);bool=div.offsetWidth==42;docElem.removeChild(fakeBody);return{matches:bool,media:q}}})(document);
	/*! Respond.js v1.1.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */
	(function(win){win.respond={};respond.update=function(){};respond.mediaQueriesSupported=win.matchMedia&&win.matchMedia("only all").matches;if(respond.mediaQueriesSupported){return}var doc=win.document,docElem=doc.documentElement,mediastyles=[],rules=[],appendedEls=[],parsedSheets={},resizeThrottle=30,head=doc.getElementsByTagName("head")[0]||docElem,base=doc.getElementsByTagName("base")[0],links=head.getElementsByTagName("link"),requestQueue=[],ripCSS=function(){var sheets=links,sl=sheets.length,i=0,sheet,href,media,isCSS;for(;i<sl;i++){sheet=sheets[i],href=sheet.href,media=sheet.media,isCSS=sheet.rel&&sheet.rel.toLowerCase()==="stylesheet";if(!!href&&isCSS&&!parsedSheets[href]){if(sheet.styleSheet&&sheet.styleSheet.rawCssText){translate(sheet.styleSheet.rawCssText,href,media);parsedSheets[href]=true}else{if((!/^([a-zA-Z:]*\/\/)/.test(href)&&!base)||href.replace(RegExp.$1,"").split("/")[0]===win.location.host){requestQueue.push({href:href,media:media})}}}}makeRequests()},makeRequests=function(){if(requestQueue.length){var thisRequest=requestQueue.shift();ajax(thisRequest.href,function(styles){translate(styles,thisRequest.href,thisRequest.media);parsedSheets[thisRequest.href]=true;makeRequests()})}},translate=function(styles,href,media){var qs=styles.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),ql=qs&&qs.length||0,href=href.substring(0,href.lastIndexOf("/")),repUrls=function(css){return css.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+href+"$2$3")},useMedia=!ql&&media,i=0,j,fullq,thisq,eachq,eql;if(href.length){href+="/"}if(useMedia){ql=1}for(;i<ql;i++){j=0;if(useMedia){fullq=media;rules.push(repUrls(styles))}else{fullq=qs[i].match(/@media *([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1;rules.push(RegExp.$2&&repUrls(RegExp.$2))}eachq=fullq.split(",");eql=eachq.length;for(;j<eql;j++){thisq=eachq[j];mediastyles.push({media:thisq.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/)&&RegExp.$2||"all",rules:rules.length-1,hasquery:thisq.indexOf("(")>-1,minw:thisq.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:thisq.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}}applyMedia()},lastCall,resizeDefer,getEmValue=function(){var ret,div=doc.createElement("div"),body=doc.body,fakeUsed=false;div.style.cssText="position:absolute;font-size:1em;width:1em";if(!body){body=fakeUsed=doc.createElement("body");body.style.background="none"}body.appendChild(div);docElem.insertBefore(body,docElem.firstChild);ret=div.offsetWidth;if(fakeUsed){docElem.removeChild(body)}else{body.removeChild(div)}ret=eminpx=parseFloat(ret);return ret},eminpx,applyMedia=function(fromResize){var name="clientWidth",docElemProp=docElem[name],currWidth=doc.compatMode==="CSS1Compat"&&docElemProp||doc.body[name]||docElemProp,styleBlocks={},lastLink=links[links.length-1],now=(new Date()).getTime();if(fromResize&&lastCall&&now-lastCall<resizeThrottle){clearTimeout(resizeDefer);resizeDefer=setTimeout(applyMedia,resizeThrottle);return}else{lastCall=now}for(var i in mediastyles){var thisstyle=mediastyles[i],min=thisstyle.minw,max=thisstyle.maxw,minnull=min===null,maxnull=max===null,em="em";if(!!min){min=parseFloat(min)*(min.indexOf(em)>-1?(eminpx||getEmValue()):1)}if(!!max){max=parseFloat(max)*(max.indexOf(em)>-1?(eminpx||getEmValue()):1)}if(!thisstyle.hasquery||(!minnull||!maxnull)&&(minnull||currWidth>=min)&&(maxnull||currWidth<=max)){if(!styleBlocks[thisstyle.media]){styleBlocks[thisstyle.media]=[]}styleBlocks[thisstyle.media].push(rules[thisstyle.rules])}}for(var i in appendedEls){if(appendedEls[i]&&appendedEls[i].parentNode===head){head.removeChild(appendedEls[i])}}for(var i in styleBlocks){var ss=doc.createElement("style"),css=styleBlocks[i].join("\n");ss.type="text/css";ss.media=i;head.insertBefore(ss,lastLink.nextSibling);if(ss.styleSheet){ss.styleSheet.cssText=css}else{ss.appendChild(doc.createTextNode(css))}appendedEls.push(ss)}},ajax=function(url,callback){var req=xmlHttp();if(!req){return}req.open("GET",url,true);req.onreadystatechange=function(){if(req.readyState!=4||req.status!=200&&req.status!=304){return}callback(req.responseText)};if(req.readyState==4){return}req.send(null)},xmlHttp=(function(){var xmlhttpmethod=false;try{xmlhttpmethod=new XMLHttpRequest()}catch(e){xmlhttpmethod=new ActiveXObject("Microsoft.XMLHTTP")}return function(){return xmlhttpmethod}})();ripCSS();respond.update=ripCSS;function callMedia(){applyMedia(true)}if(win.addEventListener){win.addEventListener("resize",callMedia,false)}else{if(win.attachEvent){win.attachEvent("onresize",callMedia)}}})(this);if(jQuery.browser.msie&&jQuery.browser.version<=6){jQuery('<div class="msie-box"><a href="http://browsehappy.com/" title="Click here to update" target="_blank">  Your browser is no longer supported. Click here to update...</a> </div>').appendTo("#container")}jQuery(document).ready(function($){$("a[href=#scroll-top]").click(function(){$("html, body").animate({scrollTop:0},"slow");return false})});(function($){function Placeholder(input){this.input=input;if(input.attr("type")=="password"){this.handlePassword()}$(input[0].form).submit(function(){if(input.hasClass("placeholder")&&input[0].value==input.attr("placeholder")){input[0].value=""}})}Placeholder.prototype={show:function(loading){if(this.input[0].value===""||(loading&&this.valueIsPlaceholder())){if(this.isPassword){try{this.input[0].setAttribute("type","text")}catch(e){this.input.before(this.fakePassword.show()).hide()}}this.input.addClass("placeholder");this.input[0].value=this.input.attr("placeholder")}},hide:function(){if(this.valueIsPlaceholder()&&this.input.hasClass("placeholder")){this.input.removeClass("placeholder");this.input[0].value="";if(this.isPassword){try{this.input[0].setAttribute("type","password")}catch(e){}this.input.show();this.input[0].focus()}}},valueIsPlaceholder:function(){return this.input[0].value==this.input.attr("placeholder")},handlePassword:function(){var input=this.input;input.attr("realType","password");this.isPassword=true;if($.browser.msie&&input[0].outerHTML){var fakeHTML=$(input[0].outerHTML.replace(/type=(['"])?password\1/gi,"type=$1text$1"));this.fakePassword=fakeHTML.val(input.attr("placeholder")).addClass("placeholder").focus(function(){input.trigger("focus");$(this).hide()});$(input[0].form).submit(function(){fakeHTML.remove();input.show()})}}};var NATIVE_SUPPORT=!!("placeholder" in document.createElement("input"));$.fn.placeholder=function(){return NATIVE_SUPPORT?this:this.each(function(){var input=$(this);var placeholder=new Placeholder(input);placeholder.show(true);input.focus(function(){placeholder.hide()});input.blur(function(){placeholder.show(false)});if($.browser.msie){$(window).load(function(){if(input.val()){input.removeClass("placeholder")}placeholder.show(true)});input.focus(function(){if(this.value==""){var range=this.createTextRange();range.collapse(true);range.moveStart("character",0);range.select()}})}})}})(jQuery);

	/*! jQuery UI - v1.10.3 - 2013-08-21
	* http://jqueryui.com
	* Includes: jquery.ui.core.js, jquery.ui.position.js
	* Copyright 2013 jQuery Foundation and other contributors Licensed MIT */

	(function(e,t){function i(t,i){var a,n,r,o=t.nodeName.toLowerCase();return"area"===o?(a=t.parentNode,n=a.name,t.href&&n&&"map"===a.nodeName.toLowerCase()?(r=e("img[usemap=#"+n+"]")[0],!!r&&s(r)):!1):(/input|select|textarea|button|object/.test(o)?!t.disabled:"a"===o?t.href||i:i)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var a=0,n=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.3",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var s,a,n=e(this[0]);n.length&&n[0]!==document;){if(s=n.css("position"),("absolute"===s||"relative"===s||"fixed"===s)&&(a=parseInt(n.css("zIndex"),10),!isNaN(a)&&0!==a))return a;n=n.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})},removeUniqueId:function(){return this.each(function(){n.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var s=e.attr(t,"tabindex"),a=isNaN(s);return(a||s>=0)&&i(t,!a)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,s){function a(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===s?["Left","Right"]:["Top","Bottom"],r=s.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+s]=function(i){return i===t?o["inner"+s].call(this):this.each(function(){e(this).css(r,a(this,i)+"px")})},e.fn["outer"+s]=function(t,i){return"number"!=typeof t?o["outer"+s].call(this,t):this.each(function(){e(this).css(r,a(this,t,!0,i)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,s){var a,n=e.ui[t].prototype;for(a in s)n.plugins[a]=n.plugins[a]||[],n.plugins[a].push([i,s[a]])},call:function(e,t,i){var s,a=e.plugins[t];if(a&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(s=0;a.length>s;s++)e.options[a[s][0]]&&a[s][1].apply(e.element,i)}},hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",a=!1;return t[s]>0?!0:(t[s]=1,a=t[s]>0,t[s]=0,a)}})})(jQuery);(function(t,e){function i(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function s(e,i){return parseInt(t.css(e,i),10)||0}function n(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,c=/top|center|bottom/,u=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(a!==e)return a;var i,s,n=t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=n.children()[0];return t("body").append(n),i=o.offsetWidth,n.css("overflow","scroll"),s=o.offsetWidth,i===s&&(s=n[0].clientWidth),n.remove(),a=i-s},getScrollInfo:function(e){var i=e.isWindow?"":e.element.css("overflow-x"),s=e.isWindow?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,a="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:a?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]);return{element:i,isWindow:s,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s?i.width():i.outerWidth(),height:s?i.height():i.outerHeight()}}},t.fn.position=function(e){if(!e||!e.of)return f.apply(this,arguments);e=t.extend({},e);var a,p,m,g,v,b,_=t(e.of),y=t.position.getWithinInfo(e.within),w=t.position.getScrollInfo(y),x=(e.collision||"flip").split(" "),k={};return b=n(_),_[0].preventDefault&&(e.at="left top"),p=b.width,m=b.height,g=b.offset,v=t.extend({},g),t.each(["my","at"],function(){var t,i,s=(e[this]||"").split(" ");1===s.length&&(s=l.test(s[0])?s.concat(["center"]):c.test(s[0])?["center"].concat(s):["center","center"]),s[0]=l.test(s[0])?s[0]:"center",s[1]=c.test(s[1])?s[1]:"center",t=u.exec(s[0]),i=u.exec(s[1]),k[this]=[t?t[0]:0,i?i[0]:0],e[this]=[d.exec(s[0])[0],d.exec(s[1])[0]]}),1===x.length&&(x[1]=x[0]),"right"===e.at[0]?v.left+=p:"center"===e.at[0]&&(v.left+=p/2),"bottom"===e.at[1]?v.top+=m:"center"===e.at[1]&&(v.top+=m/2),a=i(k.at,p,m),v.left+=a[0],v.top+=a[1],this.each(function(){var n,l,c=t(this),u=c.outerWidth(),d=c.outerHeight(),f=s(this,"marginLeft"),b=s(this,"marginTop"),D=u+f+s(this,"marginRight")+w.width,T=d+b+s(this,"marginBottom")+w.height,C=t.extend({},v),M=i(k.my,c.outerWidth(),c.outerHeight());"right"===e.my[0]?C.left-=u:"center"===e.my[0]&&(C.left-=u/2),"bottom"===e.my[1]?C.top-=d:"center"===e.my[1]&&(C.top-=d/2),C.left+=M[0],C.top+=M[1],t.support.offsetFractions||(C.left=h(C.left),C.top=h(C.top)),n={marginLeft:f,marginTop:b},t.each(["left","top"],function(i,s){t.ui.position[x[i]]&&t.ui.position[x[i]][s](C,{targetWidth:p,targetHeight:m,elemWidth:u,elemHeight:d,collisionPosition:n,collisionWidth:D,collisionHeight:T,offset:[a[0]+M[0],a[1]+M[1]],my:e.my,at:e.at,within:y,elem:c})}),e.using&&(l=function(t){var i=g.left-C.left,s=i+p-u,n=g.top-C.top,a=n+m-d,h={target:{element:_,left:g.left,top:g.top,width:p,height:m},element:{element:c,left:C.left,top:C.top,width:u,height:d},horizontal:0>s?"left":i>0?"right":"center",vertical:0>a?"top":n>0?"bottom":"middle"};u>p&&p>r(i+s)&&(h.horizontal="center"),d>m&&m>r(n+a)&&(h.vertical="middle"),h.important=o(r(i),r(s))>o(r(n),r(a))?"horizontal":"vertical",e.using.call(this,t,h)}),c.offset(t.extend(C,{using:l}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,h=n-r,l=r+e.collisionWidth-a-n;e.collisionWidth>a?h>0&&0>=l?(i=t.left+h+e.collisionWidth-a-n,t.left+=h-i):t.left=l>0&&0>=h?n:h>l?n+a-e.collisionWidth:n:h>0?t.left+=h:l>0?t.left-=l:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,h=n-r,l=r+e.collisionHeight-a-n;e.collisionHeight>a?h>0&&0>=l?(i=t.top+h+e.collisionHeight-a-n,t.top+=h-i):t.top=l>0&&0>=h?n:h>l?n+a-e.collisionHeight:n:h>0?t.top+=h:l>0?t.top-=l:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=t.left-e.collisionPosition.marginLeft,c=l-h,u=l+e.collisionWidth-o-h,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-o-a,(0>i||r(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-h,(s>0||u>r(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=t.top-e.collisionPosition.marginTop,c=l-h,u=l+e.collisionHeight-o-h,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,m=-2*e.offset[1];0>c?(s=t.top+p+f+m+e.collisionHeight-o-a,t.top+p+f+m>c&&(0>s||r(c)>s)&&(t.top+=p+f+m)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+m-h,t.top+p+f+m>u&&(i>0||u>r(i))&&(t.top+=p+f+m))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,s,n,a,o=document.getElementsByTagName("body")[0],r=document.createElement("div");e=document.createElement(o?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&t.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(a in s)e.style[a]=s[a];e.appendChild(r),i=o||document.documentElement,i.insertBefore(e,i.firstChild),r.style.cssText="position: absolute; left: 10.7432222px;",n=t(r).offset().left,t.support.offsetFractions=n>10&&11>n,e.innerHTML="",i.removeChild(e)}()})(jQuery);

}