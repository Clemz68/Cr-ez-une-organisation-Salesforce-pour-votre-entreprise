/** 
 * @author Clem
 * @date 2025 
 */

@IsTest
private class OpportunityProductSelectorTest {

    /** 
    * @name setUpData
    * @description Génére les data de l'environnement de test 
    */

    @TestSetup
    static void setUpData(){
        OpportunityLineItem testOppLineItem = OpportunityProductFactory.createTestOpportunityLineItem();
    }

    /** 
     * @name testGetOppLineItem
     * @description teste la méthode getOpportunityProduct du selector
     * @param Id opportunityId de test
     * @return void
     */
    
    @IsTest
    static void testGetOppLineItem(){
        Opportunity testOpp = [SELECT Id FROM Opportunity LIMIT 1];
        Test.startTest();
            List<OpportunityLineItem> results = OpportunityProductSelector.getOpportunityProduct(testOpp.Id);
        Test.stopTest();
        Assert.areNotEqual(0, results.size(), 'Should return at least one OppLineItem');
    }

    /** 
     * @name testDeleteItem
     * @description test du selector pour la suppression de l'enregistrement de test
     * @param Id opportunityLineItemId de test
     * @return void
     */
    
    @IsTest
    static void testDeleteItem(){
        
        OpportunityLineItem testOppLineItem = [SELECT Id FROM OpportunityLineItem LIMIT 1];
        Assert.isNotNull(testOppLineItem, 'Should return at least one OppLineItem');
        Test.startTest();
            OpportunityProductSelector.deleteItem(testOppLineItem.Id);
        Test.stopTest();
        List<OpportunityLineItem> deletedOppLineItem = [SELECT Id FROM OpportunityLineItem WHERE Id =:testOppLineItem.Id];
        Assert.areEqual(0, deletedOppLineItem.size(), 'Should not return the deleted OppLineItem');
    }
}

    
