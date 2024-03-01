<script src='dir.php'></script>

<?php require('../../nav.inc'); ?>




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