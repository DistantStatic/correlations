import { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import Web3 from 'web3';

import MyNav from '../../components/nav-bar/nav-bar';
import MyCarousel from '../carousel/carousel';
import MintModal from '../../modals/mint-modal/mint-modal';
import AccountChooser from '../../modals/account-chooser/account-chooser';

import CorrelationsContract from '../../abis/Correlations.json';
import ReceiptModal from '../../modals/receipt-modal/receipt-modal';

import { Web3Context } from '../web3context/web3context';


export default function FrontPage() {
    const [account, setAccount] = useState('');
    const [mintModal, setMintModal] = useState(false);
    const [accountModal, setAccountModal] = useState(true);
    const [receiptModal, setReceiptModal] = useState(false);
    const [accountList, setAccountList] = useState([]);
    const [contract, setContract] = useState({})
    const [tokenCount, setTokenCount] = useState(0);
    const [minted, setMinted] = useState('');
    const [multi, setMulti] = useState(false);
    
    const web3 = useContext(Web3Context);

    //Specifically load token balance
    async function getBalance() {
        if (!contract || (account === '0x0' || account === null || account === undefined || account === '')) {
            console.log('Unable to get balance')
            return
        }
        contract.methods.balanceOf(account).call()
            .then(result => {
                setTokenCount(result);
            })
    }

    //mint a token
    async function mint() {
        if(contract) {
            let value = Web3.utils.toWei('0.1', 'ether');
            let error, receipt;
            //this looks insane
            contract.methods.mintToken().estimateGas({from: account, value: value})
                .then(async (result) => {
                    contract.methods.mintToken().send({from: account, value: value, gas: result})
                        .then((receipt) => {
                            const tokenId = receipt.events.Transfer.returnValues.tokenId
                            setMinted(tokenId);
                            setMulti(false);
                            getBalance();
                            showReceipt();
                            hideMint();
                        })
                        .catch((e, r) => {
                            error = e;
                            receipt = r;
                        })
                })
                .catch((e, r) =>{
                    error = e;
                    receipt = r;
                })
            if (error) {
                console.log(`We have an error\n${error}\n${receipt}`)
                alert(error)
            }
        } else {
            window.alert('Contract not deployed to detected network.')
        }
    }

    //mint multiple tokens
    async function mintMulti() {
        if(contract) {
            let value = Web3.utils.toWei('0.5', 'ether');
            let error, receipt;
            //this seems insane
            contract.methods.mintTokenMulti().estimateGas({from: account, value: value})
                .then(async (result) =>{
                    contract.methods.mintTokenMulti().send({from: account, value: value, gas: result})
                        .then((receipt) => {
                            const tokenIds = []
                            receipt.events.Transfer.forEach(mint => {
                                tokenIds.push(mint.returnValues.tokenId)
                            });

                            console.log(`Minted tokens: ${tokenIds}`)
                            setMinted(tokenIds);
                            setMulti(true);
                            getBalance();
                            showReceipt();
                            hideMint();
                        })
                    .catch((e, r) => {
                        error = e;
                        receipt = r;
                    })
                })
                .catch((e, r) =>{
                    error = e;
                    receipt = r;
                })
            if (error) {
                console.log(`We have an error\n${error}\n${receipt}`)
                alert(error)
            }
        } else {
            window.alert('Contract not deployed to detected network.')
        }
    }

    useEffect(() => {
        if (web3 === undefined || web3.eth === undefined) return;
        (async () => {
            //identify what network/blockchain we are using
            let networkId;
            web3.eth.net.getId()
                .then((results) =>{
                    networkId = results;
                })
                .catch(() => {
                    alert('Not connected to a network');
                })
    
            //find contract on network
            const contractData = CorrelationsContract.networks[networkId]
    
            //If we have a contract on the network, load the balance.
            if(contractData) {
    
                //get contract deployed instance
                const correlationContract = new web3.eth.Contract(CorrelationsContract.abi, contractData.address)
                setContract(correlationContract);
            } else {
                window.alert('Contract not deployed to detected network.')
            }
        })();
        (async () => {
            web3.eth.getAccounts()
                .then(result => {
                    setAccountList(result);
                })
        })();
    }, [web3])

    useEffect(() => {
        getBalance();
    }, [account])

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
        <>
            <MyNav account={account} showMint={showMint} showAccounts={showAccountModal} balance={tokenCount}/>
            <Container>
                <MyCarousel />
            </Container>
            <MintModal show={mintModal} hide={hideMint} mint={mint} mintMulti={mintMulti}/>
            <ReceiptModal show={receiptModal} hide={hideReceipt} tokenId={minted} multi={multi}/>
            <AccountChooser show={accountModal} hide={hideAccountModal} accounts={accountList} setAccount={setAccount}/>
        </>
    )
}
