(function(tau) {
	var page = document.getElementById("radio-page"),
		selector = document.getElementById("selector"),
		selectorComponent,
		clickBound;

	/**
	 * click event handler for the selector
	 */
	function onClick(event) {
		var target = event.target;
		/*
		 * Default indicator class selector is "ui-selector-indicator".
		 * If you want to show custom indicator sample code,
		 * check the 'customIndicator.js' please.
		 */
		if (target.classList.contains("ui-selector-indicator")) {
			clickIRButton($('.ui-item-active').data("value"));
		}
	}
	
	function clickIRButton(button){
		pressRadioButton("desktop", button);
	}

	/**
	 * pagebeforeshow event handler
	 * Do preparatory works and adds event listeners
	 */
	page.addEventListener("pagebeforeshow", function() {
		clickBound = onClick.bind(null);
		selectorComponent = tau.widget.Selector(selector);
		selector.addEventListener("click", clickBound, false);
		
		$('#selector .ui-item').each(function(i, entry) {
			var jEntry = $(entry);
			jEntry.click(function() {
				  clickIRButton(jEntry.data("value"));
			});
		});
	});

	/**
	 * pagebeforehide event handler
	 * Destroys and removes event listeners
	 */
	page.addEventListener("pagebeforehide", function() {
		selector.removeEventListener("click", clickBound, false);
		selectorComponent.destroy();
	});
}(window.tau));