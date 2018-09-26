
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

gameScene.preload = function() {
    this.load.multiatlas('tarots','assets/tarots.json', 'assets');
};

gameScene.create = function() {
    
    this.cardNamesA = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
                    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
                    '20', '21']
    this.cardNamesB = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
                    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
                    '20', '21']

    this.tarotsA = [];  
    this.tarotsB = [];

    this.dimensions = {
        X: [10, 100, 190, 280, 370, 460, 550, 640,730,820,910,1000],
        Y: 10,
    }
    this.columnCount = 0;
    let openCardsCounter = 0;
    gameScene.deal();
    let tempCard2;
    let tempCard1;
    
    this.input.on('gameobjectdown', function (pointer, gameObject) {
        //console.log(gameObject.frame.customData.filename);
        gameObject.clearTint();
        this.tempObj1;
        this.tempObj2;
        if (openCardsCounter == 0) {
            tempCard1 = gameObject.frame.customData.filename;
            this.tempObj1 = gameObject;
            
        } else {
            tempCard2 = gameObject.frame.customData.filename;
            this.tempObj2 = gameObject;
        }
        console.log("1: ", tempCard1, " 2: ", tempCard2);
        openCardsCounter++;
        console.log(openCardsCounter)
        
        if (openCardsCounter == 2) {
            gameScene.checkCards(tempCard1, tempCard2, this.tempObj1, this.tempObj2);
            openCardsCounter = 0;

        }
    });
}


gameScene.checkCards = function(temp1, temp2, tempObj1, tempObj2) {
    if (parseInt(temp1) == parseInt(temp2)) {
        console.log("score!");
        tempObj1.destroy();
        tempObj2.destroy();
    } else {
    tempObj1.tint = 00000;
    tempObj2.tint = 00000;
    }
}

//Deal the cards randomly at table, keep their order in two packs for easy compare.
gameScene.deal = function() {
    for (let c = 0; c < 22; c++ ) {
        let tarotsAX = getRandomInt(this.dimensions.X.length);
        let randomCardA = getRandomInt(this.cardNamesA.length)
        this.tarotsA[c] = this.add.sprite(this.dimensions.X[tarotsAX],this.dimensions.Y, 'tarots', this.cardNamesA[randomCardA]).setInteractive()
        this.tarotsA[c].tint = 00000;
        this.dimensions.X.splice(tarotsAX,1);
        this.cardNamesA.splice(randomCardA,1);

        let tarotsBX = getRandomInt(this.dimensions.X.length);  
        let randomCardB = getRandomInt(this.cardNamesB.length);
        this.tarotsB[c] = this.add.sprite(this.dimensions.X[tarotsBX],this.dimensions.Y, 'tarots', this.cardNamesB[randomCardB]).setInteractive()
        this.tarotsB[c].tint = 00000;
        this.dimensions.X.splice(tarotsBX,1);
        this.cardNamesB.splice(randomCardB,1);


        gameScene.columnCounter();
    }
}


//checks if there is enough columns to start a new row. 
//If so, Y is changed to higher number, and X is initialized back to starting array.
gameScene.columnCounter = function() {
    this.columnCount++;
    if (this.columnCount == 6) {
        this.dimensions.Y = 170;
        this.dimensions.X = [100, 190, 280, 370, 460, 550, 640,730,820,910];
        console.log("x2: ",this.dimensions.X)  
    } 
    if (this.columnCount == 11) {
        this.dimensions.Y = 330;
        this.dimensions.X = [100, 190, 280, 370, 460, 550, 640,730,820,910];
        console.log("x3: ",this.dimensions.X)  
    }
    if (this.columnCount == 16) {
        this.dimensions.Y = 490;
        this.dimensions.X = [10,100, 190, 280, 370, 460, 550, 640,730,820,910,1000];
        console.log("x3: ",this.dimensions.X)  
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}