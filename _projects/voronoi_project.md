---
layout: page
title: Voronoi Project
description: Using Voronoi stippling as a means to derust and learn more about Python 3
img: assets/img/voronoi_example.png
importance: 1
category: Programming projects
---

I was inspired by [this Weighted Voronoi Stippling video](https://www.youtube.com/watch?v=Bxdt6T_1qgc) by Daniel Shiffman where he explored the implementation of weighted Voronoi stippling using the p5.js library for JavaScript. The concept itself reminded me of the adaptive algorithms of finite element solvers, so I thought it could be an interesting project to use as a "derust" of my Python programming skills. 

My aim was to more-or-less recreate the entire program that Shiffman wrote, but using Python instead. This involved using a less object-oriented approach, since p5.js and JavaScript allows for OOP methods to be easily used in conjunction with existing Voronoi/Delaunay libraries. In Python, however, an object-oriented approach would be rather clunky due to the nature of the pre-existing Voronoi-libraries at our disposal. Since I had no intention of "reinventing the wheel" I had to stick with the bespoke methods of the Voronoi module available to me. 