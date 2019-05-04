import { RANKS } from '../constants';
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

    const biggerPlayer1 = Math.max(players.player1);
    const biggerPlayer2 = Math.max(players.player2);
    let winner = null;

    if (biggerPlayer1 !== biggerPlayer2) {
      biggerPlayer2 > biggerPlayer1 ? winner = 'player2' : winner = 'player1';
    }

    return winner;
  }
}
