
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

gameScene.preload = function() {
    this.load.multiatlas('tarots','assets/tarots.json', 'assets');
};

gameScene.create = function() {
    gameScene.storeAllCoordinates();
    gameScene.createNamesForCards();
    gameScene.dealCardsToTable();
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

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

