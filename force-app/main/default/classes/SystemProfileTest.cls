public with sharing class SystemProfileTest {
    
    public static Id getSystemProfileId(Id userId) {
        
        User user = [SELECT ProfileId FROM User WHERE Id = :userId LIMIT 1];
        return user.ProfileId;
    }
}