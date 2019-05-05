import Rank from './rank';

/**
 * Player class used to instantiate player object
 * */
export default class Player {
  constructor(hand, name) {
    const rank = new Rank(hand);
    this.hand = hand;
    this.name = name;
    this.combinations = rank.combinations;
    this.points = 0;
  }
}
