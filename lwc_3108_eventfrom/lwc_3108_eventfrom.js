import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

import EVENT_OBJECT_NAME from '@salesforce/schema/Event__c.Event_Name__c';
import EVENT_OBJECT_DATE from '@salesforce/schema/Event__c.Event_Date__c';
import EVENT_OBJECT_LOCATION from '@salesforce/schema/Event__c.Location__c';
import EVENT_OBJECT_CAPACITY from '@salesforce/schema/Event__c.Capacity__c';
import EVENT_OBJECT_STATUS from '@salesforce/schema/Event__c.Status__c';
import EVENT_OBJECT_REGISTRATION_DEADLINE from '@salesforce/schema/Event__c.Registration_Deadline__c';

export default class Lwc_3108_eventfrom extends NavigationMixin(LightningElement) {

    @track eventName;
    @track eventDate;
    @track eventLocation;
    @track eventCapacity;
    @track eventStatus;
    @track eventRegistration;

    statusOptions = [
        { label: 'Planned', value: 'Planned' },
        { label: 'Canceled', value: 'Canceled' },
    ];

    
     createEvent() {

        console.log('EventName: '+this.eventName);
        console.log('eventDate: '+this.eventDate);
        console.log('evenLocation: '+this.eventLocation);
        console.log('eventCapacity: '+this.eventCapacity);
        console.log('eventstatus: '+this.eventStatus);
        console.log('eventRegistration: '+this.eventRegistration);

        const fields = {};
        fields[EVENT_OBJECT_NAME.fieldApiName] = this.eventName;
        fields[EVENT_OBJECT_DATE.fieldApiName] = this.eventDate;
        fields[EVENT_OBJECT_LOCATION.fieldApiName] = this.eventLocation;
        fields[EVENT_OBJECT_CAPACITY.fieldApiName] = this.eventCapacity;
        fields[EVENT_OBJECT_STATUS.fieldApiName] = this.eventStatus;
        fields[EVENT_OBJECT_REGISTRATION_DEADLINE.fieldApiName] = this.eventRegistration;

        const recordData = { apiName:'Event__c', fields };

        try 
        {

            createRecord(recordData).then((record) => {
                this.eveId=record.id;
                const evt = new ShowToastEvent({
                title: 'Success - Event',
                message: 'Event Record Created Sucessfully ',
                variant: 'success',
         });  
             this.dispatchEvent(evt);

             this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.eveId ,
                    objectApiName: 'Event__c',
                    actionName: 'view'
                },
            });

              })
        } 
        catch (error) 
        {
            console.error('Error creating event', error);
        }
    }


    handleEventNameChange(event) {
        this.eventName = event.target.value;
    }

    handleEventDateChange(event)
    {
        this.eventDate=event.target.value;
    }

    handleEventLocationChange(event) {
        this.eventLocation = event.target.value;
    }

    handleEventStatusChange(event) {
        this.eventStatus = event.target.value;
    }

    handleEventCapacityChange(event) {
        this.eventCapacity = parseInt(event.target.value);
    }

    handleDateTimeChange(event) {
        this.eventRegistration = event.target.value;
    }
   
}

