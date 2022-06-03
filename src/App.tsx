import {useState} from 'react';

import { GlobalStyle } from "./styles/global";

import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';

import { createServer, Model } from 'miragejs';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionProvider } from './context/TransactionContext';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer de website',
          type: 'deposit',
          category: 'Desenvolvimento',
          amount: 6000,
          createdAt: new Date('2022-06-03 13:55:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2022-06-03 13:55:00'),
        },
      ],
    })
  },
  
  routes() {
      this.namespace = 'api';

      this.get('/transactions',  () => {
        return this.schema.all('transaction');
      });

      this.post('/transactions', (schema, request) => {
        const data = JSON.parse(request.requestBody);
        return schema.create('transaction', data);
      });
  }
});

function App() {
  const [newTransactionModalIsOpen, setNewTransactionModalIsOpen] = useState<boolean>(false);

  const handleNewTransactionModalIsOpen = () => {
    setNewTransactionModalIsOpen(true);
  };
  
  const handleNewTransactionModalIsClosed = () => {
    setNewTransactionModalIsOpen(false);
  };

  return (
    <TransactionProvider>
      <Header onNewTransactionModalIsOpen={handleNewTransactionModalIsOpen} />
      <Dashboard />
      <NewTransactionModal
        isOpen={newTransactionModalIsOpen}
        onRequestClose={handleNewTransactionModalIsClosed}
      />
      <GlobalStyle />
    </TransactionProvider>
  );
}

export default App;
