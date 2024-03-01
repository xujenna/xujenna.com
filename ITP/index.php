<script src='dir.php'></script>

<?php require('../../nav.inc'); ?>

<div class='embed-responsive embed-responsive-16by9 video'> 
<iframe class='embed-responsive-item' src="https://player.vimeo.com/video/307767198" width="950" height="535" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

	<!-- <video class='embed-responsive-item' controls> 
		<source src='https://fpdl.vimeocdn.com/vimeo-prod-skyfire-std-us/01/808/12/304042964/1164796220.mp4?token=1543943019-0x13528abc7028e5e7675da8ec6432367a3b8cb8bb' type='video/mp4'>
		Your browser does not support HTML5 video.
	</video> -->
</div>


<p><br></p>

<div id="description_text">
<p>“So, do you feel like a real New Yorker yet?”
</p>
<p>How can a recent transplant possibly answer this question without sounding like as much of an asshole as the other recent transplant who just asked it? For the past six years, my go-to has been “fuck that, I’m from Chicago”, but as a wise friend once advised me, if you don’t have anything nice to say, just respond with a number.</p><br>
<a href="https://xujenna.com/NYQuotient/" target="new"><img class="img-responsive" src="pizza.png"></a>
<p>
<i>How New York are you?</i> is a voice-controlled browser game where two players compete to be crowned the realest New Yorker. The computer volleys hot topic keywords from the past year, and each player will have one shot per topic to prove how aligned they are with most common New York opinions. The quicker and closer the response, the more points earned.
</p><br>
<a href="https://xujenna.com/NYQuotient/" target="new"><img class="img-responsive" src="mta.png"></a>
<p>
In order to make this game, I first used <a href="https://github.com/twintproject/twint" target="new">twint</a>, a twitter-scraping python module, to gather tweets originating from New York during 2018 that were relevant to popular topics on Twitter this year. Then I used this corpora to train word2vec models for each topic using <a href="https://pypi.org/project/gensim/" target="new">gensim</a>.
</p>
<p>
When building my <a href="http://www.xujenna.com/itp_blog/2018/11/26/final-project-proposal/" target="new">initial idea</a>, I had uploaded word2vec models directly to the browser with tensorflowjs/<a href="https://github.com/ml5js/ml5-library" target="new">some code stolen from ml5js</a>, then used tensorflowjs's tsne library to reduce the vectors to two dimensions for visualization (<a href="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/12/Screen-Shot-2018-11-28-at-2.00.36-AM.png" target="new">beware your array types</a> when using this library!). However, these calculations proved to be too burdensome to perform before each game, so for the final iteration, I ended up doing the tsne reduction in python (adapting a script from <a href="https://github.com/yulicai/Word-Land" target="new">Yuli Cai's</a> threejs workshop last year)—then uploading the two dimensional vectors to the browser instead. On Gene's suggestion, I plan to reduce the models to three dimensions instead, then reduce to two dimensions with tensorflowjs during gameplay, in order to get more accurate results.
</p><br>
<a href="https://xujenna.com/NYQuotient/" target="new"><img class="img-responsive" src="amazon.png"></a>
<p>
I used Chrome’s Speech Synthesis API to announce the topic for each round, as well as their Speech Recognition API to capture each player’s responses (recognition.interimResults is everything). I hope to someday make a version for Firefox as well.
</p>
<p>
Once a player responds to a topic and the API transcribes the response, tensorflowjs calculates the distances between each word in their response and the original keyword, then averages the distances in order to calculate a final score for their turn. The longer the distance and slower the response, the lower the score.
</p>
<p>
d3js then plots the respective embeddings in the browser. At the end, if the winner’s score surpasses the tenth highest score in history, they can add their name to the high score board for eternal fame and glory.
</p><br>
<a href="https://xujenna.com/NYQuotient/" target="new"><img class="img-responsive" src="highscoreboard.png"></a>
<p>
<a href="https://xujenna.com/NYQuotient/" target="new">Play the game here.</a>
</p>
</div>




</div>

<!-- end text and image -->

   </div>
  </div>
</div>
</body>