import React, { useState, useEffect, useContext } from "react";
import { Web3Context } from "../web3context/web3context";
import CorrelationsContract from '../../abis/Correlations.json';

export const ContractContext = React.createContext();

export default function ContractContexter(props){
    const [contract, setContract] = useState({});

    const web3 = useContext(Web3Context);

    useEffect(() => {
        (async() => {
            if (web3 === undefined || web3.eth === undefined) return;
            const netId = await web3.eth.net.getId();
            const netData = CorrelationsContract.networks[netId];
            
            if(netData) {
                const abi = CorrelationsContract.abi;
                const address = netData.address;
                setContract(new web3.eth.Contract(abi, address));

            } else {
                window.alert('Contract not deployed to detected network.')
            }
        })()
    }, [web3])

    return (
        <ContractContext.Provider value={contract}>
            {props.children}
        </ContractContext.Provider>
    )
}
