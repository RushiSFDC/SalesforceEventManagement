import { LightningElement, track} from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

import ATTENDESS_OBJECT_NAME from '@salesforce/schema/Attendees__c.Attendee_Name__c';
import ATTENDESS_OBJECT_EMAIL from '@salesforce/schema/Attendees__c.Email__c';
import ATTENDESS_OBJECT_REGISTRATIONDATE from '@salesforce/schema/Attendees__c.Registration_Date__c';
import ATTENDESS_OBJECT_EVENT from '@salesforce/schema/Attendees__c.Events__c';
import ATTENDESS_OBJECT_STATUS from '@salesforce/schema/Attendees__c.Status__c';

export default class Lwc_3108_attendeesfrom extends NavigationMixin(LightningElement) {

    @track dateTimeValue;
    @track attendeeName;
    @track email;
    @track registrationDate;
    @track status = 'Registered';

    @track attendeeNameError;
    @track emailError;
    @track registrationDateError;
    @track statusError;

    statusOptions = [
        { label: 'Registered', value: 'Registered' },
        { label: 'Un Registered', value: 'Un Registered' },
    ];

    connectedCallback()
    {
        this.registrationDate = new Date().toISOString();
    }

    handleSubmit(event) {

        if (this.isFormValid())
        {
            const fields = {};
            fields[ATTENDESS_OBJECT_NAME.fieldApiName] = this.attendeeName;
            fields[ATTENDESS_OBJECT_EMAIL.fieldApiName] = this.email;
            fields[ATTENDESS_OBJECT_REGISTRATIONDATE.fieldApiName] = this.registrationDate;
            fields[ATTENDESS_OBJECT_EVENT.fieldApiName] = this.selectedContactId;
            fields[ATTENDESS_OBJECT_STATUS.fieldApiName] = this.status;
    
            const recordData = { apiName:'Attendees__c', fields };
    
            try 
            {
    
                createRecord(recordData).then((record) => {
                    this.atteId=record.id;
                    const evt = new ShowToastEvent({
                    title: 'Success - Attendess',
                    message: 'Attendess Record Created Sucessfully ',
                    variant: 'success',
             });  
                 this.dispatchEvent(evt);
    
                 this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: this.atteId ,
                        objectApiName: 'Attendees__c',
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
        else {
            if (this.attendeeName.trim() === '') {
                this.attendeeNameError = 'Attendee Name is required';
            }
            if (this.email.trim() === '') {
                this.emailError = 'Email is required';
            }
            if (this.registrationDate.trim() === '') {
                this.registrationDateError = 'Registration Date is required';
            }
            if (this.status.trim() === '') {
                this.statusError = 'Status is required';
            }
        }

    }

    isFormValid() {
        return (
            this.attendeeName.trim() !== '' &&
            this.email.trim() !== '' &&
            this.registrationDate !== '' &&
            this.status.trim() !== ''
        );
    }


    handleNameChange(event) {
        this.attendeeName = event.target.value;
        this.attendeeNameError = '';
    }

    handleEmailChange(event) {
        this.email = event.target.value;
        this.emailError = ''; 
    }

    handleDateTimeChange(event) {
        this.registrationDate = event.target.value;
        this.registrationDateError = '';
    }

    handleStatusChange(event) {
        this.status = event.detail.value;
        this.statusError = ''; 
    }

    myLookupHandle(event){
        console.log(event.detail);
        this.selectedContactId = event.detail;
    }
    
}

