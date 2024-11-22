import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_TRANSACTIONS } from '../graphql/queries';

const TransactionList = () => {
  const { data, loading, error } = useQuery(ALL_TRANSACTIONS);

  // Ajoutez ce log pour vérifier la structure des données récupérées
  console.log('Data:', data);

  if (loading) return <p>Chargement des transactions...</p>;
  if (error) return <p>Erreur lors du chargement des transactions : {error.message}</p>;

  // Vérification si 'data.allTransactions' existe et s'il y a des transactions valides
  if (!data || !data.allTransactions || data.allTransactions.length === 0) {
    return <p>Aucune transaction disponible.</p>;
  }

  return (
    <div>
      <h2>Liste des Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Montant</th>
            <th>Date</th>
            <th>Type</th>
            <th>Compte</th>
          </tr>
        </thead>
        <tbody>
          {data.allTransactions
            .filter(transaction => transaction !== null)  // Ignore les éléments 'null'
            .map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.montant} €</td>
                <td>{transaction.date}</td>
                <td>{transaction.type}</td>
                <td>
                  {/* Vérification si le compte existe et est valide */}
                  {transaction.compte ? (
                    `${transaction.compte.id} - ${transaction.compte.solde} €`
                  ) : (
                    <span style={{ color: 'red' }}>Compte non disponible</span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
