---
title: An Introduction to Jekyll, the Static Blog Generator
layout: post
tags:
 - jekyll
image_path: "/img/jekyll-logo-2x.png"
description: "An introduction to Jekyll, the blogging platform that allows you to configure and generate static webpages."
---
![The Jekyll Logo](/img/jekyll-logo-2x.png "Jekyll, a static blogging platform")

A few months ago, I sat down to create this blog so I could document all the things I'll be learning about web development and I work to build up my portfolio. I also wanted to learn git and give myself a place to build things and experiment. I took a look at several options, but eventually settled on [Jekyll][1], a static blogging platform that integrates with  [GitHub Pages][2]. I chose Jekyll because it offered a great way for me to combine the technologies I wanted to practice and learn: HTML, CSS, Javscript, git, and the Linux command line. Jekyll hit all the right notes for me, and it might just do the same for you.

<!--more-->

###What is Jekyll?

Jekyll is a "blog-aware", highly configurable static site generator written in Ruby. It builds a static website using a predefined directory structure, site-wide and post-specific variables and layout templates. Blog posts are written in a markdown syntax and converted into HTML, which Jekyll integrates into a chronological directory structure.

Each page on your blog consists of various templates, which act as the building blocks of your site. Jekyll also makes use of the [liquid templating language][4], which allows the program to dynamically create content for your pages based on your setup (more on that later) each time you build your site.

One of the remarkable things I like about Jekyll is the ability to configure my blog down to the smallest detail. And while it offers near infinite customization, one could just as well pair it with a popular framework such as Bootstrap. Most importantly, it generates a static site, which is what we need to make it fully compatible with Github Pages. Jekyll allows me to work directly within my GitHub repository so I can update remotely without the need for a third party hosting solution.

###How to Get Started

In order to get Jekyll up and running, you'll need Linux, Unix or Mac OS X installed on your computer. (You can [install Jekyll on Windows][11], it just takes a bit more effort.) You will need to [install Ruby][5] and [Node][12] if you haven't already. From the command prompt simply enter the following commands:

~~~
$ gem install jekyll
$ jekyll new my-blog
$ cd my-blog
~~~

Jekyll can also host your site locally for you to view:

~~~
$ jekyll serve
// navigate to http://localhost:4000 to view your site.
~~~

My personal setup has jekyll build the site live using the `build` option:

~~~
$ jekyll build -w
// the -w option 'watches' for changes and regenerates your site
~~~

With this option turned on, I'm able to work on my blog and all its pages locally. If I need to tweak some CSS or update a layout, I just save my changes and Jekyll will re-generate the relevant pages. I simply have to refresh my browser.

Jekyll can also be used remotely with GitHub, where changes you make to your repository can be rendered by GitHub and placed accordingly into your GitHub pages. More on that in a bit.

###Files and Directory Structure

The most important file resides in your project's root, and that is the `_config.yml` file. This file uses YAML syntax for all of the configuration information in your project. Here you can tell Jekyll which markdown rendering engine you would prefer to render your pages, or add site-wide variables for use in template snippets within your HTML.

