public with sharing class OpportunityProductController {

     @AuraEnabled (Cacheable=true)
    public static List<OpportunityLineItem> getOpportunityProductList(Id opportunityId) {

    return OpportunityProductSelector.getOpportunityProduct (opportunityId);

    }

    @AuraEnabled (Cacheable=false)
    public static void deleteOppLineItem (Id opportunityLineItemId) {
       
        OpportunityProductSelector.deleteItem (opportunityLineItemId);
       
    }
}