/**
 * Block wall sprite is used for background stone fence and consists of multiple variations
 * 
 * @class BlockWallSprite
 */
export class BlockWallSprite extends Phaser.Sprite {
  
  /**
   * @param {Object} game Reference to the state's game object
   * @param {Object} location X and Y coordinates to render the sprite
   * @param {Number} scale Scale to render the sprite
   * @param {String} frameName Name to render sprite when no animation is playing 
   */
  constructor ({ game = {}, location = {}, scale = 1, frameName = 'BlockWall', isAnimated = false } = {}) {

    super(game, location.x, location.y, 'structures');
    this.config = {
      scale,
      frameName,
      isAnimated,
      location,
    };
    this.render();
  }
  
  /**
   * Render the sprite
   */
  render () {
    this.game.add.existing(this);
    /**
     * Phaser.Animations.add(name, generateFrameNames, frameRate, loop )
     * name — Name ot assign the animation
     * generateFrameNames — Phaser automatically will grab oak1 through oak3
     * frameRate — Frame rate to play animation
     * loop — Whether or not to loop the animation
     */
    this.scale.setTo(this.config.scale, this.config.scale);
    this.anchor.setTo(0, 1);
  }

  /**
   * Displays a still frame or an animation on update loop
   */
  update () {
    this.frameName = this.config.frameName;
  }

}
