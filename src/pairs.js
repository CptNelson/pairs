
let gameScene = new Phaser.Scene('Game');

let config = {
    type: Phaser.Auto, //webGL or canvas
    width: 800,
    height: 640,
    scene: gameScene
};

//create the game and pass it the configuration
let game = new Phaser.Game(config);