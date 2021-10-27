//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FrontPage from './containers/front-page/front-page';
import Web3Container from './containers/web3context/web3context';
import ContractContexter from './containers/contract-context/contract-context';

function App() {
  return (
    <Web3Container>
      <ContractContexter>
      <FrontPage />
      </ContractContexter>
    </Web3Container>
  );
}

export default App;
