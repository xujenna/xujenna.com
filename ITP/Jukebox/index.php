<script src='dir.php'></script>

<?php require('../../nav.inc'); ?>


<div class='embed-responsive embed-responsive-16by9 video'> 
<iframe class='embed-responsive-item' src="https://player.vimeo.com/video/304398718" width="950" height="535" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

	<!-- <video class='embed-responsive-item' controls> 
		<source src='https://fpdl.vimeocdn.com/vimeo-prod-skyfire-std-us/01/808/12/304042964/1164796220.mp4?token=1543943019-0x13528abc7028e5e7675da8ec6432367a3b8cb8bb' type='video/mp4'>
		Your browser does not support HTML5 video.
	</video> -->
</div>
<p><br></p>


<div id="description_text">
A collaboration with <a href="http://www.ilanabonder.com/" target="new">Ilana Bonder</a>, this jukebox plays music associated with photographic memories.<br>


</div>

<script>

// for (i=0; i<mp4s.length; i++) {
// 	$('#img-container').append("<div class='embed-responsive embed-responsive-16by9 video'> <video class='embed-responsive-item' controls> <source src='" + mp4s[i] + ".mp4' type='video/mp4'>Your browser does not support HTML5 video.</video></div>");
// } 

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