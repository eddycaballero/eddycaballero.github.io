function createHookable(x,y,xScale,yScale,image,weight){
    hookable = hookables.create(x,y,image);
    hookable.scale.setTo(xScale,yScale);
    hookable.body.gravity.y = 300;
    hookable.body.mass = weight;
    hookable.collideWithPlayer = function(){
        this.body.velocity.x = player.playerBody.body.velocity.x;
    }

    hookable.blockedOnSide = {
        up: false,
        down: false,
        left: false,
        right: false
    }

    hookable.resetBlocked = function(){
        this.blockedOnSide.left = false;
        this.blockedOnSide.right = false;
        this.blockedOnSide.up = false;
        this.blockedOnSide.down = false;
    }
    
    hookable.setBlockedOnCollide = function(otherObject){
        if(this.checkCollideWithObject(otherObject) == "left"){
            this.blockedOnSide.left = true;
        }

        if(this.checkCollideWithObject(otherObject) == "right"){
            this.blockedOnSide.right = true;
        }

        if(this.checkCollideWithObject(otherObject) == "up"){
            this.blockedOnSide.up = true;
        }

        if(this.checkCollideWithObject(otherObject) == "down"){
            this.blockedOnSide.down = true;
        }
    }

    hookable.checkCollideWithObject = function(otherObject){
        var colliding = "none";
        if(Math.abs(otherObject.body.x + otherObject.body.width - this.body.x) < 1){
            if(!(otherObject.body.y > this.body.y + this.body.height) && !(otherObject.body.y + otherObject.body.height < this.body.y)){
                colliding = "left";
            }
        } else if(Math.abs(otherObject.body.x - this.body.x - this.body.width) < 1){
            if(!(otherObject.body.y > this.body.y + this.body.height) && !(otherObject.body.y + otherObject.body.height < this.body.y)){
                colliding = "right";
            }
        } else if(Math.abs(otherObject.body.y + otherObject.body.height - this.body.y) < 1){
            if(!(otherObject.body.x > this.body.x + this.body.width) && !(otherObject.body.x + otherObject.body.width < this.body.x)){
                colliding = "up";
            }
        } else if(Math.abs(otherObject.body.y - this.body.y - this.body.height) < 1){
            if(!(otherObject.body.x > this.body.x + this.body.width) && !(otherObject.body.x + otherObject.body.width < this.body.x)){
                colliding = "down";
            }
        }

        return colliding;
    }

    hookable.rest = function(){
        if(!((this.checkCollideWithObject(player.playerBody) == "left" && this.body.touching.left) || (this.checkCollideWithObject(player.playerBody) == "right" && this.body.touching.right)) && !this.checkAirborne()){
            this.body.velocity.x = 0;
        }
    }

    hookable.checkAirborne = function(){
        if(this.body.touching.down || this.blockedOnSide.down){
            return false;
        } else {
            return true;
        }
    }
    
    hookable.checkProjectile = function(){
        if(this.projectile == true){
            if(!this.checkAirborne()){
                this.projectile == false;
            }
        }
    }

    hookable.projectile = false;


    return hookable;
}