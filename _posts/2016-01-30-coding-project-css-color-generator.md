---
title: "Coding Project: CSS Color Generator"
layout: post
tags:
 - javascript
description: "In this project I built a responsive color palette and hex code generator in plain Javascript. The generator allows you to select your desired hue, luminosity and the number of colors you'd like to create. It is written in plain Javascript and fully responsive."
#metadata
image_path: "/img/colors.png"
---

![Color swatches](/img/colors.png "Color swatches")

In this project I built a color palette and hex code generator, which utilizes the [randomColor.js library][1] by [David Merfield][2] at its core. The generator allows you to select your desired hue, luminosity and the number of colors you'd like to create. It is written in plain Javascript and fully responsive.

<!--more-->

Here's a direct link to the [color generator app][3]. (You can also review the code [here][4], if you like.)

## The RandomColor.js library

For my next project, I knew I wanted to work with a new Javascript library. Of course, there are thousands of libraries to choose from, but I wanted something simple and functional. When I discovered RandomColor.js by David Merfield, I knew I had the right tool to build my application.

The RandomColor.js library takes a single Object as its only argument in a call to the main method (`randomColor()`) which can contain none, any or all of the following properties:

{% highlight javascript %}
randomColor({
  hue: "red",
  luminosity: "dark",
  count: 25,
  seed: 3184798751746,
  format: "hex";
});
{% endhighlight %}

For the purposes of this project I did not utilize the `seed` or `format` properties, instead sticking with the default hex format for our CSS. The other properties are configurable by the user. If left to their defaults, calling the randomColor method will generate a single color of random hue and luminosity and return the hex code string. (Alternatively the library can export the color in RGB and HSL formats as well.)

If the user so chooses, they may specify a *hue* (`"red"`, `"orange"`, `"yellow"`, `"green"`, `"blue"`, `"purple"`, `"pink"`, or `"monochrome"`) and *luminosity* (`"bright"`, `"light"`, or `"dark"`) and the number (`count`) of colors they'd like. If they specify more than one, it will return an array of strings.

## Taking advantage of the DOM

The app itself very straightforward. One section of the app consists of a form containing all of our inputs, and the rest of the webpage is the space where our color palettes will be displayed. Modifying any one of the inputs will generate a new set of colors.

The swatches will be copied from a standard template Node called `masterSwatch`, which is created when the page is loaded. We use the [`cloneNode()`][5] method to copy the masterSwatch Node for each item in the array. The `cloneNode` method takes any valid HTML Node and returns an exact copy of it (excluding any event listeners that may have been attached) giving us a very efficient way of creating many swatches in a small amount of code.

We then take our array of Nodes and append them to a [`DocumentFragment`][6] object. A `DocumentFragment` functions like a minimal version of the `Document` object, but without a parent element (i.e. the `Window`.) Essentially, it is an orphaned, virtual DOM Node that does not reside on the Window object until you add it. It also inherits all of its methods from the standard `Node` object, which means you can manipulate it as any other HTML node by appending, inserting, and deleting additional nodes as necessary.

Once we have created our fragment, we pass it to the `fillSwatches()` function, which will append all of our color swatches without repainting the page, one for each item in the array. Finally, each time the inputs are manipulated, we make a call to our `generateSwatches` function, which runs all the code described above.

## Conclusion

I'd like to thank David Merfield for creating the library and sharing it with the public, and for giving me feedback on the project itself. I had a lot of fun playing with randomColor.js, and I think I was able to make an intuitive UI for the library. I was also excited to apply some of the knowledge I'd gained regarding the DOM API. All in all, I was very happy with the results. Thanks for reading!

*This post is part of a series covering the various coding projects I put up on the web. All the source code is freely [available on GitHub][7].*

Additional resources:

* [Creating DOM Elements...and Other Related Stuff!][8]
* [JavaScript DocumentFragment][9]
* [randomColor.js - Random Color Generator for Javascript][10]


[1]: https://github.com/davidmerfield/randomColor
[2]: https://llllll.li/
[3]: http://sdlambert.github.com/colors
[4]: https://github.com/sdlambert/blob/gh-pages/js/main.js?ts=2
[5]: https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
[6]: https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
[7]: https://github.com/sdlambert/colors
[8]: http://www.kirupa.com/html5/creating_dom_elements_and_other_stuff.htm
[9]: https://davidwalsh.name/documentfragment
[10]: https://randomcolor.llllll.li/