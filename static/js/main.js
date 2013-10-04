var stage = new Kinetic.Stage({
  container: 'container',
  width: $(window).width(),
  height: $(window).height()
});
var layer = new Kinetic.Layer();


/*********************
 ** Add a Landscape **
 *********************/

  var redLine = new Kinetic.Line({
    points: [[0,0], [$(window).width(),0]],
    stroke: 'black',
    strokeWidth: 5,
    x: 0,
    y: 300
  });

  layer.add(redLine);


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
  x: 250,
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


/************************
 ** Add layer to stage **
 ************************/

// add the layer to the stage
stage.add(layer);


/********************
 ** Move Character **
 ********************/

var move_anim = new Kinetic.Animation(function (frame) {
  blob.setX(blob.getX()+5);
}, layer);

move_anim.start();
