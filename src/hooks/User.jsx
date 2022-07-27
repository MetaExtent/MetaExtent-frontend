import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function User() {
    const algoAdd = useSelector(state => state.token.myAlgoAddress);
    console.log(algoAdd)
    //const algoBalance = useSelector(state => state.token.myAlgoBalance);
    const walletAddress = useSelector(state => state.token.walletConnectAddress);
    console.log(walletAddress)
    //const walletAmount = useSelector(state => state.token.walletConnectBalance);
    //const walletConnectStatus = useSelector(state => state.token.walletConnectStatus);
    //const [auth, setAuth] = useState(false);
    let authUser = undefined;
    if (algoAdd == '') {
        authUser = false;
    } else {
        authUser = true;
    }

    return authUser;
}

export default User;