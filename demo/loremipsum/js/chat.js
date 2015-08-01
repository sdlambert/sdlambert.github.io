// Lorem ipsum chat
(function main() {
	"use strict";

	var words, // object for lorem ipsum JSON
			xhr, // XMLHttpRequest object
			chatInput = document.getElementById("chat"), // chat input
			chatHistory = document.getElementById("chat_history");

	function init () {
		// Get JSON object using AJAX
		xhr = getXHR();
		xhr.open("get", "data/words.json", true);
		xhr.send(null);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200)
				words = JSON.parse(xhr.responseText); // assign to words object
			else // remove or parse errors?
				console.log("Ready state:" + xhr.readyState + " Status: " + xhr.status);
		};

		// listen for enter key
		chatInput.addEventListener("keyup", parseText, false);
	}

	function parseText(event) {
		var message;

		if (event.keyCode === 13) {
			message = chatInput.value;

			// reset chat prompt
			chatInput.value = "";

			// send message
			sendMessage("user", message);

			// bot respond
			respondTo(message);
		}
	}

	function respondTo(message) {
		// bot responds here
		var response = "",
				numWords,
				numChars,
				selectedWord,
				msgLength;

		// short sentences typically get short responses.
		if (message.indexOf(" ") === -1)
			msgLength = 1;
		else
			msgLength = message.split(" ").length;
		// maximum response is 2 more words than the incoming message
		numWords = Math.ceil(Math.random() * (msgLength + 2));

		// build the response
		while (numWords > 0) {

			// get length by frequency (see function)
			numChars = wordLengthByFrequency();

			// pick a word, but don't repeat the last one!
			do
				selectedWord = Math.floor(Math.random() * words[numChars].length);
			while (words[numChars][selectedWord] == response.split(" ").pop());

			// no response yet? capitalize it. otherwise, append it
			if (!response) {
				response = words[numChars][selectedWord].split("");
				// neat trick to filter out the empty string ""
				response.filter(Boolean);
				response[0] = response[0].toUpperCase();
				response = response.join("");
			}
			else
				response += words[numChars][selectedWord];

			// one less word in our response
			numWords--;

			// add a comma?

			// last word? add a period, if not add a space
			response += (numWords === 0) ? "." : " ";
		}

		// send message
		sendMessage("bot", response);
	}


	function sendMessage(from, message) {
		var p, div;

		// create paragraph element, add message
		p = document.createElement("p");
		p.appendChild(document.createTextNode(message));
		p.classList.add(from);

		// create div, add paragraph
		div = document.createElement("div");
		div.appendChild(p);
		div.classList.add("full");

		chatHistory.appendChild(div);
		chatHistory.scrollTop = chatHistory.scrollHeight;
	}

	// Our object only has words up to 16 characters in length

	function wordLengthByFrequency() {

		var rndm = Math.floor(Math.random() * 100);

			if (rndm <= 5)
				return 1;
			else if (rndm <= 12)
				return 2;
			else if (rndm <= 21)
				return 3;
			else if (rndm <= 34)
				return 4;
			else if (rndm <= 54)
				return 5;
			else if (rndm <= 67)
				return 6;
			else if (rndm <= 76)
				return 7;
			else if (rndm <= 81)
				return 8;
			else if (rndm <= 85)
				return 9;
			else if (rndm <= 89)
				return 10;
			else if (rndm <= 92)
				return 11;
			else if (rndm <= 94)
				return 12;
			else if (rndm <= 96)
				return 13;
			else if (rndm <= 98)
				return 14;
			else if (rndm <= 99)
				return 15;
			else if (rndm <= 100)
				return 16;
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