import { Component, OnInit ,ViewChild,ElementRef,Renderer2} from '@angular/core';

@Component({
  selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  //The view child tag is necessary so as to use canvas in angular 2
  //this gets the Element Reference directive to this component
  @ViewChild("myCanvas") can: ElementRef; 

  box:any;
  context:any;
  canvas:any;
  cord:any={
    x:0,
    y:0
  }

  constructor(private renderer:Renderer2) { }

  ngOnInit() {
    //This is how we initiate canvas in Angular 2
    let can=(<HTMLElement>document.getElementById("myCanvas"));
    this.canvas=this.can;
    let c:CanvasRenderingContext2D=this.can.nativeElement.getContext("2d");

    // this way of rendering mouse events helps target seperate greid on canvas which is not really possible when using
    // the (click) event on html element doesnt target seperate grid element
    // This is because that click event is attached to the whole canvas.
    this.renderer.listen(this.can.nativeElement, 'click', (evt) => {
    let boxSize=15;
    console.log('Clicking the button', evt);
    c.fillStyle = "black";
    c.fillRect(Math.floor(evt.offsetX / boxSize) * boxSize,
    Math.floor(evt.offsetY / boxSize) * boxSize,
    boxSize, boxSize);

    console.log(c)

    console.log("x="+Math.floor(evt.offsetX / boxSize) * boxSize,"Y="+Math.floor(evt.offsetY / boxSize) * boxSize);
    this.cord.x=Math.floor(evt.offsetX / boxSize) * boxSize;
    this.cord.y=Math.floor(evt.offsetY / boxSize) * boxSize;
    this.animate(evt);
});
    this.context=c;
    //context.fillStyle = 'blue';
    //context.fillRect(10, 10, 150, 150);//x-axis , y-axis , width , heigh
    this.init()
  }

// Canvas Initialization
  init(){
      this.box=new Image();
      this.box.src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/16777216colors.png/220px-16777216colors.png";
      this.drawCanvas();
  }

  // Draw board box logic
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
// animate Convay
animate(evt){
  let c=this.context;
  let boxSize=15;
  let x=this.cord.x;
  let y=this.cord.y;

  let left={x:x-15,y:y};
  let right={x:x+15,y:y};
  let down={x:x,y:y+15};
  let up={x:x,y:y-15};
  let leftUp={x:x-15,y:y-15};
  let rightUp={x:x+15,y:y-15};
  let leftDown={x:x-15,y:y+15};
  let rightDown={x:x+15,y:y+15};


  if(evt.isTrusted===true){
    if(c.fillStyle==="#000000"){
      c.fillStyle="#fff";
      c.fillRect(x,y,boxSize,boxSize);
      c.stroke();
      
    }
  }
  // c.fillRect(Math.floor(evt.offsetX / boxSize) * boxSize,
  //   Math.floor(evt.offsetY / boxSize) * boxSize,
  //   boxSize, boxSize);
}

}

