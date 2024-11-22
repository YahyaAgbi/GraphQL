import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_COMPTES } from '../graphql/queries';

const ComptesList = () => {
  const { loading, error, data } = useQuery(ALL_COMPTES);

  if (loading) return <p>Chargement des comptes...</p>;
  if (error) return <p>Erreur lors de la récupération des comptes: {error.message}</p>;

  return (
    <div>
      <h2>Comptes</h2>
      <table>
        <thead>
          <tr>
            <th>Solde</th>
            <th>Type</th>
            <th>Date de création</th>
          </tr>
        </thead>
        <tbody>
          {data.allComptes.map((compte) => (
            <tr key={compte.id}>
              <td>{compte.solde}</td>
              <td>{compte.type}</td>
              <td>{new Date(compte.dateCreation).toLocaleDateString()}</td> {/* Affichage de la date */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComptesList;
