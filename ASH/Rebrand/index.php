<script src='dir.php'></script>

<?php require('../../nav.inc'); ?>

<div class='embed-responsive embed-responsive-16by9 video'> 

<iframe class='embed-responsive-item' width="950" height="535" src="https://www.youtube.com/embed/eB8iGwCMPnk?si=XcMOzFXqgYiDoyru" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </div>
  <p><br></p>


<script>
// console.log("jpgs", jpgs);
// console.log("pngs", pngs);
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