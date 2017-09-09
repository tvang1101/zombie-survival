import { store as config } from '../states/startScreen/startScreen.config';

/**
 * Service for generating spawn points.
 * @class Spawn
 */
export class Spawn {

  constructor () {
    this.location = this.getSpawn();
  }

  getSpawn () {
    const worldWidth = config.getState().worldWidth;
    return {
      x: Math.random() * (worldWidth - 0) + 0,
      y: window.innerHeight - 120
    };
  }

}
