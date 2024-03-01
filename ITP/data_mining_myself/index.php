<script src='dir.php'></script>

<?php require('../../nav.inc'); ?>


<div id="description_text">
<p>
	I was a late adapter of the smartphone; my first was a Christmas present from my parents in 2012, because I had just moved to NYC and was somehow getting around with nothing but hand-drawn maps. Despite my initial resistance, I immediately became dependent on it, and since then the relentless parade of Samsung Galaxies that have marched through my life has collected an unfathomable amount of data on me. As an exercise in silver linings, this ongoing project is an attempt to reclaim my own records in order to reconstruct my past life, shed insight on a major depressive episode in 2013-2014, and reflect on lessons learned from it as well as my eventual recovery.
</p><br>
<hr>
<p>
<b>What I wanted to remember</b>
</p>
<p>I've been backing up my photos to Flickr since my first smartphone, so figured that this 20,000+ item dataset would be a good place to start my analysis—or, rather, Clarifai's analysis, as I would be running Flickr's API response through the computer vision company's API service.
</p>
<a href="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/02/Screen-Shot-2018-02-15-at-12.13.24-PM.png" target="new"><img class="img-responsive" src="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/02/Screen-Shot-2018-02-15-at-12.13.24-PM.png" style="margin-bottom:0px"></a>
<p>
	Due to rate and operations limits, I was only able to get through the earliest 4000 and latest 4800 photos, ie July 2013-October 2015 and June 2016-February 2018, resepectively. This would prove to be sufficiently revealing after quickly visualizing them in d3.
</p>
<p>
<a href="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/02/Screen-Shot-2018-02-22-at-12.42.02-PM-1.png" target="new"><img class="img-responsive" src="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/02/Screen-Shot-2018-02-22-at-12.42.02-PM-1.png" style="margin-bottom:0px"></a><i>Top 10 concepts in 2017: 1) people, 2) outdoors, 3) no person, 4) adult, 5) travel, 6) woman, 7) indoors, 8) man, 9) portrait, 10) nature</i></p>
<p><a href="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/02/Screen-Shot-2018-02-22-at-12.42.05-PM-1.png" target="new"><img class="img-responsive" src="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/02/Screen-Shot-2018-02-22-at-12.42.05-PM-1.png" style="margin-bottom:0px"></a><i>Top 10 concepts in 2014: 1) no person, 2) outdoors, 3) travel, 4) people, 5) nature, 6) one, 7) architecture, 8) old, 9) portrait, 10) sky</i>
</p>
<p>What was immediately obvious was that I photographed way fewer "concepts" in 2014 than in 2017. I also took fewer photos.</p>
<p>Another striking difference is that the concept "no person" is by far the most common concept of the 2014 photoset, while "people" is the most common for 2017. Looking at the top 10 concepts for each set, one could definitely speculate that I was much lonelier and/or more antisocial in my first couple years in NY, which coincides with my depressive episode.</p>
<p>While the chart above did its job as an abstract overview of the data, I wanted the photos themselves to tell the story; so on my click, I had each column spit out their corresponding photos:</p>
<p>
<img class="img-responsive" src="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/02/Screen-Shot-2018-02-22-at-2.10.32-PM.png" style="margin-bottom:0px"><i>“People” in 2017: 12 total unique individuals out of ~126 photos</i>
</p>
<p>
<img class="img-responsive" src="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/02/Screen-Shot-2018-02-22-at-2.05.41-PM.png" style="margin-bottom:0px"><i>"People" in 2014: 8 total unique individuals (not including office parties!) out of ~220 photos</i>
</p>

<p>Comparing the "people" category for both photosets, I clearly saw fewer unique people over a longer period of time (ie, how many photos fit in the window) in 2014, while in 2017, I saw more unique individuals over a shorter period of time, even while half the photos displayed were repeats.</p>
<p>Also notable was that the 2014 sample seemed to be entirely processed in instagram, which may be coincidence; I probably just happened to have choosen a period where I backed up all my instagram files at once? Will have to look into that one, but it's amazing to me that I bothered to process so many mundane photos through instagram, though they would never be posted publicly. Perhaps I truly thought a filtered reality looked better, or maybe I was just constantly looking for an opportunity for public validation.</p>
<br>
<hr>
<p>
<b>What I wanted others to remember (about me)</b>
</p>

  <p>Inspired by <a href="https://arxiv.org/pdf/1608.03282.pdf" target="new">Reece and Danforth's 2016 study</a> on the predictive markers of depression in Instagram activity, I ran some tests to see if their markers corresponded with my depressive behavior as well. At this point, Clarifai had granted me a 100,000 operation credit, so I was able to use both their General Model to identify subject matter, as well as their Color Model to determine a photo's dominant colors, on my entire Instagram history.</p>
    <p>The markers considered in the study include the presence of people, the setting (indoors vs outsdoors), time of day, average pixel color, brightness, comments vs "likes" ratio, filters, and posting frequency.</p>
	<p>For my dataset, the most predictive marker for depression seems to be activity: I posted the most during 2013, while I was severely depressed, and posted less throughout the years as my mood improved.</p>
	<p>In the 2016 Reece and Danforth study, increased hue, and decreased brightness and saturation in photos predicted depression. Clarifai's color analysis on my Instagram posts certainly returned results that were much darker and less colorful during the period I was acutely depressed (2013); the colors also seem to lift along with my mood as time progresses along the x-axis, albeit still rather grey. The below visualization displays the top two most dominant hex colors per post.</p>
	<p><img class="img-responsive" src="http://xujenna.com/ITP/data_mining_myself/color_chart_screenshot.png" style="margin-bottom:0px">
