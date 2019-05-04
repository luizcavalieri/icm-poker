import { nconf, necessitate, inquire } from 'nquirer';
import winston from 'winston';

import Card from './models/card';
import Player from './models/player';
import Table from './models/table';

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

    // Prompt for missing configurations via Inquirer questions.
    // Questions passed directly to Inquirer.
    // https://github.com/SBoudrias/Inquirer.js#questions

    // necessitate([{
    //   type: 'string',
    //   name: 'handsPath',
    //   message: 'Hands file path'
    // }]);

  }

  run() {
    // Prompt for missing configurations and continue with application logic...
    return inquire().then(nconf => {
      const handsPath = nconf.get('handsPath');

      const table = new Table('TS TH TS TC QC QS TH AC AD AH');

      const playerOne = new Player(table.handPlayerOne);
      const playerTwo = new Player(table.handPlayerTwo);

      console.log(`###################################################`);
      console.log(`###################################################`);
      console.log(`---------------------------------------------------`);
      console.log(`                                                   `);
      console.log(`######## THIS IS THE ICM CONSULTING POKER #########`);
      console.log(`---------------------------------------------------`);
      console.log(`                      |                            `);
      console.log(`                      |                            `);
      console.log(`                      |                            `);
      console.log(`                      V                            `);
      console.log(`                                                   `);

      winston.log('info', `Table Winner: ${JSON.stringify(table.winner)}`);
      winston.log('info', `Player 1: ${JSON.stringify(playerOne.combinations)}`);
      winston.log('info', `Player 2: ${JSON.stringify(playerTwo.combinations)}`);

      winston.log('info', 'Job complete.');
      return [handsPath];
    });
  }

}

const instance = new Job();
export default instance;
