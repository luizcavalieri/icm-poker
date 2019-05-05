import { CARD_VALUES, PLAYER_1, PLAYER_2, RANKS } from '../constants';
import Card from './card';
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

  /**
   * Get the winner --> can be refactored and some calculations can be sent to its class
   * @return {string}
   * */
  getWinner() {
    const players = { player1: [], player2: [] };

    // Get array of ranks sorted in crescent order
    players.player1 = this.resultPlayerOne.map(rank => {
      return RANKS.indexOf(rank);
    }).sort((a, b) => b - a);
    players.player2 = this.resultPlayerTwo.map(rank => {
      return RANKS.indexOf(rank);
    }).sort((a, b) => b - a);

    // Get the first highest number
    const highestRankPlayer1 = Math.max(players.player1);
    const highestRankPlayer2 = Math.max(players.player2);

    let winner = null;

    // Set if the winner was found
    let hasFoundWinner = false;

    // Check if there is draw in the ranks
    if (highestRankPlayer1 !== highestRankPlayer2) {
      highestRankPlayer2 > highestRankPlayer1 ? winner = PLAYER_2 : winner = PLAYER_1;
      hasFoundWinner = true;

      // Check if the highest ranks are the same
    } else if (
      this.resultPlayerTwo.length
      && this.resultPlayerOne.length
      && this.resultPlayerTwo[0] === this.resultPlayerOne[0]
    ) {


      const rankPlayer1 = new Rank(this.handPlayerOne);
      const rankPlayer2 = new Rank(this.handPlayerTwo);
      let highestRankValuePlayerOne = 0;
      let highestRankValuePlayerTwo = 0;

      // Evaluate the highest rank between the two players in case draw in the ranks
      switch (this.resultPlayerTwo[0]) {
        case 'PAIR':
          highestRankValuePlayerOne = rankPlayer1.getValueOfRank(2);
          highestRankValuePlayerTwo = rankPlayer2.getValueOfRank(2);
          break;
        case 'TWO_PAIRS':
          highestRankValuePlayerOne = rankPlayer1.getValueOfRank(2);
          highestRankValuePlayerTwo = rankPlayer2.getValueOfRank(2);
          break;
        case 'THREE_OF_A_KIND':
          highestRankValuePlayerOne = rankPlayer1.getValueOfRank(3);
          highestRankValuePlayerTwo = rankPlayer2.getValueOfRank(3);
          break;
        case 'FOUR_OF_A_KIND':
          highestRankValuePlayerOne = rankPlayer1.getValueOfRank(4);
          highestRankValuePlayerTwo = rankPlayer2.getValueOfRank(4);
          break;
      }
      highestRankValuePlayerTwo > highestRankValuePlayerOne ? winner = PLAYER_2 : winner = PLAYER_1;
      hasFoundWinner = true;
    }

    // Check what is the highest number if no player has a rank or if the ranks are the same
    if (!hasFoundWinner) {
      const arrayOfIndexesPlayer1 = this.handPlayerOne.map((card) => {
        const cardCheckingPlayer1 = new Card(card);
        return CARD_VALUES.indexOf(cardCheckingPlayer1.value);
      }).sort((a, b) => a - b);
      const arrayOfIndexesPlayer2 = this.handPlayerTwo.map((card) => {
        const cardCheckingPlayer2 = new Card(card);
        return CARD_VALUES.indexOf(cardCheckingPlayer2.value);
      }).sort((a, b) => a - b);

      let highestCardPlayer1 = Math.max(...arrayOfIndexesPlayer1);
      let highestCardPlayer2 = Math.max(...arrayOfIndexesPlayer2);

      // Keep checking until finding the highest card in the table
      while (highestCardPlayer2 === highestCardPlayer1) {
        highestCardPlayer1 = Math.max(...arrayOfIndexesPlayer1.splice(arrayOfIndexesPlayer1.indexOf(highestCardPlayer1), 1));
        highestCardPlayer2 = Math.max(...arrayOfIndexesPlayer2.splice(arrayOfIndexesPlayer2.indexOf(highestCardPlayer2), 1));
      }

      highestCardPlayer2 > highestCardPlayer1 ? winner = PLAYER_2 : winner = PLAYER_1;
    }

    return winner;
  }
}
