import{t as e}from"./index-CC4pwC9H.js";import{t}from"./lib-DVGn8KeT.js";var n=e(),r={path:`/blog/overview-and-usage-of-the-steel-explorer`,date:`1544515200000`,published:!0,tags:[`Design`,`UX/UI`],title:`Overview and usage of the Steel Explorer, a visualization tool for sturcutural engineers to select the most efficient beam`};function i(e){let r={a:`a`,em:`em`,h3:`h3`,img:`img`,li:`li`,ol:`ol`,p:`p`,span:`span`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:[`NOTE: Curious about design and engineering decisions of the Steel Explorer? Read about them `,(0,n.jsx)(r.a,{href:`/blog/designing-and-engineering-a-visualization-tool-for-structural-engineers`,children:`here`})]}),`
`,(0,n.jsxs)(r.h3,{id:`what-is-it`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#what-is-it`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`What is it?`]}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(`a`,{href:`http://jonsadka.github.io/steel-explorer/`,target:`_blank`,rel:`noreferrer noopener`,children:`Steel Explorer`}),`
allows Structural Engineers to quickly find the optimal steel beam for their structure in a simple and visually rich way.`]}),`
`,(0,n.jsxs)(r.h3,{id:`usage`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#usage`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Usage`]}),`
`,(0,n.jsx)(r.p,{children:`The tool is made of the following components [Figure 1]:`}),`
`,(0,n.jsx)(`div`,{style:{paddingLeft:`calc(1.45rem / 2 + 1.0875rem)`},children:(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`[left top] Best Beams`}),`: A result of the three lighetest beams and three shallowest beams which meet the specified criteria. Best beam is on the left.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`[left bot] Second Moment of Area chart`}),`: The Ix value of each beam, grouped by classification (i.e. W`,(0,n.jsx)(r.em,{children:`XX`}),`). Red color denotes the highest weight per in`,(0,n.jsx)(`sup`,{children:`4`}),` of area.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`[right top] Input Bar`}),`: Beam requrements a user can add to filter out unqualified beams`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`[right mid] Available Moment chart`}),`: The strength profile of each beam, calculated using AISC Steel Construction Manual, 15th Edition, `,(0,n.jsx)(`a`,{href:`https://www.aisc.org/publications/steel-construction-manual-resources#37583`,target:`_blank`,rel:`noreferrer noopener`,children:`Design Examples`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`[right bot] Depth by Weight chart`}),`: Each beam plotted based on it's weight per linear foot and it's depth. Depths are drawn to scale.`]}),`
`]})}),`
`,(0,n.jsx)(r.p,{children:`To find the optimal beam, enter your requirements in the Input Bar at the top and watch the Steel Explorer update the charts to show you which beams still satisfy your critera. The Best Beams section will show you the lightest or shallowest beams which match your criteria`}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.img,{src:`/img/blog-posts/2018-11-12-overview-steel-explorer/steel-explorer-usage.png`,alt:`steel-explorer-usage`,title:`steel-explorer-usage`}),`
`,(0,n.jsx)(r.em,{children:`Figure 1`})]}),`
`,(0,n.jsxs)(r.h3,{id:`why-build-this`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#why-build-this`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Why build this?`]}),`
`,(0,n.jsx)(r.p,{children:`Currently, selecting a beam to satisfy a set of structural loads can be calculated by hand (exemplified below) or via computer software. Hand calculations are long and repetitive while existing computer software tools require expensive licenses and are stuck in UI design from the 1990's [Figure 2]. I thought it would be fun to rethink what a mondern-day version of these tools could look like and out came the Steel Explorer.`}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.img,{src:`/img/blog-posts/2018-11-12-overview-steel-explorer/existing-software.png`,alt:`existing-software`,title:`existing-software`}),`
`,(0,n.jsx)(r.em,{children:`Figure 2`})]}),`
`,(0,n.jsxs)(r.h3,{id:`manual-selection-of-a-steel-beam`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#manual-selection-of-a-steel-beam`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Manual selection of a steel beam`]}),`
`,(0,n.jsxs)(r.p,{children:[`To understand the value of the Steel Explorer, it's important to provide you with a heavily simplified example of how to size a steel beam by hand. So, let's say you had to design for a steel beam with a minimum strength (Mn) of `,(0,n.jsx)(r.strong,{children:`1,000 k-ft`}),` and a `,(0,n.jsx)(r.strong,{children:`12ft span`}),`. You would:`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Open the AISC steel manual to Chapter 3, Table 3-10 [Figure 3]`}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Traverese the charts in Chapter 3, Table 3-10 until you fnd the first solid line which crosses or exceedes a value of 1,000 k-ft (y axis) at the 12ft tick (x axis). In this example, it's a W30x99 beam because solid lines denote lighter beams per foot than dashed lines.`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.img,{src:`/img/blog-posts/2018-11-12-overview-steel-explorer/aisc-moment-chart.png`,alt:`aisc-moment-chart`,title:`aisc-moment-chart`}),`
`,(0,n.jsx)(r.em,{children:`Figure 3`})]}),`
`,(0,n.jsx)(r.p,{children:`Now that you've selected a beam, you need to perform a flexural check to make sure the beam does not deflect too much (this would cause saggy floors). To check this, you would:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`Open the AISC steel manual to Chapter 1, Table 1-1 [Figure 4]`}),`
`,(0,n.jsx)(r.li,{children:`Get several dimenions from the beam and perform the flexural check (I will not bore you with the details)`}),`
`,(0,n.jsx)(r.li,{children:`See if you meet or exceed the deflection criteria`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`If you succeed, congrats. If you dont, you need to choose a different beam and perform the same process all over again. Often this takes multiple iterations.`}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.img,{src:`/img/blog-posts/2018-11-12-overview-steel-explorer/aisc-shape-chart.png`,alt:`aisc-shape-chart`,title:`aisc-shape-chart`}),`
`,(0,n.jsx)(r.em,{children:`Figure 4`})]}),`
`,(0,n.jsxs)(r.h3,{id:`the-opportunity`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#the-opportunity`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`The opportunity`]}),`
`,(0,n.jsx)(r.p,{children:`Instead of iteratively performing these checks and flipping through segmented charts, what if we could simply tell an engineer what the beam is for a given set of requirements?`}),`
`,(0,n.jsx)(r.p,{children:`The good news is that we can actually do this because the equations used to determine the optimal steel beam are completely determinate. For a given set of requirements we can traverse across all possible beams and solve for the most optimal one without the mess described above.`}),`
`,(0,n.jsxs)(r.h3,{id:`start-exploring`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#start-exploring`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Start exploring`]}),`
`,(0,n.jsxs)(r.p,{children:[`Click on `,(0,n.jsx)(`a`,{href:`http://jonsadka.github.io/steel-explorer/`,target:`_blank`,rel:`noreferrer noopener`,children:`this`}),` link to take you to the Steel Explorer and select your ideal beam.`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};