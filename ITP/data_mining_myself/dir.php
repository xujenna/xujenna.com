var jpgs = <?php $out = array();
foreach (glob('*.jpg') as $file) {
    $p = pathinfo($file);
    $out[] = $p['filename'];
}
echo json_encode($out); ?>;


var pngs = <?php $out = array();
foreach (glob('*.png') as $file) {
    $p = pathinfo($file);
    $out[] = $p['filename'];
}
echo json_encode($out); ?>;


var mp4s = <?php $out = array();
foreach (glob('*.mp4') as $file) {
    $p = pathinfo($file);
    $out[] = $p['filename'];
}
echo json_encode($out); ?>;