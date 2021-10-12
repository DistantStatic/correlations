import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Web3 from 'web3';

import MyNav from '../../components/nav-bar/nav-bar';
import MyCarousel from '../../components/carousel/carousel';
import MintModal from '../../modals/mint-modal/mint-modal';
import AccountChooser from '../../modals/account-chooser/account-chooser';


export default function FrontPage() {
    const [account, setAccount] = useState('');
    const [mintModal, setMintModal] = useState(false);
    const [accountModal, setAccountModal] = useState(true);
    const [accountList, setAccountList] = useState([]);


    useEffect(() => {
        async function loadWeb3() {
            if (window.ethereum) {
              window.web3 = new Web3(window.ethereum)
              await window.ethereum.enable()
            }
            else if (window.web3) {
              window.web3 = new Web3(window.web3.currentProvider)
            }
            else {
              window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
            }
            let accounts = await window.web3.eth.getAccounts();
            console.log(accounts);
            setAccountList(accounts);
        }
        loadWeb3();
    }, [])

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
    
    return(
        <div>
            <MyNav account={account} showMint={showMint} />
            <Container>
                <MyCarousel />
            </Container>
            <MintModal show={mintModal} hide={hideMint} />
            <AccountChooser show={accountModal} onHide={hideAccountModal} accounts={accountList} setAccount={setAccount}/>
        </div>
    )
}
