/**
 * Card class used to instantiate card values
 * */
export default class Card {
  constructor(card) {
    this.card = card;
    this.suit = card.slice(1, 2);
    this.value = card.slice(0, 1);
  }

  getValue() {
    this.value = this.card.slice(0, 1);
    return this.value;
  }

  getSuit() {
    this.suit = this.card.slice(1, 2);
    return this.suit;
  }
}
