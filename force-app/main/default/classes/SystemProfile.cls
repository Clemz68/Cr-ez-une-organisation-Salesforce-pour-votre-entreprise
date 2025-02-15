// Classe UserInfo pour récupérer l'ID de l'utilisateur et requete SOQL pour récupérer le nom du profile (ce qu'il prend en entré ce qu'il fait et en sortie )
public with sharing class SystemProfile {
  
  @AuraEnabled
    public static String getSystemProfile() {
     
		Id currentUserId = UserInfo.getUserId();
        User usersRecord = [SELECT ProfileId, Profile.Name FROM User WHERE Id = :currentUserId];
		return usersRecord.Profile.Name;
    }
}