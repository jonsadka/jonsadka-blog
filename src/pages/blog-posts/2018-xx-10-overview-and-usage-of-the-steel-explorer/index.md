---
path: "/blog/overview-and-usage-of-the-steel-explorer"
date: "1539586800000"
published: false
tags: ["Design", "UX/UI"]
title: "Overview and usage of the Steel Explorer, a visualization tool for sturcutural engineers to select the most efficient beam"
---

NOTE: Curious about design and engineering decisions of the Steel Explorer? Read about them [here](/blog/designing-and-engineering-a-visualization-tool-for-structural-engineers)


#### What is it?

Steel Explorer allows Structural Engineers to quickly find the optimal steel beam for their structure in a simple and visually rich way.

#### Why build this?

The process for selecting a beam which satisfies a set of structural loads is long and repetitive if done by hand. There are computer software tools which exist today but require expensive licenses and are stuck in UI design from the 1990's [Figure 1]. I thought it would be fun to rethink what a mondern-day version of the beam expploration aspect of tools like this could look like.

![existing_solutions](/img/blog-posts/2018-xx-10-steel-explorer/existing_solutions.png "existing_solutions")
*Figure 1*

#### How to select a beam manually

To understand this tool, it's important to provide you with a HEAVILY simplified example of how to design a steel beam. Let's say you had to design for a beam with a minimum strength (Mn) of **1,000 k-ft** and a **12ft span**. You would:

1. Open the AISC steel manual to Chapter XX [Figure xx-xx <put picture of moment chart here>]
2. Traverese the charts in Chapter xx-xx until you fnd the line which crosses or exceedes a value of 1,000 k-ft (y axis) at the 12ft tick (x axis). (In this case, it's a WXXxXX beam.)

Now that you've selected a beam, you need to perform a flexural check to make sure the beam does not deflect too much (this would cause saggy floors). To check this, you would:

1. Open the AISC steel manual to Chapter XX  [Figure xx-xx <put picture of the beam dimensions here>]
2. Get several dimenions from the beam
3. Perform the flexural check
4. See if you meet or exceed the deflectoin criteria

If you succeed, congrats. If you dont, you need to choose a different beam and perform the same process all over again. Sometimes this takes several iterations.

#### The opportunity

There is a set of equations which determins the strength profile for every beam at a given length. Because the strength profile for every steel beam is determinate, once we have a set of specifications we can traverse across all possible beams and solve for the most optimal one without all the mess work described above.

#### Usage

The tool is made of the following components:

- **[left top] Best Beams**: A result of the three lighetest beams and three shallowest beams which meet the specified criteria. Best beam is on the left.
- **[left bot] Second Moment of Area Chart**: The Ix value of each beam, grouped by classification (i.e. W*XX*). Red color denotes the highest weight per in<sup>4</sup> of area.
- **[right top] Input Bar**: Beam requrements a user can add to filter out unqualified beams
- **[right mid] Available Moment Chart**: The strength profile of each beam, calculated using AISC Steel Construction Manual, 15th Edition, [Design Examples](https://www.aisc.org/publications/steel-construction-manual-resources#37583)
- **[right bot] Depth by Weight chart**: Each beam plotted based on it's weight per linear foot and it's depth. Depths are drawn to scale.

To find the optimal beam, enter your requirements in the Input Bar at the top and watch the Steel Explorer update the charts to show you which beams still satisfy your critera. The Best Beams section will show you the lightest or shallowest beams which match your cr
