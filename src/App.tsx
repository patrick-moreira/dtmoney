import {useState} from 'react';

import { GlobalStyle } from "./styles/global";

import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import Modal from 'react-modal';

import { createServer } from 'miragejs';

createServer({
  routes() {
      this.namespace = 'api';

      this.get('transactions',  () => {
        return [
          {
            id: 1,
            title: 'Aluguel',
            amount: 12000,
            type: 'deposit',
            category: 'Desenvolvimento',
            creatAt: new Date()
          },
          {
            id: 2,
            title: 'Aluguel',
            amount: -1100,
            type: 'withdraw',
            category: 'Casa',
            creatAt: new Date()
          },
        ]
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
    <>
      <Header onNewTransactionModalIsOpen={handleNewTransactionModalIsOpen} />
      <Dashboard />
      <Modal
        isOpen={newTransactionModalIsOpen}
        onRequestClose={handleNewTransactionModalIsClosed}
      />
      <GlobalStyle />
    </>
  );
}

export default App;
