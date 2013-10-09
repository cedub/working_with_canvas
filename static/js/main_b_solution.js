(function ($){

    var HEIGHT = $(window).height(),
    WIDTH = $(window).width();

    var stage = new Kinetic.Stage({
      container: 'container',
      width: WIDTH,
      height: HEIGHT
    });
    var layer = new Kinetic.Layer();

    /*************************************
     ** Add a landscape background user **
     *************************************/

    var HORIZON_LINE = 300,
    BLDG_WIDTH = 150,
    BLDG_HEIGHT = 250,
    BLDG_SPACING = 20,
    BLDG_NUM_WINDOWS = 3,
    BLDG_WINDOW_WIDTH = 43,
    BLDG_WINDOW_HEIGHT = 75,
    BLDG_WINDOW_SPACING = 5;


    // Generate a new layer for the background
    var bg_layer = new Kinetic.Layer();

    // Create a line that spans the WIDTH of the page and add it to our background layer
    var line = new Kinetic.Line({
      points: [[0,0], [WIDTH,0]],
      stroke: 'black',
      strokeWidth: 5,
      x: 0,
      y: HORIZON_LINE
    });
    bg_layer.add(line);

    // Create a building group.  This is where all of the buildings will added (this allows us to animate just this group)
    // Add add the group to the layer
    var bldg_group = new Kinetic.Group({
      x: 0,
      y: 0
    });
    bg_layer.add(bldg_group);

    // Add 500 buildings to our game
    // For a true side-scroller, we'll want to add/remove these dynamically.
    // But for today's purposes, just slapping 500 on will do.
    for (var j=0; j<100; j++) {
      var bldgs = bldg_group.getChildren();

      var bldg = new Kinetic.Group({
        x: j*(BLDG_WIDTH+BLDG_SPACING),
        height: BLDG_HEIGHT
      });

      var bldg_back = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: BLDG_WIDTH,
        height: BLDG_HEIGHT,
        fill: 'black'
      });

      bldg.add(bldg_back);

      for (var i=0; i<BLDG_NUM_WINDOWS; i++) {
        bldg.add(new Kinetic.Rect({
          x: (Math.floor((Math.random()*BLDG_NUM_WINDOWS)) * (BLDG_WINDOW_WIDTH+BLDG_WINDOW_SPACING)) + BLDG_WINDOW_SPACING,
          y: i*(BLDG_WINDOW_HEIGHT+BLDG_WINDOW_SPACING) + BLDG_WINDOW_SPACING,
          width: BLDG_WINDOW_WIDTH,
          height: BLDG_WINDOW_HEIGHT,
          fill: 'yellow'
        }));
      }

      var scale = (Math.floor((Math.random()*3)) + 7) * .1;
      bldg.setScale(scale);
      bldg.setY(HORIZON_LINE-parseInt(bldg.getHeight()*scale));

      bldg_group.add(bldg);

    }


    /************************
     ** Add layer to stage **
     ************************/

    stage.add(bg_layer);
    stage.add(layer);

})(jQuery);
