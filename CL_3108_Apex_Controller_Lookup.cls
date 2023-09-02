public with sharing class CL_3108_Apex_Controller_Lookup {

@AuraEnabled(cacheable=TRUE)
public static List<Event__c> getCustomLookupEvent (String eveName){
List<Event__c> eveLookupList =  NEW List<Event__c>();

IF(eveName != ''){
String EventName = '%' + eveName + '%';
eveLookupList = [SELECT Id, Event_Name__c FROM Event__c WHERE Event_Name__c LIKE:EventName];
RETURN eveLookupList;
}
RETURN eveLookupList;
}   


}