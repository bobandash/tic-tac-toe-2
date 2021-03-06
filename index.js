
//for the gameboard
//includes the moves that the players made and the display


const Gameboard = (() => {
    //initializing the board and the round
    let round = 0;
    let allSpaces = Array.from(document.querySelectorAll('#container button'));
    const gameStatusText = document.querySelector('#game-status')

    const gameboardArray = new Array(9).fill('');

    //create a new game
    const newGame = () => {
        changeCharacterSideBanners();
        clearBoard();
        addPlayerFunctionality();
        transitionButtonFunctionality();
        updateGameStatus();
    }

    const changeCharacterSideBanners = () =>
    {
        const player1NameDisplay = document.querySelector('#player1-name');
        const player2NameDisplay = document.querySelector('#player2-name');
        const player1AvatarDisplay = document.querySelector('#player1-avatar');
        const player2AvatarDisplay = document.querySelector('#player2-avatar');
        const player1Background = document.querySelector('#player1-background');
        const player2Background = document.querySelector('#player2-background');    
        
        //call change display for both players
        changeDisplay(player1.name, player1NameDisplay, player1AvatarDisplay, player1Background);
        changeDisplay(player2.name, player2NameDisplay, player2AvatarDisplay, player2Background);
    }

    function changeDisplay (name, nameDisplayLocation, avatarDisplayLocation, playerBackground) {
        nameDisplayLocation.innerText = name;
        switch(name)
        {
            case 'Amelia Watson':
                avatarDisplayLocation.src = 'images/full-body/ame.png';
                playerBackground.style.backgroundImage = "url('images/background-images/detective-office.jpg')";
                break;
            case 'Mori Calliope':
                avatarDisplayLocation.src = 'images/full-body/calli.png';
                playerBackground.style.backgroundImage = "url('images/background-images/hell.jpg')";
                break;
            case 'Gawr Gura':
                avatarDisplayLocation.src = 'images/full-body/gura.png';
                playerBackground.style.backgroundImage = "url('images/background-images/atlantis.jpg')";
                break;
            case 'Ninomae Ina':
                avatarDisplayLocation.src = 'images/full-body/ina.png';
                playerBackground.style.backgroundImage = "url('images/background-images/beach.jpg')";
                break;
            case 'Kiara Takanashi':
                avatarDisplayLocation.src = 'images/full-body/kiara.png';
                playerBackground.style.backgroundImage = "url('images/background-images/fire.jpg')";
                break;
            case 'Sakamata Chloe':
                avatarDisplayLocation.src = 'images/full-body/chloe.png';
                playerBackground.style.backgroundImage = "url('images/background-images/deep-ocean.jpg')";
                break;           
        }
    }


    //for resetting the board
    const clearBoard = () => {
        let allImages = document.querySelectorAll('#container button img');
        allImages.forEach((image) => image.remove());
        gameboardArray.fill('');
        round = 0;
    }

    const addMoveToBoard = (position, mark) => {
        gameboardArray[position] = mark;
        let currSpaceImage = document.createElement('img');
        currSpaceImage.src =  gameboardArray[position];
        allSpaces[position].appendChild(currSpaceImage);
        round++;
    }

    //when click on any tiles on gameboard, changes array
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

    // remove player functionality
    const removePlayerFunctionality = () => {
        for(let i = 0; i < allSpaces.length; i++)
        {
            //basically removes all event listeners for the buttons
            allSpaces[i].replaceWith(allSpaces[i].cloneNode(true));
        }
        allSpaces = Array.from(document.querySelectorAll('#container button'));
    }

    // for the bottom text to update game status
    const updateGameStatus = () => {
        if(checkWinner())
        {
            if(round % 2 == 0) {
                gameStatusText.innerText = `${player2.name} WINS`;
                player2.score = player2.score + 1;
            }
            else
            {
                gameStatusText.innerText = `${player1.name} WINS`;
                player1.score = player1.score + 1;
            }
            updateScore();
        }
        else if (round == 9)
        {
            gameStatusText.innerText = 'Tie Game';
        }
        else
        {
            if(round % 2 == 0 ? gameStatusText.innerText = `${player1.name}'s Turn` : gameStatusText.innerText = `${player2.name}'s Turn`);
        }
    }

    //to update the score
    const updateScore = () => {
        let player1score = document.getElementById('player1-score');
        let player2score = document.getElementById('player2-score');
        if(round % 2 == 0)
        {
            player2score.innerText = player2.score;
        }
        else
        {
            player1score.innerText = player1.score;
        }
    }

    //function to call to add the next game and choose characters button functionality
    const transitionButtonFunctionality = () => {
        const nextGameButton = document.querySelector('#next-game-button');
        const chooseCharactersButton = document.querySelector('#choose-characters-button');

        nextGameButton.addEventListener('click',function () {
            //if the game is actually over
            if(checkWinner() || round == 9)
            {
                newGame();
            }
        })

        chooseCharactersButton.addEventListener('click', function () {
            window.location.href = "choose-character.html";
        })
    }

    return {newGame, gameboardArray, addMoveToBoard, addPlayerFunctionality, removePlayerFunctionality, checkWinner, updateGameStatus};
})();



//the player object
const player = (name) => {
    let mark = '';
    let score = 0;
    switch (name){
        case 'Amelia Watson':
            mark = "images/smol-faces/smol-ame.png"
            break;
        case 'Mori Calliope':
            mark = "images/smol-faces/smol-calli.png"           
            break;
        case 'Gawr Gura':
            mark = "images/smol-faces/smol-gura.png"
            break;
        case 'Ninomae Ina':
            mark = "images/smol-faces/smol-ina.png"
            break;
        case 'Kiara Takanashi':
            mark = "images/smol-faces/smol-kiara.png"         
            break;
        case 'Sakamata Chloe':
            mark = "images/smol-faces/smol-chloe.jpg"
            break;
    }
    
    const gameStatusText = document.querySelector('#game-status')

    //players can make move
    const makeMove = (position) => {
        if(actualGameboard.gameboardArray[position] == '')
        {
            actualGameboard.addMoveToBoard(position, mark);
            if(actualGameboard.checkWinner())
            {
                gameStatusText.innerText = `${name} WINS!`;
                actualGameboard.removePlayerFunctionality();
            }
            else 
            {
                actualGameboard.addPlayerFunctionality();
            }
            actualGameboard.updateGameStatus();
        }
    }
    
    return {name, mark, score, makeMove};
}




const player1 = player(window.localStorage.getItem("player1Name"));
const player2 = player(window.localStorage.getItem("player2Name"));
const actualGameboard =  Gameboard;
actualGameboard.newGame();