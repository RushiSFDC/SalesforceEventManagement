import { LightningElement,track,wire } from 'lwc';
import getCustomLookupEvent from '@salesforce/apex/CL_3108_Apex_Controller_Lookup.getCustomLookupEvent';

export default class Lwc_3108_custom_event_lookup_field extends LightningElement {

 
 @track eventName='';
 @track eventList=[];
 @track objectApiName='Event__c';
 @track Id
 @track isShow=false;
 @track messageResult=false;
 @track isShowResult = true;
 @track showSearchedValues = false;
 

 @wire(getCustomLookupEvent,{eveName:'$eventName'})
 function ({error,data}){
     this.messageResult=false;
     if(data){  
         if(data.length>0 && this.isShowResult){
            this.eventList =data;
            this.showSearchedValues=true;
            this.messageResult=false;
         }
         else if(data.length == 0){
            this.eventList=[];
            this.showSearchedValues=false;
            if(this.eventName != ''){
               this.messageResult=true;
            }
         }
         else if(error){
             this.Id='';
             this.eventName='';
             this.eventList=[];
             this.showSearchedValues=false;
             this.messageResult=true;
         }
 
     }
 }

 searchHandleClick(event){
  this.isShowResult = true;
  this.messageResult = false;
}
 
 
searchHandleKeyChange(event){
  this.messageResult=false;
  this.eventName = event.target.value;
}
 
parentHandleAction(event){        
    this.showSearchedValues = false;
    this.isShowResult = false;
    this.messageResult=false;
    this.Id =  event.target.dataset.value;
    this.eventName =  event.target.dataset.label;  
    console.log(this.eventName) ;     
    const selectedEvent = new CustomEvent('selected', { detail: this.Id });
    this.dispatchEvent(selectedEvent);    
}

myLookupHandle(event){
    console.log(event.detail);
    this.selectedContactId = event.detail;
}
}