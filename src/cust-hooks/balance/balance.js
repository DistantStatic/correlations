import { useState, useEffect } from 'react';
import CorrelationsContract from '../../abis/Correlations.json';

export default function useBalanceUpdater(account){
    const [balance, setBalance ] = useState(0);

    useEffect(() => {
        
        const correlationsContract = new web3.eth.Contract(CorrelationsContract.abi, contractData.address)
        let correlationsBalance = await correlationsContract.methods.balanceOf(account).call()
        setBalance(correlationsBalance);
        console.log(balance);
    })

    return balance;
}