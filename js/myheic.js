// ---------- heic/heif decoder start ----------
// https://github.com/alexcorvi/heic2any/blob/master/docs/getting-started.md
// https://imagekit.io/blog/lazy-loading-images-complete-guide/
function myReplace(anImg) {
  //console.log("start fetching and decoding: " + anImg.dataset.src);
  fetch(anImg.dataset.src)
    .then((res) => res.blob())
    .then((blob) => heic2any({ blob }))	
    .then((conversionResult) => {
      // conversionResult is a BLOB
      // of the PNG formatted image
      console.log(".then - fetched and decoded: " + anImg.dataset.src);
	    anImg.src = URL.createObjectURL(conversionResult);
	    anImg.title = "Click to open 1/1 resolution of:\n" + anImg.dataset.src  ;
	    //anImg.onclick = window.open(anImg.dataset.src, '_blank')  ;
	    anImg.onclick = function(e){ window.open(anImg.src, '_blank'); }
    })
    .catch((e) => {
      // see error handling section
      console.log(".catch - decoding error decoding heic/heif: " + anImg.dataset.src + "\n" + e);
      anImg.src = "images/HeifHeicError.png";
      anImg.title = "images/HeifHeicError.png";
    })
    .finally(() => {
      console.log(".finally - decoded or error: " + anImg.dataset.src);
    });
}
/* */
window.onload=function() {
  var allImages = document.getElementsByTagName('img');
  for(var i = 0; i < allImages.length ; i++) {
    // to open all photos in new tabs:
    // window.open(allImages[i].src, '_blank');
    //alert(allImages[i].dataset.src);
    if (allImages[i].dataset.src) {
      if ( (allImages[i].dataset.src.substr(-5,5).toLowerCase() == ".heic") || (allImages[i].dataset.src.substr(-5,5).toLowerCase() == ".heif")) {
        //myReplace(allImages[i].id);
        myReplace(allImages[i]);
        //allImages[i].src = 'url_to_cat_image';
      }
      else {
        console.log("not heic/heif extension but used data-src... simply replacing src with data-src: " + allImages[i].dataset.src);
        allImages[i].src = allImages[i].dataset.src;
        allImages[i].title = allImages[i].dataset.src;
      }
    }
  }
}
/* */
// ---------- heic/heif decoder stop ----------

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

