import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TRANSACTION } from '../graphql/mutations';
import { GET_COMPTES } from '../graphql/queries';
import { ALL_TRANSACTIONS } from '../graphql/queries'; // Nouvelle requête pour toutes les transactions

const TransactionForm = () => {
  const [montant, setMontant] = useState('');
  const [type, setType] = useState('DEPOT');
  const [compteId, setCompteId] = useState('');

  // Mutation pour ajouter une transaction avec mise à jour du cache
  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    update: (cache, { data: { addTransaction } }) => {
      try {
        // Lire les transactions existantes depuis le cache
        const existingTransactions = cache.readQuery({ query: ALL_TRANSACTIONS });

        // Mettre à jour le cache avec la nouvelle transaction
        cache.writeQuery({
          query: ALL_TRANSACTIONS,
          data: {
            allTransactions: [...existingTransactions.allTransactions, addTransaction],
          },
        });
      } catch (err) {
        console.error('Erreur lors de la mise à jour du cache :', err);
      }
    },
  });

  // Query pour récupérer les comptes
  const { data, loading, error } = useQuery(GET_COMPTES);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifiez si le montant est valide
    if (!montant || isNaN(montant) || parseFloat(montant) <= 0) {
      alert('Veuillez entrer un montant valide.');
      return;
    }

    try {
      // Appel de la mutation avec un objet transaction
      await addTransaction({
        variables: {
          transaction: {
            montant: parseFloat(montant),
            date: new Date().toISOString().split('T')[0], // Date au format "YYYY-MM-DD"
            type: type,
            compteId: String(compteId), // Convertir en chaîne si nécessaire
          },
        },
      });

      alert('Transaction ajoutée avec succès');
      // Réinitialisez les champs après l'ajout
      setMontant('');
      setType('DEPOT');
      setCompteId('');
    } catch (err) {
      alert('Erreur lors de l\'ajout de la transaction');
      console.error('Erreur lors de la mutation:', err);
    }
  };

  // Chargement des comptes
  if (loading) return <p>Chargement des comptes...</p>;
  if (error) return <p>Erreur lors du chargement des comptes : {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Montant</label>
        <input
          type="number"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="DEPOT">Dépôt</option>
          <option value="RETRAIT">Retrait</option>
        </select>
      </div>

      <div>
        <label>Compte</label>
        <select value={compteId} onChange={(e) => setCompteId(e.target.value)} required>
          <option value="">Sélectionnez un compte</option>
          {data?.allComptes.map((compte) => (
            <option key={compte.id} value={compte.id}>
              {compte.id} - {compte.solde} €
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Ajouter la transaction</button>
    </form>
  );
};

export default TransactionForm;
