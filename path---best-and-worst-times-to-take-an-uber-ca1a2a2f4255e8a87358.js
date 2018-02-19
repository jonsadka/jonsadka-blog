webpackJsonp([61368061307467],{379:function(e,t){e.exports={data:{markdownRemark:{html:'<p>About two months ago, Nicolas and I were curious to see if we could nail down the cheapest and priciest hours to order an Uber. To do this, we requested pricing data from Uber’s developer API at ten minute intervals in three major cities (San Francisco, Los Angeles, and New York) using a Node.js / Express server and used <a href="https://keen.io/">Keen.io</a> (amazing service) for event storage. We selected three points of interest which we felt best represented popular areas of travel in each city and started analyzing the data.</p>\n<p>As I began developing the data visualization using <a href="http://d3js.org/">D3.js</a>, I noticed that the data was richer than initially anticipated. Each city has a personality of its own; when it wakes up, how long people work, how they enjoy their weekends. I have summarized some of the trends that emerged in each city, but encourage you to <a href="http://jonsadka.github.io/uberAnalytics/">explore the visualization</a> and see for yourself.\nNote: Look for the <span style="color: #32B8D4;">blue</span> colored key after each bullet point and use those inputs to match the trend with the visual.</p>\n<h3>San Francisco</h3>\n<ul>\n<li>The Giants won the World Series on Thursday, October 30th and a celebration parade ensued on Friday October 31st at noon. The parade ended around 2:00 pm, causing the surge multiplier to rise for approximately two hours. <span style="color: #32B8D4;"><a href="http://jonsadka.github.io/uberAnalytics/">[Halloween | Powell &#x26; Market | Pier 39 | uberX]</a></span></li>\n<li>Most people typically take an Uber to downtown SF for work between the hours of 7:00 am to 9:00 am. <span style="color: #32B8D4;"><a href="http://jonsadka.github.io/uberAnalytics/">[Past 2 Months | CA Academy of Sciences | Powell &#x26; Market | uberX]</a></span></li>\n<li>People leave from work between the hours of 5:00 pm to 7:00 pm, however a noticeable amount of people also stay downtown until 10:00 pm. <span style="color: #32B8D4;"><a href="http://jonsadka.github.io/uberAnalytics/">[Past 2 Months | Powell &#x26; Market | CA Academy of Sciences | uberX]</a></span></li>\n<li>If we assume commutes to Powell &#x26; Market are strictly for work, we see that weekend surge multiplier mirrors that of weekdays, implying that people also work on Saturdays. <span style="color: #32B8D4;"><a href="http://jonsadka.github.io/uberAnalytics/">[Past 2 Months | Powell &#x26; Market | CA Academy of Sciences | uberX]</a></span></li>\n<li>The most common time for people to take an Uber on weekends is between 5:00 pm to 7:00 pm and 2:00 am. 2:00 am is the closing time for most drinking establishments in California.</li>\n<li>People rarely take uberBlack or uberSUV in San Francisco, but if they do it is typically around 2:00 am.</li>\n<li>Halloween parties begin around 5:00 pm and end between 1:00 am to 2:00 am. <span style="color: #32B8D4;"><a href="http://jonsadka.github.io/uberAnalytics/">[Halloween | Powell &#x26; Market | Pier 39 | uberX]</a></span></li>\n</ul>\n<h3>New York</h3>\n<ul>\n<li>New York truly doesn’t sleep; the surge multiplier in New York is almost always above 1.</li>\n<li>People in New York actually use uberBlack and uberSUV, taking them to get home from work between the hours of 5:00 pm to 6:00 pm. <span style="color: #32B8D4;"><a href="http://jonsadka.github.io/uberAnalytics/">[Past 2 Months | Grand Central Station | Academy of Arts and Letters | uberBlack]</a></span></li>\n<li>If we assume commutes to and from Grand Central Station are strictly work related, we see that people head to work between 6:00 am to 8:00 am and leave work between 5:00 pm to 7:00 pm, however a noticeable amount of people also stay downtown until 11:00pm.</li>\n</ul>\n<h3>Los Angeles</h3>\n<ul>\n<li>The most common time for people to take an Uber on weekdays is between 7:00 am to 8:00 am and 4:00 pm to 6:00 pm, similar to work hours.</li>\n<li>The most common time for people to take an Uber on weekends is between 5:00 pm to 7:00 pm and 2:00 am. 2:00 am is the closing time for most drinking establishments in California.</li>\n</ul>\n<h3>All Cities</h3>\n<ul>\n<li>uberBlack and uberSUV rarely surge. When there is a surge in either of these products, both uberBlack and uberSUV surge in unison and have the same multiplier.</li>\n<li>When uberX and uberSUV suge, both typically surge in unison and have the same multiplier.</li>\n</ul>\n<table>\n<thead>\n<tr>\n<th>Trend</th>\n<th>SF</th>\n<th>LA</th>\n<th>NY</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Start of work day</td>\n<td>7:00 am to 9:00 am</td>\n<td>7:00 am to 8:00 am</td>\n<td>6:00 am to 8:00 am</td>\n</tr>\n<tr>\n<td>End of work day</td>\n<td>5:00 pm to 7:00 pm</td>\n<td>4:00 pm to 6:00 pm</td>\n<td>5:00 pm to 7:00 pm</td>\n</tr>\n<tr>\n<td>Total hours worked (1 hour lunch break assumed)</td>\n<td>6 to 11 hours</td>\n<td>7 to 10 hours</td>\n<td>8 to 12 hours</td>\n</tr>\n</tbody>\n</table>\n<h3>Recommendations</h3>\n<ul>\n<li>Pricing and surge multipliers vary based on the demand in the location you are currently in AND often times the location you are going to. If you see a surge, try moving the pickup location or dropoff location a few blocks away and see if the surge multiplier decreases.</li>\n<li>If the surge multiplier is greater than 2.5x, consider taking an uberBlack or a taxi.</li>\n<li>Avoid the hours of 7:00 am to 8:00 am and 5:00 pm to 6:00 pm on weekdays and 2:00 am on weekends in all cities.</li>\n<li>If the surge multiplier is high, try to walk into a coffee shop and wait 30 minutes for the price to drop; your ride will probably be much cheap and you’ll end up with a coffee.</li>\n</ul>\n<p>Additional Note: While people use Uber in Los Angeles, <span style="color: #32B8D4;">84%</span> of residents commute using personal cars.</p>',frontmatter:{date:"1417507200000",path:"/best-and-worst-times-to-take-an-uber",title:"Best and worst times to take an Uber in San Francisco, Los Angeles, and New York"}}},pathContext:{}}}});
//# sourceMappingURL=path---best-and-worst-times-to-take-an-uber-ca1a2a2f4255e8a87358.js.map