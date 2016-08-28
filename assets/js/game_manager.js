

var cell = function(x,y) {

 return $(".cell[x="+x+"][y="+y+"]");

}


var GameManager = function() {


    this.board = new Board();

    this.currentPlayer = "";
    this.humanPlayer = "";
    this.aiPlayer = "";
    //this.humanPlayer = new Player(playerIdentity, true);
    //
    //if (this.humanPlayer.identity === 'X') {
    //    this.currentPlayer = this.humanPlayer;
    //    this.aiPlayer = new Player('O', false);
    //}
    //else {
    //    this.aiPlayer = new Player('X', false);
    //    this.currentPlayer = this.aiPlayer;
    //}

    this.gameIsPlaying = false;
    this.gameIsOver = false;
    this.winner = null;
    this.draw = false;

};

GameManager.prototype = {

    constructor: GameManager,

    start: function () {

       this.board.drawBoard();

            },

    setPlayers: function (playerIdentity) {

        this.humanPlayer = new Player(playerIdentity, true);


        if (this.humanPlayer.identity === 'X') {
            this.currentPlayer = this.humanPlayer;
            this.aiPlayer = new Player('O', false);
        }

        if (this.humanPlayer.identity === 'O') {

            this.aiPlayer = new Player('X', false);
            this.currentPlayer = this.aiPlayer;
        }

    },

    endGame: function(outcome) {

        var self = this;

        this.gameIsOver = true;
        this.gameIsPlaying = false;

        $('.select-menu').html('<div class="col-md-12"><h1>' + outcome + '</h1></div><div class="col-md-12"><a href="#" role="button" id="Play"><h1>Play Again?</h1></a></div>')
        //$('.select-menu').css("visibility", "visible");
        $('.select-menu').slideDown(1000);

        $('#Play').click( function (){

            console.log("hiplay");
            self.board.clear();
            self.selectMenu();

        })



    },

    victoryCheck: function(board, player) {


        var cells = board.board;

        var victory_conditions =
            //rows
            [ [cells[0], cells[1], cells[2]],
            [cells[3], cells[4], cells[5]],
            [cells[6], cells[7], cells[8]],
            //cols
            [cells[0], cells[3], cells[6]],
            [cells[1], cells[4], cells[7]],
            [cells[2], cells[5], cells[8]],
            //diagonal
            [cells[0], cells[4], cells[8]],
            [cells[6], cells[4], cells[2]],
            ];

        var v;
        for (var i = 0; i < victory_conditions.length ; i++) {

            v = victory_conditions[i].every(function(elem) {
                return elem.value === player.identity
            })

            if(v) {
                break;
            }

        }
            console.log("Value of V:", v);
            return v;
        },

    changePlayer: function () {

        if(this.currentPlayer === this.humanPlayer)
        this.currentPlayer = this.aiPlayer;
        else
        this.currentPlayer = this.humanPlayer;
        //console.log("changeplayer:", this.currentPlayer);



    },

    selectMenu: function() {

        if(this.gameIsOver) {
            this.gameIsOver = false;
        }

        var self = this;
        $('.select-menu').html('<a href="#" role="button" id="X"><div class="col-md-6 btn-menu"><h1>Choose X</h1></div></a><a href="#" role="button" id="O"><div class="col-md-6 btn-menu"><h1>Choose O</h1></div></a>');


        $('#X').click(function () {

            self.setPlayers($(this).attr('id'));
            self.start();
            self.gameIsPlaying = true;
            self.runLoop(ttt);
            $('.select-menu').slideUp(1000);
            //$('.select-menu').css("visibility", "hidden")

            console.log($(this).attr('id'));

        });

        $('#O').click(function () {

            self.setPlayers($(this).attr('id'));
            self.start();
            self.gameIsPlaying = true;
            self.runLoop(ttt);
            $('.select-menu').slideUp(1000);
            //$('.select-menu').css("visibility", "hidden")

            console.log($(this).attr('id'));

        });

    },

    /*not being used*/
    playAgain: function() {

        var select_menu = $('.select-menu');
        var self = this;

        select_menu.hide();

        select_menu.html('<a href="#" role="button" id="Play"><div class="col-md-12"><h1>Play Again?</h1></div></a>')

        $('#Play').click(function () {

            self.selectMenu();

        });

    },

    runLoop: function(loop) {
        //this will take the loop var and just run it
        loop();

    }

}


