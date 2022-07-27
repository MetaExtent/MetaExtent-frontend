import { Box, Button, Center } from '@chakra-ui/react'
import React from 'react';
import algosdk from 'algosdk';
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { useSelector } from 'react-redux';


function AssetOptin(props) {
    console.log(props);
    const myAlgo_address = useSelector(state => state.token.myAlgoAddress);
    const assetId = props.assetID;
    // asset optin from here
    const assetOptin = async () => {
        const asset_id = assetId;
        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const params = await algodClient.getTransactionParams().do();
        var note = new Uint8Array([10]);


        let sender = myAlgo_address;
        let recipient = sender;
        // We set revocationTarget to undefined as 
        // This is not a clawback operation
        let revocationTarget = undefined;
        // CloseReaminerTo is set to undefined as
        // we are not closing out an asset
        let closeRemainderTo = undefined;
        // We are sending 0 assets
        let amount = 0;
        let assetID = asset_id;
        // signing and sending "txn" allows sender to begin accepting asset specified by creator and index
        let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
            sender,
            recipient,
            closeRemainderTo,
            revocationTarget,
            amount,
            note,
            assetID,
            params);



        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
        let response = algodClient.sendRawTransaction(signedTxn.blob).do();

        console.log("Asset opt-in SUCCESSFULLY");
        console.log(response);
    }
    return (
        <Center>
            <Button>Opt-in your asset</Button>
        </Center>
    )
}

export default AssetOptin;