/*
	Story by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#wrapper');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Browser fixes.

			// IE: Flexbox min-height bug.
				if (skel.vars.browser == 'ie')
					(function() {

						var flexboxFixTimeoutId;

						$window.on('resize.flexbox-fix', function() {

							var $x = $('.fullscreen');

							clearTimeout(flexboxFixTimeoutId);

							flexboxFixTimeoutId = setTimeout(function() {

								if ($x.prop('scrollHeight') > $window.height())
									$x.css('height', 'auto');
								else
									$x.css('height', '100vh');

							}, 250);

						}).triggerHandler('resize.flexbox-fix');

					})();

			// Object fit workaround.
				if (!skel.canUse('object-fit'))
					(function() {

						$('.banner .image, .spotlight .image').each(function() {

							var $this = $(this),
								$img = $this.children('img'),
								positionClass = $this.parent().attr('class').match(/image-position-([a-z]+)/);

							// Set image.
								$this
									.css('background-image', 'url("' + $img.attr('src') + '")')
									.css('background-repeat', 'no-repeat')
									.css('background-size', 'cover');

							// Set position.
								switch (positionClass.length > 1 ? positionClass[1] : '') {

									case 'left':
										$this.css('background-position', 'left');
										break;

									case 'right':
										$this.css('background-position', 'right');
										break;

									default:
									case 'center':
										$this.css('background-position', 'center');
										break;

								}

							// Hide original.
								$img.css('opacity', '0');

						});

					})();

		// Smooth scroll.
			$('.smooth-scroll').scrolly();
			$('.smooth-scroll-middle').scrolly({ anchor: 'middle' });

		// Wrapper.
			$wrapper.children()
				.scrollex({
					top:		'30vh',
					bottom:		'30vh',
					initialize:	function() {
						$(this).addClass('is-inactive');
					},
					terminate:	function() {
						$(this).removeClass('is-inactive');
					},
					enter:		function() {
						$(this).removeClass('is-inactive');
					},
					leave:		function() {

						var $this = $(this);

						if ($this.hasClass('onscroll-bidirectional'))
							$this.addClass('is-inactive');

					}
				});

		// Items.
			$('.items')
				.scrollex({
					top:		'30vh',
					bottom:		'30vh',
					delay:		50,
					initialize:	function() {
						$(this).addClass('is-inactive');
					},
					terminate:	function() {
						$(this).removeClass('is-inactive');
					},
					enter:		function() {
						$(this).removeClass('is-inactive');
					},
					leave:		function() {

						var $this = $(this);

						if ($this.hasClass('onscroll-bidirectional'))
							$this.addClass('is-inactive');

					}
				})
				.children()
					.wrapInner('<div class="inner"></div>');

		// Gallery.
			$('.gallery')
				.wrapInner('<div class="inner"></div>')
				.prepend(skel.vars.mobile ? '' : '<div class="forward"></div><div class="backward"></div>')
				.scrollex({
					top:		'30vh',
					bottom:		'30vh',
					delay:		50,
					initialize:	function() {
						$(this).addClass('is-inactive');
					},
					terminate:	function() {
						$(this).removeClass('is-inactive');
					},
					enter:		function() {
						$(this).removeClass('is-inactive');
					},
					leave:		function() {

						var $this = $(this);

						if ($this.hasClass('onscroll-bidirectional'))
							$this.addClass('is-inactive');

					}
				})
				.children('.inner')
					//.css('overflow', 'hidden')
					.css('overflow-y', skel.vars.mobile ? 'visible' : 'hidden')
					.css('overflow-x', skel.vars.mobile ? 'scroll' : 'hidden')
					.scrollLeft(0);

			// Style #1.
				// ...

			// Style #2.
				$('.gallery')
					.on('wheel', '.inner', function(event) {

						var	$this = $(this),
							delta = (event.originalEvent.deltaX * 10);

						// Cap delta.
							if (delta > 0)
								delta = Math.min(25, delta);
							else if (delta < 0)
								delta = Math.max(-25, delta);

						// Scroll.
							$this.scrollLeft( $this.scrollLeft() + delta );

					})
					.on('mouseenter', '.forward, .backward', function(event) {

						var $this = $(this),
							$inner = $this.siblings('.inner'),
							direction = ($this.hasClass('forward') ? 1 : -1);

						// Clear move interval.
							clearInterval(this._gallery_moveIntervalId);

						// Start interval.
							this._gallery_moveIntervalId = setInterval(function() {
								$inner.scrollLeft( $inner.scrollLeft() + (5 * direction) );
							}, 10);

					})
					.on('mouseleave', '.forward, .backward', function(event) {

						// Clear move interval.
							clearInterval(this._gallery_moveIntervalId);

					});

			// Lightbox.
				$('.gallery.lightbox')
					.on('click', 'a', function(event) {

						var $a = $(this),
							$gallery = $a.parents('.gallery'),
							$modal = $gallery.children('.modal'),
							$modalImg = $modal.find('img'),
							href = $a.attr('href');

						// Not an image? Bail.
							if (!href.match(/\.(jpg|gif|png|mp4)$/))
								return;

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Locked? Bail.
							if ($modal[0]._locked)
								return;

						// Lock.
							$modal[0]._locked = true;

						// Set src.
							$modalImg.attr('src', href);

						// Set visible.
							$modal.addClass('visible');

						// Focus.
							$modal.focus();

						// Delay.
							setTimeout(function() {

								// Unlock.
									$modal[0]._locked = false;

							}, 600);

					})
					.on('click', '.modal', function(event) {

						var $modal = $(this),
							$modalImg = $modal.find('img');

						// Locked? Bail.
							if ($modal[0]._locked)
								return;

						// Already hidden? Bail.
							if (!$modal.hasClass('visible'))
								return;

						// Lock.
							$modal[0]._locked = true;

						// Clear visible, loaded.
							$modal
								.removeClass('loaded')

						// Delay.
							setTimeout(function() {

								$modal
									.removeClass('visible')

								setTimeout(function() {

									// Clear src.
										$modalImg.attr('src', '');

									// Unlock.
										$modal[0]._locked = false;

									// Focus.
										$body.focus();

								}, 475);

							}, 125);

					})
					.on('keypress', '.modal', function(event) {

						var $modal = $(this);

						// Escape? Hide modal.
							if (event.keyCode == 27)
								$modal.trigger('click');

					})
					.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
						.find('img')
							.on('load', function(event) {

								var $modalImg = $(this),
									$modal = $modalImg.parents('.modal');

								setTimeout(function() {

									// No longer visible? Bail.
										if (!$modal.hasClass('visible'))
											return;

									// Set loaded.
										$modal.addClass('loaded');

								}, 275);

							});

	});

})(jQuery);

(function(e){function u(s,o){var u,a,f;if((u=e(s))[t]==0)return n;a=u[i]()[r];switch(o.anchor){case"middle":f=a-(e(window).height()-u.outerHeight())/2;break;default:case r:f=Math.max(a,0)}return typeof o[i]=="function"?f-=o[i]():f-=o[i],f}var t="length",n=null,r="top",i="offset",s="click.scrolly",o=e(window);e.fn.scrolly=function(i){var o,a,f,l,c=e(this);if(this[t]==0)return c;if(this[t]>1){for(o=0;o<this[t];o++)e(this[o]).scrolly(i);return c}l=n,f=c.attr("href");if(f.charAt(0)!="#"||f[t]<2)return c;a=jQuery.extend({anchor:r,easing:"swing",offset:0,parent:e("body,html"),pollOnce:!1,speed:1e3},i),a.pollOnce&&(l=u(f,a)),c.off(s).on(s,function(e){var t=l!==n?l:u(f,a);t!==n&&(e.preventDefault(),a.parent.stop().animate({scrollTop:t},a.speed,a.easing))})}})(jQuery);
!function(t){function e(t,e,n){return"string"==typeof t&&("%"==t.slice(-1)?t=parseInt(t.substring(0,t.length-1))/100*e:"vh"==t.slice(-2)?t=parseInt(t.substring(0,t.length-2))/100*n:"px"==t.slice(-2)&&(t=parseInt(t.substring(0,t.length-2)))),t}var n=t(window),i=1,o={};n.on("scroll",function(){var e=n.scrollTop();t.map(o,function(t){window.clearTimeout(t.timeoutId),t.timeoutId=window.setTimeout(function(){t.handler(e)},t.options.delay)})}).on("load",function(){n.trigger("scroll")}),jQuery.fn.scrollex=function(l){var s=t(this);if(0==this.length)return s;if(this.length>1){for(var r=0;r<this.length;r++)t(this[r]).scrollex(l);return s}if(s.data("_scrollexId"))return s;var a,u,h,c,p;switch(a=i++,u=jQuery.extend({top:0,bottom:0,delay:0,mode:"default",enter:null,leave:null,initialize:null,terminate:null,scroll:null},l),u.mode){case"top":h=function(t,e,n,i,o){return t>=i&&o>=t};break;case"bottom":h=function(t,e,n,i,o){return n>=i&&o>=n};break;case"middle":h=function(t,e,n,i,o){return e>=i&&o>=e};break;case"top-only":h=function(t,e,n,i,o){return i>=t&&n>=i};break;case"bottom-only":h=function(t,e,n,i,o){return n>=o&&o>=t};break;default:case"default":h=function(t,e,n,i,o){return n>=i&&o>=t}}return c=function(t){var i,o,l,s,r,a,u=this.state,h=!1,c=this.$element.offset();i=n.height(),o=t+i/2,l=t+i,s=this.$element.outerHeight(),r=c.top+e(this.options.top,s,i),a=c.top+s-e(this.options.bottom,s,i),h=this.test(t,o,l,r,a),h!=u&&(this.state=h,h?this.options.enter&&this.options.enter.apply(this.element):this.options.leave&&this.options.leave.apply(this.element)),this.options.scroll&&this.options.scroll.apply(this.element,[(o-r)/(a-r)])},p={id:a,options:u,test:h,handler:c,state:null,element:this,$element:s,timeoutId:null},o[a]=p,s.data("_scrollexId",p.id),p.options.initialize&&p.options.initialize.apply(this),s},jQuery.fn.unscrollex=function(){var e=t(this);if(0==this.length)return e;if(this.length>1){for(var n=0;n<this.length;n++)t(this[n]).unscrollex();return e}var i,l;return(i=e.data("_scrollexId"))?(l=o[i],window.clearTimeout(l.timeoutId),delete o[i],e.removeData("_scrollexId"),l.options.terminate&&l.options.terminate.apply(this),e):e}}(jQuery);

			new WOW().init();


	$(document).ready(function () {
		$('.panel-heading').click(function () {
			$(this).toggleClass('in').next().slideToggle();
			$('.panel-heading').not(this).removeClass('in').next().slideUp();
        });

    });

	function initMap() {
  var uluru = {lat: 47.5136100, lng: 42.1513900};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

	$(document).ready(function(){
    $("#panel").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1000);
    });
});

$(function() {
  // при нажатии на кнопку scrollup
  $('.scrollup').click(function() {
    // переместиться в верхнюю часть страницы
    $("html, body").animate({
      scrollTop:0
    },1000);
  })
})
// при прокрутке окна (window)
$(window).scroll(function() {
  // если пользователь прокрутил страницу более чем на 200px
  if ($(this).scrollTop()>200) {
    // то сделать кнопку scrollup видимой
    $('.scrollup').fadeIn();
  }
  // иначе скрыть кнопку scrollup
  else {
    $('.scrollup').fadeOut();
  }
});

$(document).ready(function() {
	$('.popup-with-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});
});