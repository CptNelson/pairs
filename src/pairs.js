let gameScene = new Phaser.Scene('Game');

let config = {
    type: Phaser.Auto, //Let the browser choose if using webGL or canvas
    width: 1090,
    height: 700,
    scene: gameScene,
    backgroundColor: 0xFFFFFF
};

//create the game and pass it the configuration
let game = new Phaser.Game(config);
//create arrays to store names of the cards, and their positions.
let cardNames = [];
let cardPositions = [];
let cardCounter = 4;
let whosTurn = "Player One's"
gameScene.player = [0, 0]
gameScene.scoreText = [0,0]


gameScene.preload = function () {
    this.load.multiatlas('tarots', 'assets/tarots.json', 'assets');
};

gameScene.create = function () {
    gameScene.storeAllCoordinates();
    gameScene.createNamesForCards();
    gameScene.dealCardsToTable();
    gameScene.scoreText[0] = this.add.text(25, 307, '0', { fontSize: '40px', fill: '#0000FF' });
    gameScene.scoreText[1] = this.add.text(1015, 307, '0', { fontSize: '40px', fill: '#FF0000' });
    gameScene.turnText = this.add.text(270, 660, "It's " + whosTurn + " turn.", { fontSize: '40px', fill: '#0000FF' });
    gameScene.takingTurns();
}

//populates array cardNames with running, two-digit numbers as strings twice,
//so there is two of every number.
gameScene.createNamesForCards = function () {
    for (let i = 0; i < 22; i++) {
        let j = ("0" + i).slice(-2);
        cardNames.push(j, j);
    }
}

gameScene.dealCardsToTable = function () {
    for (let i = 0; i < cardNames.length; i++) {
        let r = getRandomInt(cardPositions.length);
        gameScene.add.image(cardPositions[r].x, cardPositions[r].y, 'tarots', cardNames[i]).setInteractive().tint = 00000;
        cardPositions.splice(r, 1);
    }
}

//helper function to store x y coordinates as array of objects.
gameScene.storeCoordinate = function (xVal, yVal, array) {
    array.push({
        x: xVal,
        y: yVal
    });
}

//this uses storeCoordinate to populate array cardPositions with all the coordinates
//we are using in the table.
gameScene.storeAllCoordinates = function () {
    let x = 10;
    let y = 10;
    let j = 0;
    for (let i = 0; i < 44; i++) {
        gameScene.storeCoordinate(x, y, cardPositions)
        x += 90;
        j++;
        switch (j) {
            case 12:
                x = 100;
                y = 170;
                break;
            case 22:
                x = 100;
                y = 330;
                break;
            case 32:
                x = 10;
                y = 490;
                break;
        }
    }
}

gameScene.takingTurns = function () {
    let state = 'player1A';
    let tempCardA, tempCardB;
    gameScene.input.on('gameobjectdown', function (pointer, gameObject) {

        switch (state) {
            case 'player1A':
                gameObject.clearTint();
                tempCardA = gameObject;
                console.log("player1A: ", tempCardA.frame.customData.filename);
                state = 'player1B';
                break;
            case 'player1B':
                if (tempCardA == gameObject) {
                    return;
                }
                gameObject.clearTint();
                tempCardB = gameObject;
                console.log("player1B: ", tempCardB.frame.customData.filename);
                checkingForPoint(0, state);
                break;
            case 'player2A':
                tempCardA = gameObject;
                gameObject.clearTint();
                console.log("player2A: ", tempCardA.frame.customData.filename);
                state = 'player2B';
                break;
            case 'player2B':
                if (tempCardA == gameObject) {
                    return;
                }
                tempCardB = gameObject;
                gameObject.clearTint();
                console.log("player2B: ", tempCardB.frame.customData.filename);
                checkingForPoint(1, state);
                break;
            case 'waiting':
                console.log("waiting");
            default:
                console.log("error!")
        }
    })
    checkingForPoint = function (player, oldState) {
        state = "waiting"

        setTimeout(function () {
            if (tempCardA.frame.customData.filename == tempCardB.frame.customData.filename) {
                gameScene.player[player]++;
                console.log(gameScene.player[player])
                gameScene.scoreText[player].setText("" + gameScene.player[player]);
                destroyCards(tempCardA, tempCardB);
                if (oldState == 'player1B') {
                    state = 'player1A';
                } else {
                    state = 'player2A';
                    gameScene.turnText.setText("It's Player Two's turn.");
                }
            } else {
                tempCardA.tint = 00000;
                tempCardB.tint = 00000;
                state = 'waiting';
                if (oldState == 'player1B') {
                    console.log("turn")
                    gameScene.turnText.setText("It's Player Two's turn.");
                    gameScene.turnText.setColor('#FF0000')
                    state = 'player2A'
                } else {
                    console.log("turn")
                    gameScene.turnText.setText("It's Player One's turn.");
                    gameScene.turnText.setColor('#0000FF')
                    state = 'player1A'
                }
            }
        }, 2000);
    }
    destroyCards = function (cardA, cardB) {
        cardA.destroy();
        cardB.destroy();
        checkIfGameOver();
    }
    checkIfGameOver = function () {
        cardCounter--;
        if (cardCounter == 0) {
            gameScene.turnText.destroy();
            gameScene.gameOverText = gameScene.getGameOverText();
            gameScene.add.text(115, 307, gameScene.gameOverText, { fontSize: '40px', fill: '#000' });
        } else return;
    }
}

gameScene.getGameOverText = function() {
    if (gameScene.player[0] > gameScene.player[1]) {
        console.log(gameScene.player[0])
        return 'Game Over! Player One is the winner!'
    } else return 'Game Over! Player Two is the winner'
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}