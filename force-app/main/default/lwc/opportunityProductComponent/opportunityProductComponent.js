import { LightningElement, wire, track, api } from 'lwc';
import getOpportunityProductList from '@salesforce/apex/OpportunityProductController.getOpportunityProductList';
import getSystemProfile from '@salesforce/apex/SystemProfile.getSystemProfile';
import deleteOppLineItem from '@salesforce/apex/OpportunityProductController.deleteOppLineItem';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
import { LABELS } from './labels';

const labels = LABELS;
const columns = [
    {label: labels.MyProductName, fieldName: 'productName', type: 'text' },
    {label: labels.MyQuantity, fieldName: 'Quantity', type: 'number', 
    cellAttributes: { alignment:'left', class: {fieldName: 'quantityClass'} }},// fieldname rend la chose dynamique car je pointe vers un proprité de donnée qui peux changer dynamiquement
    {label: labels.MyUnit_Price, fieldName: 'UnitPrice', type: 'currency' },
    {label: labels.MyTotal_Price, fieldName: 'TotalPrice', type: 'currency' },
    {label: labels.MyQuantity_in_stock, fieldName: 'QuantityInStock', type: 'number'},
    {label: labels.MySee_product, fieldName: 'VoirProduit', type: 'button', initialWidth: 175, 
    typeAttributes: { iconName: 'utility:preview', label: labels.MySee_product, variant:'brand', name: 'voir_produit', title: 'Cliquez pour voir le produit', },
    cellAttributes: { alignment: 'center',}},
    {label: labels.MyDelete, type: 'button-icon', typeAttributes: { iconName: 'utility:delete', name: 'supprimer', title: 'Clickez pour supprimer'}},
    ]

export default class OpportunityProductComponent extends NavigationMixin (LightningElement)
{
    @api recordId;
    @track opportunityLineItem = [];
    @track OpportunityProductResult;
    @track showModal = false;
    @track showSucces = false;
    noproduct = true;
    showMessage = false;
    columns = columns
    labels = LABELS;

    @wire(getOpportunityProductList, { opportunityId: '$recordId' })
    wiredgetOpportunityProductList (result) {
    this.OpportunityProductResult = result;
    const { data, error } = result;

        if (data) {
            let quantityClass = '';
            this.columns = this.specificitySalesProfile(columns); // Appel à fetchUserProfile pour savoir si on affiche la column "voir produit"
            this.opportunityLineItem = data.map((record) => {// Aplatir les données pour faciliter l'accès aux champs imbriqués (en locurence product name et quantity in stock)
            quantityClass = this.quantityAlert (record); // Appel à quantityAlert pour déterminer la quantityClass et mettre a jour showmessage si besoin

            return {... record, 
            quantityClass: quantityClass, //Appliquer le style css récupéré via la méthode à la colonne Quantity 
            productName: record.Product2.Name, 
            QuantityInStock: record.Product2.QuantityInStock__c,  
        }}),


       // Vérifier si la opplineitem a des valeurs si il y a des valeurs noproduct = true sinon false 
            console.log(this.opportunityLineItem);
            console.log ()
            this.noproduct = this.opportunityLineItem.length === 0;
            // si le tableau est vide, this.noproduct = true autrement = false

        } else if (error) {
            console.error('Erreur lors de la récupération des données :', error);
            this.opportunityLineItem = [];
            // ????? this.noproduct = true;
        }
    }


    quantityAlert(record) {
    
        if (record.Quantity > record.Product2.QuantityInStock__c) {
            this.showMessage = true
            return 'slds-text-color_error slds-theme_shade slds-theme_alert-texture slds-text-bold'
        } else {
            return 'slds-text-color_success slds-text-bold'
        }
    } // La méthode prend en paramètre l'enregistrement itéré, modifie showMessage selon la logique, et renvoie le style Css correspondant  

    specificitySalesProfile(){
        
        let userProfileName = getSystemProfile ()
    
        .then((userProfileName) => {
            console.log(`thenCatchApproach result =>`+ userProfileName);
            
            if (userProfileName === 'Commercial') {
               this.columns = [...columns].filter(columns => columns.fieldName != 'VoirProduit');
            }// Si le profil est system administrator modifier le tableau columns en enlevant celui la colonne voir produit
        })
        .catch((error) => {
          console.log(`thenCatchApproach error => `);
        });

        return columns;
    } // La méthode prend pas de paramètre et modifie le tableau en enlevant la colonne VoirProduit si le profil (obtenu en appelant une classe apex) est commercial

    async handleRowAction(event) {
        const columnName = event.detail.action.name;
        const itemToDelete = event.detail.row.Id;
        const itemToView = event.detail.row.Product2.Id;
        
        console.log('Voici le id'+ itemToDelete)

        switch (columnName){
        
        case 'supprimer': 
        this.itemToDelete = itemToDelete;
        this.showModal = true;

             break;
    
        case 'voir_produit':

            window.open("/lightning/r/Product2/"+itemToView+"/view",'_blank');
            // Ouvre l'url mentionné dans un nouvel onglet
            break;
        }
    
    }  // La méthode récupère l'évènement rowaction en paramètre et en fonction du bouton cliqué exécute du code
    
    handleModalSuppr(){
    deleteOppLineItem ({opportunityLineItemId: this.itemToDelete })
    .then(() => {
        console.log('succès de la suppr');
        this.showModal = false;
        this.showToast();
        return refreshApex(this.OpportunityProductResult);
        
    })
    .catch((error) => {
        console.log('erreur de la suppr');
    });// Appel de la méthode apex pour supprimer l'enregistrement correspondant à la ligne
    // Penser à permettre de supprimer la ligne également
    // La méthode retourne une Promesse (promise) car elle effectue une requete serveur via apex (et elle n'est pas wired)
    }

    handleCloseModal() {
        this.showModal = false;
    }

    showToast() {
        this.showSucces = true;
        setTimeout(() => {
            this.showSucces = false;
        }, 3000); // Cache la notification après 3 secondes
    }

    handleAddProduct() {
        this[NavigationMixin.Navigate]({
            type: 'standard__action',
            attributes: {
                actionName: 'MultiAdd', // Action "Add Product"
                recordId: this.recordId // L'ID de l'opportunité
            }
        });
    }
}


