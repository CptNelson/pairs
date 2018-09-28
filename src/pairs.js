
let gameScene = new Phaser.Scene('Game');

let config = {
    type: Phaser.Auto, //Let the browser choose if using webGL or canvas
    width: 1090,
    height: 650,
    scene: gameScene,
    backgroundColor: 0xFFFFFF
};

//create the game and pass it the configuration
let game = new Phaser.Game(config);
//create arrays to store names of the cards, and their positions.
let cardNames = [];
let cardPositions = [];
this.player = [1,2]
player[0].score = 0;
player[1].score = 0;

gameScene.preload = function() {
    this.load.multiatlas('tarots','assets/tarots.json', 'assets');
};

gameScene.create = function() {
    gameScene.storeAllCoordinates();
    gameScene.createNamesForCards();
    gameScene.dealCardsToTable();
    gameScene.takingTurns();
}

//populates array cardNames with running, two-digit numbers as strings twice,
//so there is two of every number.
gameScene.createNamesForCards = function() {
    for (let i = 0; i < 22; i++) {
        let j = ("0" + i).slice(-2);
        cardNames.push(j,j);
    }
}

gameScene.dealCardsToTable = function() {
    for (let i = 0; i < cardNames.length; i++) {
        let r = getRandomInt(cardPositions.length);
        gameScene.add.image(cardPositions[r].x,cardPositions[r].y, 'tarots', cardNames[i]).setInteractive();
        cardPositions.splice(r,1);
    }
}

//helper function to store x y coordinates as array of objects.
gameScene.storeCoordinate = function(xVal, yVal, array) {
    array.push({x: xVal, y: yVal});
}

//this uses storeCoordinate to populate array cardPositions with all the coordinates
//we are using in the table.
gameScene.storeAllCoordinates = function() {
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

gameScene.takingTurns = function() {
    let state = 'player1A';
    let tempCardA, tempCardB;
    gameScene.input.on('gameobjectdown', function (pointer, gameObject) {
        
        switch(state) {
            case 'player1A': 
                tempCardA = gameObject;
                console.log("player1A: ", tempCardA.frame.customData.filename);
                state = 'player1B';
                break;
            case 'player1B':
                tempCardB = gameObject;
                console.log("player1B: ", tempCardB.frame.customData.filename);
                checkingForPoint(0, state);
                break;
            case 'player2A': 
                tempCardA = gameObject;
                console.log("player2A: ", tempCardA.frame.customData.filename);
                state = 'player2B';
                break;
            case 'player2B':
                tempCardB = gameObject;
                console.log("player2B: ", tempCardB.frame.customData.filename);
                checkingForPoint(1, state);
                break;
            case 'waiting':
                console.log("waiting");
            default: 
                console.log("error!")
        }
    })
    checkingForPoint = function(player, oldState) {
        if (tempCardA.frame.customData.filename == tempCardB.frame.customData.filename) {
            this.player[player].score++;
            state = 'waiting';
            destroyCards(tempCardA, tempCardB);
            if (oldState == 'player1B') {
                state = 'player1A';
            } else state = 'player2A';
        } else {
            state = 'waiting';
            sleep(2000);
            if (oldState == 'player1B') {
                console.log("turn")
                state = 'player2A'
            } else {
                console.log("turn")
                state = 'player1A'
            }
        }
    }
    destroyCards = function(cardA, cardB) {
        sleep(1200);
        cardA.destroy();
        cardB.destroy();
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function sleep(milliseconds) {
  let start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}