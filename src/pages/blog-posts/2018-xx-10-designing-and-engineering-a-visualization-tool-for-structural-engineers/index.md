---
path: "/blog/designing-and-engineering-a-visualization-tool-for-structural-engineers"
date: "1539586800000"
published: false
tags: ["Design", "JavaScript", "UX/UI"]
title: "Designing and engineering the Steel Explorer, a visualization tool for structural engineers to select the most efficient beam"
---

NOTE: New to the Steel Explorer? Get an overview [here](/blog/overview-and-usage-of-the-steel-explorer)

# Design decisions

Structural design using steel beams is almost always driven by the need for a minimum strength (Mn) or minimum flexibility (Ix) and a maximum weight. xxx xxx xxx xxx

visually showing what beams are still acceptable for your critera and which are not

transitions make sure to zoom in and out and keep the context of everything off screen instead of rerender them

Overlay all the beam profiles on top of eachother to allow for easy spatial comparison (Make the origin for all beams exactly in the middle so you can see the relative change between their sizes)

Flipped the depth chart to draw down to give off a sense of depth

Cross linking the charts makes it easy to get all the information you need for a beam

Design with mins and max's in mind (all graphs start pretty on Sketch / Figma until you put in the actual values). i.e. number of lines on the line chart, WXXXxXX label takes up more space than WXxXX

Design with a minimum desktop size in mind. My initial designs assumed a resolution of xxxpx x xxxxpx which is much bigger than most screen resolutions (Made the mocks prior to chosing a screen size and when I choose a screen size of xx by xx, I realsed my design didnt work anymore and needed to condense / compress charts. Next time, choose the screen size before)

I decided early on not to support mobile because it didnt fit the use case of this tool. Typically, the act of sizing a beam happens in an office with large displays, not mobile. That being said, this tool is embarassing on mobile. It's so bad I added a banner to say this. Not starting mobile first makes it hard to go to mobile.

Les is more. Remove elements you dont need (axis, etc)

# Design evolution
### TODO: ADD A CAROUSEL OF THE IMAGES

# ??Unseen benefits?? (weak section)

You can see there is a beam made which overindexes on flexural strength (Ix)

# Engineering challenges (Learning lessons)
## since nobody every talks about where they fucked up, figured I would ;)

Should have rendered in canvas instead of svg. Was fun pushing the limits of svg though and seeing which things bog it down. (i.e. on update, I first transition the lines, then delay the calcualtion / tranition of the voronoi. or waiting to calculate the voronoi until after the chart has rendered)

Rendered voronoi for each graph and use mousenter effects (instead of voronoi.find)

The line chart had to be rendered at 1ft intervals because there are 284 beams (284 beams * 40 ft = 11,360 points). The performance hit really happens when rendering the voronoi (assume 4 segments per point, thats 45,000 elements for just the top right chart)

Cleaning the csv for only the data I needed improved load time by several thenths of a second (2k lines, 707kb -> 284 lines 111kb)

Did this without a framework because initially didnt expect the scope to creep as much as it did. It was acutally fun going back to basics. Wish css grid was available when I started this.

I initially kicked this project off 2 years ago and wrote it in d3v3. Upgrading to d3v5 was relativley painless.

![v1](/img/blog-posts/2018-xx-10-steel-explorer/v1.png "v1")

![v2](/img/blog-posts/2018-xx-10-steel-explorer/v2.png "v2")

![v3](/img/blog-posts/2018-xx-10-steel-explorer/v3.png "v3")

![v4](/img/blog-posts/2018-xx-10-steel-explorer/v4.png "v4")

![v5](/img/blog-posts/2018-xx-10-steel-explorer/v5.png "v5")

![v6](/img/blog-posts/2018-xx-10-steel-explorer/v6.png "v6")

![v7](/img/blog-posts/2018-xx-10-steel-explorer/v7.png "v7")
