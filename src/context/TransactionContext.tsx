import {
  FC,
  ReactNode,
  createContext,
  useState,
  useEffect,
} from 'react';

import { api } from '../services/api';

export type TransactionProps = {
  id: number,
  title: string,
  amount: number,
  type: string,
  category: string,
  createdAt: Date
}

type TransactionInputProps = Omit<TransactionProps, 'id' | 'createdAt'>;

interface ITransactionContext {
  transactions: TransactionProps[],
  createTransaction: (transaction: TransactionInputProps) => Promise<void>,
};

export const TransactionContext  = createContext<ITransactionContext>(
  {} as ITransactionContext
);

interface ITransactionProvider {
  children: ReactNode;
};

export const TransactionProvider: FC<ITransactionProvider> = ({children}) => {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  const getTransactions = async () => { 
    try {
      await api.get('transactions').then((response) => {
        setTransactions([...response.data.transactions]);
      });
    } catch (error) {
      console.log(error);
      setTransactions([]);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);
  
  const createTransaction = async (transactionInput: TransactionInputProps) => {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });

    const {transaction} = response.data;

    setTransactions((prevState) => [...prevState, transaction]);
  }

  const values = {
    transactions,
    createTransaction,
  };

  return (
    <TransactionContext.Provider value={values}>
      {children}
    </TransactionContext.Provider>
  )
};