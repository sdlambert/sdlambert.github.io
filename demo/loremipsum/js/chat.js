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

		if (event.keyCode === 13 && chatInput.value) {
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
				delay,         // chat bot delay in ms
				msgLength,     // number of words in @message String
				comma;         // optional comma

		// short sentences typically get short responses.
		if (message.indexOf(" ") === -1)
			msgLength = 1;
		else
			msgLength = message.split(" ").length;

		// longer sentences should get a comma
		if (msgLength > 8)
			comma = Math.ceil(msgLength / 2);

		// maximum response length is 2 more words than the incoming message
		numWords = Math.ceil(Math.random() * (msgLength + 2));

		// simulated delayed response
		delay = Math.ceil(Math.random() * (numWords + 1) * 1000 + 2000);

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
				// neat trick to filter out any empty strings ("")
				response.filter(Boolean);
				response[0] = response[0].toUpperCase();
				response = response.join("");
			}
			else
				response += words[numChars][selectedWord];

			// comma?
			if (comma && numWords == comma)
				response += ',';

			// one less word required for our response
			numWords--;

			// last word? add punctuation, if not add a space
			response += (numWords === 0) ? getPunctuation() : " ";
		}

		sendMessage("bot", response, delay);
	}


	/**
	 * sendMessage  -
	 * @param  {String} from       - "user", "bot" class
	 * @param  {String} message    - message
	 * @param  {Number} delay      - delay in MS
	 *
	 */
	function sendMessage(from, message, delay) {
		var p, img, innerDiv, outerDiv,
				animationSequence = ["one","two","three"];

		// paragraph
		p = document.createElement("p");

		// img
		img = document.createElement("img");
		if (from === "bot")
			img.src = "img/helmet1.svg";
		else if (from === "user")
			img.src = "img/user168.svg";
		img.classList.add("avatar", "middle");

		// inner div
		innerDiv = document.createElement("div");
		innerDiv.appendChild(img);
		innerDiv.classList.add(from);

		if (delay) {

			// create our three bouncer divs and assign animations
			animationSequence.forEach(function (animationClass) {
				var newDiv = document.createElement("div");
				newDiv.classList.add("bouncer", animationClass);
				innerDiv.appendChild(newDiv);
			});

			// once the delay is done, remove child divs, add message
			setTimeout(function () {
				var i = innerDiv.childNodes.length - 1;
				for ( ; i >= 0; i--)
					if (innerDiv.childNodes[i].tagName === "DIV")
						innerDiv.removeChild(innerDiv.childNodes[i]);
				p.appendChild(document.createTextNode(message));
				innerDiv.appendChild(p);
				chatHistory.scrollTop = chatHistory.scrollHeight;
			}, delay);
		}
		else {
			// no delay, just post it
			p.appendChild(document.createTextNode(message));
			innerDiv.appendChild(p);
		}

		//outer div
		outerDiv = document.createElement("div");
		outerDiv.appendChild(innerDiv);
		outerDiv.classList.add("full");

		// chatHistory
		chatHistory.appendChild(outerDiv);
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
	 * getPunctuation returns a random punctuation mark based on frequency
	 *
	 */

	function getPunctuation() {
		var mark = Math.ceil(Math.random() * 10);

		if (mark == 9)
			return '?';
		else if (mark == 10)
			return '!';
		else
			return '.';
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