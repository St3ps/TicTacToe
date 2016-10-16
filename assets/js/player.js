
var Player = function(identity, human) {

    this.identity = identity;
    this.human = human; //true or false
    //this.score = 0; //if i had the minmax algorithm...

};
Player.prototype = {

    constructor: Player,

    move: function(board, x, y) {

        var x = parseInt(x, 10);
        var y = parseInt(y, 10);
        //var self = this;

        for (var i = 0; i < 9; i++) {

            if(board.board[i].x === x && board.board[i].y === y && board.board[i].value === 'BLANK') {

                // console.log("insideMove:", board[i]);
                return board.board[i];
            }
        }


    },

    chooseRandomMoveFromList: function(board, movesList) {


        var possibleMoves = [];

        movesList.forEach(function(elem) {

            if(elem.value === 'BLANK') {
                possibleMoves.push(elem);
            }
        })


        if (possibleMoves.length != 0) {

            return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        } else {
            return null;
        }


    },

    getAiMove: function(board, gm, humanplayer) {

        var aiPlayer = this;

        //if the AI has a winning move, return that cell
        var copy;
        for (var i = 0; i < board.board.length; i++)
        {
            copy = board.dupeBoard();

            if(copy.board[i].value === 'BLANK')
            {
                var elem = copy.board[i];
                var m = aiPlayer.move(copy, elem.x, elem.y);
                copy.setVal(m.x, m.y, false, aiPlayer);
                if(gm.victoryCheck(copy, aiPlayer)) {

                    console.log("vc has come true:", elem);
                    return (elem);
                }
            }


        }

        //Check if the human player has any winning move, if he does, return his cell (so the ai can block it)
        for (i = 0; i < board.board.length; i++)
        {
            copy = board.dupeBoard();
            if(copy.board[i].value === 'BLANK')
            {
                var elem = copy.board[i];
                //console.log("human",i, elem.x, elem.y)
                var m = humanplayer.move(copy, elem.x, elem.y);
                // console.log("human_m_coords:", m.x, m.y,"boardlength", board.getBlank().length)
                copy.setVal(m.x, m.y, false, humanplayer);
                // console.log(copy);
                //console.log("human moving", humanplayer.move(copy, elem.x, elem.y));
                if(gm.victoryCheck(copy, humanplayer)) {
                    //return (elem.x, elem.y);
                    console.log("vc has come true for human", elem);
                    return (elem);
                }
            }


        }

        var corners = [board.board[0], board.board[2], board.board[6], board.board[8]];


        var move = this.chooseRandomMoveFromList(board, corners)
        if (move) {
            // console.log("move, corner:", move);
            return move;
        }

        var center = board.board[4];
        if(center === 'BLANK') {

            // console.log("move, center:", center);
            return center;

        }


        var sides = [board.board[1], board.board[3], board.board[5], board.board[7]];
        // console.log("move, sides:", sides);
        return this.chooseRandomMoveFromList(board, sides);

    }



}

