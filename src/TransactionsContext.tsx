import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Transaction } from "./interfaces/transaction.interface";
import { api } from "./services/api";

interface TransactionsProviderProps {
  children: ReactNode;
}

const TransactionsContext = createContext<Transaction[]>([]);

function TransactionsProvider({ children }: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function loadTransactions() {
      const response = await api.get('transactions');
      setTransactions(response.data.transactions);
    }
  
    useEffect(() => {
      loadTransactions();
    }, []);

    return (
      <TransactionsContext.Provider value={transactions}>
        {children}
      </TransactionsContext.Provider>
    )
}

function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}

export { TransactionsProvider, useTransactions };
