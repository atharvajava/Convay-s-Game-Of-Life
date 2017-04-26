import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
    @ViewChild("myCanvas") can: ElementRef; 

  pixelSize:any;
  numCells:any;
  canvas:any;
  con:any;
  arr:any;
  innerArr:any;


  constructor() { }

  ngOnInit() {
    this.pixelSize=4;
    this.numCells=160;
    let arr=this.buildArr();
    let can=(<HTMLElement>document.getElementById("myCanvas"));
    this.canvas=this.can;
    let c:CanvasRenderingContext2D=this.can.nativeElement.getContext("2d");
    this.con=c;

    this.canvas.width=this.pixelSize*this.numCells;
    this.manualSetup(arr);
    this.display(arr);

    setInterval(()=>{
                var newArr = this.step(arr);
                this.display(newArr);
                arr = newArr;
    }, 100);
  }

  buildArr(){
    this.arr=[];
    for(let i=0;i<this.numCells;i++){
      this.innerArr=[];
      for(let j=0;j<this.numCells;j++){
        this.innerArr.push(0);
      }
      this.arr.push(this.innerArr);
    }
    return this.arr;
  }

  display(arr){
    for(let x=0;x<this.arr.length;x++){
        for(let y=0;y<this.arr[x].length;y++){
          this.drawCell(x,y,this.arr[x][y]);
        }
    }
  }

  drawCell(x,y,alive){
    this.con.beginPath();
    this.con.rect(x*this.pixelSize,y*this.pixelSize,this.pixelSize,this.pixelSize);
    this.con.fillStyle=alive?'black':'#EEE';
    this.con.fill();
  }

  randomlyPopulate(arr){
    for(let x=0;x<arr.length;x++){
      for(let y=0;y<arr[x].length;y++){
        if(Math.log(Math.random()*10)<-0.6){
          arr[x][y]=1;
        }
      }
    }
  }

  manualSetup(arr){

    arr[30][10]=1;
    arr[30][11]=1;
    arr[30][12]=1;
    arr[30][13]=1;
    arr[30][14]=1;
    arr[30][15]=1;
    arr[30][16]=1;
    arr[30][17]=1;
    arr[30][18]=1;
    arr[30][19]=1;
    arr[31][10]=1;
    arr[32][10]=1;
    arr[33][10]=1;
    arr[34][10]=1;
    arr[35][10]=1;
    arr[36][10]=1;
    arr[37][10]=1;
    arr[38][10]=1;
    arr[39][10]=1;
    arr[40][11]=1;
    arr[40][12]=1;
    arr[40][13]=1;
    arr[40][14]=1;
    arr[40][15]=1;
    arr[40][16]=1;

    arr[40][70] = 1;   
    arr[41][70] = 1;   
    arr[42][70] = 1;   
    arr[43][70] = 1;   
    arr[44][70] = 1;   
    arr[45][70] = 1;   
    arr[46][70] = 1;   
    arr[47][70] = 1;
   
    arr[49][70] = 1;
    arr[70][70] = 1;
    arr[71][70] = 1;
    arr[72][70] = 1;
    arr[73][70] = 1;
    
    arr[67][70] = 1;
    arr[68][70] = 1;
    arr[69][70] = 1;
    
    arr[76][70] = 1;
    arr[77][70] = 1;
    arr[78][70] = 1;
    arr[79][70] = 1;
    arr[80][70] = 1;
    arr[81][70] = 1;
    arr[82][70] = 1;
    
    arr[84][70] = 1;
    arr[85][70] = 1;
    arr[86][70] = 1;
    arr[87][70] = 1;
    arr[88][70] = 1;
  }

  aliveNeighbors(arr,x,y){
    if(x > 0 && y > 0 && x < this.numCells-1 && y < this.numCells-1){
     var totalAlive =   arr[x-1][y-1]+
                        arr[x][y-1]+
                        arr[x+1][y-1]+
                        arr[x-1][y]+
                        arr[x+1][y]+
                        arr[x-1][y+1]+
                        arr[x][y+1]+
                        arr[x+1][y+1];
                        return totalAlive;
    }
    else{
      return 0;
    }
  }

  step(arr){
    var newArr = this.buildArr();
        for(var x = 0; x < arr.length; x++) {
                for(var y = 0; y < arr[x].length; y++) {
                        var cell = arr[x][y];
                        var alives = this.aliveNeighbors(arr, x,y);

                        if(cell == 1) {
                                if(alives < 2) {
                                        newArr[x][y] = 0;
                                } else if(alives == 2 || alives == 3) {
                                        newArr[x][y] = 1;
                                } else if(alives > 3) {
                                        newArr[x][y] = 0;
                                }
                        } else if(cell == 0 && alives == 3) {
                                newArr[x][y] = 1;
                        }
                    }   
                }
                //delete this.arr;
                return newArr;
            }


  }

