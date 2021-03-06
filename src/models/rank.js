import Card from './card';
import { CARD_VALUES, ROYAL_SEQUENCE } from '../constants';

/**
 * Rank class calculates and processes scores
 * */
export default class Rank {

  constructor(hand) {
    this.hand = hand;
    this.combinations = this.getCombinations();
  }

  /**
   * Create array with all the combinations from players hands
   * @return {Array}
   * */
  getCombinations() {
    const combinationArray = [];
    if (this.isRoyalFlush()) combinationArray.push('ROYAL_FLUSH');
    if (this.isStraightFlush()) combinationArray.push('STRAIGHT_FLUSH');
    if (this.isFourOfAKind()) combinationArray.push('FOUR_OF_A_KIND');
    if (this.isFullHouse()) combinationArray.push('FULL_HOUSE');
    if (this.isFlush()) combinationArray.push('FLUSH');
    if (this.isStraight()) combinationArray.push('STRAIGHT');
    if (this.isThreeOfAKInd()) combinationArray.push('THREE_OF_A_KIND');
    if (this.isTwoPairs()) combinationArray.push('TWO_PAIRS');
    if (this.isPair()) combinationArray.push('PAIR');
    return combinationArray;
  }

  /**
   * Sort the values of the cards based on the poker sequence
   * @return {Array}
   * */
  sortValues() {
    const values = this.hand.map(card => {
      const cardObj = new Card(card);
      return cardObj.value;
    });
    return values.sort((a, b) => CARD_VALUES.indexOf(a) - CARD_VALUES.indexOf(b));
  }

  /**
   * Groups
   * */
  getRepeatedValues() {
    const sortedValues = this.sortValues(this.hand);
    let previous = null;
    let count = 0;
    const handCount = {};

    for (let index = 0; index <= sortedValues.length; index++) {
      if (sortedValues[index] !== previous) {
        if (count > 0) handCount[previous] = count;
        previous = sortedValues[index];
        count = 1;
      } else {
        count++;
      }
    }
    return handCount;
  }

  /**
   * Receive an object and a value and find
   * @param object
   * @param {string} value
   * @return {string}
   * */
  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  /**
   * Find the value of the highest rank to compare with other player
   * @param numberOfCardsOnRank
   * @return {number}
   * */
  getValueOfRank(numberOfCardsOnRank) {
    const handCount = this.getRepeatedValues();
    const valueHighestCard = this.getKeyByValue(handCount, numberOfCardsOnRank);
    return CARD_VALUES.indexOf(valueHighestCard);
  }


  /**
   * Calculate if hand has a Flush
   * @return {boolean}
   * */
  isFlush() {
    const suits = [...new Set(this.hand.map(card => {
      const cardObj = new Card(card);
      return cardObj.suit;
    }))];
    return suits.length === 1;
  }

  /**
   * Calculate if hand has a Straight
   * @return {boolean}
   * */
  isStraight() {
    // Order by first character based on the value order
    const valuesSorted = this.sortValues();

    const isAllCardsDifferent = [...new Set(valuesSorted)];
    if (isAllCardsDifferent.length !== 5) return false;

    return isAllCardsDifferent.every((num, i) => {
      const indexOfCurrentNumber = CARD_VALUES.indexOf(isAllCardsDifferent[i]);
      const indexOfNextNumber = CARD_VALUES.indexOf(isAllCardsDifferent[i + 1]);
      return (
        i === isAllCardsDifferent.length - 1 || indexOfNextNumber - indexOfCurrentNumber === 1
      );
    });
  }

  /**
   * Calculate if hand has a Straight Flush
   * @return {boolean}
   * */
  isStraightFlush() {
    return this.isFlush() && this.isStraight();
  }

  /**
   * Calculate if hand has a Royal Flush
   * @return {boolean}
   * */
  isRoyalFlush() {
    const valuesSorted = this.sortValues();
    const isRoyal = [...new Set(valuesSorted.map((card, index) => card === ROYAL_SEQUENCE[index]))];
    return isRoyal[0] && this.isFlush() && this.isStraight();
  }

  /**
   * Calculate if hand has a Four of a Kind
   * @return {boolean}
   * */
  isFourOfAKind() {
    const handCount = this.getRepeatedValues();
    const countsArray = Object.values(handCount).sort((a, b) => b - a);
    return countsArray[0] === 4;
  }

  /**
   * Calculate if hand has a Full house
   * @return {boolean}
   * */
  isFullHouse() {
    const handCount = this.getRepeatedValues();
    const countsArray = Object.values(handCount).sort();
    return countsArray[0] === 2 && countsArray[1] === 3;
  }

  /**
   * Calculate if hand has a Three of a Kind
   * @return {boolean}
   * */
  isThreeOfAKInd() {
    const handCount = this.getRepeatedValues();
    const countsArray = Object.values(handCount).sort((a, b) => b - a);
    return countsArray[0] === 3 && countsArray[1] === 1 && countsArray[2] === 1;
  }

  /**
   * Calculate if hand has a Two Pairs
   * @return {boolean}
   * */
  isTwoPairs() {
    const handCount = this.getRepeatedValues();
    const countsArray = Object.values(handCount).sort((a, b) => b - a);
    return countsArray[0] === 2 && countsArray[1] === 2 && countsArray[2] === 1;
  }

  /**
   * Calculate if hand has a Pair
   * @return {boolean}
   * */
  isPair() {
    const handCount = this.getRepeatedValues();
    const countsArray = Object.values(handCount).sort((a, b) => b - a);
    return countsArray[0] === 2 && countsArray[1] === 1 && countsArray[2] === 1;
  }
}
