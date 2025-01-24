public class OpportunityProductFactory {
   

    public static Opportunity createTestOpportunity() {
        Opportunity opp = new Opportunity(
                Name= 'Test Opportunity',
                StageName= 'Prospecting',
                CloseDate= System.today().addDays(30),
                Amount= 10000
        );
        insert opp;
        return opp;
    }

    public static OpportunityLineItem createTestOpportunityLineItem (Id opportunityId) {
        OpportunityLineItem oppItem = new OpportunityLineItem(
               UnitPrice= 75000,
               Quantity= 1,
               ServiceDate= System.today().addDays(30),
               OpportunityId= opportunityId    
        );
        insert oppItem;
        return oppItem;
    }

    
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

}