---
path: "/best-and-worst-times-to-take-an-uber"
date: "1417507200000"
published: true
tags: ["API", "D3.js", "JavaScript"]
title: "Best and worst times to take an Uber in San Francisco, Los Angeles, and New York"
---

About two months ago, Nicolas and I were curious to see if we could nail down the cheapest and priciest hours to order an Uber. To do this, we requested pricing data from Uber’s developer API at ten minute intervals in three major cities (San Francisco, Los Angeles, and New York) using a Node.js / Express server and used [Keen.io](https://keen.io/) (amazing service) for event storage. We selected three points of interest which we felt best represented popular areas of travel in each city and started analyzing the data.

As I began developing the data visualization using [D3.js](http://d3js.org/), I noticed that the data was richer than initially anticipated. Each city has a personality of its own; when it wakes up, how long people work, how they enjoy their weekends. I have summarized some of the trends that emerged in each city, but encourage you to [explore the visualization](http://jonsadka.github.io/uberAnalytics/) and see for yourself.
Note: Look for the <span style="color: #32B8D4;">blue</span> colored key after each bullet point and use those inputs to match the trend with the visual.

### San Francisco

- The Giants won the World Series on Thursday, October 30th and a celebration parade ensued on Friday October 31st at noon. The parade ended around 2:00 pm, causing the surge multiplier to rise for approximately two hours. <span style="color: #32B8D4;">[[Halloween | Powell & Market | Pier 39 | uberX]](http://jonsadka.github.io/uberAnalytics/)</span>
- Most people typically take an Uber to downtown SF for work between the hours of 7:00 am to 9:00 am. <span style="color: #32B8D4;">[[Past 2 Months | CA Academy of Sciences | Powell & Market | uberX]](http://jonsadka.github.io/uberAnalytics/)</span>
- People leave from work between the hours of 5:00 pm to 7:00 pm, however a noticeable amount of people also stay downtown until 10:00 pm. <span style="color: #32B8D4;">[[Past 2 Months | Powell & Market | CA Academy of Sciences | uberX]](http://jonsadka.github.io/uberAnalytics/)</span>
- If we assume commutes to Powell & Market are strictly for work, we see that weekend surge multiplier mirrors that of weekdays, implying that people also work on Saturdays. <span style="color: #32B8D4;">[[Past 2 Months | Powell & Market | CA Academy of Sciences | uberX]](http://jonsadka.github.io/uberAnalytics/)</span>
- The most common time for people to take an Uber on weekends is between 5:00 pm to 7:00 pm and 2:00 am. 2:00 am is the closing time for most drinking establishments in California.
- People rarely take uberBlack or uberSUV in San Francisco, but if they do it is typically around 2:00 am.
- Halloween parties begin around 5:00 pm and end between 1:00 am to 2:00 am. <span style="color: #32B8D4;">[[Halloween | Powell & Market | Pier 39 | uberX]](http://jonsadka.github.io/uberAnalytics/)</span>

### New York

- New York truly doesn’t sleep; the surge multiplier in New York is almost always above 1.
- People in New York actually use uberBlack and uberSUV, taking them to get home from work between the hours of 5:00 pm to 6:00 pm. <span style="color: #32B8D4;">[[Past 2 Months | Grand Central Station | Academy of Arts and Letters | uberBlack]](http://jonsadka.github.io/uberAnalytics/)</span>
- If we assume commutes to and from Grand Central Station are strictly work related, we see that people head to work between 6:00 am to 8:00 am and leave work between 5:00 pm to 7:00 pm, however a noticeable amount of people also stay downtown until 11:00pm.

### Los Angeles

- The most common time for people to take an Uber on weekdays is between 7:00 am to 8:00 am and 4:00 pm to 6:00 pm, similar to work hours.
- The most common time for people to take an Uber on weekends is between 5:00 pm to 7:00 pm and 2:00 am. 2:00 am is the closing time for most drinking establishments in California.

### All Cities

- uberBlack and uberSUV rarely surge. When there is a surge in either of these products, both uberBlack and uberSUV surge in unison and have the same multiplier.
- When uberX and uberSUV suge, both typically surge in unison and have the same multiplier.

Trend | SF | LA | NY
--- | --- | --- | ---
Start of work day | 7:00 am to 9:00 am | 7:00 am to 8:00 am | 6:00 am to 8:00 am
End of work day | 5:00 pm to 7:00 pm | 4:00 pm to 6:00 pm | 5:00 pm to 7:00 pm
Total hours worked (1 hour lunch break assumed) | 6 to 11 hours | 7 to 10 hours | 8 to 12 hours

### Recommendations
- Pricing and surge multipliers vary based on the demand in the location you are currently in AND often times the location you are going to. If you see a surge, try moving the pickup location or dropoff location a few blocks away and see if the surge multiplier decreases.
- If the surge multiplier is greater than 2.5x, consider taking an uberBlack or a taxi.
- Avoid the hours of 7:00 am to 8:00 am and 5:00 pm to 6:00 pm on weekdays and 2:00 am on weekends in all cities.
- If the surge multiplier is high, try to walk into a coffee shop and wait 30 minutes for the price to drop; your ride will probably be much cheap and you’ll end up with a coffee.

Additional Note: While people use Uber in Los Angeles, <span style="color: #32B8D4;">84%</span> of residents commute using personal cars.
