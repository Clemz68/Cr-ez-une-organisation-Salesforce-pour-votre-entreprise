public with sharing class OpportunityProductController {

     @AuraEnabled (Cacheable=true)
    public static List<OpportunityLineItem> getOpportunityProductList(Id opportunityId) {

    return OpportunityProductSelector.getOpportunityProduct (opportunityId);

    }

    @AuraEnabled (Cacheable=false)
    public static void deleteOppLineItem (Id opportunityLineItemId) {
        System.debug('avant le if');
        if (opportunityLineItemId == null) {
            throw new IllegalArgumentException('L\'Id de l\'OpportunityLineItem est null.');
        }
        System.debug('apres le if');
        OpportunityProductSelector.deleteItem (opportunityLineItemId);
       
    }
}