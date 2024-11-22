import { gql } from '@apollo/client';

export const ALL_COMPTES = gql`
  query {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;
export const GET_COMPTES = gql`
  query GetComptes {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

export const ALL_TRANSACTIONS = gql`
  query {
    allTransactions {
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
