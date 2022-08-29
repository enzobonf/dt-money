import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Transaction } from "../interfaces/transaction.interface";
import { api } from "../services/api";

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createNewTransaction: (transactionInput: TransactionInput) => Promise<void>;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

function TransactionsProvider({ children }: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function loadTransactions() {
      const response = await api.get('transactions');
      setTransactions(response.data.transactions);
    }

    async function createNewTransaction(transactionInput: TransactionInput) {
      const response = await api.post('transactions', {
        ...transactionInput,
        createdAt: new Date(),
      });

      const { transaction } = response.data;

      setTransactions([...transactions, transaction]);
    }
  
    useEffect(() => {
      loadTransactions();
    }, []);

    return (
      <TransactionsContext.Provider value={{transactions, createNewTransaction}}>
        {children}
      </TransactionsContext.Provider>
    )
}

function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}

export { TransactionsProvider, useTransactions };
