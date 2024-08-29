---
layout: post
title: How This Site Came to Be
date: 2024-08-13
description: Or how I learned a bit of Docker, Linux, Git and TypeScript through sheer willpower
tags: frontend blog-meta
categories: programming
---

## A Soft Start
At the beginning of this year I started this project just like any other innocent little sidetrack (read: procrastination) from my other, more pressing obligations. My intention was to throw together a website that could help illustrate what I had been working on in 2023. Having been inspired by the GitHub-pages sites of [Torgeir Aambø](https://folk.ntnu.no/torgeaam/) and [Markus Szymik](https://szymik.github.io/) I decided I wanted to make a site using the GitHub-page style deployment as well. I found the [al-folio theme](https://alshedivat.github.io/al-folio/) which I found favourable as a starting point for further development. Things seemed to be on-track for a finished website in no time!

Meanwhile, I had been working on studying through Peter J. Olver's book <em>[Applications of Lie Groups to Differential Equations](https://link.springer.com/book/10.1007/978-1-4612-4350-2)</em> and sought after software that I could use for writing notes on the various definitions found in the book. It was then that Obsidian, a software that can take markdown files and transpile them into rendered pages, was brought into my attention. Suddenly, I found the idea of sharing my notes on the same site as the GitHub-pages content to be increasingly captivating. A small hiccup however – Obsidian does not allow for gh-pages publishing unless you pay for the premium version! I wasn't having it, but quickly learned of an open-source alternative for static site rendering of markdown files. Enter [Quartz 4.0](https://quartz.jzhao.xyz/). In Quartz there is a simple way to sync the notes with a GitHub repository, which means that one could also use the GitHub-pages deployment to easily make a website displaying the Quartz notes. Now all that remained was to combine the Jekyll-deployed al-folio website with the Quartz notes site. As it turns out, this was a lot easier said than done.

<br>

## Quarrelling with Docker
First, I need to explain how GitHub pages work. Essentially, the standard is to have a master branch (alternatively: a production branch along with a deployment branch for the sake of best practice) and a *gh-pages* branch that is automatically deployed from the master branch by GitHub actions. I needed some way of seeing what the website would look like before actually deploying it, so the Docker container option for hot-reloading and local deployment seemed like a fair choice. At this point I was using Visual Studio Code in Windows 10, and ran into no issues doing everything in Windows. However, as the al-folio documentation suggests, you need to use the [Docker Compose](https://docs.docker.com/compose/install/) plugin in order to compose the container that allows for local deployment. If you go to the installation page, you are greeted with this lovely message:
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/docker_compose_screenshot.png" class="img-fluid rounded z-depth-1 small-centered" %}
    </div>
</div>
<div class="caption">
    "This is only available on Linux".  
</div>
After some more research, I found out that you could use a virtual environment called *[Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install)* (shortened as WSL) to run Linux on Windows. Installing WSL was quite easy, but installing Docker Compose on WSL happened became quite a challenge. Having never used Linux before, I could not quite grasp why running `sudo apt-get docker compose` did not install the plugin successfully. Throughout this period I must have reinstalled Docker and Docker Compose a dozen times, until I finally got both Docker and Docker Compose working in the WSL Ubuntu terminal after about three or four weeks of wrangling with the installations. Anyway, after all this trouble I could finally deploy the website locally using the command `docker compose up`. Looking ahead, the only practical thing Docker Compose did was introducing me to Linux, as I abandoned using the Docker containers for the much simpler `bundle exec jekyll serve` command, which yields a locally hosted site that can be updated on saved changes.

<br>

## Jekyll (and Hide, Better Still – Run!)
The al-folio site is built by way of [Jekyll](https://jekyllrb.com/). Having read through some of the Jekyll documentation I gathered that the folder of interest for deployment into gh-pages was the `_site/` folder found in the root directory after having built the site with `bundle exec jekyll build` in the terminal. Naturally, I thought that I could simply just add the entire Quartz repository into `_site/` and be done with it! After all, if I built and deployed the site locally this approach actually worked! The issue was that the Quartz notes were not being pushed into the GitHub master branch, it was if the files were disappearing after `git push` was used! At the time I was quite ignorant as to how Jekyll and GitHub Actions worked, so I had no idea that
1. the `_site/` folder was included in the `.gitignore` file, so the local version wasn't being pushed,
2. removing the `_site/` from `.gitignore` would result in each commit updating over 16 000 files,
3. the reason each commit updated over 16 000 files was due to Jekyll re-building the files that were being pushed from the local directories into the master branch due to the GitHub Actions workflow,
4. and, finally, this would become a lot more complicated than I anticipated.

Turns out that GitHub pages [cannot build with unsupported plugins](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll), and that Quartz notes was not built using Jekyll the way the al-folio site was. I had assumed that since Quartz transforms markdown files into static sites that it relied on Jekyll, since Jekyll is roughly speaking doing the same thing. In actual fact, Quartz' way of transforming markdown files is quite clever, and in my opinion ends up being more clever than the way Jekyll works in practice (example: in certain situations Jekyll might try parsing `README.md` files!)
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/quartz-transform-pipeline.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Pipeline sketch of how Quartz 4.0 transforms files. From the <a href="https://quartz.jzhao.xyz/advanced/making-plugins"> Quartz docs</a>.   
</div>
So, the al-folio site builds using Jekyll and includes-files written in liquid, and Quartz builds using an architecture written in TypeScript. Not only is this remark important for understanding why my combined website was not being deployed correctly, but it also points to a problem I would deal with a few months from this point, which was implementing the al-folio NavBar (the bar with links at the top of the site) to the Quartz section of the site. The way Quartz builds its site means that you cannot simply inject html code to the various `index.html` defining the subpages of Quartz. In practice what you have to do instead is to write and stylize a Quartz component in TypeScript, which in this instance would be `NavBar.tsx`. More on this later.

<br>

## Git and the Headaches Committed
It had been my intention to properly learn commandline git anyway, but I had imagined it would be less painful. You see, when working with GitHub pages, you are essentially working with four different branches off the get-go: the master branches both locally (HEAD) and remotely (origin master), and similarly for the deployed gh-pages branches. In normal circumstances you could forego working locally in the gh-pages branch since everything would deploy as-is to the remote repository. We are not so lucky. As the GitHub pages docs rightfully says, if you want to deploy plugin-like features to gh-pages you need to push the static files to gh-pages from the local repo. 

Here is another caveat: I wanted the notes from Quartz to be synced with the website from its own repository. The most naïve way of doing this is to include the Quartz notes repo as a git submodule, which is the solution I settled for. This in turn meant that there were, in effect, six different branches to account for when managing the git workflows altogether, since the notes folder inside the root directory of the combined al-folio + Quartz site then also had a local version and remote version, where the remote branch is now seperate from its origin main branch! What this meant is that I suddenly had to think about [commits as pointers to snapshots](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell), where for instance the HEAD pointer could suddenly be *detached* from any relevant working branch. 
<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/git-branches-schematic.webp" class="img-fluid rounded z-depth-1 small-centered" %}
    </div>
</div>
<div class="caption">
    Here, the index/staging area includes the HEAD pointer as mentioned above. Credit to <a href="https://www.reddit.com/r/git/comments/99ul9f/git_workflow_diagram_showcasing_the_role_of/"> u/stamminator from r/git</a>.
</div>
These kinds of headaches would be plentiful and recurring whilst working on various stages of the project, simply because mixing manual deployment of static files and automatic deployment of files from the production branch eventually lead to merge conflicts, HEAD suddenly detaching and needing to be upstreamed to origin master/main, untracked files that mysteriously exist because of notes git submodule, and so on. I suppose in hindsight these were all good exercises in what to do when faced with cumbersome issues in git, but in the moment they felt a bit overwhelming. 

I spent a good two months wrestling with git whilst trying to understand how to add Quartz notes to the combined site, and I finally got something working back in the middle of May. Unsurprisingly, I had to stop Jekyll from trying to convert *every* markdown file it could find, so I first tried to include a `.nojekyll` file in the notes directory of the master folder. This did not work, as the problem persisted when GitHub Actions automatically pushed from the production branch to the deployment branch. Ultimately, the solution was to stop GitHub pages from building the files using Jekyll, and instead build the files locally, push to the master branch and then have the deployment process simply push the contents of the `_site/` folder into gh-pages. 

<br>

## Passing the Bar
Finally, having successfully found a way of integrating and deploying the Quartz notes combined into the al-folio theme framework, I set out to finalize the look of the Quartz notes page by adding the navigation bar to the header of Quartz 4.0. Again, I found myself trivializing this task, thinking "oh, I just need to copy some CSS or SCSS contents, and add a few lines of HTML into some file in the Quartz directory. Should be pretty easy!". Immediately, I was faced with several roadblocks:

1. the SCSS defining the NavBar element in al-folio was split between the file `_base.scss` and `bootstrap.min.css`, the latter of which was minimized and essentially unintelligble without further tinkering (and I did not know that you could *un*-minimize such files until some time later),
2. I would need to write code for a `NavBar.tsx` component due to the build and render logic found within Quartz (simply put: a few lines of HTML needed to become lines of TypeScript code),
3. the colour scheme from al-folio needed to be carried over and not overwrite anything in Quartz.

In the end, the `NavBar.tsx` component became quite the interesting little side-project, since Quartz uses a predefined `QuartzComponent` type which needs to be used in order for the Quartz build procedure to include it. 

```tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/navbar.scss"

interface Options {
    links: Record<string, string>
}

export default ((opts?: Options) => {
    const NavBar: QuartzComponent = ({ displayClass } : QuartzComponentProps) => {
    const links = opts?.links ?? [] 
    return (
    <header>
        <nav id="navbar" class={`${ displayClass ?? ""}`+ " navbar navbar-light navbar-expand-sm fixed-top"} role="navigation">
            <div class={`${ displayClass ?? ""}`+ " container"}>
                <a class ={`${ displayClass ?? ""}`+ " navbar-brand title font-weight-lighter"} href ={`/`}>
                        <span class="font-weight-bold">Jonas </span>

                        Pedersen
                        Vean
                </a>
            
            <div class={`${ displayClass ?? ""}`+ " collapse navbar-collapse text-right"} id="navbarNav">
                <ul class={`${ displayClass ?? ""}`+ " navbar-nav ml-auto flex-nowrap"}>
                    {Object.entries(links).map(([title, href]) => (
                    <li class={"nav-item" +` ${ (href==="#") ? " active " : ""}`}>
                        <a class="nav-link" href = {href}> {title}
                        </a>
                    </li>
                ))}
                </ul>
            </div>
            </div>
        </nav>
    </header>
    )
    }
    NavBar.css = style
    return NavBar
}) satisfies QuartzComponentConstructor
```

For instance, the `nav` element has CSS-stylings `navbar navbar-light navbar-expand-sm fixed-top` that fixes the NavBar to the top of the page at every instance, and furthermore defines some of the appearance to the outermost part of the NavBar. The CSS-styling comes from al-folio, and had to be retrieved in part from the minimized Bootstrap-file. 

Something to note in the above snippet of code is that `NavBar.css = style` actually does not do anything, since the order of the CSS-files being loaded precludes the `style` folder from being loaded when used in a component placed in header – the styles are actually all loaded from the custom folder. Also, the inclusion of `${ displayClass ?? ""}` ensures that the NavBar becomes desktop-only when wrapped around the `DesktopOnly.tsx` component as it is included in the `quartz.layout.ts` file. 

<br>

## Conclusion
To wrap up this long-winded post about something that had no right to take up several months of my life, I just wanted to express some gratitude for being able to learn about everything that made this website possible. In the end, I am reminded of the great privilige of being a mathematician: to solve problems. When faced with a bigger, more arduous problem – like trying to wrap your head around Git, Jekyll, TypeScript and Linux simulatenously for the first time – it is important to remind oneself that every problem will and can be solved eventually. Here's to solving more problems!