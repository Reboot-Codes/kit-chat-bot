import tmi from 'tmi.js';
import chalk from 'chalk';

const channels = [
  'kitboga'
];

function checker(value) {
  var prohibited = [];

  for (var i = 0; i < prohibited.length; i++) {
    if (value.toLowerCase().indexOf(prohibited[i].toLowerCase()) > -1) {
      return false;
    }
  }
  return true;
}

console.log(`${chalk.blue('[INFO]')} Bot Starting...`);

const TMI_OPTIONS = {
  channels
}

const client = new tmi.Client(TMI_OPTIONS);

client.on('connected', (address, port) => {
  console.log(`${chalk.green('[SUCCESS]')} Connected to ${chalk.yellow(`${address}:${port}`)}!`)
});

client.on('message', (channel, userState, message) => {
  if (channels.includes(channel)) {
    if (checker(message)) {
      console.log(`${chalk.yellow('[MESSAGE]')} ${chalk.gray(userState.username)}: "${message}"`);
    } else {
      console.log(`${chalk.yellow('[MESSAGE]')} ${chalk.gray(userState.username)}: ${chalk.red('FILTERED')}`);
    }
  }
})

client.connect();
