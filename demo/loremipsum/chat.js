// Lorem ipsum chat
(function main() {
	"use strict";

	var words; // object for lorem ipsum JSON
	var xhr; // XMLHttpRequest object

	function init () {
		// Get JSON object using AJAX
		xhr = getXHR();
		xhr.open("get", "words.json", true);
		xhr.send(null);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200)
				words = JSON.parse(xhr.responseText); // assign to words object
			else // remove or parse errors?
				console.trace();
				console.log("Ready state:" + xhr.readyState + " Status: " + xhr.status);
		};
	}

	function getXHR() {
		if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
			xhr = new XMLHttpRequest();
		}
		else if (window.ActiveXObject) { // IE 6 and older
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		else {
			window.alert("Your browser does not support AJAX.");
			return false;
		}
		return xhr;
	}



	// add event listener for page load
	window.addEventListener("load", init, false);

})();