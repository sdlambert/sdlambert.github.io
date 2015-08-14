---
title: "Coding Project: Fibonacci Sequence (and a Lesson About Closures)"
layout: post
tags:
 - javascript
description: "A simple Javascript code project that displays the Fibonacci Sequence to the Nth number, which also resulted in a valuable lesson about Javascript closures."
#metadata
image_path: "/img/fibonacci.png"
---

![Image of a seashell on a background of mathematical formulae](/img/fibonacci.png "Fibonacci sequence in nature")

In this quick coding exercise I implement the Fibonacci sequence using Javascript, allowing the user to prompt how many numbers in the sequence they would like to calculate. The function will then return that many numbers in the sequence.

The [Fibonacci Sequence][1] is a sequence of numbers beginning with a set of two integers: 0 and 1 or 1 and 1. The next number in the sequence is the sum of the previous two. For instance:

`1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...etc.`

Implementing the function itself was simple enough, but I learned an even more valuable lesson about Javascript closures along the way.

<!--more-->

##The Problem

The algorithm itself wasn't exactly tricky. In fact, the Fibonacci sequence itself was only a few lines of code:

{% highlight javascript %}
function fibonacci(n) {
    var i, sequence = [1, 1]; // We start our sequence at [1, 1]
    for (i = 1; i < n - 1; i++)
        sequence.push(sequence[i] + sequence[i - 1]);
    return sequence;
}
{% endhighlight %}

Indeed, the hurdle I had with this project came when I tried to implement the user interface for the application. I wanted to display the resulting sequence in a list, with each new number displaying a moment after the previous with a "fade-in" transition.

This was simple enough: write a for loop and append a child for each number in the sequence to the list:

{% highlight javascript %}
for (i = 0; i < slider.value; i++) {
  li = document.createElement("li");
  // insert next Fibonacci sequence element
  textNode = document.createTextNode(sequence[i]);
  li.appendChild(textNode);
  list.appendChild(li);
  // setTimeout delay
  setTimeout(function() {
    li.classList.add("animation");
  }, (i + 1) * 500);
}
{% endhighlight %}

However, for some reason when I attempted to access the classList of the `<li>` element, the only element to receive the update was the last. Curiously, I had assumed that the `for` loop and `setTimeout` function would be enough to create closure, but that was not the case. After scratching my head a bit, I asked for help, which of course led me to [StackOverflow][5]. (Thank you, [jfriend000][6], for the solution!)

In order to capture each individual `<li>` element, I would need to encapsulate the entire bit of code within a closure in the form of an [immediately invoked function expression][4], or IIFE for short. By encapsulating the call within a function expression, complete with the unique `<li>` element, I was able to use the asynchronous `setTimeout` call within and successfully bind it to each number in the sequence:

{% highlight javascript %}
for (i = 0; i < slider.value; i++) {
    li = document.createElement("li");
    // insert next Fibonacci sequence element
    textNode = document.createTextNode(sequence[i]);
    li.appendChild(textNode);
    list.appendChild(li);
    // invoked function expression = closure
    (function(item) {
    setTimeout(function() {
        item.classList.add("animation","bordered");
        }, (i + 1) * 100);
    })(li);
}
{% endhighlight %}

Once I had solved the problem capturing the functionality within the closure, the rest of the functionality fell right into place. However, there was one thing that was still a bit off... Why was I using a for loop in the first place? Javascript is, after all, a functional language. I could just call `.forEach()` on the array and create a closure that way! (Indeed, upon searching I discovered another user with a very similar problem and a much more elegant solution!)

{% highlight javascript %}
sequence.forEach(function(i, idx) {
    var li = document.createElement("li");
    // insert next Fibonacci sequence element
    li.appendChild(document.createTextNode(i));
    list.appendChild(li);
    setTimeout(function() {
        li.classList.add("animation","bordered");
        }, (idx + 1) * 100);
    });
{% endhighlight %}

Now that I've encapsulated the closure within the function argument, I've cleaned up my code and removed the need for an IIFE. In addition, I've taken full advantage of the Array object and its functionality.

You can see the final demo here:

[Fibonacci Sequence Demo][8]

##Conclusion

While I had known about the functionality of IIFE's and the Array object before, I hadn't thought to use either on my first pass-through. Through just a few refactoring iterations, I was able to implement a common functional Javascript pattern and solve a problem along the way!

*This is the first post in a long series covering the various coding projects I discover on the web. This specific project comes from a GitHub repository by the user [Karan Goel][2] simply titled "[Projects][3]". If you're looking to tackle some projects of your own, it's a great resource for dozens of ideas and the project list is designed to be used with any programming language.*


Additional reading:

* [Getting Closure by Mark Dalgleish][9]
* [Demystifying JavaScript Closures, Callbacks and IIFEs][10]
* [5 Array Methods That You Should Be Using Right Now][11]


*Images courtesy of [jitze][12] and [dullhunk][13] via [everystockphoto.com][14], using the [CC v2.5 license][15].*

[1]:http://en.wikipedia.org/wiki/Fibonacci_number
[2]: https://github.com/karan
[3]: https://github.com/karan/Projects
[4]: http://en.wikipedia.org/wiki/Immediately-invoked_function_expression
[5]: http://stackoverflow.com/questions/30430420/unable-to-add-class-on-a-delay-with-settimeout
[6]: http://stackoverflow.com/users/816620/jfriend00
[7]: http://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example
[8]: {{ site.url }}/fibonacci/fibonacci.html
[9]: http://markdalgleish.com/presentations/gettingclosure/
[10]: http://www.sitepoint.com/demystifying-javascript-closures-callbacks-iifes/
[11]: http://colintoh.com/blog/5-array-methods-that-you-should-use-today
[12]: http://www.everystockphoto.com/photographer.php?photographer_id=63201
[13]: http://www.everystockphoto.com/photographer.php?photographer_id=12070
[14]: http://www.everystockphoto.com
[15]: http://creativecommons.org/licenses/by/2.5/