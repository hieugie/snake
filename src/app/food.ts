export class Food {
  x: number;
  y: number;

  foodGenerator() {
    this.x = Math.floor(Math.random() * 20);
    this.y = Math.floor(Math.random() * 20);
  }
}
