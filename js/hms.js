function pressRadioButton(remote, button) {
	postRequest(
			'http://192.168.178.96:1814/pressButton',
			{
				remoteName: remote, 
				buttonName: button
			});
}

function pressIRButton(remote, button) {
	postRequest(
			'http://192.168.178.96:9171/pressButton',
			{
				remoteName: remote, 
				buttonName: button
			});
}

function loadAudioCoreParameter(parameter) {
	postRequest(
			"http://192.168.178.36:1219/loadAudioCoreParameter",
			{
				fileName: parameter
			});
}

function loadVisualizationParameter(parameter) {
	postRequest(
			"http://192.168.178.36:1219/loadVisualizationParameter",
			{
				fileName: parameter
			});
}

function listVisualizationParameters(handle){
	postRequest(
			"http://192.168.178.36:1219/listVisualizationParameters",
			null, 
			handle);
}

function listAudioCoreParameters(handle){
	postRequest(
			"http://192.168.178.36:1219/listAudioCoreParameters",
			null, 
			handle);
}

function changeAudioOutput(audioOutputDevice){
	postRequest(
			"http://192.168.178.36:1631/changeOutputDevice",
			{
				outputDevice: audioOutputDevice
			});
}

function startAudioX() {
	postRequest(
	"http://192.168.178.36:1219/startVisualizer");
}

function stopAudioX() {
	postRequest(
	"http://192.168.178.36:1219/stopVisualizer");
}

function setVolume(volume) {
	postRequest(
			"http://192.168.178.36:1631/setVolume", 
			{
				"device": "Realtek High Definition Audio\\Device\\Realtek Digital Output(Optical)",
				"volume": volume
			});
}

function sendWOLToPC() {
	postRequest(
			"http://192.168.178.96:2316/sendWOL",
			{
				"targetMAC": "90:2B:34:37:FB:4E",
				"targetAddress": "192.168.178.255"
			});
}

function shutdownPC() {
	postRequest(
	"http://192.168.178.36:1631/shutdown");
}

function isPCRunning(handler){
	postRequest(
			"http://192.168.178.36:1451/listStandbyModules",
			null,
			handler);
}

function postRequest(address){
	postRequest(address, null);
}

function postRequest(address, data){
	postRequest(address, data, null);
}

function postRequest(address, data, handle) {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.open("POST", address, true);
	//xmlhttp.responseType = 'json'; //leads to errors, because server is sending incorrect json -> f.e. array without {} -> response is empty
	xmlhttp.setRequestHeader('Content-Type', 'application/json');
	xmlhttp.onreadystatechange = function() {
		if (!xmlhttp){
			return;
		}
		if (xmlhttp.status === 200) {
			if (handle !== null) {
				handle(address, JSON.parse(xmlhttp.responseText));
			}
			xmlhttp = null;
		} else if (xmlhttp.status !== 204) { //204 = empty response
			alert("Connection error.");
		}
	};
	var dataString = "";
	if (data !== null){
		dataString = JSON.stringify(data);
	}
	xmlhttp.send(dataString);
}