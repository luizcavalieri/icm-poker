import { nconf } from 'nquirer';
import Inquirer from 'inquirer';
import winston from 'winston';

import * as lineReader from 'line-reader';

import Player from './models/player';
import Table from './models/table';
import Tournament from './models/tournament';

import { PLAYER_2 } from '../babel/constants';
import argvConfig from '../config/argv.json';
import defaultConfig from '../config/default-config.json';

export class Job {

  configure() {

    // Default nconf configuration
    // https://github.com/indexzero/nconf
    nconf
      .argv(argvConfig)
      .env()
      .defaults(defaultConfig)
      .file('default-config.json');

    // Logging
    // https://github.com/winstonjs/winston#logging-levels
    winston.level = nconf.get('logLevel');

  }

  readFile(answers) {
    const tournament = new Tournament();

    lineReader.eachLine(`../poker-hands.txt`, async (line) => {

      const table = new Table(line);

      const playerOne = new Player(table.handPlayerOne, answers.player1);
      const playerTwo = new Player(table.handPlayerTwo, answers.player2);

      if (table.winner) {
        table.winner === PLAYER_2 ? tournament.pointsPlayerTwo++ : tournament.pointsPlayerOne++;
      }

      console.log(`                                                   `);
      console.log(`###################################################`);
      console.log(`---------------------------------------------------`);
      console.log(`########       ICM CONSULTING POKER       #########`);
      console.log(`---------------------------------------------------`);
      winston.log('info', `Table: ${line}`);
      winston.log('info', `Table Winner: ${JSON.stringify(table.winner)}`);
      winston.log('info', `Player 1: ${JSON.stringify(playerOne.combinations)}`);
      winston.log('info', `Player 2: ${JSON.stringify(playerTwo.combinations)}`);
      console.log(`                                                   `);
      console.log(`                                                   `);
      console.log(`########   THIS ROUND ACCUMULATED SCORE   #########`);
      console.log(`---------------------------------------------------`);
      console.log(`                      |                            `);
      console.log(`                      |                            `);
      console.log(`                      |                            `);
      console.log(`                      V                            `);
      console.log(`---------------------------------------------------`);
      winston.log('info', answers.player1 + ' points:' + tournament.pointsPlayerOne);
      winston.log('info', answers.player2 + ' points:' + tournament.pointsPlayerTwo);
      console.log(`---------------------------------------------------`);
      console.log(`###################################################`);
      console.log(`                                                   `);
      winston.log('info', 'Round Finished.');
    });
  }

  run() {
    // Prompt for missing configurations and continue with application logic...
    const prompt = Inquirer.createPromptModule();
    return prompt(argvConfig).then(answers => {
      this.readFile(answers);
    });
  }
}

const instance = new Job();
export default instance;
