import { useState, useEffect } from 'react';

import {api} from  '../../services/api';

import { Container } from './styles';

import { TransactionProps } from './types';

export function TransactionsTable () {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  const getTransactions = async () => { 
    try {
      await api.get('transactions').then((response) => {
        setTransactions([...response.data]);
      });
    } catch (error) {
      console.log(error);
      setTransactions([]);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 && transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.creatAt}</td>
            </tr>            
          ))}
        </tbody>
      </table>
    </Container>
  );
}
