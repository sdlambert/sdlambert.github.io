---
title: "Great Expectations: The Path of a Web Developer"
layout: post
tags:
 - javascript
 - php
description: "I took some time to reflect on the projects I've been working on and came out feeling like I hadn't done enough. In this post, I'll take a closer look at those projects and the lessons I learned when my expectations failed to match up with reality."
#metadata
image_path: "/img/path-of-a-web-dev.png"
---

![Coastal road](/img/path-of-a-web-dev.png "Coastal road")

With summer behind us and autumn settling in, I wanted to take a moment to reflect on the web development and coding projects I've been working on. Despite my best intentions, a part of me felt I hadn't done enough, that I should have spent more time learning or writing code. So I took a closer look at what I'd been working on, I found that my perceptions didn't quite match up with reality. In doing so, I learned a valuable lesson about life, learning and personal growth.

<!--more-->

## Mind the Gap

My biggest concern was a five week gap in my [GitHub commit history][1]. I felt disappointed for missing some arbitrary, unstated goal that I hadn't formally defined yet somehow felt I needed to meet. Rationally, I couldn't quite explain why I was feeling this way, but the feeling was there nonetheless.

So I resolved to make a list of all the projects I had worked on over the last several months. The biggest contribution of them all was the combined solutions to a dozen or so programming challenges. I made a few minor changes to the blog. There was a project I had started but abandoned it a few days later. And towards the end, I started an introductory course in PHP/MySQL. I was starting to feel better, but I wasn't quite satisfied. I needed to know more.

## Devil in the Details

For nearly a month, I had been solving programming challenges posted on the [/r/dailyprogrammer][2] subreddit with my solutions in Javascript, and hosting the code in a github repo. A lot of the challenges were trivial, like [converting temperature and angular measurements][3]. But there were a few that pushed me well outside my comfort zone. Since I was using Javascript, many of the challenges forced me to dive deeper with [NodeJS][4], and started learning things like how to read and write to files. I generated [waveform data][5] using unsigned 8-bit integer arrays. I used the built in <code>net</code> module to open an asynchronous TCP connection and built [a simple IRC bot][6].

Shortly afterwards I started a simple weather app using the [Weather Underground API][7]. I had a basic framework set up for the input and a rough sketch of the UI and the interaction. I had been studying up on the [module pattern][8] and set about implementing it in my new app. The search functionality was up and running, using [JSON-P injection][9].

I was just about to implement the first major feature when I ran into a dead end. Without a back end framework, there was no real way to secure my API keys or credentials. At the time I wasn't sure which framework I should use or even how to set it up, so I abandoned the project and put it on hold until I could come back to it. Because my credentials were embedded in my GitHub repo (an amateur mistake, I had learned) I promptly deleted it and all of the contribution history with it.

For the last several weeks, I've been tackling an [introductory course for PHP and MySQL][10]. I had dabbled a bit in PHP and MySQL, but this was the first time I'd learned how to connect them both. At the very least, I figured it would give me a head start for my upcoming PHP class. So for the last several weeks I've been working on implementing [a simple CRUD application][11] in the MVC paradigm, complete with an [administrative CMS interface][12].

## Losing Perspective

I work full time and go to school part time, and this summer was no exception. I also have a family to raise, bills to pay, and all the other doldrums of adult life to deal with. As you might expect, dealing with all of these things means the time I have to sit down and code is limited. Yet despite all of the work I had been doing, that five week gap still nagged at me.

It occurred to me that part of this was the direct result of setting unrealistic goals. Some part of my unconscious had committed to the idea that I should be spending every spare moment coding or researching web development. Looking back, such an expectation seemed so unreasonable and impractical. I could only imagine what sort of strain such a lifestyle would have on my mental health. What was I thinking?

If I had to guess, a lot of these ideas stemmed naturally from my more overt goals: to learn more about web development, obtain my degree, and open up new career paths. Somewhere along the way I must have gotten caught up in the competitive aspect of it all. Perhaps it was all the time I spent reading the nightmarish stories of interviews on [/r/cscareerquestions][13], or [Javascript fatigue][14], or perhaps simply feeling that [there's *never* enough time][15] to do everything I want. When I applied these unrealistic expectations in hindsight, the result was frustration and disappointment. It was a recipe for failure.

## Conclusion

I had been so worried about getting ahead that I lost sight of why I wanted to become a web developer. It wasn't the quantity of code that I had written, or the number of consecutive weeks I had pushed commits to GitHub that mattered. I realized what was truly important was that I was willing to try something new and dedicate the time to learn in the first place. I spent the summer months doing a lot of things, but only some of that was coding.

And... _that's ok._

It's not about the amount of time I had put in. The value lies in the process of coding itself and, in turn, the knowledge that comes from that experience. We should all take the occasional moment to reflect on what we've achieved, in order to keep a healthy, mindful perspective. If we don't pay attention, we might find ourselves set up for disappointment, or worse. It's important to keep focused on what truly matters: taking the next step.

*Image courtesy of FreeImages.com/Grace Yang*

[1]: https://github.com/sdlambert
[2]: https://reddit.com/r/dailyprogrammer
[3]: https://github.com/sdlambert/dailyprogrammer/blob/master/gettingadegree.js
[4]: https://nodejs.org/
[5]: https://github.com/sdlambert/dailyprogrammer/blob/master/makingwaves.js
[6]: https://github.com/sdlambert/dailyprogrammer/blob/master/makingaconnection.js
[7]: https://www.wunderground.com/weather/api/
[8]: https://toddmotto.com/mastering-the-module-pattern/
[9]: https://en.wikipedia.org/wiki/JSONP#Script_element_injection
[10]: https://www.sitepoint.com/premium/courses/php-mysql-web-development-for-beginners-13/
[11]: https://github.com/sdlambert/sitepoint-phpmysql/tree/master/lesson8/jokes
[12]: https://github.com/sdlambert/sitepoint-phpmysql/tree/master/lesson12/admin
[13]: https://www.reddit.com/r/cscareerquestions/
[14]: https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f#.758uh588b
[15]: http://zenhabits.net/overloaded/