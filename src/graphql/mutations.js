import { gql } from '@apollo/client';


const ADD_COMPTE = gql`
  mutation AddCompte($solde: Float!, $type: String!) {
    saveCompte(compte: { solde: $solde, type: $type }) {
      id
      solde
      type
    }
  }
`;

// Mutation pour ajouter un compte
export const SAVE_COMPTE = gql`
  mutation AddCompte($solde: Float!, $dateCreation: String!, $type: TypeCompte!) {
    saveCompte(solde: $solde, dateCreation: $dateCreation, type: $type) {
      id
      solde
      dateCreation
      type
    }
  }
`;


// Mutation pour ajouter une transaction
export const ADD_TRANSACTION = gql`
  mutation AddTransaction($transaction: TransactionRequest!) {
    addTransaction(transaction: $transaction) {
      id
      montant
      date
      type
      __typename
    }
  }
`;

// Assurez-vous que cette mutation est exportée correctement
export const SAVE_TRANSACTION = gql`
  mutation SaveTransaction($montant: Float!, $compteId: Int!, $type: TypeTransaction!) {
    saveTransaction(montant: $montant,compteId: $compteId , type: $type) {
      id
      montant
      date
      type
      compte {
        id
        solde
        dateCreation
        type
      }
    }
  }
`;
