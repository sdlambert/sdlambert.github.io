---
title: "Coding Project: A Lorem Ipsum Chat Application"
layout: post
tags:
 - javascript
description: "I created a simple chat application designed to speak lorem ipsum. Follow along as I cover the creation of a lorem ipsum conversion tool, breakdown the code and higher order functions used, and discuss some of the challenges I faced."
#metadata
image_path: "/img/loremipsum.png"
---

![Lorem Ipsum Chat Application](/img/loremipsum.png "Lorem Ipsum Chat Application")

One of the most frustrating things an aspiring developer can do is try to come up with practical ideas for their next project. I found myself running into this very problem. I've got lots of ideas, and I wanted to challenge myself. I also knew I wanted to make something that was more interactive, an application that resembled something that people would actually use.

What I ended up with was a simple SMS-like application, complete with a bot that spoke back to the user with responses generated in *lorem ipsum*. In this post, I’ll walk through the process of setting up the data, developing the algorithm for the bot, DOM manipulation, asynchronous Javascript, and lastly, some of the bugs I encountered along the way.

<!--more-->

## Bottling Latin

I started my project by figuring out how to create an object that contained all of the *lorem ipsum* from which my bot could pick and choose. I headed over to the handy [Lorem Ipsum Generator][1] and generated about 25 paragraphs worth of text. From this I'd need to create a simple application to transform this text into a usable Javascript object. I knew my bot would need to pick words at random, but I wanted to do so in a way that resembled regular speech patterns. So, I went about to filter the text into unique words and then sort by word length.

The resulting parsing application can be found [here][2]. Please feel free to view the [source code][3].

