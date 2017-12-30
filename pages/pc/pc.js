(function() {

	var page = document.getElementById( 'pc-page' );

	page.addEventListener( 'pagebeforeshow', function() {
		
		isPCRunning(handle);
		
		$('#power-toggle').change(function() {
		    if ($(this).is(':checked')) {
		    	sendWOLToPC();
		    } else {
		    	shutdownPC();
		    }
		});
	});
	
	function handle(address, response){
		//this method gets called only if we got any response (no error and non empty)
		$('#power-toggle').prop('checked', true);
		$('#volume-link').removeClass('disabled');
	}
	
	
}());