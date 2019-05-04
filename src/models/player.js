/**
 * Player class
 * */
import Rank from './rank';

export default class Player {
  constructor(hand) {
    const rank = new Rank(hand);
    this.hand = hand;
    this.combinations = rank.combinations;
  }
}
