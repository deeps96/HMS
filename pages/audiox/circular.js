/*global tau */
(function() {

	var page = document.getElementById( 'circularSectionchangerPage' ),
		changer = document.getElementById( 'circularSectionchanger' ),
		sectionLength = document.querySelectorAll('section').length,
		elPageIndicator = document.getElementById('pageIndicator'),
		sectionChanger,
		pageIndicator,
		pageIndicatorHandler;

	
	
	/**
	 * pagebeforeshow event handler
	 * Do preparatory works and adds event listeners
	 */
	page.addEventListener( 'pagebeforeshow', function() {
		// make PageIndicator
		pageIndicator =  tau.widget.PageIndicator(elPageIndicator, { numberOfPages: sectionLength });
		pageIndicator.setActive(1);
		// make SectionChanger object
		sectionChanger = tau.widget.SectionChanger(changer, {
			circular: true,
			orientation: 'horizontal',
			useBouncingEffect: true
		});
		
		$('#startDiv' ).click(function() {
			changeAudioOutput('Line 1');
			startAudioX();
		});
		
		$('#stopDiv' ).click(function() {
			changeAudioOutput('Realtek Digital Output(Optical)');
			stopAudioX();
		});
		
	});
	
	/**
	 * pagehide event handler
	 * Destroys and removes event listeners
	 */
	page.addEventListener( 'pagehide', function() {
		// release object
		sectionChanger.destroy();
	});

	/**
	 * sectionchange event handler
	 */
	pageIndicatorHandler = function (e) {
		pageIndicator.setActive(e.detail.active);
	};

	changer.addEventListener('sectionchange', pageIndicatorHandler, false);
}());
