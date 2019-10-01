import {Food} from './food';

export class Snake {
  xHead: number;
  yHead: number;

  xDirect: number;
  yDirect: number;

  tails: any;
  numberOfTails: number;

  food: Food;

  constructor() {
    this.xHead = this.yHead = 10;
    this.numberOfTails = 5;
    this.xDirect = 0;
    this.yDirect = 0;
    this.food = new Food();
    this.tails = [];
    this.food.foodGenerator();
  }
}
