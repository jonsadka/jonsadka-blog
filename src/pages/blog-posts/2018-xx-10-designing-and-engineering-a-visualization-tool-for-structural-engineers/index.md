---
path: '/blog/designing-and-engineering-a-visualization-tool-for-structural-engineers'
date: '1544601600000'
published: false
tags: ['Design', 'JavaScript', 'UX/UI']
title: 'Designing and engineering the Steel Explorer, a visualization tool for structural engineers to select the most efficient beam'
---

NOTE: New to the Steel Explorer? Read about it [here](/blog/overview-and-usage-of-the-steel-explorer).
<br/><br/>

## Welcome

The purpose of this post is to highlight things that come to mind when reflecting on my time designing, iterating, and building the <a href="http://jonsadka.github.io/steel-explorer/" target="_blank" rel="noreferrer noopener">Steel Explorer</a>. Some are tips, some are tricks, and some are learning lessons. Enjoy!

<br/>

### Design related thoughts

<div style="padding-left: calc(1.45rem / 2 + 1.0875rem);">

- Visually remove elements that do match the user's filter criteria. Sometimes this invovles a modification to the opacity, a change of color, or a zoom. In almost every case, a transition can assist with these changes.

</div>

<img style="width: 49%; display: inline-block;" src="/img/blog-posts/2018-xx-10-designing-steel-explorer/filter-before.png" alt="filter-before" title="filter-before">
<img style="width: 49%; display: inline-block;" src="/img/blog-posts/2018-xx-10-designing-steel-explorer/filter-after.png" alt="filter-after" title="filter-after">

<div style="padding-left: calc(1.45rem / 2 + 1.0875rem);">

- Sometimes it's useful to refrain from zooming because the context of the filtered out elements are useful, as seen in the Distribution Chart.

</div>

![distribution-filter-before](/img/blog-posts/2018-xx-10-designing-steel-explorer/distribution-filter-before.png 'distribution-filter-before')
![distribution-filter-after](/img/blog-posts/2018-xx-10-designing-steel-explorer/distribution-filter-after.png 'distribution-filter-after')

<div style="padding-left: calc(1.45rem / 2 + 1.0875rem);">

- Transition animations when zooming in and out of a chart helps with spatial awareness

- Cross linking the charts on filter and hover interactions helps expose additional, potentially relevant, information to the user

</div>

![cross-linking-on-hover](/img/blog-posts/2018-xx-10-designing-steel-explorer/cross-linking-on-hover.png 'cross-linking-on-hover')

<div style="padding-left: calc(1.45rem / 2 + 1.0875rem);">

- Figure out the minimum and maxiumum values of your data set before starting design. My first iteration of the design only accounted for 50 or so beams, but things looked completley different once all 284 beams were rendered.

- Early on in development, be deliberate about supporting mobile. Not every tool needs to support a mobile device and this was one of them. That being said, the Steel Explorer is embarassing on mobile. It's so bad I had to add a banner on mobile devices.

- Design with a minimum screen resolution in mind, driven by actual site statistics if you have them. My initial designs assumed a resolution of 1600px by 900px, which I soon realized only accounted for about 15% of my incoming traffic. Making this mistake set me back and forced me to redesign and reengineer several charts and components for a screen resolution of 1280px by 768px.

- Using direction (up, down, left, right) in your chart can help make a connection to the physical world. For example, steel beams are always top aligned, therefore their depth is always measured down. This influenced the direction of the distribution chart [first iteration on left, top aligned iteration on right].

</div>

<img style="width: 20%; display: inline-block;" src="/img/blog-posts/2018-xx-10-designing-steel-explorer/original-distribution-chart.png" alt="original-distribution-chart" title="original-distribution-chart">
<img style="width: 70%; display: inline-block;" src="/img/blog-posts/2018-xx-10-designing-steel-explorer/flipped-distribution-chart.png" alt="flipped-distribution-chart" title="flipped-distribution-chart">

<div style="padding-left: calc(1.45rem / 2 + 1.0875rem);">

