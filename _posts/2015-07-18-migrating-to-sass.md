---
title: "Migrating to Sass"
layout: post
tags:
 - css
 - sass
description: "In this post I'll explain what it is that Sass does and review the SCSS syntax, such as imports, variables and nesting. I'll also discuss how I converted from vanilla CSS to Sass!"
#metadata
image_path: "/img/sass-logo.png"
---

![Sass Logo](/img/sass-logo.png "Sass logo")

SASS, short for Syntactically Awesome Stylesheets, is a CSS extension language that seeks to improve on the fundamentals of CSS by adding concepts from modern programming languages. In this post, I'll discuss how Sass works, cover the SCSS syntax, and give some examples of how I used Sass on this blog.

<!--more-->

## So What Does Sass Do, Exactly?

Sass works by building off the familiar concepts of CSS and adding additional syntax to make writing your stylesheets more intuitive and expressive. In doing so, it implements common programming patterns like nested statements and variables to improve clarity and reduce redundancy. For large projects this can be a real time saver, but even for smaller projects it can transform the way you think about styling your web pages.

Sass comes in two flavors: ***SCSS***, which follows many of the same rules and largely resembles CSS, and ***Sass*** (also known as "indented syntax"), which still resembles traditional CSS, but removes things like curly braces and semicolons. We'll be focusing solely on the SCSS format in this article.

## How to Get Up and Running

All of the Sass files you compose will be run through a pre-processor, which will read in your source file and output your styles in traditional CSS. On Linux, Sass is compiled using Ruby. From there, it's as simple as installing the relevant gem:

    sudo su -c "gem install sass"

If you need help installing Sass on other operating systems, please consult the [installation guide][1]. From there, you can include the pre-processor in your build files or run it manually from the command line.

Since I'm using Jekyll for this blog, [Sass support][2] is built right in. I simply have to add my `.scss` files to the css directory and I'm good to go.

## Sass Basics

The best way to understand Sass is to view it as an extension of CSS. That is, essentially what it is. There are dozens of new additions, some of which are beyond the scope of this article, so let's go over some of the most common ones.

### Comments

[Comments][6] in Sass support inline formats using double slashes in addition to multi-line comments using star-slash. The difference is that inline comments are not transferred to the resulting CSS file, while traditional multi-line comments will.

{% highlight scss %}
.example {
    border: 1px solid $dark_blue; // I won't appear in the output
    width: 75%; /* But I will */
}
{% endhighlight %}

Using inline comments may be a welcome change for you, and it also helps to reduce the resulting file size. (Sass has several [output options][13]. I use the `:compressed` option, which will minify your CSS and remove all comments regardless of which style you use.)

### Variables

One of the most basic functions of Sass is using [variables][3]. Just like other programming languages, variables can be used to store information that we can use later within our stylesheets. A common usage is to define the  colors we use through the page. Here's the color variables used for this blog:

{% highlight scss %}

// Variable syntax begins with a `$` followed by the variable name
$black: #000000;
$grey: #999999;
$off_white: #dcdcdc;
$white: #ffffff;
$deep_teal: #003333;
$light_teal: #669999;

{% endhighlight %}

The color variables are located at the top of our Sass file, meaning they have global scope. We can now reference our colors in another statement, like so:

{% highlight scss %}

.main {
  color: $deep_teal;
  border-left: 1px solid $grey;
}

{% endhighlight %}

Variables can be set to pretty much any value, like font-families, widths, or anything else you think you might want to repeat. Sass variables have scope depending on where they are declared, so nested variables are scope-limited, meaning they can't be seen outside the context of the nested code block. Conversely, a nested child can use the values declared in the parent.

{% highlight scss %}
// Global
$global-color: #14432a;

// Scope-limited
.main {
    $other-color: #766c32;
    div {
        background-color: $global-color; // valid, global
        color: $other-color; // valid, declared in .main
    }
}

.otherdiv {
    background-color: $global-color // valid, global
    color: $other-color; // invalid, undefined
}

{% endhighlight %}

On this blog I use variables for colors, but the possibilities extend much further. Make sure the use of your variables is justified. There's not much of a case for a variable named `$nav-list-item-bottom-padding`, but for a consistent look and feel you might want to use `$button-border-radius`. Take a look at your code and experiment.

### Nesting

[Nesting][4] is a fundamental addition to Sass. Have you ever had CSS code that resembled something like the following?

{% highlight css %}
nav {
    padding: 2em;
    display: block;
}

nav ul {
    float: left;
    padding-left: .5em;
}

nav ul li {
    display: inline-block;
    text-align: center;
}
{% endhighlight %}

The power of nesting in Sass allows you to improve clarity and do things like reducing the number of times you list your parent element. Take the previous example. The Sass version might look like this:

