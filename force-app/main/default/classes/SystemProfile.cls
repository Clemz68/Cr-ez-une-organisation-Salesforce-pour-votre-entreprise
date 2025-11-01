/** 
 * @author Clem
 * @date 2025 
 */

public with sharing class SystemProfile {
  
  /** 
   * @name getSystemProfile
   * @description Récupère le nom du profil système de l'utilisateur courant 
   * @param Id opportunityId
   * @return String nom du profil utilisateur
   */

  @AuraEnabled
    public static String getSystemProfile() {
		  Id currentUserId = UserInfo.getUserId();
      User usersRecord = [SELECT ProfileId, Profile.Name FROM User WHERE Id = :currentUserId];
		  return usersRecord.Profile.Name;
    }
}