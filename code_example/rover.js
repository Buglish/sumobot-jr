'use strict';

var five = require('johnny-five');
var board = new five.Board();
var keypress = require('keypress');

// Use your shield configuration from the list
// http://johnny-five.io/api/motor/#pre-packaged-shield-configs
var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;
var motors = new five.Motors([
  configs.M1,
  configs.M2
]);

function forward() {
  console.log('Going forward');
  motors.fwd();
}

function backward() {
  console.log('Going backward');
  motors.rev();
}

function left() {
  console.log('Going left');
  motors[0].rev();
  motors[1].fwd();
}

function right() {
  console.log('Going right');
  motors[1].rev();
  motors[0].fwd();
}

function stop() {
  motors.stop();
}

board.on('ready', function() {

  this.repl.inject({
    motors: motors
  });

  motors.speed(255);

  console.log('Welcome to the Pee Wee Runt Rover!');
  console.log('Control the bot with the arrow keys, and SPACE to stop.');

  keypress(process.stdin);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);
  process.stdin.on('keypress', function (ch, key) {

    if ( !key ) { return; }

    if ( key.name === 'q' ) {

      console.log('Quitting');
      stop();
      process.exit();

    } else if ( key.name === 'up' ) {

      forward();

    } else if ( key.name === 'down' ) {

      backward();

    } else if ( key.name === 'left' ) {

      left();

    } else if ( key.name === 'right' ) {

      right();

    } else if ( key.name === 'space' ) {

      stop();

    }
  });
});
