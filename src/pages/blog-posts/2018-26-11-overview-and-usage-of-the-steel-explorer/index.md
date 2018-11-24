---
path: '/blog/overview-and-usage-of-the-steel-explorer'
date: '1543219200000'
published: true
tags: ['Design', 'UX/UI']
title: 'Overview and usage of the Steel Explorer, a visualization tool for sturcutural engineers to select the most efficient beam'
---

<!-- NOTE: Curious about design and engineering decisions of the Steel Explorer? Read about them [here](/blog/designing-and-engineering-a-visualization-tool-for-structural-engineers) -->

### What is it?

<a href="http://jonsadka.github.io/steel-explorer/" target="_blank" rel="noreferrer noopener">Steel Explorer</a>
allows Structural Engineers to quickly find the optimal steel beam for their structure in a simple and visually rich way.

### Usage

The tool is made of the following components [Figure 1]:

<div style="padding-left: calc(1.45rem / 2 + 1.0875rem);">

- **[left top] Best Beams**: A result of the three lighetest beams and three shallowest beams which meet the specified criteria. Best beam is on the left.
- **[left bot] Second Moment of Area chart**: The Ix value of each beam, grouped by classification (i.e. W*XX*). Red color denotes the highest weight per in<sup>4</sup> of area.
- **[right top] Input Bar**: Beam requrements a user can add to filter out unqualified beams
- **[right mid] Available Moment chart**: The strength profile of each beam, calculated using AISC Steel Construction Manual, 15th Edition, <a href="https://www.aisc.org/publications/steel-construction-manual-resources#37583" target="_blank" rel="noreferrer noopener">Design Examples</a>
- **[right bot] Depth by Weight chart**: Each beam plotted based on it's weight per linear foot and it's depth. Depths are drawn to scale.

</div>

To find the optimal beam, enter your requirements in the Input Bar at the top and watch the Steel Explorer update the charts to show you which beams still satisfy your critera. The Best Beams section will show you the lightest or shallowest beams which match your criteria

![steel-explorer-usage](/img/blog-posts/2018-26-11-overview-steel-explorer/steel-explorer-usage.png 'steel-explorer-usage')
_Figure 1_

### Why build this?

Currently, selecting a beam to satisfy a set of structural loads can be calculated by hand (exemplified below) or via computer software. Hand calculations are long and repetitive while existing computer software tools require expensive licenses and are stuck in UI design from the 1990's [Figure 2]. I thought it would be fun to rethink what a mondern-day version of these tools could look like and out came the Steel Explorer.

![existing-software](/img/blog-posts/2018-26-11-overview-steel-explorer/existing-software.png 'existing-software')
_Figure 2_

### Manual selection of a steel beam

To understand the value of the Steel Explorer, it's important to provide you with a heavily simplified example of how to size a steel beam by hand. So, let's say you had to design for a steel beam with a minimum strength (Mn) of **1,000 k-ft** and a **12ft span**. You would:

1. Open the AISC steel manual to Chapter 3, Table 3-10 [Figure 3]

2. Traverese the charts in Chapter 3, Table 3-10 until you fnd the first solid line which crosses or exceedes a value of 1,000 k-ft (y axis) at the 12ft tick (x axis). In this example, it's a W30x99 beam because solid lines denote lighter beams per foot than dashed lines.

![aisc-moment-chart](/img/blog-posts/2018-26-11-overview-steel-explorer/aisc-moment-chart.jpeg 'aisc-moment-chart')
_Figure 3_

Now that you've selected a beam, you need to perform a flexural check to make sure the beam does not deflect too much (this would cause saggy floors). To check this, you would:

1. Open the AISC steel manual to Chapter 1, Table 1-1 [Figure 4]
2. Get several dimenions from the beam and perform the flexural check (I will not bore you with the details)
3. See if you meet or exceed the deflection criteria

If you succeed, congrats. If you dont, you need to choose a different beam and perform the same process all over again. Often this takes multiple iterations.

![aisc-shape-chart](/img/blog-posts/2018-26-11-overview-steel-explorer/aisc-shape-chart.jpeg 'aisc-shape-chart')
_Figure 4_

### The opportunity

Instead of iteratively performing these checks and flipping through segmented charts, what if we could simply tell an engineer what the beam is for a given set of requirements?

The good news is that we can actually do this because the equations used to determine the optimal steel beam are completely determinate. For a given set of requirements we can traverse across all possible beams and solve for the most optimal one without the mess described above.

### Start exploring

Click on <a href="http://jonsadka.github.io/steel-explorer/" target="_blank" rel="noreferrer noopener">this</a> link to take you to the Steel Explorer and select your ideal beam.
