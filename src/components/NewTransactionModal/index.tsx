import React, { FC, FormEvent, useContext, useState } from "react";

import closeIcon from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import {
  Container,
  TransactionTypeContainer,
  RadioBox,
} from "./styles";

import Modal from "react-modal";
import { api } from "../../services/api";
import { TransactionContext } from "../../context/TransactionContext";

interface INewTransactionModal {
  isOpen: boolean;
  onRequestClose: () => void;
}

type TransactionTypeOptions = 'deposit' | 'withdraw';

const NewTransactionModal: FC<INewTransactionModal> = ({
  isOpen,
  onRequestClose,
}) => {
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [type, setType] = useState<TransactionTypeOptions>('deposit');

  const { createTransaction } = useContext(TransactionContext);
  
  const resetStates = () => {
    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
  };

  const handleCreateNewTransaction = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      title,
      amount,
      category,
      type,
    };
    
    await createTransaction(data);
    onRequestClose();
    resetStates();
  };

  return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
      <button 
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeIcon} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
  
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        
        <TransactionTypeContainer>
          <RadioBox 
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"

          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox 
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        
        <button type="submit">
          Cadastrar
        </button>
      </Container>
      </Modal>

  );
};

export { NewTransactionModal };
