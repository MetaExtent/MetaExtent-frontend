import React, { useState } from 'react'
import { AlertDialog, Box, Button, Center, Divider, HStack, Input, LightMode, Select, Stack, Text, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { useLocation } from "react-router-dom";
import { IoBarChartSharp, IoReload } from "react-icons/io5";
import SettingModal from '../components/layout/Navbar/DesktopNav/ModalDesktop';
import SwapModal from '../components/swapComponent/SwapModal';
import { useDispatch } from 'react-redux';
import { InputAction } from '../components/redux/actions';
import { useSelector } from 'react-redux';
//import { useTranslation } from 'react-i18next';
import DesktopNav from '../components/layout/Navbar/DesktopNav/DesktopNav';
import axios from 'axios';
import algosdk from 'algosdk';
import MyAlgoConnect from "@randlabs/myalgo-connect";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import bgImage from '../components/images/Turtle.png';
import { myAlgoWalletInfo } from '../components/redux/actions';
import { API_URL } from '../url';
import AssetOptin from '../components/assetOptin/AssetOptin';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
//console.log(useColorMode);
function Swap(props) {
    const location = useLocation();
    //const { t, i18n } = useTranslation();
    const bgColor = useColorModeValue("rgb(230, 253, 255)", "blackAlpha.200");
    const bg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
    const textColor = useColorModeValue("gray.600", "whiteAlpha.500");
    const [inputTwo, setinputTwo] = useState("");
    const [popUp, alertPopUp] = useState(false);
    const [inputTwoInfo, setInputTwoInfo] = useState("");
    //getting info from redus-store
    const token1 = useSelector(state => state.token.token1_ID);
    const token2 = useSelector(state => state.token.token2_ID);

    const slippage_tolerance = useSelector(state => state.token.slippageTolerance);
    const myAlgo_address = useSelector(state => state.token.myAlgoAddress);

    const dispatchInput = useDispatch();
    const [money, setMoney] = useState(0);
    const asset1_Amount = useSelector(state => state.token.input1);
    const input2 = useSelector(state => state.token.input2);
    const [slippage, setSlippageValue] = useState(0.5);
    const [Swaperror, setSwapError] = useState(false);
    const handleInputTwo = () => {

    }
    dispatchInput(InputAction(money));

    //const slippageValue = useSelector(state => state.token.slippageTolerance);
    //setSlippageValue(slippageValue);
    //console.log("slippage" + slippageValue);
    //from reddx
    const algoAdd = useSelector(state => state.token.myAlgoAddress);
    const algoBalance = useSelector(state => state.token.myAlgoBalance);
    const walletAddress = useSelector(state => state.token.walletConnectAddress);
    const walletAmount = useSelector(state => state.token.walletConnectBalance);
    const walletConnectStatus = useSelector(state => state.token.walletConnectStatus);
    const [optInResponse, setResponse] = useState(false);
    const [assetOptInPopUp, setAssetOptInPopUp] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    //send data to API
    const setInfoForApi = async (e) => {
        await setMoney(e.target.value);
        console.log(asset1_Amount);
        // axios.get('http://192.168.0.135:12000/swap/poolInfo?address=' + myAlgo_address + '&asset1=' + token2 + '&asset2=' + token1 + '&asset2_amount=' + e.target.value)
        axios.get(`${API_URL}swap/poolInfo?address=` + myAlgo_address + '&asset1=' + token2 + '&asset2=' + token1 + '&asset2_amount=' + e.target.value)
            .then(function (response) {
                console.log(response);

                setinputTwo(response.data.Asset2_price_perAsset1);
                setInputTwoInfo(response.data.Asset2_price_perAsset1_worst_case);
            })
            .catch((error) => {
                console.log(error.response.status);
                if (error.response.status === 500) {
                    setSwapError(true);
                    console.log(Swaperror);
                    setTimeout(() => {
                        setSwapError(false);

                    }, 3000);
                }
            });
    }

    // updated acc info


    const SwapWallet = async () => {

        //check asset optin
        var optinResult = "";
        // await axios('http://192.168.0.135:12000/swap/checkOptin?address=' + address)
        await axios(`${API_URL}swap/checkAssetOptin?address=` + myAlgo_address + '&assetId=' + token2)
            .then(response => {
                if (response.status === 200) {

                    console.log(response);
                    optinResult = response.data;
                    console.log(optinResult);
                }


            })
            .catch(error => {
                console.error("Error fatching data", error);
                //setError(error);
            })

        if (optinResult.optinInResult) {
            const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');

            let data = {};
            await axios(`${API_URL}swap/poolInfo?address=` + myAlgo_address + '&asset1=' + token2 + '&asset2=' + token1 + '&asset2_amount=' + asset1_Amount)
                .then(response => {


                    if (response.status === 200) {
                        data = response.data;
                        console.log(response);


                    }


                })
                .catch(error => {
                    console.error("Error fatching data", error);

                })

            const validator_app_id = 62368684;
            const asset1_id = data.pool_info.asset1_id;
            console.log(asset1_id);
            const asset2_id = data.pool_info.asset2_id;


            const liquidity_asset_id = data.pool_info.liquidity_asset_id;
            const asset_in_id = data.asset_in_id;
            const asset_out_id = data.asset_out_id;
            const asset_in_amount = data.asset_in_amount;
            const asset_out_amount = data.asset_out_amount;
            const swap_type = "fixed-input";
            const sender = myAlgo_address;

            const suggested_params = await algodClient.getTransactionParams().do();
            const pool_address = data.pool_info.address;

            const note = new Uint8Array(Buffer.from('fee', 'utf8'));
            const swap = new Uint8Array(Buffer.from('swap', 'utf8'));
            const swap2 = new Uint8Array(Buffer.from('fi', 'utf8'));


            const txn1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: sender,
                suggestedParams: {
                    ...suggested_params
                },
                to: pool_address,
                amount: 6000,

            });


            const txn2 = algosdk.makeApplicationNoOpTxnFromObject({
                from: pool_address,
                suggestedParams: {
                    ...suggested_params
                },
                appIndex: validator_app_id,
                accounts: [sender],
                foreignAssets: [asset1_id, liquidity_asset_id],
                appArgs: [swap, swap2]
            })

            const txn3 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: sender,
                suggestedParams: {
                    ...suggested_params
                },
                to: pool_address,
                amount: asset_in_amount,
                assetIndex: asset_in_id
            })

            const txn4 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: pool_address,
                suggestedParams: {
                    ...suggested_params
                },
                to: sender,
                amount: asset_out_amount,
                assetIndex: asset_out_id
            })


            const txns = [txn1, txn2, txn3, txn4];



            const groupID = algosdk.assignGroupID(txns)


            // for (let i = 0; i < 2; i++) txns[i].group = groupID;


            // let program = "";

            // fetch(validator)
            //     .then(r => r.text())
            //     .then(text => {
            //         program = text;

            //     })
            // const compiledProgram = await algodClient.compile(program).do();



            // const programBytes = new Uint8Array(
            //     Buffer.from(compiledProgram.result, 'base64')
            // );

            // let lsig = algosdk.makeLogicSig([4, 32, 8, 1, 0, 0, 189, 174, 254, 4, 3, 4, 5, 6, 37, 36, 13, 68, 49, 9, 50, 3, 18, 68, 49, 21, 50, 3, 18, 68, 49, 32, 50, 3, 18, 68, 50, 4, 34, 13, 68, 51, 1, 0, 49, 0, 18, 68, 51, 1, 16, 33, 7, 18, 68, 51, 1, 24, 129, 172, 215, 222, 29, 18, 68, 51, 1, 25, 34, 18, 51, 1, 27, 33, 4, 18, 16, 55, 1, 26, 0, 128, 9, 98, 111, 111, 116, 115, 116, 114, 97, 112, 18, 16, 64, 0, 92, 51, 1, 25, 35, 18, 68, 51, 1, 27, 129, 2, 18, 55, 1, 26, 0, 128, 4, 115, 119, 97, 112, 18, 16, 64, 2, 59, 51, 1, 27, 34, 18, 68, 55, 1, 26, 0, 128, 4, 109, 105, 110, 116, 18, 64, 1, 59, 55, 1, 26, 0, 128, 4, 98, 117, 114, 110, 18, 64, 1, 152, 55, 1, 26, 0, 128, 6, 114, 101, 100, 101, 101, 109, 18, 64, 2, 91, 55, 1, 26, 0, 128, 4, 102, 101, 101, 115, 18, 64, 2, 121, 0, 33, 6, 33, 5, 36, 35, 18, 77, 50, 4, 18, 68, 55, 1, 26, 1, 23, 37, 18, 55, 1, 26, 2, 23, 36, 18, 16, 68, 51, 2, 0, 49, 0, 18, 68, 51, 2, 16, 33, 4, 18, 68, 51, 2, 33, 35, 18, 68, 51, 2, 34, 35, 28, 18, 68, 51, 2, 35, 33, 7, 18, 68, 51, 2, 36, 35, 18, 68, 51, 2, 37, 128, 8, 84, 77, 80, 79, 79, 76, 49, 49, 18, 68, 51, 2, 38, 81, 0, 15, 128, 15, 84, 105, 110, 121, 109, 97, 110, 80, 111, 111, 108, 49, 46, 49, 32, 18, 68, 51, 2, 39, 128, 19, 104, 116, 116, 112, 115, 58, 47, 47, 116, 105, 110, 121, 109, 97, 110, 46, 111, 114, 103, 18, 68, 51, 2, 41, 50, 3, 18, 68, 51, 2, 42, 50, 3, 18, 68, 51, 2, 43, 50, 3, 18, 68, 51, 2, 44, 50, 3, 18, 68, 51, 3, 0, 49, 0, 18, 68, 51, 3, 16, 33, 5, 18, 68, 51, 3, 17, 37, 18, 68, 51, 3, 20, 49, 0, 18, 68, 51, 3, 18, 35, 18, 68, 36, 35, 19, 64, 0, 16, 51, 1, 1, 51, 2, 1, 8, 51, 3, 1, 8, 53, 1, 66, 1, 177, 51, 4, 0, 49, 0, 18, 68, 51, 4, 16, 33, 5, 18, 68, 51, 4, 17, 36, 18, 68, 51, 4, 20, 49, 0, 18, 68, 51, 4, 18, 35, 18, 68, 51, 1, 1, 51, 2, 1, 8, 51, 3, 1, 8, 51, 4, 1, 8, 53, 1, 66, 1, 124, 50, 4, 33, 6, 18, 68, 55, 1, 28, 1, 49, 0, 19, 68, 55, 1, 28, 1, 51, 4, 20, 18, 68, 51, 2, 0, 49, 0, 19, 68, 51, 2, 20, 49, 0, 18, 68, 51, 3, 0, 51, 2, 0, 18, 68, 51, 2, 17, 37, 18, 68, 51, 3, 20, 51, 3, 7, 51, 3, 16, 34, 18, 77, 49, 0, 18, 68, 51, 3, 17, 35, 51, 3, 16, 34, 18, 77, 36, 18, 68, 51, 4, 0, 49, 0, 18, 68, 51, 4, 20, 51, 2, 0, 18, 68, 51, 1, 1, 51, 4, 1, 8, 53, 1, 66, 1, 17, 50, 4, 33, 6, 18, 68, 55, 1, 28, 1, 49, 0, 19, 68, 55, 1, 28, 1, 51, 2, 20, 18, 68, 51, 3, 20, 51, 3, 7, 51, 3, 16, 34, 18, 77, 55, 1, 28, 1, 18, 68, 51, 2, 0, 49, 0, 18, 68, 51, 2, 20, 51, 4, 0, 18, 68, 51, 2, 17, 37, 18, 68, 51, 3, 0, 49, 0, 18, 68, 51, 3, 20, 51, 3, 7, 51, 3, 16, 34, 18, 77, 51, 4, 0, 18, 68, 51, 3, 17, 35, 51, 3, 16, 34, 18, 77, 36, 18, 68, 51, 4, 0, 49, 0, 19, 68, 51, 4, 20, 49, 0, 18, 68, 51, 1, 1, 51, 2, 1, 8, 51, 3, 1, 8, 53, 1, 66, 0, 144, 50, 4, 33, 5, 18, 68, 55, 1, 28, 1, 49, 0, 19, 68, 51, 2, 0, 55, 1, 28, 1, 18, 68, 51, 2, 0, 49, 0, 19, 68, 51, 3, 0, 49, 0, 18, 68, 51, 2, 20, 51, 2, 7, 51, 2, 16, 34, 18, 77, 49, 0, 18, 68, 51, 3, 20, 51, 3, 7, 51, 3, 16, 34, 18, 77, 51, 2, 0, 18, 68, 51, 1, 1, 51, 3, 1, 8, 53, 1, 66, 0, 62, 50, 4, 33, 4, 18, 68, 55, 1, 28, 1, 49, 0, 19, 68, 51, 2, 20, 51, 2, 7, 51, 2, 16, 34, 18, 77, 55, 1, 28, 1, 18, 68, 51, 1, 1, 51, 2, 1, 8, 53, 1, 66, 0, 18, 50, 4, 33, 4, 18, 68, 51, 1, 1, 51, 2, 1, 8, 53, 1, 66, 0, 0, 51, 0, 0, 49, 0, 19, 68, 51, 0, 7, 49, 0, 18, 68, 51, 0, 8, 52, 1, 15, 67])
            // let lsig = algosdk.makeLogicSig(programBytes)

            let lsig = algosdk.makeLogicSig(data.byteInfo);
            console.log(lsig.address())

            // let sign1 = algosdk.signLogicSigTransaction(txn1,lsig);
            let sign2 = algosdk.signLogicSigTransactionObject(txn2, lsig);
            // let sign3 = algosdk.signLogicSigTransaction(txn3,lsig);
            let sign4 = algosdk.signLogicSigTransactionObject(txn4, lsig);

            console.log("-------logicsig signed trx-------");

            console.log(sign2);

            console.log(sign4);

            const myAlgoConnect = new MyAlgoConnect();
            let txns2 = [txn1, txn3]

            console.log("-------Sigining tx from frontend-------");
            const signedTxn = await myAlgoConnect.signTransaction(txns2.map(txn => txn.toByte()));

            console.log(signedTxn[0])
            console.log(signedTxn[1])
            // let signed = []
            // signed.push( sign2.blob )
            // signed.push( sign4.blob )
            // signed.push( signedTxn[0].blob )
            // signed.push( signedTxn[1].blob )

            console.log("-------Sending tx from frontend to network-------");
            //assetOptin(asset1_id);


            let response = (await algodClient.sendRawTransaction([signedTxn[0].blob, sign2.blob, signedTxn[1].blob, sign4.blob]).do());
            // const response2 = await algodClient.sendRawTransaction(signedTxn[1].blob).do();

            console.log("-------Sending logisig tx to network-------");

            // const response3 = await algodClient.sendRawTransaction(sign2.blob).do();
            // const response4 = await algodClient.sendRawTransaction(sign4.blob).do();
            console.log(response);




            alertPopUp(true)
            setinputTwo(0)
            setMoney(0)
            setInputTwoInfo(false)
            setTimeout(() => {
                alertPopUp(false);
                updateAccInfo();

            }, 7000);

            // setTimeout(() => {
            //     updateAccInfo();

            // }, 7000);

        }

        else {

            assetOptin(token2);
        }

    }
    const assetOptin = async (val) => {
        console.log("Val" + val);
        const asset_id = parseInt(val);
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
        setResponse(true);
        setAssetOptInPopUp(true);
        setTimeout(() => {
            setAssetOptInPopUp(false);
            setResponse(false);

        }, 3000);
        console.log("Asset opt-in SUCCESSFULLY");
        //console.log(response.txId);
    }

    const updateAccInfo = async () => {
        let accInfo = {};
        await axios(`${API_URL}swap/accountInfo?address=` + myAlgo_address)
            .then(response => {

                if (response.status === 200) {
                    accInfo = response.data;
                    const address = accInfo.clientInfo.address;
                    const amount = accInfo.clientInfo.amount / 1000000;
                    dispatchInput(myAlgoWalletInfo({
                        algoAddress: address,
                        algoBalance: amount
                    }));
                    console.log(accInfo);
                    console.log(amount);
                }

            })
            .catch(error => {
                console.error("Error fatching data", error);
            })
    }


    return (
        <>
            {/* <DesktopNav name={algoAdd} amount={algoBalance} /> */}
            {walletConnectStatus ? <DesktopNav name={walletAddress} amount={walletAmount} /> : <DesktopNav name={algoAdd} amount={algoBalance} />}
            <Box w="100%" minH="90vh" bg={bgColor} py={50} backgroundImage={bgImage} backgroundRepeat="no-repeat" backgroundPosition="right -10px bottom -130px" backgroundSize="30%" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px">
                <Box w="350px" h="530px" borderRadius="25px" bg={bg} m="auto" px="20px" py="40px" marginBottom="20px">
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Box width="30%">
                            <IoBarChartSharp size='25px' cursor="pointer" />
                        </Box>
                        <Box width="40%">
                            <Text fontSize="23px" align="center" fontWeight="600" >Swap</Text>
                        </Box>
                        <HStack width="30%">
                            <SettingModal color />
                            <IoReload size='25px' cursor="pointer" />
                        </HStack>
                    </Stack>
                    <Stack>
                        <Text fontSize="16px" textAlign="center" textColor={textColor}>Trade tokens in an instant</Text>
                    </Stack>

                    <HStack py={5}>
                        <SwapModal />
                    </HStack>
                    <HStack>
                        {/* <Input variant='filled' placeholder='0.0' h="60px" textAlign="end" borderRadius="10px" name='money' type="number" value={money} onChange={e => setMoney(e.target.value)} /> */}
                        <Input variant='filled' placeholder='0.0' h="60px" textAlign="end" borderRadius="10px" name='money' type="number" value={money ?? ""} onChange={e => setInfoForApi(e)} />
                    </HStack>
                    <HStack py={5}>
                        <SwapModal token2="token2" />
                    </HStack>
                    <HStack paddingBottom={3}>
                        <Input variant='filled' h="60px" textAlign="end" borderRadius="10px" name='money' type="number" value={inputTwo} onChange={e => handleInputTwo} />
                    </HStack>
                    <HStack paddingBottom={5} justifyContent="space-between">
                        <Text fontSize="12px" textColor={textColor}>Slippage Tolerance</Text>
                        <Text fontSize="12px">{slippage_tolerance}%</Text>


                    </HStack>
                    <Stack >
                        <Button bg="#6FAA6B" color="whiteAlpha.900" _hover={{ color: "#6FAA6B" }} py="25px" onClick={SwapWallet}>Swap</Button>
                    </Stack>

                    {
                        Swaperror ?

                            <Alert status='warning'>
                                <AlertIcon />
                                No liquidity for the pool.
                            </Alert>
                            :
                            null
                    }
                </Box>
                {inputTwoInfo ? <Box w="328px" h="70px" borderRadius="8px" bg={bg} m="auto" px="20px" py="20px" align="center" verticalAlign="center">
                    <Text>Wrost Case: {inputTwoInfo}</Text>
                </Box> : null}
                {
                    popUp ?
                        <Alert status='success'>
                            <AlertIcon />
                            Your Transaction has been successful. Fire on!
                        </Alert>
                        :
                        null
                }

                {
                    optInResponse ?
                        <Alert status='success'>
                            <AlertIcon />
                            Your Asset is opt-In. Fire on!
                        </Alert>
                        :
                        null
                }

            </Box>
        </>
    )
}

export default Swap;