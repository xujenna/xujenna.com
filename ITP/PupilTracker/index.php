<script src='dir.php'></script>

<?php require('../../nav.inc'); ?>


<div id="description_text"><img class="img-responsive" src="Screen-Shot-2018-02-07-at-12.26.51-PM.png"><br>
<p>Pupil dilation is known to be correlated with mental exertion; for this two-part mind-wandering study,
	I used <a href="https://pupil-labs.com/" target="new">Pupil Labs</a>, an open-source eye tracking platform, to track my pupil diameter and
	gaze positions in two vastly different environments: 1) <a href="https://bl.ocks.org/xujenna/raw/9ef769c72cd03807c2857f49fdef1cfb/" target="new">on the floor of my department on PB&J day</a>, and 2) <a href="https://bl.ocks.org/xujenna/raw/6a0c20affcda7335bc0ef84d8d5b70c0/" target="new">alone at home</a>. </p><p>
I was particularly interested to see my eye movements, as my recently developed deficit in attention requires me to read sentences,
and sometimes even entire paragraphs, multiple times after realizing that I’ve looked at the words without actually processing them in the slightest.</p>
<p>The extremely granular data that Pupil Labs spits out is not very informative out of context,
	so I decided to throw together p5 sketches (with d3 support) to animate the movements over time, and add in the corresponding diameter data.</p>
	<p><a href="https://bl.ocks.org/xujenna/raw/9ef769c72cd03807c2857f49fdef1cfb/" target="new">See the final(ish) visualization for pb&j day.</a></p>
	<p><a href="https://bl.ocks.org/xujenna/raw/6a0c20affcda7335bc0ef84d8d5b70c0/" target="new">See the final(ish) at-home visualization.</a></p>
<p>Screenshot of initial sketch result for reading on pb&j day:</p>
	<img class="img-responsive" src="Screen-Shot-2018-02-08-at-12.58.59-PM.png">
	<p>Screenshot of initial sketch result for reading at home:</p>
		<img class="img-responsive" src="Screen-Shot-2018-02-08-at-1.01.01-PM-1.png">

	<p>The image positioning for both are eyeballed, but it’s pretty clear by the density of the movement data for the former set that sitting next to the pb&j cart between classes upsets my concentration, and forced me to reread the same lines an embarrassing number of times. Pupil diameter (concomitantly encoded in the position tracking lines, as well as supplementally represented with the circles the lower-right corner) was also on average larger at school than in my quiet home environment, suggesting that more effort was required at the former.
</p>

</div>




</div>

<!-- end text and image -->

   </div>
  </div>
</div>
</body>
