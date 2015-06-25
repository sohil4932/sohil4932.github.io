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
     width  = 600,
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
      imgwidth = 150,
      imgheight = 150;
  img.src = 'intel.png';

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
    ctx.drawImage(img, 590 - imgwidth, 440 - imgheight, imgwidth, imgheight);
  }

  function reshoot() {
    if (state === 'reviewing') {
      sounds.rip.play();
    }
    if (state === 'reviewing' || state === 'uploaded') {
      canvas.width = width;
      canvas.height = finalheight;
      ctx.drawImage(img, 590 - imgwidth, 440 - imgheight, imgwidth, imgheight);
      setstate('playing');
    }
  }

  function upload() {
    var head = /^data:image\/(png|jpeg);base64,/,
        data = '';

    setstate('sending');
    data = canvas.toDataURL('image/jpeg', 0.9).replace(head, '');
    console.log(email);

    if (location.hostname.indexOf('localhost')!== -1) {
      $.ajax({
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
              'key': 'B6bSMmQ85PvY1CIAOws09Q' ,
              'message': {
                'from_email': 'sohil@motwanijadeja.org',
                'to': [
                    {
                      'email': email,
                      'name': '',
                      'type': 'to'
                    }
                  ],
                'autotext' : 'true',
                'subject' : 'Thank You : Here is your image',
                'html' : 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!',
                'images': [
                  {
                      "type": "image/jpeg",
                      "name": "ClickedImage",
                      "content": data
                  }
                ]
                }
              }
          });
      console.log("You are Here!!!");
      setstate('uploaded');
      reshoot();
    } 
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

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

  /* Event Handlers */

  video.addEventListener('play', function(ev){
    if (!streaming) {
      console.log(video.clientHeight);
      finalheight = video.clientHeight / (video.clientWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', finalheight);
      canvas.width = width;
      canvas.height = finalheight;
      ctx.drawImage(img, 590 - imgwidth, 440 - imgheight, imgwidth, imgheight);
      streaming = true;
      vidcontainer.classname = 'playing';
    }
  }, false);

  document.addEventListener('keydown', function(ev) {
    if (ev.which === 32 || ev.which === 37 || ev.which === 39) {
      ev.preventDefault();
    }
    if (ev.which === 32) {
      // if (state === 'intro') {
      //   setstate('playing');
      //   init();
      // } else {
        setstate('reviewing');
        takepicture();
      // }
    }
  },false);

  resetbutton.addEventListener('click', function(ev){
    if (state === 'reviewing') {
      reshoot();
    }
    ev.preventDefault();
  }, false);

  clickbutton.addEventListener('click', function(ev){
    if (state === 'playing') {
      email = document.getElementById("emailvalue").value;
      if(validateEmail(email))
      {
        setstate('reviewing');
        takepicture();
      }
      else
      {
        //alert('Enter Valid Email Address');
      }
    }
    ev.preventDefault();
  }, false);

  uploadbutton.addEventListener('click', function(ev){
    if (state === 'reviewing') {
      upload();
    }
    ev.preventDefault();
  }, false);

})();