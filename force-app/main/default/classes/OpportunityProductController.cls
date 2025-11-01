/** 
 * @author Clem
 * @date 2025 
 */

public with sharing class OpportunityProductController {

    /** 
    * @name getOpportunityProductList
    * @description Controller pour récuper une liste d'OpportunityLineItem liés à une Opportunity 
    * @param Id opportunityId
    * @return List<OpportunityLineItem> Liste des OpportunityLineItem associés à l'Opportunity
    */

     @AuraEnabled (Cacheable=true)
    public static List<OpportunityLineItem> getOpportunityProductList(Id opportunityId) {
        return OpportunityProductSelector.getOpportunityProduct (opportunityId);
    }
    

    /** 
    * @name deleteOppLineItem
    * @description Controller pour supprimer un OpportunityLineItem
    * @param Id opportunityLineItemId
    * @return void
    */

    @AuraEnabled (Cacheable=false)
    public static void deleteOppLineItem (Id opportunityLineItemId) {
        OpportunityProductSelector.deleteItem (opportunityLineItemId);
    }
}