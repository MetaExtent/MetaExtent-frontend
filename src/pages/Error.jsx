import React from 'react'
import algosdk from "algosdk";
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { Button, Center, CircularProgress, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";


function Error() {
    const location = useLocation();
    const bgColor = useColorModeValue("rgb(230, 253, 255)", "blackAlpha.200");

    const navigate = useNavigate();
    var x = new Uint8Array(2);
    x[0] = 17;
    const myAlgo = async () => {


        const headers = {
            "X-API-Key": "1nYJyGUcqI4QNR7ChogoU2839CD3Osh7a6EVEBtv",
        }
        const algodClient = new algosdk.Algodv2(headers, 'https://testnet-algorand.api.purestake.io/ps2', "");
        const params = await algodClient.getTransactionParams().do();
        const algoAdd = await location.state.address;
        console.log(algoAdd);
        const txn = algosdk.makeApplicationOptInTxnFromObject({
            suggestedParams: {
                ...params,
            },
            from: algoAdd[0],
            appIndex: 62368684,
            note: x
        });

        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());



        //starts from here

        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();

        console.log(response);
        navigate("/");


    }
    return (
        <div>
            <>
                <Center w="full" minHeight="100vh" bg={bgColor}>
                    <VStack>
                        <Text color="gray.800">Please OPT-IN your account</Text>
                        <Button bgColor="#A2CFA6" color="blackAlpha.900" onClick={myAlgo}>Please opt-in</Button>
                    </VStack>
                </Center>

            </>
        </div>
    )
}

export default Error