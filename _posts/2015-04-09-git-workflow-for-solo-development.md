---
title: A Git Workflow for Solo Projects
layout: post
tags:
 - git
description: "A guide on how to integrate a git workflow into your solo development projects"
#metadata
image_path: "/img/git-solo.png"
---

![An image showing a git workflow](/img/git-solo.png "Git Solo")

When I first started researching what tools are used out in industry, I found lots of developers would recommend learning `git` to beginners as a valuable industry tool. And so, I took this to heart and dutifully went about learning about `git`. But the more I learned, the more doubt had begun to creep in. I could concede that `git` was a great tool for version control and collaboration. But how would any of that apply to me? I wasn't juggling feature branches, approving pull requests or working with anyone else. I was just some guy trying to build a website or two.

After reading some more, learning how `git` works, and diving into the tool itself, I was able to come full circle. In this article, discuss some of the benefits that come with using `git`. I'll also show you how I use `git` in my own solo projects, and how to set up a practical and scalable project workflow. You might just find that `git` can work for you on any sized project, even the ones you develop on your own.
<!--more-->

## Benefits

Using `git` with your projects gives you several immediate benefits:

* A complete history of your project from beginning to end
* The ability to revert to any previous state or see the differences between states
* Valuable experience with a popular, industry standard tool
* Free, online cloud storage for your code

If you're not already familiar, `git` is a distributed version control system (DVCS). In a nutshell, it allows you to track changes to files within your project directory. These changes can be saved as states or snapshots called commits. These commits are then stored in a local repository and when viewed as a whole represent a history of your project.

## Getting up to Speed

While a thorough tutorial to `git` for beginners is outside the scope of this article, I'd be remiss if I did not provide some of the resources that helped me. First off is [Roger Dudler's Git Guide][1] which provides a very high-level introduction. For an interactive walk-through, head over to [Try Git][2]. Finally, for a quick reference guide I find myself using the [Become a `git` Guru guide on Atlassian][3] more and more.

Got the basics down? Great.

To start, you'll need a few things:

* A locally installed copy of `git`
* A current or empty project
* (Optional) A `git` GUI

I'd also strongly recommend using an online `git` repository such as [GitHub][4] or [Bitbucket][5]. While not necessary to run or even take advantage of `git`, an online repository gives you a place to securely store your code. Hosting your code online allows you to work remotely across multiple machines (more on this later) and protects your code from catastrophic loss on your local machine.

Preferences aside, the key difference between the two sites is that Bitbucket provides users private repositories for free, while on GitHub this is a paid feature. The rest of this guide assumes you have successfully initialized your repository and connected it to a remote host outside your machine.

## The Workflow

My solo development workflow is divided into three main segments:

* Master and origin (remote)
* Development
* Feature(s)

The master branch and origin remote represent our user-facing, public code repositories. These branches contain the source code of the files that make up your website or the latest release of your application. You should avoid making live edits directly to your master branch. Any and all updates to master *should* come from our development branch. All commits and merges on our master branch are pushed to our remote.

The development branch is where we perform most of our work. It's also the source of most of our commits. Whether this is simple maintenance, bug-fixing or modifying existing features, this branch serves as the 'bread and butter' of our development process.

Once our changes have been deemed "production ready," we add our files, commit and finally merge the changes into our master branch and push our changes to our remote:

![A visual representation of the dev/master/remote workflow](/img/dev-master.png "The dev/master/remote workflow")

The master and development branch are the key to our workflow. All major changes originate from our development branch and merge into the master, and through the master branch we push to our remote repository.

Our origin branch is not visually represented in the diagram above. It is hosted remotely and is essentially a mirrored copy of the master branch we store locally. In essence, the top line is technically two separate branches, one existing on your local computer and the other an exact copy residing online. Just like our master branch, we should try to avoid making direct changes to our remote origin repository.


So what does this look like in practice? In the console we'd do something like the following:

~~~
// we should be in dev, ready to stage and commit
$ git status
// => on branch dev... etc.

// add our files
$ git add -A

// commit
$ git commit -m "added user flair"

// switch branches
$ git checkout master

// merge branches into master
$ git merge dev

// push to origin (remote)
$git push
~~~

The feature branches represent major additions to our project, such as a revamp of the site's CSS or new functionality being added to our application. (We'll want to name our branch appropriately, such as 'css-overhaul' or something similar.) Our feature branches are created off our primary development branch to allow maintenance to occur outside the work we do on the feature itself. Working on features also requires us to checkout the appropriate branch. If we need to jump back to our dev branch to do some maintenance, we can commit and switch right back:

![A visual representation of the dev/feature workflow](/img/dev-feature.png "The dev/feature workflow")

As you can see in the diagram above, we make several commits to dev before working on our feature branch. We can then switch back between the two before merging the code together. The changes we make in our feature are not affected by the ones we make in dev, and vice versa. Only when we perform the final merge do we bring the two code bases together. You may also note that the example feature branch merges back into dev and the line no longer continues. In this diagram, we have deleted our feature branch as we no longer need it. (We can always create another if need be.)

One caveat to working with features is keeping your focus on the scope. Speaking personally, it can be easy to get distracted and want to work on something outside the scope of your feature (i.e. "that margin is about 5 pixels off...") This can lead to messy merges where you'll need to go through your code line by line and approve every conflict. You should aim to work on your features independently and in isolation from rest of your code, but depending on the nature of the feature you are working on this may not be possible.

## Bringing it all Together

Here's what the process looks like with all of the segments combined:

![Bringing together all of our branches into a visible workflow](/img/git-nodes.png "The combined workflow")

As you can see, most of the activity is centered on our development branch with periodic merges to the master branch. We subsequently push these our remote. If we need a new feature for our project, we create a new branch off dev and merge it back in when we're finished.

## Conclusion

Before we conclude, I should give credit where credit is due. There were a couple of other people who have written about solo workflow, but it was actually this [post by Vincent Driessen][6] that served as the inspiration for my own. If you finish this article and are looking for more, definitely give it a read.

I designed the workflow with a few goals in mind: force myself to learn and use `git`, adapt best practices from industry to solo development, and keep it as simple as possible. I think my workflow hits all of those marks. It really fits my needs, and hopefully it meets yours, too!

Additional reading:

* [GitHub "Hello World" Exercise][7]
* [Pro Git by Scott Chacon and Ben Straub][8]
* [Good Resources for Learning Git and GitHub][9]
* [Git GUI Clients][10]



[1]: http://rogerdudler.github.io/git-guide/
[2]: https://try.github.io
[3]: https://www.atlassian.com/git/tutorials
[4]: https://github.com
[5]: https://bitbucket.org/
[6]: http://nvie.com/posts/a-successful-git-branching-model/
[7]: https://guides.github.com/activities/hello-world/
[8]: http://git-scm.com/book/en/v2
[9]: https://help.github.com/articles/good-resources-for-learning-git-and-github/
[10]: http://git-scm.com/downloads/guis


