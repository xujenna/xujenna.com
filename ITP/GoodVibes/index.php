<script src='dir.php'></script>

<?php require('../../nav.inc'); ?>

<!-- <script>
for (i=0; i<mp4s.length; i++) {
	$('#img-container').append("<div class='embed-responsive embed-responsive-16by9 video'> <video class='embed-responsive-item' controls> <source src='" + mp4s[i] + ".mp4' type='video/mp4'>Your browser does not support HTML5 video.</video></div>");
} 
</script> -->

<!-- <iframe src="https://player.vimeo.com/video/304042964" width="950" height="535" frameborder="0" class="img-responsive" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> -->

<div class='embed-responsive embed-responsive-16by9 video'> 
<iframe class='embed-responsive-item' src="https://player.vimeo.com/video/304042964" width="950" height="535" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

	<!-- <video class='embed-responsive-item' controls> 
		<source src='https://fpdl.vimeocdn.com/vimeo-prod-skyfire-std-us/01/808/12/304042964/1164796220.mp4?token=1543943019-0x13528abc7028e5e7675da8ec6432367a3b8cb8bb' type='video/mp4'>
		Your browser does not support HTML5 video.
	</video> -->
</div>


<p><br></p>

<div id="description_text">
<p>A collaboration with <a href="https://www.barakchamo.com" target="new">Barak Chamo</a>, Good Vibrations is an immersive, pan-sensory experience that aimed to reproduce the brain activity found in meditating buddhist monks through brain entrainment. Users wore a headset that measured their brain activity during the session, which visualized how the experience affected them in real time.</p>
</div>

<script>

for (i=0; i<pngs.length; i++) {
	$('#img-container').append("<p><img class='img-responsive' src='" + pngs[i] + ".png'> </p>");
}

for (i=0; i<jpgs.length; i++) {
	$('#img-container').append("<p><img class='img-responsive' src='" + jpgs[i] + ".jpg'> </p>");

}


</script>




</div>

<!-- end text and image -->

   </div>
  </div>
</div>
</body>