</p>
<p>You can <a href="http://xujenna.com/ig_analyzer/" target="new">view the visualizations here</a>; unfortunately, Instagram has switched to Facebook's Graph API since the last time I scraped my account, so all of the photo links are broken.</p>
<br>
<hr>
<p>
<b>Mapping as Autobiography</b>
</p>
<p>Google truly has an enormous amount of data about me: take, for example, this 325MB JSON file on my location history:</p>
<img class="img-responsive" src="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/04/Screen-Shot-2018-04-30-at-7.22.22-PM.png
" style="margin-bottom:0px">
<p>The only way for a human to understand this data was to map it; however...</p>
<img class="img-responsive" src="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/04/Screen-Shot-2018-04-30-at-6.46.59-PM.png
" style="margin-bottom:0px">
<p>To make it easier on the browser, I ended up filtering out the coordinates outside of NYC bounds. Grouping the datapoints into arrays for each year I've been in this city, you get a sense of how much time I actually spent in it:
<img class="img-responsive" src="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/04/Screen-Shot-2018-04-30-at-6.44.30-PM.png
" style="margin-bottom:0px"></p>
<p>The period from 2013-2018 accounts for 982,154 locations out of a total of 1,170,453— which means 188,299 locations (16% of the total) were filtered out for being beyond NYC. The reason why array[2], array[3] and array[4] contain less than half of what array[0] and array[1] do is precisely that—I spent the majority of those years traveling (ie, soul-searching after my run-in with depression). Array[5] is even smaller because it contains 2018 data.</p>
<p><u>2013 location history</u><br>
Relative to the later years, 2013's coordinates were mostly concentrated in specific areas: 1) Jackson Heights, where I lived, 2) Midtown West and Bryant Park, where I worked, 3) Lower Manhattan, where I hung out, 4) Long Island City, where my only friend lived, and 5) Greenpoint/Williamsburg, where I... dated guys.
<a href="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/05/Screen-Shot-2018-04-30-at-9.33.07-PM.png" target="new"><img class="img-responsive" src="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/05/Screen-Shot-2018-04-30-at-9.33.07-PM.png
" style="margin-bottom:0px"></a></p>

<p><u>2014 location history</u><br>
2014 saw a much greater range of motion as I began to crawl out of depression: in particular, a pretty thorough exploration of my home borough, as well as Manhattan. I was still working in Bryant Park, but started going to Chelsea every week to volunteer.
<a href="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/05/Screen-Shot-2018-04-30-at-9.33.13-PM.png" target="new"><img class="img-responsive" src="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/05/Screen-Shot-2018-04-30-at-9.33.13-PM.png
" style="margin-bottom:0px"></a></p>

<p><u>2015 location history</u><br>
Even though it contains a third of the coordinates due to about six months of total travel, 2015's location history is still far more spread out than 2013's. I began doing regular but short-term projects at offices in SoHo.
<a href="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/05/Screen-Shot-2018-04-30-at-9.33.17-PM.png"><img class="img-responsive" src="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/05/Screen-Shot-2018-04-30-at-9.33.17-PM.png
" style="margin-bottom:0px"></a></p>

<p><u>2016 location history</u><br>
I was still traveling very regularly in 2016, but this year still saw the widest spread of coordinates thus far—I was feeling decidedly better.
<a href="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/05/Screen-Shot-2018-04-30-at-9.33.21-PM.png" target="new"><img class="img-responsive" src="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/05/Screen-Shot-2018-04-30-at-9.33.21-PM.png
" style="margin-bottom:0px"></a> </p>

<p><u>2017 location history</u><br>
I worked full-time in Midtown East for the first half of 2017, and started grad school in Greenwich Village during the second half. I was generally pretty active around town with new friends and boyfriends this year.
<a href="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/05/Screen-Shot-2018-04-30-at-9.33.27-PM-1.png" target="new"><img class="img-responsive" src="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/05/Screen-Shot-2018-04-30-at-9.33.27-PM-1.png
" style="margin-bottom:0px"></a></p>
<p>While not advisable, you can try to load my location history <a href="http://xujenna.com/locationhistory/" target="new">visualization here</a>.</p>
</div>

<!-- end text and image -->

   </div>
  </div>
</div>
</body>
