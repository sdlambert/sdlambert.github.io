/*
 * Main module for the lorem ipsum chat, declares local vars, calls init() on
 *  load
 *
 */

(function main() {
	"use strict";

	// Local vars
	var words,       // object for lorem ipsum JSON
			xhr,         // XMLHttpRequest object
			chatInput,   // chat input
			chatHistory; // chat history window


/*
 * init - initializes XMLHttpRequest, adds event listener
 *
 */
	function init () {

		// Get JSON using AJAX, parse to obj
		xhr = getXHR();
		xhr.open("get", "data/words.json", true);
		xhr.send(null);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200)
				words = JSON.parse(xhr.responseText);
			else
				console.log("Ready state:" + xhr.readyState + " Status: " + xhr.status);
		};

		// initialize variables
		chatInput = document.getElementById("chat");
		chatInput.addEventListener("keyup", parseText, false);
		chatHistory = document.getElementById("chat_history");
	}


/**
 * parseText                     - listens for enter key
 * @param {Event} event          - keyup from chatInput
 *
 */
	function parseText(event) {
		var message;

		if (event.keyCode === 13) {
			message = chatInput.value;

			// message is "sent" and triggers bot "response"
			chatInput.value = "";
			sendMessage("user", message);
			respondTo(message);
		}
	}


	/*
	 * respondTo                   - responds to the user's message
	 * @param  {String} message    - incoming message string
	 *
	 */
	function respondTo(message) {

		var response = "", // String to hold generated response
				numWords,      // number of words in response
				numChars,      // number of characters in word
				selectedWord,  // index of selected word (by length)
				msgLength;     // number of words in message String

		// short sentences typically get short responses.
		if (message.indexOf(" ") === -1)
			msgLength = 1;
		else
			msgLength = message.split(" ").length;
		// maximum response length is 2 more words than the incoming message
		numWords = Math.ceil(Math.random() * (msgLength + 2));

		// build the response
		while (numWords > 0) {

			// pick a word, but don't repeat the last one!
			do {
				numChars = wordLengthByFrequency();
				selectedWord = Math.floor(Math.random() * words[numChars].length);
			}
			while (words[numChars][selectedWord] == response.split(" ").pop());

			// Capitalize first word only
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


	/**
	 * sendMessage  -
	 * @param  {String} from       - "user", "bot" class
	 * @param  {String} message    - message
	 *
	 */
	function sendMessage(from, message) {
		var p, div;

		// paragraph
		p = document.createElement("p");
		p.appendChild(document.createTextNode(message));
		p.classList.add(from);

		// div
		div = document.createElement("div");
		div.appendChild(p);
		div.classList.add("full");

		// chatHistory
		chatHistory.appendChild(div);
		chatHistory.scrollTop = chatHistory.scrollHeight;
	}


	/**
	 * wordLengthByFrequency - Normal (Gaussian) distribution for word lengths.
	 *  Higher length words are called less frequently.
	 *
	 */
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


	/**
	 * getXHR - XMLHttpRequest function
	 *
	 */
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