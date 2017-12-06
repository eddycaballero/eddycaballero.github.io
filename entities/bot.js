function createBot(x,y){
    enemy = enemies.create(x, y, 'enemy');
    enemy.body.gravity.y = 300;
    enemy.wanderTimer = 0;
    enemy.pauseTimer = 0;
    enemy.takeDamage = function(){
        this.kill();
    }
    enemy.animations.add('left', [0, 1,2], 10, true);
    enemy.animations.add('right', [3,4,5], 10, true);
    enemy.direction = -1;
    enemy.wander = function(){

        if(this.wanderTimer == 0){
            this.body.velocity.x = 0;
            this.animations.stop();

            if(this.direction < 0){
                this.frame = 1;
            } else {
                this.frame = 2;
            }

            if(this.pauseTimer > 50){
                if(Math.random() < 0.1){
                    this.wanderTimer = 51 + Math.floor(Math.random() * 50);
                    this.body.velocity.x -= 20;
                    this.animations.play('left');
                    this.direction = -1;
                } else if(Math.random() > 0.9){
                    this.wanderTimer = 51 + Math.floor(Math.random() * 50);
                    this.body.velocity.x += 20;
                    this.animations.play('right');
                    this.direction = 1;
                }
                this.pauseTimer = 0;
            } else {
                this.pauseTimer++;
            }
        } else {
            this.wanderTimer--;
        }
    }
}