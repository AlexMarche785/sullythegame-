// Basic configuration for the Phaser game instance
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#F5F5DC', // Beige background
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;

function preload() {
    console.log("Preloading assets...");

    // **MODIFIED:** Load the external image file for Sully
    // Make sure you have an 'assets' folder with 'sully.png' inside it!
    // Adjust 'assets/sully.png' if your path or filename is different.
    this.load.image('sully', 'assets/sully.png'); // 'sully' is the key we'll use

    console.log("Assets preloaded.");
}

function create() {
    console.log("Creating game objects...");
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // **MODIFIED:** Add the player sprite using the loaded 'sully' image key
    player = this.physics.add.sprite(centerX, centerY, 'sully');

    // --- Rest of create is the same ---
    player.setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys();
    this.add.text(10, 10, 'Use ARROW KEYS to move Sully!', { fontSize: '18px', fill: '#444' });

    console.log("Game objects created. Player ready.");
}

function update() {
    const speed = 160;
    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-speed);
        // Future: player.anims.play('walk-left', true); // Play animation
    } else if (cursors.right.isDown) {
        player.setVelocityX(speed);
        // Future: player.anims.play('walk-right', true);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-speed);
        // Future: player.anims.play('walk-up', true);
    } else if (cursors.down.isDown) {
        player.setVelocityY(speed);
        // Future: player.anims.play('walk-down', true);
    }

    // Add simple idle state (stop animation when no keys are pressed)
    // We'll need this logic later when animations are added
    // if (!cursors.left.isDown && !cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown) {
    //    // player.anims.play('idle-down'); // Or based on last direction faced
    // }

    // Optional: Normalize diagonal speed
    // player.body.velocity.normalize().scale(speed);
}