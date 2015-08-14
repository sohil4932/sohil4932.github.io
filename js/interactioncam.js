(function() {

  var video        = document.querySelector('#video'),
      cover        = document.querySelector('#cover'),
      canvas       = document.querySelector('#canvas'),
      vidcontainer = document.querySelector('#videocontainer'),
      resetbutton  = document.querySelector('#resetbutton'),
      uploadbutton = document.querySelector('#uploadbutton'),
      clickbutton  = document.querySelector('#clickbutton');
      
 var ctx    = canvas.getContext('2d'),
     streaming    = false,
     width  = 640,
     height = 450,
     state  = 'intro';

 var audio = document.querySelectorAll('audio'),
     sounds = {
        shutter: audio[0],
        rip:     audio[1],
        takeoff: audio[2]
      };

  /* BRANDING */
  var img = new Image(),
      imgwidth = 640,
      imgheight = 450;
  img.src = 'zando_new.png';

  var email = new Text();

  setstate(state);

  setstate('playing');
  init();

  function init() {
    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL ? vendorURL.createObjectURL(stream) : stream;
        }
        video.play();
        video.style.width = width + 'px';
        video.style.height = height + 'px';
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );
  }

  function takepicture() {
    sounds.shutter.play();
    ctx.save();
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, width, finalheight);
    ctx.restore();
    ctx.scale(1, 1);
    ctx.globalAlpha = 0.6;
    ctx.drawImage(img, 0, 0, width, finalheight);
    ctx.globalAlpha = 1;
  }

  function reshoot() {
    if (state === 'reviewing') {
      sounds.rip.play();
    }
    if (state === 'reviewing' || state === 'uploaded') {
      canvas.width = width;
      canvas.height = finalheight;

      ctx.globalAlpha = 0.6;
      ctx.drawImage(img, 0, 0, width, finalheight);
      ctx.globalAlpha = 1;
      setstate('playing');
    }
  }

    function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
    setstate('uploaded');
    reshoot();
    }

  
 function setstate(newstate) {
    state = newstate;
    document.body.className = newstate;
  }

  function store(name) {
    if (localStorage.interactionphotos === undefined) {
      localStorage.interactionphotos = '';
    }
    localStorage.interactionphotos += ' '+ name;
  }

  /* Event Handlers */

  video.addEventListener('play', function(ev){
    if (!streaming) {
      
      finalheight = video.clientHeight / (video.clientWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', finalheight);

      canvas.width = width;
      canvas.height = finalheight;
      ctx.globalAlpha = 0.6;
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = 1;
      vidcontainer.classname = 'playing';
    }
  }, false);

  document.addEventListener('keydown', function(ev) {
    if (ev.which === 32 || ev.which === 37 || ev.which === 39) {
      ev.preventDefault();
    }
    if (ev.which === 32) {
        setstate('reviewing');
        takepicture();
    }
  },false);

  clickbutton.addEventListener('click', function(ev){
    if (state === 'playing') {
        setstate('reviewing');
        takepicture();
    }
    ev.preventDefault();
  }, false);

  document.getElementById('uploadbutton').addEventListener('click', function() {

    if (state === 'reviewing') {
    downloadCanvas(this, 'canvas', 'selfie.png');
    }
    ev.preventDefault();
  }, false);

    document.getElementById('resetbutton').addEventListener('click', function() {
      if (state === 'reviewing') {
      reshoot();
    }
    ev.preventDefault();
    }, false);

})();