import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Web3 from 'web3';

import MyNav from '../../components/nav-bar/nav-bar';
import MyCarousel from '../../components/carousel/carousel';
import MintModal from '../../modals/mint-modal/mint-modal';
import AccountChooser from '../../modals/account-chooser/account-chooser';

import CorrelationsContract from '../../abis/Correlations.json';
import ReceiptModal from '../../modals/receipt-modal/receipt-modal';


export default function FrontPage() {
    const [account, setAccount] = useState('');
    const [mintModal, setMintModal] = useState(false);
    const [accountModal, setAccountModal] = useState(true);
    const [receiptModal, setReceiptModal] = useState(false);
    const [accountList, setAccountList] = useState([]);
    const [contract, setContract] = useState({})
    const [tokenCount, setTokenCount] = useState(0);
    const [mintedToken, setMintedToken] = useState(0);
    const [mintedTokenSeries, setMintedTokenSeries] = useState([]);
    
    async function loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3('http://localhost:7545');
        } else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
          return;
        }
        let accounts = await window.web3.eth.getAccounts()
        setAccountList(accounts)
    }

    async function getContractData() {
        //ease if access
        const web3 = window.web3;

        //identify what network/blockchain we are using
        const networkId = await web3.eth.net.getId()
        console.log(networkId);

        //find contract on network
        const contractData = CorrelationsContract.networks[networkId]
        console.log(contractData);

        //If we have a contract on the network, load the balance.
        if(contractData) {

            //get contract deployed instance
            const correlationContract = new web3.eth.Contract(CorrelationsContract.abi, contractData.address)
            setContract(correlationContract);
        } else {
            window.alert('Contract not deployed to detected network.')
        }
    }

    //Specifically load token balance
    async function getBalance() {
        if(contract && (account !== '0x0' && account !== null && account !== undefined && account !== '')) {
            let correlationsBalance = await contract.methods.balanceOf(account).call()
            setTokenCount(correlationsBalance);
            console.log(correlationsBalance);
        } else {
            console.log(`Error loading balance...\nContract: ${contract}\nAccount: ${account}`)
        }
    }

    //mint a token

    async function mint() {
        if(contract) {
            let value = Web3.utils.toWei('0.1', 'ether');
            let gasEstimate;
            gasEstimate = await contract.methods.mintToken().estimateGas({from: account, value: value});
            contract.methods.mintToken().send({from: account, value: value, gas: gasEstimate})
                .then((receipt) => {
                    let tokenId = receipt.events.Transfer.returnValues.tokenId
                    console.log(`Minted token: ${tokenId}`)
                    setMintedToken(tokenId);
                    resolve();
                })
                .catch((error, receipt) => {
                    reject((`We have an error\n${error}\n${receipt}`))
                })
        } else {
            window.alert('Contract not deployed to detected network.')
        }
    }

    async function mintMulti() {
        if(contract) {
            let value = Web3.utils.toWei('0.5', 'ether');
            let gasEstimate;
            gasEstimate = await contract.methods.mintToken().estimateGas({from: account, value: value});
            contract.methods.mintTokenMulti().send({from: account, value: value, gas: gasEstimate})
                .then((receipt) => {
                    let tokenIds = receipt.events.Transfer.returnValues.tokenIds
                    console.log(`Minted token: ${tokenIds}`)
                    setMintedTokenSeries(tokenIds);
                    getBalance();
                    showReceipt();
                })
                .catch((error, receipt) => {
                    reject((`We have an error\n${error}\n${receipt}`))
                })
        } else {
            window.alert('Contract not deployed to detected network.')
        }
    }

    useEffect(() => {
        loadWeb3();
        getContractData()
    }, [])

    useEffect(() => {
        getBalance();
    }, [account])

    window.ethereum.on('accountsChanged', () => {
        loadWeb3()
    })

    function showMint() {
        setMintModal(true);
    }

    function hideMint() {
        setMintModal(false);
    }

    function showAccountModal() {
        setAccountModal(true);
    }

    function hideAccountModal() {
        setAccountModal(false);
    }

    function showReceipt() {
        setReceiptModal(true);
    }

    function hideReceipt() {
        setReceiptModal(false);
    }
    
    return(
        <div>
            <MyNav account={account} showMint={showMint} showAccounts={showAccountModal} balance={tokenCount}/>
            <Container>
                <MyCarousel />
            </Container>
            <MintModal show={mintModal} hide={hideMint} mint={mint} mintMulti={mintMulti}/>
            <ReceiptModal show={receiptModal} hide={hideReceipt} tokenId={mintedToken} tokenSeries={mintedTokenSeries}/>
            <AccountChooser show={accountModal} hide={hideAccountModal} accounts={accountList} setAccount={setAccount}/>
        </div>
    )
}