The interface is quite simple: two text boxes, the first an input which takes in our source text (in this case, *lorem ipsum*, but any text will do. Our bot can't recognize nouns and verbs or the like, so it helps to stick to "gibberish.") The second text box is for output, which is where our JSON object shows up. Our final object will look something like this:

    {"1": ["a"], "2": ["ac","ad","at"], "3": ["cum","dis","dui","est", ...}

The object keys represent the corresponding word lengths. We can then reference the array by calling the object accordingly:

    words[3]; // references an array of three letter words

From there, we can do a lot of things, like setting up the frequency of certain length words and picking them out of the array at random. More on that later. For now, let's take a closer look at the code, which leans heavily on the higher-order functions of the Array and String objects:

{% highlight javascript %}
text = textIn.value.split(" ").map(function (word) {
  return word.split("").filter(function (letter) {
    return /\w/.test(letter);
    }).join("").toLowerCase();
  });
{% endhighlight %}

This bit of code boils down our incoming text into smaller, legible pieces by parsing out all the spaces, punctuation and special characters. We `split` up all the incoming text by spaces, and then call `map` to grab each individual word. Then, we `split` each word up once more into individual characters and `filter` out any unwanted punctuation or odd characters using a Regular Expression. Finally, we `join` the remaining characters back into a word and transform any uppercase letters to lowercase.

The resulting algorithm is not very stringent. You could, for instance, enter a message in binary or even random letters and numbers. On the other hand, it doesn't care much for common English contractions (i.e. "don't" or "shouldn't") as they contain a single parenthesis. For that matter, any word with non-alphanumeric characters in its midst (i.e. "non-smoking") will be contracted to remove said characters. Since our latin text does not abide by such linguistic rules, it's not a problem, but you may run into issues with other samples.

{% highlight javascript %}
uniques = text.filter(function (word, index) {
  if (text.indexOf(word, index + 1) === -1)
    return word;
}).sort();
{% endhighlight %}

Here we check for duplicate words. We `filter` our new array and check to see if each word is found anywhere else in our array. If so, we know that this is a duplicate and can move on. If not, we know we have a unique word and we can add it to our `uniques` array. The algorithm works by grabbing only the last unique value.

{% highlight javascript %}
uniques.forEach(function (word) {
  if (!sortedWords[word.length])
    sortedWords[word.length] = [];
  sortedWords[word.length].push(word);
});
{% endhighlight %}

Now we take our unique words and sort them into our `sortedWords` object. We do this by checking for the existence of the key, which in this case represents the word length. If it doesn't exist, we create an empty array. Finally, we measure the length of each word and place it in the corresponding array. Once we're finished, we convert it to JSON so we can import it later on.

## Generating a Pseudo-Intelligent Response

We've successfully been able to convert our raw text into an object, which we will now use to generate our randomized response. The process is pretty straightforward: get some input from the user, generate a response, and add it to the DOM.

Before we discuss further, here's a link to the final version of [the chat bot][4]. Please feel free to view the [source code][5] as well.

For the sake of brevity, I'll summarize most of the initializations needed to get our application up and running. The first portion of the code declares some global variables, grabs our *lorem ipsum* object via `XMLHttpRequest`, and initializes our event listeners. From there, we've set up the basic function that allows us to get some input from the user. Specifically, we'll be listening to for the Enter key to be pressed to generate a response:

{% highlight javascript %}
function parseText(event) {
  var message;

  if (event.keyCode === 13 && chatInput.value) {
    message = chatInput.value.trim();

    // message is "sent" and triggers bot "response" with small delay
    if (message !== "") {
      chatInput.value = "";
      sendMessage("user", message);
      // Only respond to one message at a time
      if(!isTyping) {
        isTyping = true;
        setTimeout(function () {
          respondTo(message);
        }, Math.random() * (4000) + 1000);
      }
    }
  }
}
{% endhighlight %}

Once we've got a response, we immediately append it to the DOM. We take the input and call `trim` to make sure we've got some actual text. (If not, we do nothing.)  We then clear the text field and append the message to the DOM using the `sendMessage` function. This is where the bot takes over and generates a random message to respond with. We set up a delayed reply from the bot to simulate the time it takes for a typical text message to be sent and read.

The final bit of code prevents the user from generating multiple responses. We set the `isTyping` flag to `true` to prevent the bot from generating a response while it's "typing" in response to the original text. It's a simplified way to make sure we aren't triggering dozens of replies. Our bot is only smart enough to reply to one text at a time, after all. By doing this we ignore any additional messages and focus solely on the first. The `isTyping` flag gets set back to `false` once we've posted a response from the bot.

So if the bot is "typing" a response, we'll show a small animation indicating as much. During this time, the bot will not generate any additional responses. To add to the realism, we'll delay the response anywhere from one to four seconds to simulate the time between "receiving" the text and responding.

{% highlight javascript %}
function respondTo(message) {
  var response = "",  // String to hold generated response
      responseLength, // number of words in response
      numChars,       // number of characters in word
      selectedWord,   // index of selected word (by length)
      delay,          // chat bot delay in ms
      msgLength,      // number of words in @message String
      comma;          // optional comma

  // short sentences typically get short responses.
  if (message.indexOf(" ") === -1)
    msgLength = 1;
  else
    msgLength = message.split(" ").length;

  // maximum response length is 2 more words than the incoming message
  responseLength = Math.ceil(Math.random() * (msgLength + 2));

  // longer sentences should get a comma
  if (responseLength > 8)
    comma = Math.ceil(responseLength / 2);

  // simulated delayed response
  delay = Math.ceil(Math.random() * (responseLength + 1) * 1000) + 2500;

  // build the response
  while (responseLength > 0) {
    // pick a word, but don't repeat the last one!
    do {
      numChars = wordLengthByFrequency();
      selectedWord = Math.floor(Math.random() * words[numChars].length);
    }
    while (words[numChars][selectedWord] == response.split(" ").pop().toLowerCase());

    // Capitalize first word only
    if (!response)
      response = capitalizeWord(words[numChars][selectedWord]);
    else
      response += words[numChars][selectedWord];

    // comma?
    if (comma && responseLength === comma)
      response += ',';

    responseLength--;

    // last word? add punctuation, if not add a space
    response += (responseLength === 0) ? getPunctuation() : " ";
  }

  createMessage("bot", response, delay);
}
{% endhighlight %}

The `respondTo` function takes a single parameter, and bases its reply on the length of the incoming message. We measure the length of our `message` in words, then choose an arbitrary length no greater than two words longer than what it received. This is to prevent the bot from answering a simple message with something more complex. Responses longer than eight words will get a comma. Longer responses also take longer for our bot to "type", so we set our delay based roughly on the number of words, but with an absolute minimum response time of a few seconds.

Finally, we build the response. This is where our JSON object containing all of our *lorem ipsum* comes into play. We start a loop and grab words one by one until we've generated a response. To do so, we make a call to a helper function, `wordLengthByFrequency`, which picks a word length at random based on a normal distribution meant to replicate that of [English][6]. To make our response seem more human, we've made sure not to repeat any words by comparing the last word added to our response to the currently selected one. If there's a match, we pick something else entirely.

The last few lines of code are for punctuation. If we've got a long message, we noted where that comma should go earlier and append it to the end of that word when we get to it. We also make sure to add random punctuation to the end of our response. Most of the time the bot will respond with a simple statement ending in a period, but 10% of the time it will end in an exclamation point or question mark. We end the function by sending our generated message off to the `createMessage` function:

{% highlight javascript %}
function createMessage(from, message, delay) {
  var p,                 // paragraph element for message
      img,               // image for avatar
      innerDiv,          // inner div to hold animation and avatar
      outerDiv,          // outer div for clearing floats
      animationSequence, // class list for animation
      position;          // left or right

  // paragraph
  p = document.createElement("p");

  // img
  img = document.createElement("img");

  if (from === "bot") {
    img.src = "img/helmet1.svg";
    position = "left";
  }
  else if (from === "user") {
    img.src = "img/user168.svg";
    position = "right";
  }

  img.classList.add("avatar", "middle", position);

  // inner div
  innerDiv = document.createElement("div");
  innerDiv.appendChild(img);
  innerDiv.classList.add(from);

  // add animation, remove animation, add message
  if (delay) {
    addAnimation(innerDiv);
    setTimeout(function () {
      removeAnimation(innerDiv);
      p.appendChild(document.createTextNode(message));
      innerDiv.appendChild(p);
      history.scrollTop = history.scrollHeight;
      isTyping = false;
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

  // history
  history.appendChild(outerDiv);
  history.scrollTop = history.scrollHeight;
}
{% endhighlight %}

Most of our createMessage function is spent building the necessary elements needed to append a chat bubble to the DOM. But there are some other interesting things to note as well. Depending on how the function is called, the function will append different avatars for each chat bubble, as well as classes that dictate things like color and whether the elements float to the left or right. We use this function for both the user and the bot's responses.

In addition, our function takes in an optional delay parameter, which is used for our bot. If there's a delay, we place an animation in place of the text to simulate the bot typing on the other end. After the delay, we remove the animation and replace it with the bot's message back to the user. (We determined the delay when we generated our response; the bot will take longer to respond if it's "typing" a longer message.) We also set our `isTyping` flag back to allow the user to respond and get a reply again.

You'll note a short bit of code repeated twice in our function:

    history.scrollTop = history.scrollHeight;

This neat little trick allows us to scroll the `history` element down to the bottom, so we're always looking at the last message entered.

The remaining code consists of helper functions to add animations, punctuation or pick a word based on frequency.

## Breaking Things and Putting Them Back Together

Of course, the final code didn't come without its own challenges. One of the most interesting bugs was actually found by my daughter. When entering a very long string, one whose width was wider than the outside container, poked out from the sides. The likelihood of someone entering a 43 character word was rather slim, but just in case the code will be able to handle it.

A lot of the bugs were resolved by tweaking the algorithm for determining the response. For instance, the odds of two identical words appearing next to each other were slim, but they did occur from time to time. To prevent this, I had to add in a line of code that looped through the selection process until it found something different. There were also refactoring challenges, like breaking out the code into smaller helper functions. My original frequency function used a long series of if else statements, but the resulting formula is much shorter and slightly easier to read. The process of fixing bugs isn't always fun, but it's certainly rewarding.

With school back in swing, I've got less and less time to work on code in my spare time, so I'm happy to finally be able to share this post with all of you. I hope you enjoyed walking through the code, and I invite you to reach out to me if you have any questions. Thanks for reading!

*This post is part of a series covering the various coding projects I put up on the web. This specific project was inspired by my everyday interaction with Google Hangouts on my Android phone. All the source code is freely [available on GitHub][7].*

Additional resources:

* [Eloquent Javascript - Chapter 5 - Higher Oder Functions (Haverbeke)][8]
* [Javascript is Sexy - Understand JavaScript Callback Functions and Use Them][9]
* [A dirt simple introduction to higher order functions in JavaScript][10]

[1]: http://lipsum.com
[2]: http://sdlambert.github.io/loremipsum/parse.html
[3]: https://github.com/sdlambert/loremipsum/blob/gh-pages/js/parser.js?ts=2
[4]: http://sdlambert.github.io/loremipsum/chat.html
[5]: https://github.com/sdlambert/loremipsum/blob/gh-pages/js/chat.js?ts=2
[6]: http://arxiv.org/pdf/1207.2334.pdf
[7]: https://github.com/sdlambert/loremipsum
[8]: http://eloquentjavascript.net/05_higher_order.html
[9]: http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/
[10]: https://medium.com/humans-create-software/a-dirt-simple-introduction-to-higher-order-functions-in-javascript-b33bf9e19056


