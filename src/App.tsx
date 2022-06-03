import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { createServer } from 'miragejs';
import { GlobalStyle } from "./styles/global";

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
  return (
    <>
      <Header />
      <Dashboard />
      <GlobalStyle />
    </>
  );
}

export default App;
