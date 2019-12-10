class mainScene {

    preload() {
        this.load.image('player', 'assets/player.png')
        this.load.image('coin', 'assets/coin.png')
        this.load.image('enemy', 'assets/enemy.png')
        this.load.audio('coinPickUp', 'assets/pickup_coin.wav')
        
    }

    create() {

        this.xEnemySpawn = Math.floor(Math.random() * window.innerWidth)
        this.yEnemySpawn = Math.floor(Math.random() * window.innerHeight)

        this.player = this.physics.add.sprite(200, 200, 'player')
        this.coin = this.physics.add.sprite(300, 100, 'coin')
        this.enemy = this.physics.add.sprite(this.xEnemySpawn, this.yEnemySpawn, 'enemy')
        this.coin.width= 25;
        this.coin.setWidth = 25;
        this.setSize = (25,25)
        
        this.playerSpeed = 5;
        this.enemySpeed = 2.2;

        this.arrow = this.input.keyboard.createCursorKeys();

        this.coinSound = new Audio('assets/pickup_coin.wav')

        
        this.score = 0;
        let style = {
            font: '20px Arial',
            fill: '#FFF'
        }

        this.scoreText = this.add.text(window.innerWidth - 130, window.innerHeight - 80, 'Score: ' + this.score, style)

    }

    update() {

        if (this.physics.overlap(this.player, this.coin)) {
            this.hit();
        }

        if (this.physics.overlap(this.player, this.enemy)) {
            this.enemyHit();
            
        }

        // Vertical
        if (this.arrow.right.isDown) {
            this.moveRight()
        }

        if (this.arrow.left.isDown) {
            this.moveLeft()
        }

        // Horizontal
        if (this.arrow.up.isDown) {
            this.moveUp()
        }

        if (this.arrow.down.isDown) {
            this.moveDown()
        }

        if (this.player.y > window.innerHeight) {
            this.player.y = 0;
        }

        if (this.player.y < 0) {
            this.player.y = window.innerHeight;
        }
        
        if (this.player.x > window.innerWidth) {
            this.player.x = 0;
        }

        if (this.player.x < 0) {
            this.player.x = window.innerWidth;
        }

        this.directionY = Math.sign(this.player.y - this.enemy.y)
        this.enemy.y += this.enemySpeed * this.directionY;

        this.directionX = Math.sign(this.player.x - this.enemy.x)
        this.enemy.x += this.enemySpeed * this.directionX;
    }

    
    hit() {
        this.coinSound.play()        

        this.coin.x = Phaser.Math.Between(5, window.innerWidth - 15)
        this.coin.y = Phaser.Math.Between(5, window.innerHeight - 25)

        this.score++;

        this.tweens.add({
            targets: this.player,
            duration: 100,
            scaleX: 1.2,
            scaleY: 1.5,
            yoyo: true,
        })

        this.scoreText.setText('score: ' + this.score)

    }
    
    enemyHit() {
        

        let finalStyle = {
            font: '100px Arial', 
            fill: '#FFF'
            
        }

        this.playerSpeed = 0;
        
        this.finalText = this.add.text(window.innerWidth / 3, window.innerHeight / 2, 'Game Over', finalStyle)
        this.enemySpeed = 0;
        
    }   
    
    moveUp() {
        this.player.y -= this.playerSpeed;
    } 
    moveDown() {
        this.player.y += this.playerSpeed;
    }
    moveRight() {
        this.player.x += this.playerSpeed;
    }
    moveLeft() {
        this.player.x -= this.playerSpeed;
    }

}

new Phaser.Game({
    width: window.innerWidth,
    height: window.innerHeight - 19.9,
    backgroundColor: '#3498db',
    scene: mainScene,
    physics: {
        default: 'arcade'
    },
    parent: 'game',
})