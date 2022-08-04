// ---------- heic/heif decoder start ----------
// https://github.com/alexcorvi/heic2any/blob/master/docs/getting-started.md
// https://imagekit.io/blog/lazy-loading-images-complete-guide/
function myReplace(anImg) {
  //console.log("start fetching and decoding: " + anImg.dataset.src);
  fetch(anImg.dataset.src)
    .then( (res) => res.blob() )
    
    .then( (blob) => heic2any({
                      blob,
	                    toType: "image/jpeg",
	                    quality: 0.92,
                    }) )
                    
    .then((conversionResult) => {
      // conversionResult is a BLOB
      // of the PNG formatted image
	    anImg.src = URL.createObjectURL(conversionResult);
	    anImg.title = "Decoded from heic/heif\nClick to open 1/1 resolution of:\n" + anImg.dataset.src;
	    anImg.onclick = function(e){ window.open(anImg.src, '_blank'); }
	    
	    console.log(".then - fetched and decoded: " + anImg.dataset.src);
    })
    
    .catch((e) => {
      // see error handling section
      console.log(".catch - decoding error decoding heic/heif: " + anImg.dataset.src + "\n" + e);
      anImg.src = "images/HeifHeicError.png";
      anImg.title = "images/HeifHeicError.png";
    })
    
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
  for(var i = 0; i < allImages.length ; i++) {

    //allImages[i].onload = function(e) { console.log("*** loaded: " + this.src); }
    
/* only to write after decoding start
    allImages[i].onload = function(e) {
      //this.onload = null; // avoid to recall onload
      this.onload = function(anEv) { console.log("++++++ loaded after replacing..." + anEv);}
      
      console.log("------ drawing text..." + this);
      
      var myCanvas = getCanvasFromImage(this);
      var myCtx = myCanvas.getContext("2d");
      myPX =  ~~(myCanvas.width / 30);
      //myCtx.font = "30px Arial";
      myCtx.font = myPX + "px Arial";
      myCtx.fillStyle = 'blue';
      myCtx.fillText("Decoded from heif/heic", ~~(myCanvas.width / 40), ~~(myCanvas.height / 16));
      
      // double change...
      console.log("------ replacing img with canvas blob..." + this);
      //this.src = myCanvas.toDataURL();
      var myImg = this;
      myCanvas.toBlob(
        function(myBlob) {
          URL.revokeObjectURL(myImg.src); // at this point is the URL.createObjectURL after decoding
          myImg.src = URL.createObjectURL(myBlob); //this containt the new text drown
        }
      );
      
    }
// only to write after decoding end */
    
    if (allImages[i].dataset.src) { // if img element contains data-src parameter
      if ( (allImages[i].dataset.src.substr(-5,5).toLowerCase() == ".heic") || (allImages[i].dataset.src.substr(-5,5).toLowerCase() == ".heif")) {
        //myReplace(allImages[i].id);
        myReplace(allImages[i]);
        //allImages[i].src = 'url_to_cat_image';
      }
      else {
        //console.log("not heic/heif extension but used data-src... simply replacing src with data-src: " + allImages[i].dataset.src);
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

