class View {
  constructor(game, $el) {
    this.game = game;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    const ul = $('ul');
    
    ul.on("click", "li", (e) => {
      const square = $(e.currentTarget);
      square.addClass("white");
      this.makeMove(square);
    });
    
    ul.off("click", "hover");
  }

  makeMove($square) {
    try {
      $square.text(this.game.currentPlayer);
      this.game.playMove($square.data("pos"));
      if (this.game.board.isOver()) {
        const $figure = $('figure');
        $figure.append(`<h2>You win, ${this.game.winner()}!</h2>`);
        $("*").off();
        
        const $squares = $("li");
        $squares.each((idx, el) => {
          const $target = $(el);
          console.log($target.text());
          if ($target.text() === this.game.winner()) {
            $target.addClass("winner");
          } else {
            $target.addClass("loser");
          }
        });
        
      } else {
        
      }
    } catch (err) {
      alert("Invalid move! Try again.");
    }
  }

  setupBoard() {
    const $ul = $("<ul></ul>");
    const $figure = $('figure.ttt');
    
    for(let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const $li = $("<li></li>");
        $li.data("pos", [i, j]);
        $ul.append($li);
      }
    }

    $figure.append($ul);
    
    $ul.on("mouseenter", "li", e => {
      $(e.currentTarget).addClass("yellow");
    });
    $ul.on("mouseleave", "li", e => {
      $(e.currentTarget).removeClass("yellow");
    });
  }
}

module.exports = View;
