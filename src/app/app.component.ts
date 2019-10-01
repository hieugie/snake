import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {Snake} from './snake';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('canvas', {static: false})
  canvas: ElementRef;
  context: any;
  snake: Snake;
  isOver: boolean;
  previusKey: string;


  ngAfterViewInit(): void {
    this.snake = new Snake();
    this.isOver = false;
    this.context = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
    this.previusKey = '';
    setInterval(() => {
      this.draw();
    }, 120);
  }

  draw() {
    if (this.snake.xHead < 0 || this.snake.xHead > 20 || this.snake.yHead < 0 || this.snake.yHead > 20) {
      this.isOver = true;
      this.snake.xDirect = 0;
      this.snake.yDirect = 0;
    }

    for(let i = 0; i < this.snake.tails.length; i++) {
      if (this.snake.tails[i].x === this.snake.xHead && this.snake.tails[i].y === this.snake.yHead) {
        this.isOver = true;
        this.snake.xDirect = 0;
        this.snake.yDirect = 0;
      }
    }

    if (this.snake.xHead === this.snake.food.x && this.snake.yHead === this.snake.food.y) {
      this.snake.numberOfTails ++;
      this.snake.food.foodGenerator();
    }

    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, 400, 400);

    this.context.fillStyle = 'red';
    this.context.fillRect(this.snake.food.x * 20, this.snake.food.y * 20, 18, 18);

    this.context.fillStyle = 'blue';
    for (let i = 0; i < this.snake.tails.length; i++) {
      if (i === this.snake.tails.length - 1) {
        this.context.fillStyle = 'green';
      } else {
        this.context.fillStyle = 'blue';
      }
      this.context.fillRect(this.snake.tails[i].x * 20, this.snake.tails[i].y * 20, 18, 18);
    }

    if (this.snake.xDirect !== 0 || this.snake.yDirect !== 0) {
      this.snake.tails.push({x: this.snake.xHead, y: this.snake.yHead});
      if (this.snake.tails.length > this.snake.numberOfTails) {
        this.snake.tails.shift();
      }

      this.snake.xHead += this.snake.xDirect;
      this.snake.yHead += this.snake.yDirect;
    }
  }

  @HostListener('document:keypress', ['$event'])
  move(evt: KeyboardEvent) {
    switch (evt.key) {
      case 'a':
        if (this.previusKey !== 'd') {
          this.snake.xDirect = -1;
          this.snake.yDirect = 0;
          this.previusKey = evt.key;
        }
        break;
      case 'd':
        if (this.previusKey !== 'a') {
          this.snake.xDirect = 1;
          this.snake.yDirect = 0;
          this.previusKey = evt.key;
        }
        break;
      case 'w':
        if (this.previusKey !== 's') {
          this.snake.xDirect = 0;
          this.snake.yDirect = -1;
          this.previusKey = evt.key;
        }
        break;
      case 's':
        if (this.previusKey !== 'w') {
          this.snake.xDirect = 0;
          this.snake.yDirect = 1;
          this.previusKey = evt.key;
        }
        break;
    }
  }

}
