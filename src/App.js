//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FrontPage from './containers/front-page/front-page';
import Web3Container from './containers/web3context/web3context';

function App() {
  return (
    <Web3Container>
      <FrontPage />
    </Web3Container>
  );
}

export default App;
