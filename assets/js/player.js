/**
 * Created by Joel on 17/08/2016.
 */



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

                console.log("insideMove:", board[i]);
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
                console.log("human_m_coords:", m.x, m.y,"boardlength", board.getBlank().length)
                copy.setVal(m.x, m.y, false, humanplayer);
                console.log(copy);
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
            console.log("move, corner:", move);
            return move;
        }

        var center = board.board[4];
        if(center === 'BLANK') {

            console.log("move, center:", center);
            return center;

        }


        var sides = [board.board[1], board.board[3], board.board[5], board.board[7]];
        console.log("move, sides:", sides);
        return this.chooseRandomMoveFromList(board, sides);

    }



}

//var AI = function(identity) {
//    Player.call(this, identity)
//
//}
//
//AI.prototype = Object.create(Player.prototype, {
//
//    constructor: {value: AI},
//
//
//
//});

//var HumanPlayer = function(identity) {
//    Player.call(identity);
//}
//
//HumanPlayer.prototype = Object.create(Player.prototype);
//
//var AIPlayer = function(identity) {
//    Player.call(identity);
//}
//
//AIPlayer.prototype = Object.create(Player.prototype);
//




/*
var AI = function(identity) {

    this.identity = identity

    this.x;
    this.y;
    this.score;

    var move = function() {

        this.x;
        this.y;

    }


    var BestMove = function(board, player) {

        var rv = board.checkVictory();


        */
/* nop *//*

        if(rv == aiPlayer) {
            return 10;
        } else if (rv === humanPlayer) {
            return -10;
        } else if (rv === NO_VAL) {
            return 0;
        }

        for (var y = 0; y < board.getSize; y++) {

            for (var x = 0; x < board.getSize; x++) {
                if (board.getVal(x, y) === "BLANK") {
                    move();
                    move.x = this.x;
                    move.y = this.y;
                    board.setVal(x, y, player.identity)
                    */
/*define multiple player states....*//*

                    if(player === _aiPlayer) {
                        move.score = getBestMove(board, humanPlayer);
                    } else {
                        move.score = getBestMove(board, aiPlayer);
                    }


                    board.setVal(x, y, 'BLANK')


                }


            }

        }

    }

}*/




/*
*
* 20 AGOSTO
* */



//move: function(gm, elem) {
//
//    //gm.board.setVal(elem.x,elem.y, true, gm);
//    var bestie = gm.currentPlayer.getBestMove(gm)
//    gm.board.setVal(bestie.x, bestie.y, true, gm);
//
//},
//
//getBestMove: function(gm, depth) {
//
//
//
//    console.log("current player is:", gm.currentPlayer.type_of_player)
//    //var rv = gm.victoryCheck(gm.currentPlayer, gm.board)
//
//    //if (rv.type_of_player === 'human') {
//    //
//    //    console.log("Are we humans?");
//    //    return -10;
//    //
//    //} else if (rv.type_of_player === 'ai') {
//    //
//    //    console.log("Or are we AI?");
//    //    return 10;
//    //
//    //} else if (rv === 'DRAW') {
//    //
//    //    console.log("DRAW!");
//    //    return 0;
//    //
//    //}
//
//
//
//    var moves = [];
//
//    for (var y = 0; y < gm.board.size; y++) {
//        for (var x = 0; x < gm.board.size; x++) {
//
//            if(gm.board.getVal(x, y) === 'BLANK')
//            {
//                var move = {};
//                move.x = x;
//                move.y = y;
//                gm.board.setVal(x, y, true, gm);
//                console.log(gm.board);
//
//                move.score = gm.currentPlayer.getBestMove(gm);
//
//
//                moves.push(move);
//                gm.board.blankVal(x, y);
//
//
//            }
//
//        }
//    }
//
//    var bestMove = 0;
//    if(gm.currentPlayer.type_of_player === 'ai') {
//        var bestScore =  -1000000
//        for (var i = 0; i < moves.length; i++) {
//            if (moves[i].score > bestScore) {
//                bestMove = i;
//                bestScore = moves[i].score
//            }
//
//        }
//    } else {
//        bestScore = 1000000
//        for (var i = 0; i < moves.length; i++) {
//            if (moves[i].score < bestScore) {
//                bestMove = i;
//                bestScore = moves[i].score
//            }
//
//        }
//    }
//
//
//    console.log("bestmove?");
//    return moves[bestMove];
//
//},
//
//bestScore: function() {
//    for(var i = 0; i < 999; i++) {
//        //if()
//    }
//},
//
//testF: function () {
//
//    console.log(this.board);
//},
//
//play: function (gm) {
//
//    if(gm.board.blank_spaces.length > 0) {
//
//        this.move
//        (
//        gm,
//        gm.board.blank_spaces[Math.floor(Math.random()*gm.board.blank_spaces.length)]
//        )
//
//
//    }
//
//}
