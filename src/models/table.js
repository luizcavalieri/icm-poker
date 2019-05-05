import { CARD_VALUES, RANKS } from '../constants';
import Rank from './rank';

/**
 * Card class used to instantiate card values
 * */
export default class Table {
  constructor(cardString) {
    this.cardArray = cardString.split(' ');
    this.handPlayerOne = this.cardArray.slice(0, 5);
    this.handPlayerTwo = this.cardArray.slice(5);
    this.resultPlayerOne = this.getResultPlayer(this.handPlayerOne);
    this.resultPlayerTwo = this.getResultPlayer(this.handPlayerTwo);
    this.winner = this.getWinner();
  }

  getResultPlayer(hand) {
    const rank = new Rank(hand);
    return rank.combinations;
  }

  getWinner() {
    const players = { player1: [], player2: [] };
    players.player1 = this.resultPlayerOne.map(rank => {
      return RANKS.indexOf(rank);
    }).sort((a, b) => b - a);

    players.player2 = this.resultPlayerTwo.map(rank => {
      return RANKS.indexOf(rank);
    }).sort((a, b) => b - a);

    const highestRankPlayer1 = Math.max(players.player1);
    const highestRankPlayer2 = Math.max(players.player2);
    let winner = null;
    let hasFoundWinner = false;

    if (highestRankPlayer1 !== highestRankPlayer2) {
      highestRankPlayer2 > highestRankPlayer1 ? winner = 'player2' : winner = 'player1';
      hasFoundWinner = true;
    } else if (this.resultPlayerTwo[0] === this.resultPlayerOne[0]) {
      console.log('Hand Players', this.resultPlayerTwo[0]);
      switch (this.resultPlayerTwo[0]) {
        case 'PAIRS':
          break;
        case 'TWO_PAIRS':
          break;
        case 'THREE_OF_A_KIND':
          break;
        case 'FOUR_OF_A_KIND':
          break;
      }
      hasFoundWinner = true;
    } else {
      hasFoundWinner = false;
    }

    if (!hasFoundWinner) {
      //  Check what is the highest number
      const highestCardPlayer1 = Math.max(
        ...this.handPlayerTwo.map((card) => CARD_VALUES.indexOf(card))
      );
      const highestCardPlayer2 = Math.max(
        ...this.handPlayerOne.map((card) => CARD_VALUES.indexOf(card))
      );
      highestCardPlayer2 > highestCardPlayer1 ? winner = 'player2' : winner = 'player1';
    }

    return winner;
  }
}
