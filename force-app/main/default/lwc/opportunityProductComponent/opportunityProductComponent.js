import { LightningElement, wire, track, api } from 'lwc';
import getOpportunityProductList from '@salesforce/apex/OpportunityProductController.getOpportunityProductList';
import getSystemProfile from '@salesforce/apex/SystemProfile.getSystemProfile';
import deleteOppLineItem from '@salesforce/apex/OpportunityProductController.deleteOppLineItem';
import { refreshApex } from '@salesforce/apex';
import { LABELS } from './labels';

const labels = LABELS;

/** 
 Constante qui contient les colonnes de la table de donnée.
 Les 5 premières colonnes sont des champs SFDC les 2 dernières sont des variables créées pour le composant.
 */

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

export default class OpportunityProductComponent extends LightningElement
{
    @api recordId;
    opportunityLineItem = [];
    OpportunityProductResult;
    showModal = false;
    showSucces = false;
    showMessage = false;
    noproduct = true;
    columns = columns
    labels = LABELS;
    userProfileName;

    /**  
    * Décorateur @Wire de la méthode Apex pour récupérer les données de manière réactif.
    * Récupère la liste d'opportunités produits d'une opportunité en fonction de son ID.
    * @param {Object} result Objet contenant les données ou une erreur renvoyée par Apex.
    * @param {Array} result.data Tableau des Opportunité produits liés à l'opportunité.
    * @param {Error} result.error Erreur retournée en cas d'échec de récupération des données.
    */

    @wire(getOpportunityProductList, { opportunityId: '$recordId' })
    wiredgetOpportunityProductList (result) {
    this.OpportunityProductResult = result;
    const { data, error } = result;

        if (data) {
            
            // Suppression d'une colonne en fonction du profil utilisateur. 
            this.columns = this.specificitySalesProfile(); 

            // Intération et transformation des données pour ajouter le style CSS et accéder à des champ imbriqués.
            this.opportunityLineItem = data.map((record) => {
            
            // Retourne une classe CSS et affiche un message d'erreur. 
            let quantityClass = this.quantityAlert (record); 
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
        
    /** 
     * Donne un style CSS en adéquation avec le nombre de produit en stock par rapport à la quantité de produit de l'opportuntié produit.
     * @param {Object} record Enregistrement Opportunité produit.
     * @return {String} Classe CSS.
    */ 

    quantityAlert(record) {
    
        if (record.Quantity > record.Product2.QuantityInStock__c) {
            this.showMessage = true
            return 'slds-text-color_error slds-theme_shade slds-theme_alert-texture slds-text-bold'
        } else {
            return 'slds-text-color_success slds-text-bold'
        }
    } 

    /** 
    * Récupère le profil de l'utilisateur et ajuste les colonnes à afficher en fonction du profil.
    * Enlève la colonne VoirProduit si le profil obtenu est égal à commercial. 
    * @return {Array} les columns à afficher après vérification du profil 
    */

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
    
    /**
     * Récupère l'évenement de clic sur les boutons suppr et voir produit et ouvre un modal ou une page d'enregistrement en fonction du bouton 
     * @param {CustomEvent} event 
     */

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
    
    /**
     * Récupère l'évenement de clic sur le bouton supprimer du modal et appel la méthode Apex pour supprimer l'enregistrement de la ligne 
     */

    handleModalSuppr(){
    deleteOppLineItem ({opportunityLineItemId: this.itemToDelete })
    .then(() => {
        console.log('succès de la suppr');
        this.showModal = false;
        this.showToast();
        this.handleRefresh();
    })
    .catch((error) => {
        console.log('erreur de la suppr');
    });
    }
    
     /**
     * Récupère l'évenement de clic sur le bouton supprimer du modal et ferme le modal
     */

    handleCloseModal() {
        this.showModal = false;
    }

     /**
     * Affiche un toast qui notifie le succes de la suppression  pendant 10 secondes
     */

    showToast() {
        this.showSucces = true;
        setTimeout(() => {
            this.showSucces = false;
        }, 10000); 
    }
 
    /**
     * Rafraichis les données du tableau d'opportunité produits en appelant refreshApex
     */

    handleRefresh() {
    refreshApex(this.OpportunityProductResult)
    }

}


 