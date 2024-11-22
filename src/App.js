import React from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import './App.css';
import CompteForm from './components/CompteForm';
import TransactionForm from './components/TransactionForm';
import ComptesList from './components/CompteList';
import TransactionsList from './components/TransactionList';


const client = new ApolloClient({
  uri: 'http://localhost:8082/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="section">
          <h2>Gestion des Comptes</h2>
          <CompteForm />
          <ComptesList />
        </div>

        <div className="section">
          <h2>Gestion des Transactions</h2>
          <TransactionForm />
          <TransactionsList />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
