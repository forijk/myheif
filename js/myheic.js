// ---------- heic/heif decoder start ----------
// https://github.com/alexcorvi/heic2any/blob/master/docs/getting-started.md
// https://imagekit.io/blog/lazy-loading-images-complete-guide/
function myReplace(anImg) {

  fetch(anImg.dataset.src)
  
  .then( // on fetch() promise success
    (res) => res.blob() 
  )
    
  .then( // on blob() promise success
    (blob) => heic2any({ 
                blob,
                toType: "image/jpeg",
                quality: 0.92,
              })
  )
  
  .then( // on heic2any() promise success
    (conversionResult) => { 
      // conversionResult is a BLOB
      // of the PNG formatted image
	    anImg.src = URL.createObjectURL(conversionResult);
	    //anImg.title = "Decoded from heic/heif\nClick to open 1/1 resolution of:\n" + anImg.dataset.src;
	    anImg.title = "Decoded from heic/heif\nClick to toggle zoom of:\n" + anImg.dataset.src;
	    //anImg.onclick = function(e){ window.open(anImg.src, '_blank'); }
	    anImg.onclick = function(e) {     
	                        anImg.classList.toggle('zoomed-out');
	                        anImg.classList.toggle('zoomed-in');
	                    }
	    console.log("+++ .then - fetched and decoded: " + anImg.dataset.src);
    }
  )

  .catch(
    (e) => {
      // see error handling section
      console.error("*** .catch - fetching/decoding error heic/heif: " + anImg.dataset.src);
      console.error(e);
      if (!anImg.src) { //there is not an original image...
        anImg.src = "images/HeifHeicError.png";
        anImg.title = "images/HeifHeicError.png";
      }
    }
  )

    /*
    .finally(() => {
      console.log(".finally - decoded or error: " + anImg.dataset.src);
    })
    */
    ;
}
/* */

function getCanvasFromImage(image) {
   const canvas = document.createElement('canvas');
   //canvas.width = image.width;
   //canvas.height = image.height;
   canvas.width = image.naturalWidth;
   canvas.height = image.naturalHeight;
   const ctx = canvas.getContext('2d');
   ctx.drawImage(image, 0, 0);
   return canvas;
}

window.onload=function() {
  var allImages = document.getElementsByTagName('img');

  //before replace the img onload
  /*  only to write after decoding start
  for(var i = 0; i < allImages.length ; i++) {
    // allImages[i].onload = function(e) { console.log("***+++ loaded: " + this.src); }
    
    allImages[i].onload = function(e) {
      //this.onload = null; // avoid to recall onload
      this.onload = function(anEv) { console.log("++++++ loaded after replacing..." + anEv);}
      
      console.log("------ drawing text..." + this);
      
      var myCanvas = getCanvasFromImage(this);
      var myCtx = myCanvas.getContext("2d");
      myPX =  (myCanvas.width / 30)>>0;
      //myCtx.font = "30px Arial";
      myCtx.font = myPX + "px Arial";
      myCtx.fillStyle = 'blue';
      myCtx.fillText("Decoded from heif/heic", (myCanvas.width / 40)>>0, (myCanvas.height / 16)>>0 );
      
      //// double change...
      //console.log("------ replacing img with canvas blob..." + this);
      //this.src = myCanvas.toDataURL();
      //var myImg = this;
      //myCanvas.toBlob(
      //  function(myBlob) {
      //    URL.revokeObjectURL(myImg.src); // at this point is the URL.createObjectURL after decoding
      //    myImg.src = URL.createObjectURL(myBlob); //this containt the new text drown
      //  }
      //);
      console.log("------ replacing img with canvas... replacing: " + this );
      //myCanvas.title = this.title;
      //myCanvas.onclick = this.onclick;
      this.parentNode.replaceChild(myCanvas, this);
      URL.revokeObjectURL(this.src);  // at this point is the URL.createObjectURL after decoding
      this.remove();
      
    }
  } // for(var i = 0; i < allImages.length ; i++) {
  // only to write after decoding end */
    
  for(var i = 0; i < allImages.length ; i++) {

    //allImages[i].onload = function(e) { console.log("*** loaded: " + this.src); }
    
    if (allImages[i].dataset.src) { // if img element contains data-src parameter
      if ( (allImages[i].dataset.src.substr(-5,5).toLowerCase() == ".heic") || (allImages[i].dataset.src.substr(-5,5).toLowerCase() == ".heif")) {
        //myReplace(allImages[i].id);
        myReplace(allImages[i]);
        //allImages[i].src = 'url_to_cat_image';
      }
      else {
        console.error("*** not heic/heif extension but used data-src... simply replacing src with data-src: " + allImages[i].dataset.src);
        allImages[i].src = allImages[i].dataset.src;
        allImages[i].title = allImages[i].dataset.src;
      }
    }
    else { // img element does not contain data-src parameter
      if (allImages[i].src) { // if img element contains src parameter check for heic/heif file too
        if ( (allImages[i].src.substr(-5,5).toLowerCase() == ".heic") || (allImages[i].src.substr(-5,5).toLowerCase() == ".heif")) { // if src ends with .heif or .heic
          allImages[i].dataset.src = allImages[i].src;
        }
        else { // look for the same name + '.heic'
          allImages[i].dataset.src = allImages[i].src + ".heic";
        }
        myReplace(allImages[i]);
      }
    }  
  } // for(var i = 0; i < allImages.length ; i++) {
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

