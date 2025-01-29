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
    cellAttributes: { alignment:'left', class: {fieldName: 'quantityClass'} }},
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
    userProfileName;

    @wire(getOpportunityProductList, { opportunityId: '$recordId' })
    wiredgetOpportunityProductList (result) {
    this.OpportunityProductResult = result;
    const { data, error } = result;

        if (data) {
            let quantityClass = '';
            this.columns = this.specificitySalesProfile(columns); 
            this.opportunityLineItem = data.map((record) => {
            quantityClass = this.quantityAlert (record); 
            return {... record, 
            quantityClass: quantityClass,
            productName: record.Product2.Name, 
            QuantityInStock: record.Product2.QuantityInStock__c,  
        }}),
            console.log(this.opportunityLineItem);
            this.noproduct = this.opportunityLineItem.length === 0;
        } else if (error) {
            console.error('Erreur lors de la récupération des données :', error);
            this.opportunityLineItem = [];
        }
    }
        
        // @wire de la méthode Apex pour récupérer le tableau de manière réactif, le record Id est passé en argument
        // La méthode wired prend le résult du @wire (contenant data, error) en tant que paramètre  
        // Si récupération des données réussie appel d'une méthode pour check le profile de l'user 
        // appel d'une méthode qui gère l'affichage d'un message d'erreur et le style css d'une colonne du tableau
        // Utilisation de map pour aplatir les données: itère sur les lignes du tableau, facilite l'accès aux champs imbriqués (product name et quantity in stock) et applique le style au champ quantité 
        // Si le tableau mapé ne contient pas de données noproduct = true ce qui permet l'affichage d'un msg via htlm

    quantityAlert(record) {
    
        if (record.Quantity > record.Product2.QuantityInStock__c) {
            this.showMessage = true
            return 'slds-text-color_error slds-theme_shade slds-theme_alert-texture slds-text-bold'
        } else {
            return 'slds-text-color_success slds-text-bold'
        }
    } 
        // La méthode prend en paramètre l'enregistrement itéré par map, affiche ou non le msg souhaité, et renvoie le style Css correspondant  

    specificitySalesProfile(){
        
        this.userProfileName = getSystemProfile ()
    
        .then((userProfileName) => {
            console.log(`thenCatchApproach result =>`+ userProfileName);
            
            if (userProfileName === 'Commercial') {
               this.columns = [...columns].filter(columns => columns.fieldName != 'VoirProduit');
            }
        })
        .catch((error) => {
          console.log(`thenCatchApproach error => `);
        });

        return columns;
    }   
        // La méthode prend pas de paramètre et returne le tableau en enlevant la colonne VoirProduit si le profil obtenu en appelant une classe apex est = à commercial 

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
                 
                 break;
        }
    
    }  
    
    // La méthode récupère l'évènement rowaction en paramètre et en fonction du bouton cliqué, exécute du code (soit affiche le modal soit ouvre une fenetre)

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
    });
    
   
    }
    
    // Méthode sans paramètre servant à appeler la méthode apex pour supprimer l'enregistrement correspondant à la ligne
    // la méthode apex prend l'item à supprimer en paramètre et en cas de succès ferme le modal, appel la méthode pour afficher le toast et retourne le tableau rafraichi 


    handleCloseModal() {
        this.showModal = false;
    }

    // Méthode sans paramètre permettant de réagir au click sur le bouton de fermeture du modal et de fermer modal

    showToast() {
        this.showSucces = true;
        setTimeout(() => {
            this.showSucces = false;
        }, 3000); 
    }

    // Méthode sans paramètre pour aficher le toast et le cacher après 3 secondes

}


