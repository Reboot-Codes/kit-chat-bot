import tmi from 'tmi.js';
import chalk from 'chalk';
import axios from 'axios';

const channels = [
  'kitboga'
];

console.log(`${chalk.blue('[INFO]')} Bot Starting...`);

let prohibited = []
const badWordList = 'http://www.bannedwordlist.com/lists/swearWords.txt';
await axios.get(badWordList).then((res) => {
  if (res.status == 200) {
    console.log(`${chalk.green('[SUCCESS]')} Fetched Bad Word List!`);
    res.data.split('\n').forEach((line) => { prohibited.push(line); });
  } else {
    console.error(`${chalk.red('[ERROR]')} Could not get bad words list from ${chalk.underline(badWordList)}!`);
  }
}).catch((err) => {
  console.error(`${chalk.red('[ERROR]')} Could not get bad words list from ${chalk.underline(badWordList)}!`);
  console.error(err);
});

function checker(value) {
  for (var i = 0; i < prohibited.length; i++) {
    if (value.toLowerCase().indexOf(prohibited[i].toLowerCase()) > -1) {
      return false;
    }
  }
  return true;
}

const TMI_OPTIONS = {
  channels
}

const client = new tmi.Client(TMI_OPTIONS);

client.on('connected', (address, port) => {
  console.log(`${chalk.green('[SUCCESS]')} Connected to ${chalk.yellow(`${address}:${port}`)}!`);
  console.log(`${chalk.blue('[INFO]')} Listening to the following channels: ${chalk.cyan(`${channels.join(', ')}`)}`);
});

client.on('message', (channel, userState, message) => {
  if (channels.includes(channel)) {
    if (checker(message)) {
      console.log(`${chalk.yellow('[MESSAGE]')} ${chalk.cyan(channel)}:${chalk.gray(`@${userState.username}`)}: ${chalk.bold(message)}`);
    } else {
      console.log(`${chalk.yellow('[MESSAGE]')} ${chalk.cyan(channel)}:${chalk.gray(`@${userState.username}`)}: ${chalk.red('(filtered)')} ${chalk.bold(message)}`);
    }
  }
})

client.connect();
