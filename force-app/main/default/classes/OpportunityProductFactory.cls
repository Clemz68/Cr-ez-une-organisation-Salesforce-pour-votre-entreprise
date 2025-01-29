@IsTest

public class OpportunityProductFactory {

    @IsTest 
    public static OpportunityLineItem createTestOpportunityLineItem () {
        
        Account testAccount = new Account(
        Name = 'Test Account'
        );
        insert testAccount;

        Pricebook2 standardPricebook = new Pricebook2(
        Id = Test.getStandardPricebookId(),
        IsActive = true
        );

        //Execute an update DML on the Pricebook2 record, to make IsStandard to true

        Update standardPricebook;

        Opportunity TestOpp = new Opportunity(
                Name= 'Test Opportunity',
                StageName= 'Prospecting',
                CloseDate= System.today().addDays(30),
                Amount= 10000,
                AccountId = testAccount.Id,
                Pricebook2Id= standardPricebook.Id
        );
        insert TestOpp;

        Product2 product = new Product2(
            Name = 'Test Product',
            IsActive = true
        );
        insert product;

        PricebookEntry pricebookEntry = new PricebookEntry(
            Pricebook2Id = standardPricebook.Id,
            Product2Id = product.Id,
            UnitPrice = 75000,
            IsActive = true
        );
        insert pricebookEntry;

        OpportunityLineItem oppItem = new OpportunityLineItem(
               UnitPrice= 75000,
               Quantity= 1,
               ServiceDate= System.today().addDays(30),
               OpportunityId= TestOpp.Id,
               PricebookEntryId = pricebookEntry.Id   
        );
        insert oppItem;
        return oppItem;
    } // Créer les enregistrements necessaires pour la classe de test 

    @IsTest
    public static User createSystemProfile() {
        Profile p = [SELECT Id FROM Profile WHERE Name = 'Standard User' LIMIT 1];
        User testUser = new User(
            LastName = 'Test',
            Alias = 'tuser',
            Email = 'testuser@example.com',
            Username = 'testuser' + System.currentTimeMillis() + '@example.com',
            ProfileId = p.Id,
            TimeZoneSidKey = 'GMT',
            LocaleSidKey = 'en_US',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US'
        );
        insert testUser;
        return testUser;
    }
    // Créer un utilisateur test pour la classe de test 
}