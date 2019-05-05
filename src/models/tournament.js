import * as lineReader from 'line-reader';

export default class Tournament {
  constructor() {
    this.defaultTournamenFileStream = '../data/poker-hands.txt';
    this.pointsPlayerOne = 0;
    this.pointsPlayerTwo = 0;
  }

  handleTournamentFileStream() {
    if (!this.tournamentHandsFilePath) this.tournamentHandsFilePath = this.defaultTournamenFileStream;

    const lines = [];
    lineReader.eachLine('../poker-hands.txt', function(line) {

      return line;
    });
  }
}
