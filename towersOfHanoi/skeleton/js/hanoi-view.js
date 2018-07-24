function View (game, $el) {
  this.game = game;
  this.$el = $el;
}

View.prototype.setupTowers = function () {
  for (let i = 0; i < 3; i++) {
    const $ul = $("<ul></ul>");
    
    for (let j = 0; j < 3; j++) {
      const $li = $("<li></li>");
      $ul.append($li);
    }
    
    $(".hanoi-figure").append($ul);
  }
};


module.exports = View;