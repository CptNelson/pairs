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
    this.tarotsA = [];
    this.tarotsB = [];

    let cards = this.textures.getTextureKeys();
    console.log(cards.length);
    let x = 10;
    let y = 10;
    let columnCount = 0;
    for (let c = 0; c < cards.length * 2; c++ ) {
        console.log(x)
        this.tarotsA[c] = this.add.sprite(x,y, cards[c])
        x += 110;
        this.tarotsB[c] = this.add.sprite(x,y, cards[c])
        x += 110;
        columnCount++;
        if (columnCount > 2) {
            console.log("col");
            y = 210;
            x = 10;
            columnCount = 0;    
        }
    }
/* 
    this.tarotsA[0] = this.add.sprite(10, 10, 'card00');
    this.tarotsB[0] = this.add.sprite(120, 10, 'card00');
    this.tarotsA[1] = this.add.sprite(230, 10, 'card01');
    this.tarotsB[1] = this.add.sprite(340, 10, 'card01');
    this.tarotsA[2] = this.add.sprite(450, 10, 'card02');
    this.tarotsB[2] = this.add.sprite(10, 210, 'card02');
    this.tarotsA[3] = this.add.sprite(120, 210, 'card03');
    this.tarotsB[3] = this.add.sprite(230, 210, 'card03');
    this.tarotsA[4] = this.add.sprite(340, 210, 'card04');
    this.tarotsB[4] = this.add.sprite(450, 210, 'card04');
 */
    for (c = 0; c < this.tarotsA.length; c++) {
        //console.log(this.tarotsB[c]);
        this.tarotsA[c].setOrigin(0,0);
        this.tarotsA[c].setScale(0.5);
        this.tarotsB[c].setOrigin(0,0);
        this.tarotsB[c].setScale(0.5);
    }

}