(function ($){

    var HEIGHT = $(window).height(),
    WIDTH = $(window).width();

    var stage = new Kinetic.Stage({
      container: 'container',
      width: WIDTH,
      height: HEIGHT
    });
    var layer = new Kinetic.Layer();

    /************************
     ** Add layer to stage **
     ************************/

    stage.add(layer);

})(jQuery);
