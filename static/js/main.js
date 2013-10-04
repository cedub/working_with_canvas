var HEIGHT = $(window).height(),
WIDTH = $(window).width();

var stage = new Kinetic.Stage({
  container: 'container',
  width: WIDTH,
  height: HEIGHT
});
var layer = new Kinetic.Layer();


/*********************
 ** Add a Landscape **
 *********************/

var bgImg = new Image();
bgImg.onLoad = function () {
  var bridge = new Kinetic.Image({
    x: 0,
    y: 100,
    image: bgImg,
    width: 3560,
    height: 756
  });
  layer.add(bridge);
  console.log("loaded");
};
bgImg.src = 'static/img/bridge-back-1.png';

var line = new Kinetic.Line({
  points: [[0,0], [WIDTH,0]],
  stroke: 'black',
  strokeWidth: 5,
  x: 0,
  y: 300
});

layer.add(line);


/**********************
 ** Kidney Animation **
 **********************/

var kidneyAnimation = [];
for (var i=0; i<44; i++){
  kidneyAnimation.push({
    x: 0,
    y: i*139,
    width: 135,
    height: 139
  });
}
var animations = {
  idle: kidneyAnimation
};

var imageObj = new Image();
imageObj.src = 'static/img/kidneyDanceSmall.png';

var blob = new Kinetic.Sprite({
  x: -300,
  y: 200,
  image: imageObj,
  animation: 'idle',
  animations: animations,
  frameRate: 20,
  index: 0,
  draggable: true
});

// add the shape to the layer
layer.add(blob);

// start sprite animation
blob.start();


/**************************
 ** Character Animation **
 *************************/

var idleAnimation = [{
    x: 0,
    y: 3,
    width: 300,
    height: 291
}],
jumpAnimation = [{
    x: 0,
    y: 3,
    width: 300,
    height: 291
  },{
    x: 0,
    y: 293,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 583,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 873,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 1163,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 1453,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 1743,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 2033,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 2323,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 2613,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 2903,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 3193,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 3483,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 3773,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 4063,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 4353,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 4643,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 4933,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 5223,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 5513,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 5803,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 6673,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 6963,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 7253,
    width: 300,
    height: 290
  },{
    x: 0,
    y: 7543,
    width: 300,
    height: 290
  }];
var charAnimations = {
  idle: idleAnimation,
  jump: jumpAnimation
};

var charObj = new Image();
charObj.src = 'static/img/jump.png';

var charBlob = new Kinetic.Sprite({
  x: 290,
  y: 200,
  image: charObj,
  animation: 'idle',
  animations: charAnimations,
  frameRate: 30,
  index: 0,
  draggable: true
});

// add the shape to the layer
layer.add(charBlob);

// start sprite animation
charBlob.start();


/************************
 ** Add layer to stage **
 ************************/

// add the layer to the stage
stage.add(layer);


/********************
 ** Move Character **
 ********************/

var dir = 'right';
var move_anim = new Kinetic.Animation(function (frame) {
  if (blob.getX() >=  WIDTH/2) {
    this.stop();
  }
  if (dir == 'right') {
    blob.setX(blob.getX()+2);
  } else {
    blob.setX(blob.getX()-2);
  }
}, layer);

move_anim.start();


/******************
 ** Add Controls **
 ******************/

var char_dir = 'right';
var move_char_anim = new Kinetic.Animation(function (frame) {
  if (charBlob.getX() > WIDTH-40 || charBlob.getX() <= 10) {
    this.stop();
  }
  if (char_dir == 'right') {
    charBlob.setX(charBlob.getX()+2);
  } else {
    charBlob.setX(charBlob.getX()-2);
  }
}, layer);


$(document).on('keydown', function (e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 40:
      alert('down');
      break;
    case 38:
      charBlob.setAnimation('jump');
      charBlob.afterFrame(24, function () {
        charBlob.setAnimation('idle');
      })
      console.log('up');
      break;
    case 37:
      char_dir = 'left';
      move_char_anim.start();
      console.log('left');
      break;
    case 39:
      char_dir = 'right';
      move_char_anim.start();
      console.log('right');
      break;
  }
});