Jekyll relies on a directory structure that is required to render your pages. Arguably the most important directory of these is the `_posts` directory. All of the posts for your blog are contained within this directory to be rendered. Each post begins with a small bit of 'front matter' YAML that tells Jekyll how to render the markdown or provides variables specific to the post. I write my blog posts in [markdown][3], but Jekyll also supports the [Textile][6] markup syntax. (There is also a `_drafts` directory for blog posts you don't yet wish to publish, but posts in this directory will not be rendered for your site unless you specify them to be.)

The `_includes` directory contains all of the various snippets of text that you can then mix and match to create the content of each page. This page, for instance, was created using five separate HTML snippets and then combined with the rendered markup of the blog post. You can create as many snippets of markup as you need and mix and match them as you need.

The `_layouts` directory contains all of the files that define the layout of a specific page. For instance, for a blog post page, you would combine various snippets of HTML from the `_includes` directory along with the `{{ content }}` tag, which pulls in the post content, like so:
{% raw %}
~~~
{% include  header.html %}
{% include  nav.html %}
{% include  aside.html %}
{{ content }}
{% include  footer.html %}
~~~
{% endraw %}
Each layout can utilize as many snippets of HTML as needed

The `_plugins` folder allows you to further customize your blog by running custom ruby scripts on your pages. Since I am not (yet) fluent in Ruby, I have only tinkered with a few plugins so far, but depending on your needs you might need a third party solution for your blog, or you can certainly write your own. All of your ruby scripts residing in this directory will be run when you build your site.

Lastly, the `_site` directory is where your rendered site will be posted by default. (You can edit the location of your rendered site in your `_config.yml`.)
You can either point your browser to this directory, or point Jekyll to your local hosting directory that you may already have up and running. My personal setup is hosting locally through Apache, so I have Jekyll dump my files into a local directory for development.

The nice thing about GitHub is that it provides native support for rendering your Jekyll files to its GitHub Pages. Once I commit the changes to the  remote stored on GitHub, it automatically renders the files for display on Github Pages. This way, I can render and view local changes as I develop, and let GitHub worry about rendering the master copy for public view.

###Customization

When you first download and run Jekyll, it will populate all of the directories and files needed to create a static blog. It will also generate some basic CSS and a few sample pages that show off some of what Jekyll is capable of. I chose to start from scratch, but there are plenty of resources out there for existing themes in order to begin using Jekyll immediately.

Under the hood, the real power of Jekyll comes from its ability to customize every aspect of the page. The ability to generate content really comes into play through the Liquid templating language, which allows you to do do simple queries and iterations over the data in your posts. I'll be writing a bit more about some of these customizations in the future, but for now all you need to know is that the Liquid templating language is what allows you to create static pages in a truly dynamic way. (Here's a great place to start [learning more about Liquid][7].)

###Conclusion

Jekyll is not going to replace Wordpress or Drupal any time soon, but for static blog pages it is probably one of the most powerful tools out there. It boasts near limitless customization and yet it offers a relatively straightforward package out of the box.

That being said, it does rely on a hodge podge of syntaxes and languages and I would have benefited knowing more about them prior to creating my blog. I would recommend reading up on the syntax for markdown, YAML, and Liquid to be truly comfortable with the entirety of Jekyll. (Ruby, although helpful to know, is not required reading.)

Despite my own shortcomings, Jekyll remains a powerful tool to build a static, "blog-aware" site. I love being able to make small tweaks to my site and see the changes show up immediately. It integrates with my GitHub page flawlessly and right out of the box. Most of all, being able to dynamically generate content for my pages is great. If you're looking to write a blog, and thinking about hosting on GitHub Pages, consider Jekyll.

Additional resources:

* [Jekyll Documentation][10] - All the details you could ask for
* [Jekyll Themes][8] - Pre-built themes for Jekyll
* [Using Jekyll with Pages][9] - GitHub Pages guide on how to use Jekyll

[1]: http://jekyllrb.com/ "Jekyll"
[2]: https://pages.github.com/ "Github Pages"
[3]: http://daringfireball.net/projects/markdown/syntax "Markdown Syntax"
[4]: http://liquidmarkup.org/ "Liquid"
[5]: https://www.ruby-lang.org/en/documentation/installation/ "How to Install Ruby"
[6]: http://redcloth.org/textile/ "Textile Reference"
[7]: https://github.com/Shopify/liquid/wiki/Liquid-for-Designers "Liquid for Designers"
[8]: http://jekyllthemes.org/ "Jekyll Themes"
[9]: https://help.github.com/articles/using-jekyll-with-pages/ "Using Jekyll with Pages"
[10]: http://jekyllrb.com/docs/home/ "Jekyll Docs"
[11]: http://jekyll-windows.juthilo.com/ "How to Install Jekyll on Windows"
[12]: https://nodejs.org/download/ "Download and Install Node.js"