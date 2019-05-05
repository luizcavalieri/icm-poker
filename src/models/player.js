/**
 * Player class
 * */
import Rank from './rank';

export default class Player {
  constructor(hand, name) {
    const rank = new Rank(hand);
    this.hand = hand;
    this.name = name;
    this.combinations = rank.combinations;
    this.points = this.calculatePoints();
  }

  calculatePoints() {
    // add points to player
  }
}
