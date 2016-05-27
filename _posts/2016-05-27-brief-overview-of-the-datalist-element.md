---
title: "A Brief Overview of the Datalist Element"
layout: post
tags:
 - html
description: "A brief overview of the HTML5 &lt;datalist&gt; element. I'll discuss how it can be used with various input types, review some of its limitations, and present some use-case examples."
#metadata
image_path: "/img/datalist.png"
---

![Datalist element logo](/img/datalist.png "Datalist element logo")

The `<datalist>` element is an HTML5 element that provides a list of suggested values for an input element. In this brief article, we'll explore the usage of the element and look at some use cases, and discuss the browser support (or lack thereof) and how we can use the feature today using polyfills.

<!--more-->

## The Element

The `datalist` is an HTML5 element designed to augment standard text input with suggested values. You are likely already familiar with the behavior of the `datalist` element: most web browsers and search engines allow you to enter some text and a list of suggested terms appears below before you're finished typing your phrase. The `datalist` element contains all of the suggested values that appear below (or within) our input.

Using the `datalist` element is pretty straightforward in and of itself:

{% highlight html %}
<input type="text" name="laptopBrands" id="laptopBrands"
  placeholder="Enter your brand" list="brandList">
<datalist id="brandList">
    <option value="Acer">Acer</option>
    <option value="Apple">Apple</option>
    <option value="Asus">Asus</option>
    <option value="Dell">Dell</option>
    <option value="HP">HP</option>
    <option value="Lenovo">Lenovo</option>
    <option value="Samsung">Samsung</option>
    <option value="Sony">Sony</option>
</datalist>
{% endhighlight %}

You might notice that the `datalist` element borrows a familiar pattern from its more popular cousin, the `select` input element. The difference here is that you can define any number of datalists in your HTML, each with its own set of options. You can also include your `datalist` elements anywhere within the document, not necessarily next to your input.

The specification for the `input` element and its accompanying `list` attribute is designed to work with [a variety of HTML5 inputs][1], and not just text. You can define suggested values for [color, range, number, and even date and time inputs.][2] The exceptions to the rule are the hidden, checkbox, radio and button inputs. Unfortunately, the browser support for input types other than text is limited. (See the [Browser Support Section][3] below.)

## A Practical Use-Case

Imagine a scenario where we want the user to select from a set of values but also want to provide them with a way to enter their own custom information, in a catch-all category labeled "other". It might look something like this:

<p data-height="265" data-theme-id="0" data-slug-hash="ZWmKYa" data-default-tab="result" data-user="sdlambert" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/sdlambert/pen/ZWmKYa/">Select option with hidden "other" input</a> by Scott (<a href="http://codepen.io/sdlambert">@sdlambert</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

From a UX perspective this works just great, but on the interaction side we've got to implement a bit of JavaScript to make sure our selection works. We'll need to hide our "Other" text input unless the user selects the corresponding option from our drop-down. This also means to extract our values, we'll have to first check if the user selected "Other" before knowing which input contains the value we need.

A much simpler solution would use a datalist:

<p data-height="265" data-theme-id="0" data-slug-hash="MyzmYE" data-default-tab="result" data-user="sdlambert" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/sdlambert/pen/MyzmYE/">Datalist example</a> by Scott (<a href="http://codepen.io/sdlambert">@sdlambert</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

This offers a few advantages: we're no longer dependent on JavaScript to show or hide elements, and our value is now stored in a single location. We get the best of both worlds: suggested values *and* custom user input. We've improved the user experience and streamlined our input.

Another cool thing we can do with datalists is display different lists under different circumstances. For instance, view the following example:

<p data-height="265" data-theme-id="0" data-slug-hash="LZPeLB" data-default-tab="result" data-user="sdlambert" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/sdlambert/pen/LZPeLB/">Multiple Datalists</a> by Scott (<a href="http://codepen.io/sdlambert">@sdlambert</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

As you can see, we can switch the list of options based on other input selected on the form. We're back to using javascript, but we still have good UX and we are still using a single input for our values. Sprinkle in a little bit of AJAX, and we can emulate a fully functional search engine with suggestions.

<h2 id="BrowserSupport">Browser Support</h2>

As of right now the most comprehensive support can be found in Chrome and Opera, where most input values enjoy adequate support for most uses. Firefox and IE11+ also support the `datalist` element but are limited to text-based input for the time being. Safari has no support and will ignore the `list` attribute and will not render the `datalist` element or its children.

As with most HTML5 elements, there are a few polyfills you can check out to provide support where you need it. After taking a look at [several options][4], one of the better options for a `datalist` polyfill is via the [Webshim library][5] by Alexander Farkas. At the very least, take the time to review the [full breakdown of browser support for the `datalist` element][6] and see if it's right for you.

One final note, and that is the options for styling a `datalist` are limited to the input element itself (i.e. the size of the input area, border, text and background color, etc.) The selectable list of options that drops down is not styleable and dictated solely by your browser's default styling.

## Conclusion

I was surprised I hadn't learned more about the `datalist` element earlier. he element itself really lends itself well to enhancing the user experience and providing a unique way to provide suggested values while allowing the user to retain control over the input. And while browser support is a bit disappointing, polyfills can provide support for the element until it is more robust. Hopefully you were able to learn more about the `datalist` element, and perhaps use it on your next project. Thanks for reading!

*Photo credit: <a href="https://www.flickr.com/photos/photobyrk/5724824002/">KingRobertII</a> via <a href="https://visualhunt.com">Visualhunt.com</a> / <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA</a>*

Additional resources:

* [HTML5 Spec of the datalist element (WHATWG)][X]
* [David Walsh Blog: HTML5 Datalist][Y]
* [Alexander Farkas: datalist experiment (WebShim demo)][Z]


[1]:https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-list
[2]:https://css-tricks.com/datalists-different-input-types/
[3]:#BrowserSupport
[4]:https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills
[5]:http://afarkas.github.io/webshim/demos/
[6]:http://caniuse.com/#feat=datalist
[X]:https://html.spec.whatwg.org/multipage/forms.html#the-datalist-element
[y]:https://davidwalsh.name/datalist
[Z]:https://afarkas.github.io/webshim/demos/demos/webforms/datalist-experiment.html