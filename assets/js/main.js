
var clicked = false;
var count = 0;
var ttt = function gameloop() {

    if(game_manager.board.getBlank().length === 0) {
        console.log("ITS A DRAW!")
        game_manager.endGame();
    }

    if(!game_manager.gameIsOver) {

        $('.cell').click(function () {

            console.log("TURN:", count);

            if (game_manager.currentPlayer.human) {

                if (!clicked) {

                    console.log('clicked');
                    var x = $(this).attr('x');
                    var y = $(this).attr('y');

                    game_manager.board.setVal(x, y, true, game_manager.currentPlayer);


                    if (game_manager.victoryCheck(game_manager.board, game_manager.currentPlayer)) {
                        console.log("GAME OVER, HUMAN WINS")
                        game_manager.endGame();
                    }

                    game_manager.changePlayer();
                    clicked = true;

                }

            }


        })

    }

    if(!game_manager.gameIsOver) {

        if(!game_manager.currentPlayer.human) {

            var m = game_manager.currentPlayer.getAiMove(game_manager.board, game_manager, game_manager.humanPlayer);

            game_manager.board.setVal(m.x, m.y, true, game_manager.currentPlayer);

            if(game_manager.victoryCheck(game_manager.board, game_manager.currentPlayer)) {
                console.log("GAME OVER, AI WINS")
                game_manager.endGame();
            }

            game_manager.changePlayer();
            count++;

        }

    clicked = false;

    }

    if(game_manager.gameIsPlaying)
    requestAnimationFrame(gameloop);

}




