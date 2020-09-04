
import {Scene1} from './Scene1.ts';


export var config = {
    width: 800,
    height: 600,
    scene: [Scene1],
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};