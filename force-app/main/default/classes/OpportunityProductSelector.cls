public with sharing class OpportunityProductSelector {
   
   public static List <OpportunityLineItem> getOpportunityProduct(Id opportunityId) {

     return [SELECT Id, Product2Id, Product2.Name,UnitPrice, TotalPrice, Quantity, Product2.QuantityInStock__c FROM OpportunityLineItem WHERE OpportunityId = :opportunityId];
    
      }

    public static void deleteItem (Id opportunityLineItemId) {

      OpportunityLineItem itemToDelete = [SELECT Id FROM OpportunityLineItem WHERE Id = :opportunityLineItemId];
      
      System.debug('Avant la suppression de l\'élément');
      delete itemToDelete;
      System.debug('Suppression réussie pour Id : ' + opportunityLineItemId);
        }
    
}
