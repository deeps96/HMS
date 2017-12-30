(function() {

	var page = document.getElementById( 'visualization-page' );
	
	if (page){
		page.addEventListener( 'pagebeforeshow', function() {
			listVisualizationParameters(updateVisualizationList);
		});
	} else {
		page = document.getElementById( 'audiocore-page' );
		page.addEventListener( 'pagebeforeshow', function() {
			listAudioCoreParameters(updateAudioCoreList);
		});
	}
	
	function updateVisualizationList(address, parameters){
		updateList('visualizationRadios', parameters);
	}
	
	function updateAudioCoreList(address, parameters){
		updateList('audioCoreRadios', parameters);
	}
	
	function updateList(listID, parameters){
		var list = $('#' + listID);
		$(parameters).each(function(i, entry) {
			var name = entry.substr(0, entry.lastIndexOf('.')) || entry;
			list.append('<li class="li-has-radio"><label>' + name + '<input type="radio" name="' + listID.substring(0, listID.length - 1) + '" value="' + entry + '"/></label></li>');
		});
		registerClicklistener(listID.substring(0, listID.length - 1));
	}
	
	function registerClicklistener(radioName){
		$('[name="' + radioName + '"]').each(function(i, element) {
			$(element ).click(function() {
				if (element.checked){
					if (radioName === 'audioCoreRadio'){
						loadAudioCoreParameter(element.value);
					} else {
						loadVisualizationParameter(element.value);
					}
				}
			});
			
		});
	}
	
	

}());