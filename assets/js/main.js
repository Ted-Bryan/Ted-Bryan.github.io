/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Background motion stays independent of scrolling.
		$("<div id=\"backgroundArtwork\" aria-hidden=\"true\"><div class=\"background-ribbon background-ribbon-back\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1600 900\" preserveAspectRatio=\"none\"><defs><radialGradient id=\"bg-back-right\" gradientUnits=\"userSpaceOnUse\" cx=\"1660\" cy=\"420\" r=\"690\"><stop stop-color=\"#596786\"/><stop offset=\".35\" stop-color=\"#3b4664\"/><stop offset=\".72\" stop-color=\"#1e2338\"/><stop offset=\"1\" stop-color=\"#11131f\"/></radialGradient><linearGradient id=\"bg-back-sweep\" gradientUnits=\"userSpaceOnUse\" x1=\"350\" y1=\"800\" x2=\"1320\" y2=\"90\"><stop stop-color=\"#10111b\"/><stop offset=\".35\" stop-color=\"#1e1e30\"/><stop offset=\".67\" stop-color=\"#393950\"/><stop offset=\".88\" stop-color=\"#292a40\"/><stop offset=\"1\" stop-color=\"#161722\"/></linearGradient><linearGradient id=\"bg-back-rim\" gradientUnits=\"userSpaceOnUse\" x1=\"1540\" y1=\"20\" x2=\"460\" y2=\"920\"><stop stop-color=\"#aaa8ee\" stop-opacity=\".82\"/><stop offset=\".5\" stop-color=\"#8a8dd0\" stop-opacity=\".68\"/><stop offset=\"1\" stop-color=\"#474c75\" stop-opacity=\".2\"/></linearGradient><radialGradient id=\"bg-back-surface-light\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"1\"><stop offset=\"0\" stop-color=\"#aaa8ee\" stop-opacity=\".32\"/><stop offset=\".3\" stop-color=\"#aaa8ee\" stop-opacity=\".24\"/><stop offset=\".58\" stop-color=\"#aaa8ee\" stop-opacity=\".11\"/><stop offset=\".82\" stop-color=\"#aaa8ee\" stop-opacity=\".025\"/><stop offset=\"1\" stop-color=\"#aaa8ee\" stop-opacity=\"0\"/></radialGradient><radialGradient id=\"bg-back-surface-shadow\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"1\"><stop offset=\"0\" stop-color=\"#0c0d17\" stop-opacity=\".64\"/><stop offset=\".3\" stop-color=\"#0c0d17\" stop-opacity=\".46\"/><stop offset=\".65\" stop-color=\"#0c0d17\" stop-opacity=\".15\"/><stop offset=\"1\" stop-color=\"#0c0d17\" stop-opacity=\"0\"/></radialGradient><radialGradient id=\"bg-back-right-fold\" href=\"#bg-back-surface-shadow\" gradientTransform=\"translate(1280 615) rotate(-55) scale(420 100)\"/><radialGradient id=\"bg-back-right-light\" href=\"#bg-back-surface-light\" gradientTransform=\"translate(1535 390) rotate(-12) scale(200 510)\"/><radialGradient id=\"bg-back-sweep-fold\" href=\"#bg-back-surface-shadow\" gradientTransform=\"translate(570 650) rotate(-45) scale(440 105)\"/><radialGradient id=\"bg-back-sweep-light\" href=\"#bg-back-surface-light\" gradientTransform=\"translate(1000 375) rotate(-24) scale(560 110)\"/></defs><g><path d=\"M1635 5C1640 225 1440 365 1250 590C1110 760 1065 850 1080 960L1740 960V-80H1635Z\" fill=\"url(#bg-back-right)\"/><path d=\"M1635 5C1640 225 1440 365 1250 590C1110 760 1065 850 1080 960L1740 960V-80H1635Z\" fill=\"url(#bg-back-right-fold)\"/><path d=\"M1635 5C1640 225 1440 365 1250 590C1110 760 1065 850 1080 960L1740 960V-80H1635Z\" fill=\"url(#bg-back-right-light)\"/><path d=\"M1635 5C1640 225 1440 365 1250 590C1110 760 1065 850 1080 960\" fill=\"none\" stroke=\"url(#bg-back-rim)\" stroke-width=\"2.2\"/></g><g><path d=\"M1630-40C1690 120 1410 300 1070 430C700 570 440 655 475 950H-120V-80H1630Z\" fill=\"url(#bg-back-sweep)\"/><path d=\"M1630-40C1690 120 1410 300 1070 430C700 570 440 655 475 950H-120V-80H1630Z\" fill=\"url(#bg-back-sweep-fold)\"/><path d=\"M1630-40C1690 120 1410 300 1070 430C700 570 440 655 475 950H-120V-80H1630Z\" fill=\"url(#bg-back-sweep-light)\"/><path d=\"M1630-40C1690 120 1410 300 1070 430C700 570 440 655 475 950\" fill=\"none\" stroke=\"url(#bg-back-rim)\" stroke-width=\"2.2\"/></g></svg></div><div class=\"background-ribbon background-ribbon-front\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1600 900\" preserveAspectRatio=\"none\"><defs><radialGradient id=\"bg-front-sweep\" gradientUnits=\"userSpaceOnUse\" cx=\"960\" cy=\"200\" r=\"800\"><stop stop-color=\"#44415f\"/><stop offset=\".27\" stop-color=\"#343249\"/><stop offset=\".62\" stop-color=\"#262538\"/><stop offset=\"1\" stop-color=\"#11121c\"/></radialGradient><linearGradient id=\"bg-front-left\" gradientUnits=\"userSpaceOnUse\" x1=\"40\" y1=\"50\" x2=\"460\" y2=\"650\"><stop stop-color=\"#23222f\"/><stop offset=\".48\" stop-color=\"#302e42\"/><stop offset=\".8\" stop-color=\"#252538\"/><stop offset=\"1\" stop-color=\"#141621\"/></linearGradient><linearGradient id=\"bg-front-rim\" gradientUnits=\"userSpaceOnUse\" x1=\"790\" y1=\"40\" x2=\"70\" y2=\"870\"><stop stop-color=\"#c1b5fa\" stop-opacity=\".85\"/><stop offset=\".48\" stop-color=\"#9593d4\" stop-opacity=\".75\"/><stop offset=\"1\" stop-color=\"#444a72\" stop-opacity=\".25\"/></linearGradient><radialGradient id=\"bg-front-surface-light\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"1\"><stop offset=\"0\" stop-color=\"#c1b5fa\" stop-opacity=\".32\"/><stop offset=\".3\" stop-color=\"#c1b5fa\" stop-opacity=\".24\"/><stop offset=\".58\" stop-color=\"#c1b5fa\" stop-opacity=\".11\"/><stop offset=\".82\" stop-color=\"#c1b5fa\" stop-opacity=\".025\"/><stop offset=\"1\" stop-color=\"#c1b5fa\" stop-opacity=\"0\"/></radialGradient><radialGradient id=\"bg-front-surface-shadow\" gradientUnits=\"userSpaceOnUse\" cx=\"0\" cy=\"0\" r=\"1\"><stop offset=\"0\" stop-color=\"#0c0d17\" stop-opacity=\".64\"/><stop offset=\".3\" stop-color=\"#0c0d17\" stop-opacity=\".46\"/><stop offset=\".65\" stop-color=\"#0c0d17\" stop-opacity=\".15\"/><stop offset=\"1\" stop-color=\"#0c0d17\" stop-opacity=\"0\"/></radialGradient><radialGradient id=\"bg-front-sweep-fold\" href=\"#bg-front-surface-shadow\" gradientTransform=\"translate(645 445) rotate(-23) scale(490 105)\"/><radialGradient id=\"bg-front-upper-light\" href=\"#bg-front-surface-light\" gradientTransform=\"translate(1090 145) rotate(112) scale(235 90)\"/><radialGradient id=\"bg-front-sweep-light\" href=\"#bg-front-surface-light\" gradientTransform=\"translate(560 465) rotate(-26) scale(450 70)\"/><radialGradient id=\"bg-front-left-fold\" href=\"#bg-front-surface-shadow\" gradientTransform=\"translate(390 310) rotate(120) scale(320 105)\"/><radialGradient id=\"bg-front-left-upper-light\" href=\"#bg-front-surface-light\" gradientTransform=\"translate(525 165) rotate(111) scale(270 78)\"/><radialGradient id=\"bg-front-left-lower-light\" href=\"#bg-front-surface-light\" gradientTransform=\"translate(145 510) rotate(127) scale(330 65)\"/></defs><g><path d=\"M930-40C1335 5 1220 235 930 355C650 475 260 520 115 685C20 790-5 885 0 950H-120V-80H930Z\" fill=\"url(#bg-front-sweep)\"/><path d=\"M930-40C1335 5 1220 235 930 355C650 475 260 520 115 685C20 790-5 885 0 950H-120V-80H930Z\" fill=\"url(#bg-front-sweep-fold)\"/><path d=\"M930-40C1335 5 1220 235 930 355C650 475 260 520 115 685C20 790-5 885 0 950H-120V-80H930Z\" fill=\"url(#bg-front-upper-light)\"/><path d=\"M930-40C1335 5 1220 235 930 355C650 475 260 520 115 685C20 790-5 885 0 950H-120V-80H930Z\" fill=\"url(#bg-front-sweep-light)\"/><path d=\"M930-40C1335 5 1220 235 930 355C650 475 260 520 115 685C20 790-5 885 0 950\" fill=\"none\" stroke=\"#141520\" stroke-opacity=\".45\" stroke-width=\"7\"/><path d=\"M930-40C1335 5 1220 235 930 355C650 475 260 520 115 685C20 790-5 885 0 950\" fill=\"none\" stroke=\"url(#bg-front-rim)\" stroke-width=\"2.2\"/></g><g><path d=\"M375-30C775 10 545 280 305 445C90 590-35 725-25 950H-120V-80H375Z\" fill=\"url(#bg-front-left)\"/><path d=\"M375-30C775 10 545 280 305 445C90 590-35 725-25 950H-120V-80H375Z\" fill=\"url(#bg-front-left-fold)\"/><path d=\"M375-30C775 10 545 280 305 445C90 590-35 725-25 950H-120V-80H375Z\" fill=\"url(#bg-front-left-upper-light)\"/><path d=\"M375-30C775 10 545 280 305 445C90 590-35 725-25 950H-120V-80H375Z\" fill=\"url(#bg-front-left-lower-light)\"/><path d=\"M375-30C775 10 545 280 305 445C90 590-35 725-25 950\" fill=\"none\" stroke=\"#13141f\" stroke-opacity=\".4\" stroke-width=\"6\"/><path d=\"M375-30C775 10 545 280 305 445C90 590-35 725-25 950\" fill=\"none\" stroke=\"url(#bg-front-rim)\" stroke-width=\"2\"/></g></svg></div></div>")
			.prependTo($body);

		var backgroundPaused = false,
			$backgroundToggle = $('<button type="button" id="backgroundToggle" aria-controls="backgroundArtwork"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path class="background-toggle-pause" d="M7 4h4v16H7zm6 0h4v16h-4z"/><path class="background-toggle-play" d="M8 4v16l12-8z"/></svg><span>Background</span></button>')
				.appendTo($body);

		try {
			backgroundPaused = window.localStorage.getItem('portfolio-background-paused') === 'true';
		} catch (error) {
			// Motion controls also work when storage is unavailable.
		}

		var updateBackgroundMotion = function() {
			$body.toggleClass('background-paused', backgroundPaused || document.hidden);
			var label = backgroundPaused ? 'Play background animation' : 'Pause background animation';
			$backgroundToggle.attr({ 'aria-label': label, title: label });
		};

		$backgroundToggle.on('click', function() {
			backgroundPaused = !backgroundPaused;
			updateBackgroundMotion();

			try {
				window.localStorage.setItem('portfolio-background-paused', String(backgroundPaused));
			} catch (error) {
				// Keep the current page's preference when storage is unavailable.
			}
		});

		$(document).on('visibilitychange', updateBackgroundMotion);
		$window.on('pageshow', updateBackgroundMotion).on('pagehide', function() {
			$body.addClass('background-paused');
		});
		updateBackgroundMotion();
		$body.addClass('background-animated');

	// Nav Panel.

		// Toggle.
			$navPanelToggle = $(
				'<a href="#navPanel" id="navPanelToggle">Menu</a>'
			)
				.appendTo($wrapper);

			// Change toggle styling once we've scrolled past the header.
				$header.scrollex({
					bottom: '5vh',
					enter: function() {
						$navPanelToggle.removeClass('alt');
					},
					leave: function() {
						$navPanelToggle.addClass('alt');
					}
				});

		// Panel.
			$navPanel = $(
				'<div id="navPanel">' +
					'<nav>' +
					'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-navPanel-visible'
				});

			// Get inner.
				$navPanelInner = $navPanel.children('nav');

			// Move nav content on breakpoint change.
				var $navContent = $nav.children();

				breakpoints.on('>medium', function() {

					// NavPanel -> Nav.
						$navContent.appendTo($nav);

					// Flip icon classes.
						$nav.find('.icons, .icon')
							.removeClass('alt');

				});

				breakpoints.on('<=medium', function() {

					// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

					// Flip icon classes.
						$navPanelInner.find('.icons, .icon')
							.addClass('alt');

				});

			// Hack: Disable transitions on WP.
				if (browser.os == 'wp'
				&&	browser.osVersion < 10)
					$navPanel
						.css('transition', 'none');

	// Intro.
		var $intro = $('#intro');

		if ($intro.length > 0) {

			// Hack: Fix flex min-height on IE.
				if (browser.name == 'ie') {
					$window.on('resize.ie-intro-fix', function() {

						var h = $intro.height();

						if (h > $window.height())
							$intro.css('height', 'auto');
						else
							$intro.css('height', h);

					}).trigger('resize.ie-intro-fix');
				}

			// Hide intro on scroll (> small).
				breakpoints.on('>small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'bottom',
						top: '25vh',
						bottom: '-50vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

				});

			// Hide intro on scroll (<= small).
				breakpoints.on('<=small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'middle',
						top: '15vh',
						bottom: '-15vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

			});

		}

})(jQuery);
