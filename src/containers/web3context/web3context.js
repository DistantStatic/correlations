import Web3 from 'web3';
import React, { useState, useEffect } from 'react';

export const Web3Context = React.createContext();

export default function Web3Container(props) {
    const [web3, setWeb3] = useState({});

    useEffect(() => {
        if (window.ethereum) {
          const temp = new Web3(Web3.givenProvider);
          setWeb3(temp)
  
        } else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
          return;
        }
    }, [])

    return (
        <Web3Context.Provider value={web3}>
            {props.children}
        </Web3Context.Provider>
    )
}
