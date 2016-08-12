import {Component, OnInit} from '@angular/core';
import {ObservableArray} from "data/observable-array";
import {Observable} from "data/observable";
import {ListView} from "ui/list-view";
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
  _inboundListview:ListView;
  _outboundListView:ListView;

  public inboundContainers:ObservableArray<Container>;
  public outboundContainers:ObservableArray<Container>;

  constructor(private _containerService:ContainerService) {
    this.inboundContainers = new ObservableArray<Container>();
    this.outboundContainers = new ObservableArray<Container>();
  }

  ngOnInit(){
      this._containerService.getInboundContainers((cntr: Container) => { 
        var existingContainer = this._getContainerFromContainerList(this.inboundContainers, cntr);
        if(existingContainer) {
          if(existingContainer.isJobCompleted !== cntr.isJobCompleted)
           existingContainer.isJobCompleted = cntr.isJobCompleted;
           if(this._inboundListview)
              this._inboundListview.refresh();
         }  
         else{
           this.inboundContainers.push(cntr);
         }
      });
        
      this._containerService.getOutboundContainers((cntr:Container) => {
       var existingContainer = this._getContainerFromContainerList(this.outboundContainers, cntr);
        if(existingContainer) {
          if(existingContainer.isJobCompleted !== cntr.isJobCompleted)
           existingContainer.isJobCompleted = cntr.isJobCompleted;
           if(this._outboundListView)
              this._outboundListView.refresh();
         }  
         else{
           this.outboundContainers.push(cntr);
         }
      });
  }
  

  inboundJobChange(args){ 
    let cntr= args.cntr;
    this._inboundListview = args.listview;
     this._containerService.updateInboundContainer(cntr).then((r)=>{
        console.log(r);
    },(e)=> console.log("update container error: "+ JSON.stringify(e)));
  }

  outboundJobChange(args){
    let cntr= args.cntr;
    this._outboundListView = args.listview;
    this._containerService.updateOutboundContainer(cntr).then((r)=>{
        console.log(r);
    },(e)=> console.log("update container error: "+ JSON.stringify(e)));
  }

  private _getContainerFromContainerList(cntrList:ObservableArray<Container>, cntr:Container) : Container{
      let list = cntrList.filter((element) => { return element.cntrNumber == cntr.cntrNumber });
      return (list) ? list[0] : null;
  }
}