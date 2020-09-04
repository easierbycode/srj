
import blue from '../assets/images/blue.png';
import cake from '../assets/images/cake.png';
import { config } from './config.ts';
import dancer from '../assets/images/dancer.png';
import gift from '../assets/images/gift.png';
import red from '../assets/images/red.png';
import Phaser from 'phaser';


export class Scene1 extends Phaser.Scene {
    constructor() {
        super( 'Scene1' );
    }

    preload() {
        this.load.image( 'spark0', blue );
        this.load.image( 'spark1', red );

        this.load.spritesheet( 'dancer', dancer, {
            frameWidth: 46,
            frameHeight: 96
        });
        this.load.spritesheet( 'cake', cake, {
            frameWidth: 200,
            frameHeight: 200
        });
        this.load.spritesheet( 'gift', gift, {
            frameWidth: 26,
            frameHeight: 23
        });
    }

    create() {
        var p0 = new Phaser.Math.Vector2(200, 575);
        var p1 = new Phaser.Math.Vector2(200, 275);
        var p2 = new Phaser.Math.Vector2(600, 275);
        var p3 = new Phaser.Math.Vector2(600, 575);

        var curve = new Phaser.Curves.CubicBezier(p0, p1, p2, p3);

        var max = 28;
        var points = [];
        var tangents = [];

        for (var c = 0; c <= max; c++)
        {
            var t = curve.getUtoTmapping(c / max);

            points.push(curve.getPoint(t));
            tangents.push(curve.getTangent(t));
        }

        var tempVec = new Phaser.Math.Vector2();

        var spark0 = this.add.particles('spark0');
        var spark1 = this.add.particles('spark1');

        for (var i = 0; i < points.length; i++)
        {
            var p = points[i];

            tempVec.copy(tangents[i]).normalizeRightHand().scale(-32).add(p);

            var angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(p, tempVec));

            var particles = (i % 2 === 0) ? spark0 : spark1;

            particles.createEmitter({
                x: tempVec.x,
                y: tempVec.y,
                angle: angle,
                speed: { min: -100, max: 500 },
                gravityY: 200,
                scale: { start: 0.4, end: 0.1 },
                lifespan: 800,
                blendMode: 'SCREEN'
            });
        }
        // this.add.text(config.width / 2, config.height / 2, 'Happy Birthday EVA! ', {
        this.add.text(400, 450, 'Happy Birthday EVA! ', {
            fontFamily: 'Bangers',
            fontSize: '48px'
        }).setOrigin( 0.5 );

        this.anims.create({
            key: 'dance',
            frames: this.anims.generateFrameNumbers('dancer'),
            frameRate: 6,
            repeat: -1
        });
        let dancer = this.add.sprite( 325, 600, 'dancer' );
        dancer.setOrigin( 0.5, 1 );
        dancer.play( 'dance' );
        let dancer2 = this.add.sprite( 475, 600, 'dancer' );
        dancer2.setOrigin( 0.5, 1 );
        dancer2.play( 'dance' );

        this.anims.create({
            key: 'bounce',
            frames: [
                { key: 'gift', frame: 0 },
                { key: 'gift', frame: 1 },
                { key: 'gift', frame: 2 },
            ],
            frameRate: 6,
            repeat: -1,
            yoyo: true
        });
        let gift = this.add.sprite( 325, 600, 'gift' );
        gift.setOrigin( 1, 1 );
        gift.play( 'bounce' );
        let gift2 = this.add.sprite( 475, 600, 'gift' );
        gift2.setOrigin( 0, 1 );
        gift2.play( 'bounce' );

        this.anims.create({
            key: 'cake-anim',
            frames: [
                { key: 'cake', frame: 0 },
                { key: 'cake', frame: 1 },
                { key: 'cake', frame: 2 },
                { key: 'cake', frame: 3 },
                { key: 'cake', frame: 4 },
                { key: 'cake', frame: 5 },
                { key: 'cake', frame: 6 },
                { key: 'cake', frame: 7 },
            ],
            frameRate: 6,
            repeat: -1
        });
        let cake = this.add.sprite( 400, 500, 'cake' );
        cake.setScale( 0.5 );
        cake.setOrigin( 0.5, 0 );
        cake.play( 'cake-anim' );
    }
}