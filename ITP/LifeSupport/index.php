<script src='dir.php'></script>

<?php require('../../nav.inc'); ?>

<div class='embed-responsive embed-responsive-16by9 video'> 
<iframe class='embed-responsive-item' src="https://player.vimeo.com/video/299894463" width="950" height="535" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

	<!-- <video class='embed-responsive-item' controls> 
		<source src='https://fpdl.vimeocdn.com/vimeo-prod-skyfire-std-us/01/808/12/304042964/1164796220.mp4?token=1543943019-0x13528abc7028e5e7675da8ec6432367a3b8cb8bb' type='video/mp4'>
		Your browser does not support HTML5 video.
	</video> -->
</div>


<p><br></p>

<div id="description_text">
<p>As a person with no inherent self-preservation instinct, nor the self-discipline to enact a learned one, it's been a tough transition to independent adult life. Nearly immediately upon moving to NYC in 2012 for my first job, I fell into an acute depression that would take me a couple years to crawl out of. Since then, I've learned the hard way to take care of myself physically, mentally, and emotionally, and while I've skimmed countless research papers, books, and MOOCs about psychology over the years, making a regular practice of what I've learned still proves a challenge.</p>
<p>So for my Hello, Computer final project, I created a self-care assistant with DialogFlow, Google's conversational interface technology, and nodejs. Named Life Support, it's a relatively sprawling/unfocused endeavor that attempts to intervene generally on common/modern emotional discomforts. While I plan to build this out even more as part of my thesis, Life Support presently consists of the following features:</p>
<ol>
 	<li><strong>A guided breathing exercise.</strong> When you tell Life Support that you're feeling some variety of agitated (anxious, nervous, etc), it will guide you through a breathing exercise: five counts in, five counts out. When a body is stressed, the fight or flight response (ie the sympathetic nervous system) kicks in; breathing exercises promote the opposite response (ie the parasympathetic nervous system) and indicate to the body that there is no threat. Breathing exercises/mindfulness practices in general have also been shown to reduce mild depressive symptoms. Since the assistant's response seems to be capped at about 30-40 seconds, Life Support will ask whether to continue the exercise every six breaths.</li>
 	<li><strong>A guided physical exercise.</strong> When you indicate that you're feeling some variety of burnt out (sluggish, unfocused, foggy, etc), Life Support will guide you through NYT's <a href="https://well.blogs.nytimes.com/2013/05/09/the-scientific-7-minute-workout/">Scientific Seven Minute Workout</a>. As a person who naturally loathes exercise from the depths of my being, this is the rare workout that's actually within my tolerance threshold, and since their interactive guide stopped working I've definitely become even lazier. Luckily, it was quite easy to recreate using SSML. Similar to the breathing exercise, Life Support will ask after each exercise whether or not the user wants to continue. Physical exercise has been shown to have countless benefits on a person's mental and physical health, and is particularly helpful to prevent burn out.<a href="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/10/30609169087_a491ca0941_k-copy.jpg"><img class="img-responsive" src="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/10/30609169087_a491ca0941_k-copy-283x1024.jpg" alt="" width="283" height="1024" /></a></li>
 	<li><strong>Guided cognitive behavioral therapy</strong>. When you tell Life Support that something is bothering you, it will help you CBT. CBT makes good on the belief that affect, behavior, and cognition directly influence (and therefore, exacerbate) each other by empowering the individual to targeting self-defeating cognitive distortions. Because cognitive distortions are based on fears and not facts, they can be effectively abated by gathering evidence for and against them. The individual then reassesses their beliefs based on these facts. While easily executed with the help of a therapist and some distance from the triggering event, it’s much more difficult to practice CBT in the moment, by oneself, while emotionally agitated. Life Support can help you challenge your triggering thoughts in the moment, thereby de-escalating emotional turmoil.There's another branch in the conversation that the user can go to if they're catastrophizing, which helps them challenge the extreme belief that is triggering them. Life Support asks them to consider 1) the worst case scenario, 2) the best case scenario, 3) the most probable case scenario, and 4) a purposeful action based on that probable scenario.<a href="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/10/45499988292_0f69744860_k.jpg"><img class="img-responsive" src="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/10/45499988292_0f69744860_k-333x1024.jpg" alt="" width="333" height="1024" /></a></li>
 	<li><strong>Gratitude and good things log</strong>. In addition to helping users with their unpleasant emotions, Life Support also helps them prioritize positive emotions by keeping a log for good things that happen, as well as a log for things that the user is grateful for. According to positive psychology, a bias towards optimism and the refocusing on positive emotions allows people to change their subjective reality, and eventually their objective reality when their behavior changes as a result. Another benefit of keeping track of such things is the ability to revisit them; apparently, merely recounting positive moments from one's past is enough to elicit those positive emotions in the present. When the user tells Life Support that they are feeling sad, Life Support will respond with something from their log, which is stored on a Firebase database.<a href="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/10/31677851088_58a35989bc_k.jpg"><img class="img-responsive" src="http://www.xujenna.com/itp_blog/wp-content/uploads/2018/10/31677851088_58a35989bc_k-213x1024.jpg" alt="" width="266" height="1279" /></a></li>
 	<li><strong>Knowledge base fallback</strong>. In addition to the foregoing intents, I also trained Dialog Flow's Knowledge base on the transcripts of UPenn's positive psychology MOOCs, as well as Barbara Oakley's Learning How to Learn MOOC. As a result, Life Support will attempt to give advice when the user asks about anything related to positive psychology (coping/resilience skills, how to feel better about life, etc) or learning.</li>
</ol>
</p>
</div>




</div>

<!-- end text and image -->

   </div>
  </div>
</div>
</body>