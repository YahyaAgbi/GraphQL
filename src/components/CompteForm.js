import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_COMPTE } from '../graphql/mutations'; // Assurez-vous que cette mutation est bien définie
import { ALL_COMPTES } from '../graphql/queries';  // Vous aurez besoin de cette requête pour mettre à jour la liste des comptes

const CompteForm = ({ refetchComptes }) => {
  const [solde, setSolde] = useState('');
  const [dateCreation] = useState(new Date().toISOString());
  const [type, setType] = useState('COURANT'); // Exemple de type de compte par défaut
  const [message, setMessage] = useState('');

  const [saveCompte] = useMutation(SAVE_COMPTE, {
    refetchQueries: [{ query: ALL_COMPTES }] // Cette ligne permettra de récupérer les comptes après ajout
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await saveCompte({
        variables: {
          solde: parseFloat(solde),
          dateCreation: dateCreation,
          type: type
        },
      });
      
      setMessage('Compte ajouté avec succès!');
      setSolde('');
      setType('COURANT');
      refetchComptes(); // Met à jour les comptes dans le parent après l'ajout
    } catch (err) {
      
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Solde"
          value={solde}
          onChange={(e) => setSolde(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="COURANT">COURANT</option>
          <option value="EPARGNE">EPARGNE</option>
        </select>
        <button type="submit">Ajouter un compte</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CompteForm;