{% highlight scss %}
nav {
    // nav styles go here
    padding: 2em;
    display: block;

    ul {
        // nav ul styles go here
        float: left;
        padding-left: .5em;

        li {
            // nav ul li styles go here
            display: inline-block;
            text-align: center;
        }
    }
}
{% endhighlight %}

The indentation here is optional but helps to clarify and make your code more readable.

Nesting also offers a familiar programming syntax to CSS that should fit in nicely to your stylesheets in a way that is both intuitive and expressive. Sass also supports nested *properties*, where CSS properties of the same namespace can be written like so:

{% highlight scss %}
.main {
    font: {
        family: Times New Roman, serif;
        size: 16px;
        weight: bold;
    }
}
{% endhighlight %}

This bit of Sass will style our `main` class with the `font-family`, `font-size` and `font-weight` properties respectively.

At this point, you may be wondering how we would reference the [parent element][5] when using pseudo-classes and pseudo-elements. Sass utilizes the `&` character to achieve this. The example below combines variables, nesting and references to the parent:

{% highlight scss %}
a {
    &:link {
        color: $deep_teal;
    }

    &:visited {
        color: $grey;
    }

    &:hover {
        color: $light_teal;
    }

    &:active {
        color: $deep_teal;
    }
}
{% endhighlight %}

In this example, all of the nested selectors above will reference the parent element, in this case the anchor. The resulting CSS will concatenate the two into vanilla CSS (i.e. `a:hover`, etc.)

### Operations

Sass introduces [mathematic operations][7] into CSS in a powerful way. Combined with variables, you can really make your stylesheets dynamic. Sass supports all the standard operators you might find in any programming language such as `+`, `-`, `*`, `/`, and `%`. There are also relational operators such as `>`, `>=`, `<=`, `<`, `==`, `!=`.

Combined with variables, operations can allow you to save time by editing once and seeing the effects throughout your CSS. Take the following example, where we have a parent element with two children.

{% highlight scss %}
$width: 300px;

.parent {
    width: $width;
}

.child1, .child2 {
    width: $width/2;
}
{% endhighlight %}

Because both elements depend on the `$width` variable, instead of updating our CSS in two places we simply update the variable and re-compile.

There are some unique considerations with the division operation, which shares the same operator `/` with some CSS functions where the slash acts as a separator. With that comes a few caveats and workarounds for using division, so I'd recommend you review the [Sass documentation on the division symbol][8] before using it in the wild.

### Imports

You might find yourself using the same CSS in all your projects, such as a reset.css file or perhaps a font family you are fond of. Sass extends [import][9] statements to allow you to modularize your CSS and bring in snippets (or partials) from other files as needed. Unlike standard CSS @import statements, all of your Sass imports are pre-processed, meaning all of your CSS is compiled into a single file. This results in a single file for your CSS rather than asking the browser to request additional files when your page is first loaded.

For my blog I've imported my CSS reset, fonts, and the syntax highlighter in separate files that are imported at the very top of my Sass file:

{% highlight scss %}
@import "reset";
@import "fonts";
@import "borderbox";
@import "syntax";
{% endhighlight %}

Each of our import statements will look for Sass or SCSS files of the same name. One thing to note is that Sass will look for `.scss` or `.sass` files first. If you want to import regular CSS files you will need to rename them with a preceding underscore. This indicates to your pre-processor that the files do not need to be converted and can be imported directly.

By importing these files separately I can re-use them (`_reset.css`, `_borderbox.css`) or modify them (`_fonts`) without the need to dive into my main CSS file.

## Conclusion

Converting to Sass was a lot of fun and I really like how expressive and intuitive it is to write. It truly feels like an extension of something I'm familiar with, and it offers a lot of powerful features that only a pre-processor can provide. In addition, the syntax covered here only scratches the surface of what can be done (such as @mixin/@include, @extends, control statements and functions, to name a few) but it should give you a good grasp on some of the most important fundamentals.

Add Sass to your project today to start saving time and effort and begin writing expressive, dynamic CSS. You won't regret it.

Additional reading:

* [Sass Homepage][15]
* [The Sass Way: Beginner Guides & Tutorials on Sass and Compass][10]
* [Sitepoint: 8 Tips Help You Get the Best Out of Sass][11]
* [A List Apart: A Vision for Our Sass][12]
* [CSS Tricks: Sass Style Guide][14]

*Modified Sass logo added via the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.*

[1]: http://sass-lang.com/install
[2]: http://jekyllrb.com/docs/assets/
[3]: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#variables_
[4]: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#nested_rules
[5]: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#parent-selector
[6]: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#comments
[7]: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#number_operations
[8]: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#division-and-slash
[9]: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#import
[10]: http://thesassway.com/beginner
[11]: http://www.sitepoint.com/8-tips-help-get-best-sass/
[12]: http://alistapart.com/article/a-vision-for-our-sass
[13]: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style
[14]: https://css-tricks.com/sass-style-guide/
[15]: http://sass-lang.com/