- Less is more. Remove elements, labels, legends, titles, etc. you dont need or can be easily inferred by the user. On personal computers, you can also leverage the hover animation to expose additional information. For example, my original designs had a dedicated chart showing the beam profile [left figure], but I soon realized that the beam profile was not relevant until the user hovered over a specific beam and de-prioritized this as a dedicated chart [right figure].

<img style="width: 45%; display: inline-block;" src="/img/blog-posts/2018-xx-10-designing-steel-explorer/isolated-beam-profile.png" alt="isolated-beam-profile" title="isolated-beam-profile">
<img style="width: 49%; display: inline-block; margin-left: 5%;" src="/img/blog-posts/2018-xx-10-designing-steel-explorer/joined-beam-profile.png" alt="joined-beam-profile" title="joined-beam-profile">

- Take snapshots of your design iterations along the way. It's makes you realize how much progress you have made and is fun to reminisce on once the project is done. You can see mine [here](#design-evolution)

- When spatially comparing elements, overlaying them on top of one another helps point out small changes. I used this technique to point out differences in beam dimensions when scrubbing through the chart.

<br/>

</div>

### Engineering related thoughts

<div style="padding-left: calc(1.45rem / 2 + 1.0875rem);">

- Voronois are an incredible way to add percise hover animations to charts with lots of elements. Essentially, instead of adding hover events to the elements in the chart, you render a layer of polygons and add a hover event to them. I applied a voronoi hover for all charts in the Steel Explorer. To learn more, I recommed reading Nadieh Bremer's [Using a d3 voronoi grid to improve a chart's interactive experience](https://www.visualcinnamon.com/2015/07/voronoi) and exploring Philippe Rivière's [collection of interactive Observables](https://beta.observablehq.com/collection/@fil/voronoi). It's important to point out that using the voronoi technique adds more svg elements to the DOM and can slow down the browser at a certain scale, which will lead me to my next point.

![voronoi](/img/blog-posts/2018-xx-10-designing-steel-explorer/voronoi.png 'voronoi')

- Because I underestimated the number of elements being rendered, performance on the transitions is noticably impacted. In retrospect I should have rendred all the charts in canvas and only rendered the voronoi overlays in SVG. This would have dramatically improved the rendering performance, performance when transitioning, and allowed for smoother hover animations. This leads me to my next two points.

- Computing and rendering the voronoi layer at the scale of data on this project takes a noticable amount of compute power and causes a brief slow down the machiene. This, in conjunction with the transition that happens when a user filters the dataset, resulted in noticable lag because of all the calculations simultaneously. However, I realzied that because the voronoi and svg layer are two independent layers, we can actually delay the re-calculation of the voronoi layer until after the transition of the visual elements have finished. This reduced the lage enough to a point where I felt alright skipping the migration from svg to canvas.

- When filtering on the data set, it was more performant to hide already rendered elements by changing the opacity to 0 instead of using the enter and exit pattern.

- You should always clean and condense the data set you are using. Reducing the .csv of steel beam properties from ~2,000 lines to 284 lines reduced the file size from 707kb to 111kb. This easy change improved load time by several thenths of a second.

- Migrating from d3v3 to d3v5 was relativley painless.

- I used vanilla JavaScript, CSS and HTML instead of a framework like React or Vue because I thought it would be fun to go back to basics.

</div>

<br/>

### Closing

I think it's important for you, the reader, to know that I started this project over two years ago and it took a lot of time, hard work, and persitence, just like all the other projects being created and shared. The project had many struggles, many imperfections, many times I wanted to give up, many instances where I felt like I didnt know what I was doing, and many other difficult moments. I provide this color because we make up stories in our mind that the work being created by others happens so effortlessly, easily and quickly, promoting a sense of imposter syndrom within ourselves, when in fact the reality is true. Remind yourself that you are totally capable of achieving whatever goals you set out for yourself as long as you work hard and are persistent. You are awesome.

<br/>

<h3 id="design-evolution">Design evolution</h3>

Below are screenshots of the Steel Explorer at various points in time during the development of the project, in chronological order.