var Board = function() {

    this.cell = function(x,y) {
        return $(".cell[x="+x+"][y="+y+"]");
    }

    this.cells = $('.cell').toArray();

    this.size = 3;
    this.number_of_spaces = this.size * this.size;
    this.occupied_spaces = [];
    this.number_of_occupied = 0;
    this.board = [];

    for (var y = 0; y < this.size; y++) {

        for (var x = 0; x < this.size; x++) {

            this.board.push ({

                x: x,
                y: y,
                value: 'BLANK'

            })
        }
    }

    this.blank_spaces = this.board.reduce(function(prev, curr) {

        if (curr.value === 'BLANK')
        prev.push(curr);

        return prev;


    }, [])



    this.available_moves = this.blank_spaces;
}

Board.prototype = {

    constructor: Board,

    clear: function() {

        Board.call(this);
        this.drawBoard();

    },

    drawBoard: function() {


        var html = [];
        //html.push('<div class="col-md-12">')

        for(var y = 0; y < 3; y++) {

            //html.push('<div class="row center">')

            for(var x = 0; x < 3; x++) {
                html.push('<div class="col-md-4 col-xs-4 cell" x='+x+' y='+y+' value="BLANK"></div>');
            }

            //html.push('</div>');
        }

        $('.second-container').html(html);

        //console.log("thisworks");
        //
        //var container = $('<div />');
        //
        //for (var i = 0; i < this.number_of_spaces; i++)
        //{
        //    $('<div>', {
        //        class: 'col-md-4 cell',
        //        x: this.board[i].x,
        //        y: this.board[i].y,
        //        value: this.board[i].value
        //
        //    }).appendTo(container);
        //}
        //
        //$('.row.tictactoe').html(container);





    },

    isBoardFull: function () {

        if(this.blank_spaces === 0)
        return true;
        else
        return false;
    },

    blankSpaces: function () {

        //console.log("BLANKSPACES:", this.board);
        //var self = this;
        this.blank_spaces = this.board.reduce(function(prev, curr) {

            if (curr.value === 'BLANK')
                prev.push(curr);

            return prev;


        }, [])

        this.available_moves = this.blank_spaces;
    },

    occupiedSpaces: function () {

        this.occupied_spaces = this.board.reduce(function(prev, curr) {

            if (curr.value !== 'BLANK')
                prev.push(curr);

            return prev;


        }, [])

        this.number_of_occupied = this.occupied_spaces.length;



    },

    setVal: function(x, y, flag, player) {
        /* parsing the arguments to make sure they get passd as numbers -- the htmlcell vars wont work properly if they're sent as characters
        * the flag sets wether values go on the grid or not*/
        var x = parseInt(x, 10);
        var y = parseInt(y, 10);

        var val = player.identity;
        var self = this;
        //var blankSpaces = this.blankSpaces;
        var htmlcell =  $(".cell[x="+x+"][y="+y+"]");

       this.board.forEach(function(elem) {

           if(elem.x === x && elem.y === y)
           {
               console.log(elem.x, elem.y)


               if (elem.value === 'BLANK') {

                   elem.value = val;
                   self.blankSpaces();
                   self.occupiedSpaces();

                   if(flag) {

                       htmlcell.attr('value', val);
                       htmlcell.text(val);
                   }
               } else {
                   console.log("You can't place that there");
               }
           }
           //elem.value = val;

       });

    },

    getVal: function (x, y) {

        var x = parseInt(x, 10);
        var y = parseInt(y, 10);

        this.board.forEach(function(elem) {

            if(elem.x === x && elem.y === y) {
                return elem.value
            }

        });

        return null;



    },

    getBlank: function() {

        blank_arr = this.board.reduce(function(prev, curr) {

            if (curr.value === 'BLANK')
                prev.push(curr);

            return prev;


        }, [])

        return blank_arr;

    },

    blankVal: function(x, y) {

        var x = parseInt(x, 10);
        var y = parseInt(y, 10);

        var cell;

        this.board.forEach(function(elem) {

            if(elem.x === x && elem.y === y)
                cell = elem;
            //elem.value = val;

        });

        if(cell) {
            cell.value = 'BLANK'
            $(".cell[x="+x+"][y="+y+"]").attr('value', 'BLANK');
            $(".cell[x="+x+"][y="+y+"]").text('');
            this.blankSpaces();
        }


    },



    reset: function() {

        this.drawBoard();

    },

    dupeBoard: function() {

        return $.extend(true, {}, this)

    }




}




//game_manager.start();
//
