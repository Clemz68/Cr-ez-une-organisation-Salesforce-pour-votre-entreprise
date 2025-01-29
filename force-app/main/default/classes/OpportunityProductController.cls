public with sharing class OpportunityProductController {

     @AuraEnabled (Cacheable=true)
    public static List<OpportunityLineItem> getOpportunityProductList(Id opportunityId) {

    return OpportunityProductSelector.getOpportunityProduct (opportunityId);

    }
    // appel la classe selector pour récupérer le tableau 

    @AuraEnabled (Cacheable=false)
    public static void deleteOppLineItem (Id opportunityLineItemId) {
       
        OpportunityProductSelector.deleteItem (opportunityLineItemId);
       
    }
    // appel la classe selector pour supprimer l'enregistrement
}