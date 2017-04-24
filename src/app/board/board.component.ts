import { Component, OnInit ,ViewChild,ElementRef,Renderer2} from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @ViewChild("myCanvas") can: ElementRef; 

  box:any;
  context:any;
  canvas:any;

  setting:any={
    rows:10,
    cols:10,
    width:30,
    height:30,
    fps:30
  };

  constructor(private renderer:Renderer2) { }

  ngOnInit() {
    let can=(<HTMLElement>document.getElementById("myCanvas"));
    this.canvas=this.can;
    let c:CanvasRenderingContext2D=this.can.nativeElement.getContext("2d");
    this.renderer.listen(this.can.nativeElement, 'click', (evt) => {
    console.log('Clicking the button', evt);
});
    this.context=c;
    //context.fillStyle = 'blue';
    //context.fillRect(10, 10, 150, 150);//x-axis , y-axis , width , heigh
    this.init()
  }

  init(){
      this.box=new Image();
      this.box.src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/16777216colors.png/220px-16777216colors.png";
      this.drawCanvas();
  }
  drawCanvas(){
    let c=this.context;
    let boxSize = 15,
    boxes = Math.floor(600 / boxSize);
    c.beginPath();
    c.fillStyle = "white";
    c.lineWidth = 1;
    c.strokeStyle = 'green';
    for (var row = 0; row < boxes; row++) {
      for (var column = 0; column < boxes; column++) {
        var x = column * boxSize;
        var y = row * boxSize;
        c.rect(x, y, boxSize, boxSize);
        c.fill();
        c.stroke();
      }
    }
  c.closePath();
}
}

