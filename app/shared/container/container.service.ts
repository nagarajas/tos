import { Injectable } from '@angular/core';
import firebase = require("nativescript-plugin-firebase");
import {BaseService} from "../../shared/base.service";
import {Container} from '../../shared/container/container';

@Injectable()
export class ContainerService extends BaseService {

    constructor() {
        super();
     }

    getInboundContainers(dataReceived:(data:Container)=> void){
         this._getContainers("/inbound",dataReceived);
    }

    getOutboundContainers(dataReceived:(data:Container)=> void){
         this._getContainers("/outbound",dataReceived);
    }

    updateInboundContainer(cntr:Container){
        //return this._getContainerNode("/inbound", cntr);
        return firebase.setValue("/inbound/"+cntr.cntrNumber, {"isJobCompleted": cntr.isJobCompleted});
    }


    updateOutboundContainer(cntr:Container){
       // return this._getContainerNode("/outbound", cntr);
        return firebase.setValue("/outbound/"+cntr.cntrNumber, {"isJobCompleted": cntr.isJobCompleted});
    }

    private _getContainers(path:string, dataReceived:(data:Container)=> void){
        var that = this;
        var onRecieveEvent = function(result) {
            console.log(result);
            if (result.error) {
                return that._handleError(result.error);
            } else {
                // only when new child added
                //if(result.type === "ChildAdded"){
                var cntr = new Container(result.key,result.value.isJobCompleted);
                dataReceived(cntr);
                //}
            }
        };
        firebase.query(
            onRecieveEvent,
            path,
            {
                // order by job completion
                orderBy: {
                    type: firebase.QueryOrderByType.KEY
                },
                // only the first 20  matches
                limit: {
                    type: firebase.QueryLimitType.FIRST,
                    value: 20
                }
            }).catch(this._handleError);
     }

}