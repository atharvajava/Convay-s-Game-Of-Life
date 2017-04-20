import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  update:any;
  draw:any;
  start:any;
  running:any;
  isDebug:any;

  constructor() { }

  ngOnInit() {
  }

  game(){
    let me=this;
    me.running=false;
    me.isDebug=true;
    me.update=(delta)=>{
      
    }
    me.draw=(delta)=>{

    }
    me.start=()=>{
      me.running=true;

      let lastTime=Date.now();
      (function mainloop(){
        if(!me.running) return;

        let current=Date.now();
        let elapsed=current-lastTime;
        window.requestAnimationFrame(mainloop);

        //Update /Draw
        me.update(elapsed);
        me.draw(elapsed);

        lastTime=current;
      })();
    }
    return me;
  }
}
