---
layout: post
date: 2024-09-03 15:59:00-0400
inline: true
related_posts: false
---

Found the cause of the bug in the previous announcement. Turns out Quartz likes to override the head environment with its own contents. Fixing this will take some time.