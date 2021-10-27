import { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import Web3 from 'web3';

import MyNav from '../../components/nav-bar/nav-bar';
import MyCarousel from '../carousel/carousel';
import MintModal from '../../modals/mint-modal/mint-modal';
import ReceiptModal from '../../modals/receipt-modal/receipt-modal';

import { Web3Context } from '../web3context/web3context';
import { ContractContext } from '../contract-context/contract-context';
import LoadingModal from '../../modals/loading-modal/loading-modal';
import TokenList from '../token-list/token-list';


export default function FrontPage() {
    const [account, setAccount] = useState('');
    const [mintModal, setMintModal] = useState(false);
    const [receiptModal, setReceiptModal] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [showTokenList, setShowTokenList] = useState(true);
    const [tokenCount, setTokenCount] = useState(0);
    const [minted, setMinted] = useState('');
    const [multi, setMulti] = useState(false);
    
    const web3 = useContext(Web3Context);
    const contract = useContext(ContractContext)

    //Specifically load token balance
    async function getBalance() {
        console.log(contract);
        contract.methods.balanceOf(account).call()
            .then(result => {
                setTokenCount(result);
            })
    }

    //mint a token
    async function mint() {
        if(contract) {
            setLoadingModal(true)
            let value = Web3.utils.toWei('0.1', 'ether');
            let error, receipt;
            //this looks insane
            //it is, but only necessary on ganache
            //contract.methods.mintToken().estimateGas({from: account, value: value})
            //    .then(async (result) => {
                    contract.methods.mintToken().send({from: account, value: value})
                        .then((receipt) => {
                            const tokenId = receipt.events.Transfer.returnValues.tokenId
                            setMinted(tokenId);
                            setMulti(false);
                            getBalance();
                            setReceiptModal(true);
                            setMintModal(false);
                            setLoadingModal(false);
                        })
                        .catch((e, r) => {
                            error = e;
                            receipt = r;
                            setLoadingModal(false)
                        })
            //    })
            //    .catch((e, r) =>{
            //        error = e;
            //        receipt = r;
            //        setLoadingModal(false)
            //    })
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
            setLoadingModal(true);
            let value = Web3.utils.toWei('0.5', 'ether');
            let error, receipt;
            //this looks insane
            //it is, but only necessary on ganache
            //contract.methods.mintTokenMulti().estimateGas({from: account, value: value})
            //    .then(async (result) =>{
                    contract.methods.mintTokenMulti().send({from: account, value: value})
                        .then((receipt) => {
                            const tokenIds = []
                            receipt.events.Transfer.forEach(mint => {
                                tokenIds.push(mint.returnValues.tokenId)
                            });

                            console.log(`Minted tokens: ${tokenIds}`)
                            setMinted(tokenIds);
                            setMulti(true);
                            getBalance();
                            setReceiptModal(true);
                            setMintModal(false);
                            setLoadingModal(false);
                        })
                    .catch((e, r) => {
                        error = e;
                        receipt = r;
                        setLoadingModal(false);
                    })
            //    })
            //    .catch((e, r) =>{
            //        error = e;
            //        receipt = r;
            //        setLoadingModal(false);
            //    })
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
            /***web3.eth.getAccounts()
                .then(result => {
                    setAccountList(result);
                })
            */
           window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result =>{
                setAccount(result[0])
            })
        })();
    }, [web3])

    useEffect(() => {
        if (typeof(contract.methods) === 'undefined' || (account === '0x0' || account === null || account === undefined || account === '')) {
            console.log('Unable to get balance')
            return
        }
        contract.methods.balanceOf(account).call()
            .then(result => {
                setTokenCount(result);
            })
    }, [contract, account])
    
    return(
        <>
            <MyNav account={account} showMint={() => {setMintModal(true)}} balance={tokenCount} showCollection={() => setShowTokenList(true)}/>
            <Container>
                <MyCarousel />
            </Container>
            <TokenList show={showTokenList} hide={() => setShowTokenList(false)} account={account} />
            <MintModal show={mintModal} hide={() => setMintModal(false)} mint={mint} mintMulti={mintMulti}/>
            <ReceiptModal show={receiptModal} hide={() => setReceiptModal(false)} tokenId={minted} multi={multi}/>
            <LoadingModal show={loadingModal} hide={() => setLoadingModal(false)} />
        </>
    )
}
