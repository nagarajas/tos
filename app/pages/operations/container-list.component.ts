import {Component,Input, Output, EventEmitter, ElementRef,ViewChild, OnInit} from '@angular/core';
import {Observable} from "data/observable";
import {Container} from "../../shared/container/container";
import {ObservableArray} from "data/observable-array";

@Component({
  selector: 'containerlist',
  templateUrl: "pages/operations/container-list.html"
})
export class ContainerListComponent implements OnInit {

  @Input() containers:ObservableArray<Container>;  
  @Output() jobchange = new EventEmitter();
  @ViewChild("cntrlist") cntrlist: ElementRef;

  constructor() {    
        
  }

  ngOnInit(){
     
  }

  switchPropertyChange(args){
    this.jobchange.emit({cntr:args,listview:this.cntrlist.nativeElement});
  }
}