import { nconf, necessitate, inquire } from 'nquirer';
import Inquirer from 'inquirer';
import winston from 'winston';

import * as lineReader from 'line-reader';

import Player from './models/player';
import Table from './models/table';

import argvConfig from '../config/argv.json';
import defaultConfig from '../config/default-config.json';
import Tournament from './models/tournament';

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

    // Prompt for missing configurations via Inquirer questions.
    // Questions passed directly to Inquirer.
    // https://github.com/SBoudrias/Inquirer.js#questions

    // necessitate([{
    //   type: 'string',
    //   name: 'handsPath',
    //   message: 'Hands file path'
    // }]);

  }

  readFile(answers) {
    const tournament = new Tournament();

    lineReader.eachLine(answers.fileStreamPath, async (line) => {

      const table = new Table(line);

      const playerOne = new Player(table.handPlayerOne, answers.player1);
      const playerTwo = new Player(table.handPlayerTwo, answers.player2);

      console.log(line);

      if (table.winner) {
        table.winner === 'player2' ? tournament.pointsPlayerTwo++ : tournament.pointsPlayerOne++;
      }

      console.log(`                                                   `);
      console.log(`###################################################`);
      console.log(`---------------------------------------------------`);
      console.log(`########       ICM CONSULTING POKER       #########`);
      console.log(`---------------------------------------------------`);
      console.log(`                      |                            `);
      console.log(`                      |                            `);
      console.log(`                      |                            `);
      console.log(`                      V                            `);
      console.log(`---------------------------------------------------`);

      winston.log('info', `Table Winner: ${JSON.stringify(table.winner)}`);
      winston.log('info', `Player 1: ${JSON.stringify(playerOne.combinations)}`);
      winston.log('info', `Player 2: ${JSON.stringify(playerTwo.combinations)}`);

      console.log(`---------------------------------------------------`);
      console.log(`###################################################`);
      console.log(`                                                   `);

      winston.log('info', answers.player1 + ' points:' + tournament.pointsPlayerOne);
      winston.log('info', answers.player2 + ' points:' + tournament.pointsPlayerTwo);
      winston.log('info', 'Job complete.');

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
