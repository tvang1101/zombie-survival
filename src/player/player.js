"use strict";

class Player{
  constructor(){
    this.game = game; // This is gathering the parent game object and relying on JS traversing.
                     // I could pass the game object to the constructor.
    this.health = 100;
    this.maxHealth = 100;
    this.healthTimer = new HealthTimer(this);
  }

  addHealth(amount){
    this.health = (this.health + amount <= this.maxHealth) ? this.health += amount : this.maxHealth;
  }

  subtractHealth(amount){
    this.health = (this.health - amount >= 0) ? this.health -= amount : 0;
  }

}