// Lorem ipsum parser
(function main() {
	"use strict";

	var btn, text, textArea;

	function init () {
		textArea = document.getElementById("text");
		btn = document.getElementById("parse");
		btn.addEventListener("click", parseText, false);
	}

	function parseText (e) {
		var uniques = [],
				sortedWords = {},
				result;
		e.preventDefault();
		text = textArea.value;
		// transform to lowercase
		text = text.split(" ").map(function (word) {
			return word.toLowerCase();
		});
		// remove duplicates and sort alphabetically
		uniques = text.filter(function (word, index) {
			if (text.indexOf(word, index + 1) === -1)
				return word;
		}).sort();

		// Build word object sorted by word length
		uniques.forEach(function (word) {
			if (!sortedWords[word.length])
				sortedWords[word.length] = [];
			sortedWords[word.length].push(word);
		});

		// Turn into JSON, output
		result = document.getElementById("result");
		result.value = JSON.stringify(sortedWords);
	}

	// add event listener for page load
	window.addEventListener("load", init, false);

})();