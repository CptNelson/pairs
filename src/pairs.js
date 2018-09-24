
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

    let x = [10, 120, 230, 340, 450, 560];
    let y = 10;

    let columnCount = 0;
    for (let c = 0; c < this.shuffledCards.length; c++ ) {

        let tarotsAX = getRandomInt(x.length);
        console.log("random number A: ", tarotsAX)
        this.tarotsA[c] = this.add.sprite(x[tarotsAX],y, this.shuffledCards[c])
        console.log("A X = ", x[tarotsAX])
        console.log("tarot A: ", this.tarotsA[c].x)
        x.splice(tarotsAX,1);
        console.log("x after A: ", x, " ", y)

        let tarotsBX = getRandomInt(x.length);
        console.log("random number B: ", tarotsBX)
        this.tarotsB[c] = this.add.sprite(x[tarotsBX],y, this.shuffledCards[c])
        console.log("B X = ", x[tarotsBX])
        console.log("tarot B: ", this.tarotsB[c].x)
        x.splice(tarotsBX,1);
        console.log("x after B: ",x, " ", y)

        columnCount++;
        if (columnCount > 2) {
            console.log("col")
            y = 210;
            x = [10, 120, 230, 340, 450, 560];
            columnCount = 0;    
        }
    }

    for (c = 0; c < this.tarotsA.length; c++) {
        //console.log(this.tarotsB[c]);
        this.tarotsA[c].setOrigin(0,0);
        this.tarotsA[c].setScale(0.5);
        this.tarotsB[c].setOrigin(0,0);
        this.tarotsB[c].setScale(0.5);
    }
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