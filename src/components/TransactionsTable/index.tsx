import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Container } from './styles';

export function TransactionsTable() {

  const [transactions, setTransactions] = useState<any>([]);

  useEffect(() => {
    
    async function loadTransactions() {
        const transactionsApi = await api.get('transactions').then(response => response.data);
        setTransactions(transactionsApi);
    }

    loadTransactions();
      
  }, []);

  console.log(transactions);

  return(
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
                <tr>
                    <td>Desenvolvimento de Website</td>
                    <td className='deposit'>R$ 12.000</td>
                    <td>Desenvolvimento</td>
                    <td>23/08/2022</td>
                </tr>
                <tr>
                    <td>Aluguel</td>
                    <td className='withdraw'>-R$ 2.500</td>
                    <td>Casa</td>
                    <td>17/08/2022</td>
                </tr>
            </tbody>
        </table>
    </Container>
  );
}