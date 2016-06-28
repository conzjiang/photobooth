window.PhotoBooth = window.PhotoBooth || {};

const LINE_STYLE = 'round';
const LINE_WIDTH = 10;

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

PhotoBooth.Canvas = Backbone.View.extend({
  initialize: function(options) {
    this.el.width = CANVAS_WIDTH;
    this.el.height = CANVAS_HEIGHT;

    this.context = this.el.getContext('2d');
    this.color = options.color;
    this.isPainting = false;
  },

  events: {
    mousedown: 'startPainting',
    mousemove: 'paint',
    mouseleave: 'stopPainting',
    mouseup: 'stopPainting',
  },

  startPainting: function(e) {
    this.isPainting = true;

    const x = e.pageX - e.currentTarget.offsetLeft;
    const y = e.pageY - e.currentTarget.offsetTop;
    this.addCoord(x, y, false);
  },

  addCoord: function(x, y, isDragging) {
    this.collection.add({
      x: x,
      y: y,
      isDragging: isDragging,
      color: this.model.get('color'),
    });
  },

  paint: function(e) {
    if (!this.isPainting) {
      return;
    }

    const x = e.pageX - e.currentTarget.offsetLeft;
    const y = e.pageY - e.currentTarget.offsetTop;
    this.addCoord(x, y, true);
    this.draw();
  },

  draw: function() {
    this.clearSurface();

    this.context.drawImage(this.model.get('image'), 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.context.lineJoin = LINE_STYLE;
    this.context.lineWidth = LINE_WIDTH;

    this.collection.each(this.drawCoord.bind(this));
  },

  drawCoord: function(coord, i) {
    this.context.beginPath();

    if (coord.get('isDragging') && i !== 0) {
      const lastCoord = this.collection.at(i - 1);
      this.context.moveTo(lastCoord.get('x'), lastCoord.get('y'));
    } else {
      this.context.moveTo(coord.get('x') - 1, coord.get('y'));
    }

    this.context.lineTo(coord.get('x'), coord.get('y'));
    this.context.closePath();
    this.context.strokeStyle = coord.get('color');
    this.context.stroke();
  },

  clearSurface: function() {
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  },

  stopPainting: function() {
    this.isPainting = false;
  }
});
