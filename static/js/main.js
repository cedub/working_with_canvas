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

var bg_layer = new Kinetic.Layer();

var bldg_group = new Kinetic.Group({
  x: 0,
  y: 0
});
var bld_cnt = 0;

bg_layer.add(bldg_group);

var add_new_bldg = function () {

  console.log(bldg_group.getWidth());

  var bldg = new Kinetic.Group({
    x: bld_cnt*170 + 500,
    width: 150,
    height: 250
  });

  var bldg_back = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: 150,
    height: 250,
    fill: 'black'
  });

  bldg.add(bldg_back);

  for (var i=0; i<3; i++) {
    bldg.add(new Kinetic.Rect({
      x: (Math.floor((Math.random()*3)) * (48)) + 5,
      y: i*80 + 5,
      width: 43,
      height: 75,
      fill: 'yellow'
    }));
  }

  bld_cnt++;

  var scale = (Math.floor((Math.random()*10)) + 1) * .1;
  bldg.setScale(scale);
  bldg.setY(300-parseInt(bldg.getHeight()*scale));

  bldg_group.add(bldg);
  bg_layer.batchDraw();

}

var line = new Kinetic.Line({
  points: [[0,0], [WIDTH,0]],
  stroke: 'black',
  strokeWidth: 5,
  x: 0,
  y: 300
});

bg_layer.add(line);

setInterval(add_new_bldg, 1500);


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

var idleAnimation = [],
jumpAnimation = [];

for (var i=0; i<11; i++) {
  idleAnimation.push({
      x: 265,
      y: 290*i + 6,
      width: 300,
      height: 291
  });
}
for (var i=10; i>=0; i--) {
  idleAnimation.push({
      x: 265,
      y: 290*i + 6,
      width: 300,
      height: 291
  });
}
for (var i=0; i<25; i++) {
  jumpAnimation.push({
    x: 0,
    y: 290*i + 3,
    width: 300,
    height: 290
  });
}

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
stage.add(bg_layer);
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
    // charBlob.setX(charBlob.getX()+2);
    bldg_group.setX(bldg_group.getX()-2);
  } else {
    // charBlob.setX(charBlob.getX()-2);
    bldg_group.setX(bldg_group.getX()+2);
  }
}, [layer, bg_layer]);


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

