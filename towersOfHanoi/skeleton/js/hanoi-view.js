function View (game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupTowers();
  this.clickTower();
  this.setupHoverEvents();
}

View.prototype.setupTowers = function () {
  for (let i = 0; i < 3; i++) {
    const $ul = $("<ul></ul>");
    $ul.attr("pile", i);
    
    for (let j = 0; j < 3; j++) {
      if (i !== 0) break;
      const $li = $("<li></li>");
      if (i === 0) $li.addClass(`disk-${j+1}`);
      $ul.append($li);
    }
    
    this.$el.append($ul);
  }
};

View.prototype.render = function() {
  $('li').remove();
  for (let i = 0; i < this.game.towers.length; i++) {
    for (let j = 0; j < this.game.towers[i].length; j++) {
      const $ul = $(`ul[pile=${i}]`);
      const $li = $('<li></li>').addClass(`disk-${this.game.towers[i][j]}`);
      $ul.prepend($li);
    }
  }
  
  if (this.start === -1) {
    $('ul').removeClass('clicked');
  }
  
  if (this.game.isWon()) {
    alert("CONGRATS WINNER");
    $('li').addClass('green');
    $('*').off();
  }
}; 

View.prototype.clickTower = function() {
  $("ul").on("click", (e) => {
    const $pile = $(e.currentTarget);
    if (this.start > -1) {
      this.moveTower(this.start, $pile.attr("pile"));
      this.start = -1;
    } else {
      this.start = $pile.attr("pile");
    }
  });
  // this.render();
};

View.prototype.moveTower = function (startPile, endPile) {
  if (startPile === endPile) alert("Invalid move!");
  
  let $startPile;
  let $endPile;
  $('ul').each((idx, el) => {
    const $el = $(el);
    if ($el.attr("pile") === startPile) {
      $startPile = $el;
    }
    if ($el.attr("pile") === endPile) {
      $endPile = $el;
    }
  });
  this.game.move($startPile.attr("pile"), $endPile.attr("pile"));
};

View.prototype.setupHoverEvents = function() {
  $('ul').on('mouseenter', e => {
    $(e.currentTarget).addClass('from-tower');
  });
  $('ul').on('mouseleave', e => {
    $(e.currentTarget).removeClass('from-tower');
  });
  $('ul').on('click', e => {
    $(e.currentTarget).toggleClass('clicked');
    this.render();
  });
};

module.exports = View;