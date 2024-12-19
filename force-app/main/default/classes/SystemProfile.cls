public with sharing class SystemProfile {
  
  @AuraEnabled
    public static String getSystemProfile() {
     
		Id currentUserId = UserInfo.getUserId();
        User usersRecord = [SELECT ProfileId, Profile.Name FROM User WHERE Id = :currentUserId];
		return usersRecord.Profile.Name;
    }
}