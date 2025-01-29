@IsTest

public class SystemProfileTest {

    @IsTest
    public static void getSystemProfileIdTest() {
   
        User testUser = OpportunityProductFactory.createSystemProfile();
        System.runAs(testUser) {
    
        Test.startTest();
        String profileName = SystemProfile.getSystemProfile();
        Test.stopTest();

        Assert.isNotNull(profileName, 'Le nom du profil ne doit pas être null');
        Assert.areEqual('Standard User', profileName, 'Le profil récupéré doit correspondre à l’utilisateur de test');
        }
    }
    // Appel la classe factory pour créer le test User, faire tourner le systeme en tant que testUser et appel la classe à tester, assertion que le profil est récupéré  
}