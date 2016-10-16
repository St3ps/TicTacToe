
var clicked = false;
// var count = 0;


window.game_manager = new GameManager();
game_manager.selectMenu();


var ttt = function gameloop() {

    if(game_manager.board.getBlank().length === 0 && !game_manager.gameIsOver ) {

        
            // console.log("ITS A DRAW!");
            game_manager.endGame("Draw!");
        

    }



        $('.cell').click(function () {

            if(!game_manager.gameIsOver) {

            // console.log("TURN:", count);

            if (game_manager.currentPlayer.human) {

                if (!clicked) {

                    console.log('clicked');
                    var x = $(this).attr('x');
                    var y = $(this).attr('y');

                    game_manager.board.setVal(x, y, true, game_manager.currentPlayer);


                    if (game_manager.victoryCheck(game_manager.board, game_manager.currentPlayer)) {
                        // console.log("GAME OVER, HUMAN WINS")
                        game_manager.endGame("You won!");
                    }

                    game_manager.changePlayer();
                    clicked = true;

                }

            }


        }});



    if(!game_manager.gameIsOver) {
        
        if(!game_manager.currentPlayer.human) {

            var m = game_manager.currentPlayer.getAiMove(game_manager.board, game_manager, game_manager.humanPlayer);
            //var p = game_manager.currentPlayer

            game_manager.board.setVal(m.x, m.y, true, window.game_manager.aiPlayer);

            if(game_manager.victoryCheck(game_manager.board, game_manager.aiPlayer)) {
                // console.log("GAME OVER, AI WINS")
                game_manager.endGame("AI Wins!");
            } else {
                
                console.log('victoryCheck in main.js:', game_manager.victoryCheck(game_manager.board, game_manager.aiPlayer));
                
            }

            game_manager.changePlayer();




        }

        clicked = false;

    }

    if(game_manager.gameIsPlaying)
        requestAnimationFrame(gameloop);

}




