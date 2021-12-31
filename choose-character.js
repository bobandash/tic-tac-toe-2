//for the character selection screen
const playerSelectorScreen = () => {
    let currentPlayer = 1;
    let characterSelected = 'Gawr Gura';
    const allCharacterOptions = document.querySelectorAll('#character-selection button');
    const confirmSelectionButton = document.querySelector('#confirm-button');
    const fighterText = document.querySelector('.fighter-text');
    
    //number taken will be the index of the character player 1 took
    let numberTaken = -1;

    //add the functionalities for select player and confirm selection buttons
    const addButtonFunctionalities = () => {
        for(let i = 0; i < allCharacterOptions.length; i++)
        {
            allCharacterOptions[i].addEventListener('click', function() {
                if(allCharacterOptions[i].id != 'already-chosen')
                {
                    switch(i)
                    {
                        case 0:
                            characterSelected = 'Amelia Watson';
                            break;
                        case 1:
                            characterSelected = 'Mori Calliope';
                            break;
                        case 2:
                            characterSelected = 'Gawr Gura';
                            break;
                        case 3:
                            characterSelected = 'Ninomae Ina';
                            break;
                        case 4:
                            characterSelected = 'Kiara Takanashi';
                            break;
                        case 5:
                            let randomNumber = Math.floor(Math.random() * 6);
                            while(randomNumber == numberTaken)
                            {
                                randomNumber = Math.floor(Math.random() * 6);
                            }
                            switch(randomNumber){
                                case 0:
                                    characterSelected = 'Amelia Watson';
                                    break;
                                case 1:
                                    characterSelected = 'Mori Calliope';
                                    break;
                                case 2:
                                    characterSelected = 'Gawr Gura';
                                    break;
                                case 3:
                                    characterSelected = 'Ninomae Ina';
                                    break;
                                case 4:
                                    characterSelected = 'Kiara Takanashi';
                                    break;
                                case 5:
                                    characterSelected = 'Sakamata Chloe';
                                    break;                            
                            }
                            break;
                    }
                }
                displaySelection(characterSelected);
            })
        }

        confirmSelectionButton.addEventListener('click', function() {
            if(characterSelected != '')
            {
                currentPlayer++;
                if(currentPlayer == 3)
                {
                    //need to change the marks later
                    window.localStorage.setItem("player2Name",characterSelected);
                    window.location.href = "index.html";
                }
                else
                {
                    window.localStorage.setItem("player1Name",characterSelected);
                    switch(characterSelected)
                    {
                        case characterSelected = 'Amelia Watson':
                            allCharacterOptions[0].removeAttribute('id');
                            allCharacterOptions[0].id = 'already-chosen';
                            numberTaken = 0;
                            break;
                        case characterSelected = 'Mori Calliope':
                            allCharacterOptions[1].removeAttribute('id');
                            allCharacterOptions[1].id = 'already-chosen';
                            numberTaken = 1;
                            break;
                        case characterSelected = 'Gawr Gura':
                            allCharacterOptions[2].removeAttribute('id');
                            allCharacterOptions[2].id = 'already-chosen';
                            numberTaken = 2;
                            break;
                        case characterSelected = 'Ninomae Ina':
                            allCharacterOptions[3].removeAttribute('id');
                            allCharacterOptions[3].id = 'already-chosen';
                            numberTaken = 3;
                            break;
                        case characterSelected = 'Kiara Takanashi':
                            allCharacterOptions[4].removeAttribute('id');
                            allCharacterOptions[4].id = 'already-chosen';
                            numberTaken = 4;
                            break;
                        case characterSelected = 'Sakamata Chloe':
                            numberTaken = 5;
                            break;        
                    }
                    characterSelected = '';
                    fighterText.innerText = 'Player II Choose Your Fighter';
                    //somehow need to record the player name
                }
            }
            })
    }

    const displaySelection = (characterSelected) => {
        const regularFaceImg = document.querySelector('#character-select-image img');
        const vtuberName = document.querySelector('#character-select-image h2');
        const backgroundSpecific = document.querySelector('body');
        switch (characterSelected) {
            case 'Amelia Watson':
                regularFaceImg.src = "images/regular-faces/Ame-face.png";
                backgroundSpecific.style.backgroundImage = "url('images/background-images/detective-office.jpg')";
                break;
            case 'Mori Calliope':
                regularFaceImg.src = "images/regular-faces/Mori-face.png";
                backgroundSpecific.style.backgroundImage = "url('images/background-images/hell.jpg')";
                break;
            case 'Gawr Gura':
                regularFaceImg.src = "images/regular-faces/Gura-face.png";
                backgroundSpecific.style.backgroundImage = "url('images/background-images/atlantis.jpg')";
                break;
            case 'Ninomae Ina':
                regularFaceImg.src = "images/regular-faces/Ina-face.png";
                backgroundSpecific.style.backgroundImage = "url('images/background-images/beach.jpg')";
                break;
            case 'Kiara Takanashi':
                regularFaceImg.src = "images/regular-faces/Kiara-face.png";
                backgroundSpecific.style.backgroundImage = "url('images/background-images/fire.jpg')";              
                break;
            case 'Sakamata Chloe':
                regularFaceImg.src = "images/regular-faces/Chloe-face.png"  
                backgroundSpecific.style.backgroundImage = "url('images/background-images/deep-ocean.jpg')";
                break;
        }
        vtuberName.innerText = characterSelected;
    }

    return {addButtonFunctionalities};
}


const selectPlayers = playerSelectorScreen();
selectPlayers.addButtonFunctionalities();
