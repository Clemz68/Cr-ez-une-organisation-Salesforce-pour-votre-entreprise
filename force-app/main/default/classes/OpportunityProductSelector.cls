/** 
 * @author Clem
 * @date 2025 
 */

public with sharing class OpportunityProductSelector {
   
  /** 
   * @name getOpportunityProduct
   * @description Récupère une liste d'OpportunityLineItem liés à une Opportunité
   * @param Id opportunityId
   * @return List<OpportunityLineItem> Liste des OpportunityLineItem associés à l'Opportunity
   */

  public static List <OpportunityLineItem> getOpportunityProduct(Id opportunityId) {
     return [SELECT Id, Product2Id, Product2.Name, UnitPrice, TotalPrice, Quantity, Product2.QuantityInStock__c FROM OpportunityLineItem WHERE OpportunityId = :opportunityId];
  }

  /** 
   * @name deleteItem
   * @description Récupère un OpportunityLineItem pour le supprimer
   * @param Id opportunityLineItemId
   * @return void
  */

  public static void deleteItem (Id opportunityLineItemId) {
    OpportunityLineItem itemToDelete = [SELECT Id FROM OpportunityLineItem WHERE Id = :opportunityLineItemId];
    delete itemToDelete; 
  }
}
