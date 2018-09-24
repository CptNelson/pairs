
let gameScene = new Phaser.Scene('Game');

let config = {
    type: Phaser.Auto, //webGL or canvas
    width: 800,
    height: 640,
    scene: gameScene
};

//create the game and pass it the configuration
let game = new Phaser.Game(config);

gameScene.preload = function() {
    this.load.image('card00', 'assets/tarot/00_fool.png');
    this.load.image('card01', 'assets/tarot/01_magician.png');
    this.load.image('card02', 'assets/tarot/02_high_priestess.png');
    this.load.image('card03', 'assets/tarot/03_empress.png');
    this.load.image('card04', 'assets/tarot/04_emperor.png');
    this.load.image('card05', 'assets/tarot/05_pope.png');
};

gameScene.create = function() {

    this.shuffledCards = shuffle(this.textures.getTextureKeys());

    this.tarotsA = [];
    this.tarotsB = [];

    let dimensions = {
        X: [10, 120, 230, 340, 450, 560],
        Y: 10,
        getX: function() { return this.X; },
        getY: function() { return this.Y; },
        setX: function(value) { this.X = value; },
        setY: function(value) { this.Y = value; }
    }
    
/*     let x = [10, 120, 230, 340, 450, 560];
    let y = 10; */

    let columnCount = {
        set count(i) {
            this.count(i)
        },
        count: 0
    }

    for (let c = 0; c < this.shuffledCards.length; c++ ) {

        let tarotsAX = getRandomInt(dimensions.X.length);
        console.log("random number A: ", tarotsAX)
        this.tarotsA[c] = this.add.sprite(dimensions.X[tarotsAX],dimensions.Y, this.shuffledCards[c])
        //console.log("A X = ", x[tarotsAX])
        //console.log("tarot A: ", this.tarotsA[c].x)
        dimensions.X.splice(tarotsAX,1);
        //console.log("x after A: ", x, " ", y)

        let tarotsBX = getRandomInt(dimensions.X.length);
        //console.log("random number B: ", tarotsBX)
        this.tarotsB[c] = this.add.sprite(dimensions.X[tarotsBX],dimensions.Y, this.shuffledCards[c])
        //console.log("B X = ", x[tarotsBX])
        //console.log("tarot B: ", this.tarotsB[c].x)
        dimensions.X.splice(tarotsBX,1);
        //console.log("x after B: ",x, " ", y)

        columnCounter(columnCount,dimensions);
    }

    for (c = 0; c < this.tarotsA.length; c++) {
        //console.log(this.tarotsB[c]);
        this.tarotsA[c].setOrigin(0,0);
        this.tarotsA[c].setScale(0.5);
        this.tarotsB[c].setOrigin(0,0);
        this.tarotsB[c].setScale(0.5);
    }
}

//Set scale and origin for images


//checks if there is enough columns to start a new row. 
//If so, Y is changed to higher number, and X is initialized back to starting array.
function columnCounter(counter,dimensions) {
    counter.count = counter.count + 1;
    console.log("counter: ",counter.count)
    if (counter.count > 2) {
        //console.log("col")
        dimensions.setY(210);
        dimensions.setX([10, 120, 230, 340, 450, 560]);
        counter.count = 0;    
    }
    //console.log(dimensions.getY(), " ", dimensions.getX())
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}