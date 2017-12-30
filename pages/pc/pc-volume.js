/*global tau */
(function(){
	/**
	 * page - Progress page element
	 * progressBar - Circle progress element
	 * resultDiv - Indicator element for the progress percentage
	 * isCircle - TAU button instance for delete button
	 * progressBarWidget - TAU circle progress instance
	 * resultText - Text value for the progress percentage
	 * pageBeforeShowHandler - pagebeforeshow event handler
	 * pageHideHandler - pagehide event handler
	 */
	var page = document.getElementById( "pcVolumePage" ),
	progressBar = document.getElementById("volumeSlider"),
	resultDiv = document.getElementById("currentVolume"),
	isCircle = tau.support.shape.circle,
	isMute = false,
	volume = 20,
	progressBarWidget,
	resultText,
	pageBeforeShowHandler,
	pageHideHandler,
	i;

	/**
	 * Updates the percentage of the progress
	 */
	function updateVolume(value) {
		resultText = value + "%";
		if (value === 0){
			resultText = "MUTE";
		}
		resultDiv.innerHTML = resultText;
		setVolume(value);
	}
	
	function triggerMute() {
		isMute = !isMute;
		if (isMute){
			updateVolume(0);
		} else {
			updateVolume(volume);
		}
	}

	/**
	 * Initializes global variables
	 */
	function clearVariables() {
		page = null;
		progressBar = null;
		resultDiv = null;
	}
	

	/**
	 * Rotary event handler
	 */
	function rotaryDetentHandler() {
		// Get rotary direction
		var direction = event.detail.direction,
		value = parseInt(progressBarWidget.value(), 10);

		if (direction === "CW") {
			// Right direction
			if (value < 100) {
				value += 5;
			} else {
				value = 100;
			}
		} else if (direction === "CCW") {
			// Left direction
			if (value > 0) {
				value -= 5;
			} else {
				value = 0;
			}
		}

		progressBarWidget.value(value);
		volume = value;
		updateVolume(volume);
	}

	/**
	 * Removes event listeners
	 */
	function unbindEvents() {
		page.removeEventListener("pageshow", pageBeforeShowHandler);
		page.removeEventListener("pagehide", pageHideHandler);
		if (isCircle) {
			document.removeEventListener("rotarydetent", rotaryDetentHandler);
		}
	}

	/**
	 * pagebeforeshow event handler
	 * Do preparatory works and adds event listeners
	 */
	pageBeforeShowHandler = function () {
		console.log(isCircle);
		if (isCircle) {
		// make Circle Progressbar object
			progressBarWidget = new tau.widget.CircleProgressBar(progressBar, {size: "full"});
			document.addEventListener("rotarydetent", rotaryDetentHandler);
		} else {
			progressBarWidget = new tau.widget.CircleProgressBar(progressBar, {size: "large"});
		}
		
		$("#currentVolume" ).click(function() {
			  triggerMute();
		});

		i = parseInt(progressBarWidget.value(), 10);
		resultDiv.innerHTML = i + "%";
	};

	/**
	 * pagehide event handler
	 * Destroys and removes event listeners
	 */
	pageHideHandler = function () {
		unbindEvents();
		clearVariables();
		// release object
		progressBarWidget.destroy();
	};

	page.addEventListener("pagebeforeshow", pageBeforeShowHandler);
	page.addEventListener("pagehide", pageHideHandler);
}());
