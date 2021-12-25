
//for the gameboard
//includes the moves that the players made and the display
const Gameboard = () => {
    //initializing the board and the round
    let round = 0;
    let allSpaces = document.querySelectorAll('#container button');
    const gameStatusText = document.querySelector('#game-status')

    const gameboardArray = new Array(9).fill('');

    //create a new game
    const newGame = () => {
        display();
        addPlayerFunctionality();
        updateGameStatus();
    }

    //for displaying the board and the status of the game
    const display = () => {
        for(let i = 0; i < allSpaces.length; i++)
        {
            if(gameboardArray[i] != '')
            {
                allSpaces[i].innerText = gameboardArray[i];
            }
        }
    }

    const addMoveToBoard = (position, mark) => {
        gameboardArray[position] = mark;
        round++;
    }


    const addPlayerFunctionality = () => {
        for(let i = 0; i < allSpaces.length; i++)
        {
            allSpaces[i].addEventListener('click', () => {
                    if (round % 2 == 0)
                        player1.makeMove(i);
                    else
                        player2.makeMove(i);
            })
        }
    }

    //check if there's a winner
    const checkWinner = () => {
        //if the round is greater than 4, possible to win
        if(round > 4) 
        {
            //all winning possibilities
            const poss1 = [0,1,2];
            const poss2 = [3,4,5];
            const poss3 = [6,7,8];
            const poss4 = [0,3,6];
            const poss5 = [1,4,7];
            const poss6 = [2,5,8];
            const poss7 = [0,4,8];
            const poss8 = [2,4,6];

            //check if you win
            let checker = (currentBoard, winningCombo) => {
                if(currentBoard[winningCombo[0]] != '' && currentBoard[winningCombo[0]] == currentBoard[winningCombo[1]] && 
                    currentBoard[winningCombo[1]] == currentBoard[winningCombo[2]])
                        return true;

                return false;
            }
    
            if(checker(gameboardArray, poss1) ||
                checker(gameboardArray, poss2) || 
                checker(gameboardArray, poss3) ||
                checker(gameboardArray, poss4) ||
                checker(gameboardArray, poss5) || 
                checker(gameboardArray, poss6) ||
                checker(gameboardArray, poss7) ||
                checker(gameboardArray, poss8))
            {
                return true;
            }           
        }
        return false;
    }


    const removePlayerFunctionality = () => {
        for(let i = 0; i < allSpaces.length; i++)
        {
            //basically removes all event listeners for the buttons
            allSpaces[i].replaceWith(allSpaces[i].cloneNode(true));
        }        
    }

    const updateGameStatus = () => {
        if(checkWinner())
        {
            if(round % 2 == 0 ? gameStatusText.innerText = `${player2.name} WINS` : gameStatusText.innerText = `${player1.name} WINS`);
        }
        else
        {
            if(round % 2 == 0 ? gameStatusText.innerText = `${player1.name}'s Turn` : gameStatusText.innerText = `${player2.name}'s Turn`);
        }
    }


    return {newGame, gameboardArray, display, addMoveToBoard, addPlayerFunctionality, removePlayerFunctionality, checkWinner, updateGameStatus};
}

//the player object
const player = (name, mark) => {
    const gameStatusText = document.querySelector('#game-status')

    //players can make move
    const makeMove = (position) => {
        if(actualGameboard.gameboardArray[position] == '')
        {
            actualGameboard.addMoveToBoard(position, mark);
            actualGameboard.display();
            if(actualGameboard.checkWinner())
            {
                gameStatusText.innerText = `${name} WINS!`
                actualGameboard.removePlayerFunctionality();
            }
            else 
            {
                actualGameboard.addPlayerFunctionality();
            }
            actualGameboard.updateGameStatus();
        }
    }
    
    return {name, mark, makeMove};
}

//temporarily create a new player until I have the Hololive stuff working
const player1 = player('Bob', 'O');
const player2 = player('Steve', 'X');
const actualGameboard =  Gameboard();
actualGameboard.newGame();