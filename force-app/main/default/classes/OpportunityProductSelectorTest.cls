@IsTest
private class OpportunityProductSelectorTest {

    @TestSetup
    static void makeData(){
        Opportunity testOpp = OpportunityProductFactory.createTestOpportunity();
        OpportunityLineItem testOppLineItem = OpportunityProductFactory.createTestOpportunityLineItem(testOpp.Id);
        
    }
    //Appel de la méthode de la classe de test Factory pour créer une Opp et une OppLineItem qui contient l'ID de l'OPP
   
    @IsTest
    static void testGetOppLineItem(){
        Opportunity testOpp = [SELECT Id FROM Opportunity LIMIT 1];
        Test.startTest();
        List<OpportunityLineItem> results = OpportunityProductSelector.getOpportunityProduct(testOpp.Id);
        Test.stopTest();
        Assert.areNotEqual(0, results.size(), 'Should return at least one OppLineItem');
    }
    // Cherche l'Opp créée, appel de la méthode selector à tester en lui passant l'OP et assertion de trouver l'OP Id
    
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



    
