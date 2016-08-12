import {Component,Input, Output, EventEmitter} from '@angular/core';
import observable = require("data/observable");
import {Container} from "../../shared/container/container";
import {ObservableArray} from "data/observable-array";

@Component({
  selector: 'containerlist',
  templateUrl: "pages/operations/container-list.html"
})
export class ContainerListComponent {

  @Input() containers:ObservableArray<Container>;  
  @Output() jobchange = new EventEmitter();
  constructor() {    
        
  }
  
  
  switchPropertyChange(args){
    var cntr = this.containers.getItem(args.index);
    this.jobchange.emit(args);
  }
}