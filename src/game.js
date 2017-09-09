import { StartScreen } from './states/startScreen/startScreen';
import { Zone1 } from './states/zone1/zone1';

const startScreen = new StartScreen();
const zone1 = new Zone1();

class Game extends Phaser.Game {

  constructor () {
    super(window.innerWidth, window.innerHeight, Phaser.AUTO, '', null);
    this.state.add('StartScreen', startScreen, false);
    this.state.add('Zone1', zone1, false);
    this.state.start('StartScreen');
  }
  
}

const game = new Game();
