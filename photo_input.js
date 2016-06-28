window.PhotoBooth = window.PhotoBooth || {};

PhotoBooth.PhotoInput = Backbone.View.extend({
  events: {
    change: 'upload',
  },

  upload: function(e) {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();

    reader.onloadend = function(){
      this.updateCanvas(reader.result);
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.updateCanvas('');
    }
  },

  updateCanvas: function(result) {
    const image = new Image();
    image.src = result;
    this.model.set('image', image);
  },
});
