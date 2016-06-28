window.PhotoBooth = window.PhotoBooth || {};

PhotoBooth.COLORS = {
  rausch: '#ff5a5f',
  babu: '#00a699',
  kazan: '#007a87',
  hackberry: '#7b0051',
  beach: '#ffb400',
  lima: '#3fb34f',
};

PhotoBooth.GUI = Backbone.View.extend({
  events: {
    'click li': 'chooseColor',
  },

  chooseColor: function(e) {
    const color = $(e.currentTarget).data('color');
    this.model.set('color', PhotoBooth.COLORS[color]);
  },

  render: function() {
    this.$el.empty();

    for (var color in PhotoBooth.COLORS) {
      this.$el.append('<li style="background:' + PhotoBooth.COLORS[color] + ';" data-color="' + color + '"></li>');
    }

    return this;
  },
});
