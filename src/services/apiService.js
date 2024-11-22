import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082/graphql'; // Backend URL

// Fonction pour faire une requête GraphQL
export const fetchGraphQL = async (query, variables = {}) => {
    try {
        const response = await axios.post(API_BASE_URL, {
            query,
            variables,
        });
        return response.data.data; // Retourne uniquement les données
    } catch (error) {
        console.error('Erreur lors de la requête GraphQL:', error);
        throw error;
    }
};

// Appel pour obtenir tous les comptes
export const getAllComptes = async () => {
    const query = `
        query {
            allComptes {
                id
                solde
                type
            }
        }
    `;
    return await fetchGraphQL(query);
};

// Appel pour ajouter une transaction
export const addTransaction = async (transaction) => {
    const mutation = `
        mutation($transaction: TransactionRequest!) {
            addTransaction(transaction: $transaction) {
                id
                montant
                type
                date
            }
        }
    `;
    return await fetchGraphQL(mutation, { transaction });
};
