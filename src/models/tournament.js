import * as lineReader from 'line-reader';

export default class Tournament {
  constructor() {
    this.defaultTournamenFileStream = 'poker-hands.txt';
    this.pointsPlayerOne = 0;
    this.pointsPlayerTwo = 0;
    this.finalScore = { player1: this.pointsPlayerOne, player2: this.pointsPlayerTwo };
  }

  handleTournamentFileStream() {
    if (!this.tournamentHandsFilePath) this.tournamentHandsFilePath = this.defaultTournamenFileStream;

    const lines = [];
    lineReader.eachLine('../poker-hands.txt', function(line) {

      return line;
    });
  }
}
