import {Component, OnInit} from '@angular/core';
import {ObservableArray} from "data/observable-array";
import {Observable} from "data/observable";
import {AppConfig} from "../../shared/app.config";
import {Container} from "../../shared/container/container";
import {ContainerListComponent} from "../../pages/operations/container-list.component";
import {ContainerService} from '../../shared/container/container.service';

@Component({
  selector: 'my-app',
  templateUrl: "pages/operations/terminal.html",
  directives:[ContainerListComponent],
  providers:[ContainerService]
})
export class TerminalComponent implements OnInit {

  _isDataInitilized:boolean=false;

  public inboundContainers:ObservableArray<Container>;
  public outboundContainers:ObservableArray<Container>;

  constructor(private _containerService:ContainerService) {
    this.inboundContainers = new ObservableArray<Container>();
    this.outboundContainers = new ObservableArray<Container>();
  }

  ngOnInit(){
      this._containerService.getInboundContainers((cntr:Container) => { 
        var existingContainer = this._getContainerFromContainerList(this.inboundContainers, cntr);
        if(existingContainer) {
           existingContainer.isJobCompleted = cntr.isJobCompleted;
         }  
         else{
           this.inboundContainers.push(cntr);
         }
      });
        
      this._containerService.getOutboundContainers((cntr:Container) => {
        var existingContainer = this._getContainerFromContainerList(this.outboundContainers, cntr);
        if(existingContainer) {
           existingContainer.isJobCompleted = cntr.isJobCompleted;
         }  
         else{
           this.outboundContainers.push(cntr);
         }
      });
  }

  inboundJobChange(cntr:Container){ 
     this._containerService.updateInboundContainer(cntr).then((r)=>{
        console.log(r);
    },(e)=> console.log("update container error: "+ JSON.stringify(e)));
  }

  outboundJobChange(cntr:Container){
    this._containerService.updateOutboundContainer(cntr).then((r)=>{
        console.log(r);
    },(e)=> console.log("update container error: "+ JSON.stringify(e)));
  }

  private _getContainerFromContainerList(cntrList:ObservableArray<Container>, cntr:Container) : Container{
      
      cntrList.forEach(element => {
          if(element.cntrNumber === cntr.cntrNumber) 
              return element;
      });
      return null;
  }
}