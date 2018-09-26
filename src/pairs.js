
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
//create array to store names of the cards
let cardNames = [];

gameScene.preload = function() {
    this.load.multiatlas('tarots','assets/tarots.json', 'assets');
    
};

gameScene.create = function() {
    gameScene.createNamesForCards();
    gameScene.add.image(10,10, 'tarots', '00'.setIteractive);

}



function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//populates array cardNames with running, two-digit numbers as strings twice,
//so there is two of every number.
gameScene.createNamesForCards = function() {
    for (let i = 0; i < 22; i++) {
        let j = ("0" + i).slice(-2);
        cardNames.push(j,j);
        //cardNames.push(j);
    }
    console.log(cardNames);
}