/** 
 * @author Clem
 * @date 2025 
 */

@IsTest
public class SystemProfileTest {

    /** 
     * @name getSystemProfileIdTest
     * @description Test la méthode getSystemProfile de la classe SystemProfile
     * @return void
     */

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
}