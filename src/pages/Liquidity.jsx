import { Box, Divider, HStack, Stack, useColorModeValue, Text, Button, Input, Alert, AlertIcon } from '@chakra-ui/react';
import React, { useState } from 'react'
import DesktopNav from '../components/layout/Navbar/DesktopNav/DesktopNav';
import { IoReload } from "react-icons/io5";
import SettingModal from '../components/layout/Navbar/DesktopNav/ModalDesktop';
import { AddIcon, ArrowBackIcon, MinusIcon } from '@chakra-ui/icons';
import LiquidityModal from '../components/liquidityComponent/LiquidityModal';
import { useDispatch, useSelector } from 'react-redux';
import { LiquidityAction } from '../components/redux/actions';
import coinImage from '../components/images/coin.png';
import axios from 'axios';
import algosdk from 'algosdk';
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { API_URL } from '../url';
import { myAlgoWalletInfo } from '../components/redux/actions';

function Liquidity(props) {
    const algoAdd = useSelector(state => state.token.myAlgoAddress);
    const algoBalance = useSelector(state => state.token.myAlgoBalance);
    const walletAddress = useSelector(state => state.token.walletConnectAddress);
    const walletAmount = useSelector(state => state.token.walletConnectBalance);
    const walletConnectStatus = useSelector(state => state.token.walletConnectStatus);
    const bgColor = useColorModeValue("rgb(230, 253, 255)", "blackAlpha.200");
    const color = useColorModeValue("gray.100", "blackAlpha.200");
    const bg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");
    const textColor = useColorModeValue("gray.600", "whiteAlpha.500");
    const [liquidityInput_1, setLiquidityInput_1] = useState(0);
    const [liquidityInput2, setinputTwo] = useState(0);
    console.log(liquidityInput_1, liquidityInput2);
    const [liquidityAsset1, setLiquidityAsset] = useState(0);
    const dispatch = useDispatch();
    const [showInput, setShowInput] = useState(false);
    const myAlgo_address = useSelector(state => state.token.myAlgoAddress);
    const token1 = useSelector(state => state.token.token1_ID);
    const token2 = useSelector(state => state.token.token2_ID);
    const liquidity_asset1_Amount = useSelector(state => state.token.liquidity_input1);
    const [money, setMoney] = useState(0);
    const [popUp, alertPopUp] = useState(false);
    const [mode, setMode] = useState(false);
    const dispatchInput = useDispatch();
    const handle_Input_Two = () => {

    }
    // switch between add liquidity or withdraw liquidity
    const switchMode = () => {
        setMode(!mode);
    }
    const toggleShow = () => {
        setShowInput(!showInput);
    }
    //liquidity input value update in redux
    const liquidityInput = (e) => {
        setLiquidityInput_1(e.target.value);
    }
    dispatch(LiquidityAction(liquidityInput_1));
    //liquidity input2 value from redux
    const liquidity_input2 = useSelector(state => state.token.liquidity_input2);

    const setInfoForApi = async (e) => {
        await setLiquidityInput_1(e.target.value);
        //console.log(asset1_Amount);
        axios.get(`${API_URL}swap/poolInfo?address=` + myAlgo_address + '&asset1=' + token2 + '&asset2=' + token1 + '&asset2_amount=' + e.target.value)
            .then(function (response) {
                console.log(response);

                setinputTwo(response.data.Asset2_price_perAsset1);
                setLiquidityAsset(response.data.pool_info.liquidity_asset_id);
                console.log("liquidity1" + liquidityAsset1);
                // setInputTwoInfo(response.data.Asset2_price_perAsset1_worst_case);
            })
    }

    // adding liquidity
    const addLiquidity = async () => {
        var optinResult = "";
        // await axios('http://192.168.0.135:12000/swap/checkOptin?address=' + address)
        await axios(`${API_URL}swap/checkAssetOptin?address=` + myAlgo_address + '&assetId=' + token2)
            .then(response => {
                if (response.status === 200) {

                    console.log(response);
                    console.log("token2" + token2);
                    optinResult = response.data;
                    console.log(optinResult);
                }


            })
            .catch(error => {
                console.error("Error fatching data", error);
                //setError(error);
            })
        //
        if (optinResult.optinInResult) {
            console.log("Hello1");
            var optinResultForLiquidityAsset = "";
            // await axios('http://192.168.0.135:12000/swap/checkOptin?address=' + address)
            await axios(`${API_URL}swap/checkAssetOptin?address=` + myAlgo_address + '&assetId=' + liquidityAsset1)
                .then(response => {
                    if (response.status === 200) {

                        console.log(response);
                        optinResultForLiquidityAsset = response.data.optinInResult;
                        console.log("optinResultForLiquidityAsset" + optinResultForLiquidityAsset);
                    }


                })
                .catch(error => {
                    console.error("Error fatching data", error);
                    //setError(error);
                })
            if (optinResultForLiquidityAsset) {
                console.log("helllooo");
                const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');

                let data = {};
                await axios(`${API_URL}swap/poolInfo?address=` + myAlgo_address + '&asset1=' + token2 + '&asset2=' + token1 + '&asset2_amount=' + liquidity_asset1_Amount)
                    .then(response => {


                        if (response.status === 200) {
                            data = response.data;
                            console.log(response);

                        }


                    })
                    .catch(error => {
                        console.error("Error fatching data", error);

                    })

                // const headers = {
                //     "X-API-Key": "1nYJyGUcqI4QNR7ChogoU2839CD3Osh7a6EVEBtv",
                // }
                // const algodClient = new algosdk.Algodv2(headers,'https://testnet-algorand.api.purestake.io/ps2', "");

                const validator_app_id = 62368684;
                const asset1_id = data.pool_info.asset1_id;
                const asset2_id = data.pool_info.asset2_id;


                const liquidity_asset_id = data.pool_info.liquidity_asset_id;
                //assetOptin(liquidity_asset_id);
                //console.log("liquidity_asset_id" + liquidity_asset_id);
                //return 0;
                const asset_in_id = data.asset_in_id;
                const asset_out_id = data.asset_out_id;
                const asset_in_amount = data.asset_in_amount;
                const asset_out_amount = data.asset_out_amount;
                // const swap_type = "fixed-input";
                const sender = myAlgo_address;
                const suggested_params = await algodClient.getTransactionParams().do();
                const pool_address = data.pool_info.address;

                const note = new Uint8Array(Buffer.from('fee', 'utf8'));
                const note2 = new Uint8Array(Buffer.from('mint', 'utf8'));


                const txn1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                    from: sender,
                    suggestedParams: {
                        ...suggested_params
                    },
                    to: pool_address,
                    amount: 2000,
                    note: note


                });



                const txn2 = algosdk.makeApplicationNoOpTxnFromObject({
                    from: pool_address,
                    suggestedParams: {
                        ...suggested_params
                    },
                    appIndex: validator_app_id,
                    appArgs: [note2],
                    accounts: [sender],
                    foreignAssets: [asset1_id, liquidity_asset_id],

                })


                const txn3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                    from: sender,
                    suggestedParams: {
                        ...suggested_params
                    },
                    to: pool_address,
                    amount: 1,
                    assetIndex: asset1_id
                })

                const txn4 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                    from: sender,
                    suggestedParams: {
                        ...suggested_params
                    },
                    to: pool_address,
                    amount: parseInt(liquidityInput_1 * 1000000),



                });

                const txn5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                    from: pool_address,
                    suggestedParams: {
                        ...suggested_params
                    },
                    to: sender,
                    amount: 3,
                    assetIndex: liquidity_asset_id
                })

                const txns = [txn1, txn2, txn3, txn4, txn5];



                const groupID = algosdk.assignGroupID(txns)

                // let lsig = algosdk.makeLogicSig([4, 32, 8, 1, 0, 0, 129, 180, 158, 44, 3, 4, 5, 6, 37, 36, 13, 68, 49, 9, 50, 3, 18, 68, 49, 21, 50, 3, 18, 68, 49, 32, 50, 3, 18, 68, 50, 4, 34, 13, 68, 51, 1, 0, 49, 0, 18, 68, 51, 1, 16, 33, 7, 18, 68, 51, 1, 24, 129, 172, 215, 222, 29, 18, 68, 51, 1, 25, 34, 18, 51, 1, 27, 33, 4, 18, 16, 55, 1, 26, 0, 128, 9, 98, 111, 111, 116, 115, 116, 114, 97, 112, 18, 16, 64, 0, 92, 51, 1, 25, 35, 18, 68, 51, 1, 27, 129, 2, 18, 55, 1, 26, 0, 128, 4, 115, 119, 97, 112, 18, 16, 64, 2, 59, 51, 1, 27, 34, 18, 68, 55, 1, 26, 0, 128, 4, 109, 105, 110, 116, 18, 64, 1, 59, 55, 1, 26, 0, 128, 4, 98, 117, 114, 110, 18, 64, 1, 152, 55, 1, 26, 0, 128, 6, 114, 101, 100, 101, 101, 109, 18, 64, 2, 91, 55, 1, 26, 0, 128, 4, 102, 101, 101, 115, 18, 64, 2, 121, 0, 33, 6, 33, 5, 36, 35, 18, 77, 50, 4, 18, 68, 55, 1, 26, 1, 23, 37, 18, 55, 1, 26, 2, 23, 36, 18, 16, 68, 51, 2, 0, 49, 0, 18, 68, 51, 2, 16, 33, 4, 18, 68, 51, 2, 33, 35, 18, 68, 51, 2, 34, 35, 28, 18, 68, 51, 2, 35, 33, 7, 18, 68, 51, 2, 36, 35, 18, 68, 51, 2, 37, 128, 8, 84, 77, 80, 79, 79, 76, 49, 49, 18, 68, 51, 2, 38, 81, 0, 15, 128, 15, 84, 105, 110, 121, 109, 97, 110, 80, 111, 111, 108, 49, 46, 49, 32, 18, 68, 51, 2, 39, 128, 19, 104, 116, 116, 112, 115, 58, 47, 47, 116, 105, 110, 121, 109, 97, 110, 46, 111, 114, 103, 18, 68, 51, 2, 41, 50, 3, 18, 68, 51, 2, 42, 50, 3, 18, 68, 51, 2, 43, 50, 3, 18, 68, 51, 2, 44, 50, 3, 18, 68, 51, 3, 0, 49, 0, 18, 68, 51, 3, 16, 33, 5, 18, 68, 51, 3, 17, 37, 18, 68, 51, 3, 20, 49, 0, 18, 68, 51, 3, 18, 35, 18, 68, 36, 35, 19, 64, 0, 16, 51, 1, 1, 51, 2, 1, 8, 51, 3, 1, 8, 53, 1, 66, 1, 177, 51, 4, 0, 49, 0, 18, 68, 51, 4, 16, 33, 5, 18, 68, 51, 4, 17, 36, 18, 68, 51, 4, 20, 49, 0, 18, 68, 51, 4, 18, 35, 18, 68, 51, 1, 1, 51, 2, 1, 8, 51, 3, 1, 8, 51, 4, 1, 8, 53, 1, 66, 1, 124, 50, 4, 33, 6, 18, 68, 55, 1, 28, 1, 49, 0, 19, 68, 55, 1, 28, 1, 51, 4, 20, 18, 68, 51, 2, 0, 49, 0, 19, 68, 51, 2, 20, 49, 0, 18, 68, 51, 3, 0, 51, 2, 0, 18, 68, 51, 2, 17, 37, 18, 68, 51, 3, 20, 51, 3, 7, 51, 3, 16, 34, 18, 77, 49, 0, 18, 68, 51, 3, 17, 35, 51, 3, 16, 34, 18, 77, 36, 18, 68, 51, 4, 0, 49, 0, 18, 68, 51, 4, 20, 51, 2, 0, 18, 68, 51, 1, 1, 51, 4, 1, 8, 53, 1, 66, 1, 17, 50, 4, 33, 6, 18, 68, 55, 1, 28, 1, 49, 0, 19, 68, 55, 1, 28, 1, 51, 2, 20, 18, 68, 51, 3, 20, 51, 3, 7, 51, 3, 16, 34, 18, 77, 55, 1, 28, 1, 18, 68, 51, 2, 0, 49, 0, 18, 68, 51, 2, 20, 51, 4, 0, 18, 68, 51, 2, 17, 37, 18, 68, 51, 3, 0, 49, 0, 18, 68, 51, 3, 20, 51, 3, 7, 51, 3, 16, 34, 18, 77, 51, 4, 0, 18, 68, 51, 3, 17, 35, 51, 3, 16, 34, 18, 77, 36, 18, 68, 51, 4, 0, 49, 0, 19, 68, 51, 4, 20, 49, 0, 18, 68, 51, 1, 1, 51, 2, 1, 8, 51, 3, 1, 8, 53, 1, 66, 0, 144, 50, 4, 33, 5, 18, 68, 55, 1, 28, 1, 49, 0, 19, 68, 51, 2, 0, 55, 1, 28, 1, 18, 68, 51, 2, 0, 49, 0, 19, 68, 51, 3, 0, 49, 0, 18, 68, 51, 2, 20, 51, 2, 7, 51, 2, 16, 34, 18, 77, 49, 0, 18, 68, 51, 3, 20, 51, 3, 7, 51, 3, 16, 34, 18, 77, 51, 2, 0, 18, 68, 51, 1, 1, 51, 3, 1, 8, 53, 1, 66, 0, 62, 50, 4, 33, 4, 18, 68, 55, 1, 28, 1, 49, 0, 19, 68, 51, 2, 20, 51, 2, 7, 51, 2, 16, 34, 18, 77, 55, 1, 28, 1, 18, 68, 51, 1, 1, 51, 2, 1, 8, 53, 1, 66, 0, 18, 50, 4, 33, 4, 18, 68, 51, 1, 1, 51, 2, 1, 8, 53, 1, 66, 0, 0, 51, 0, 0, 49, 0, 19, 68, 51, 0, 7, 49, 0, 18, 68, 51, 0, 8, 52, 1, 15, 67])
                let lsig = algosdk.makeLogicSig(data.byteInfo);
                console.log(lsig.address())
                // if(lsig.address()==pool_address){
                //     console.log("address matched")
                // }

                let sign2 = algosdk.signLogicSigTransactionObject(txn2, lsig);

                let sign5 = algosdk.signLogicSigTransactionObject(txn5, lsig);

                console.log("-------logicsig signed trx-------");

                console.log(sign2);


                console.log(sign5);

                const myAlgoConnect = new MyAlgoConnect();
                let txns2 = [txn1, txn3, txn4]

                console.log("-------Sigining tx from frontend-------");
                const signedTxn = await myAlgoConnect.signTransaction(txns2.map(txn => txn.toByte()));

                console.log(signedTxn[0])
                console.log(signedTxn[1])
                console.log(signedTxn[2])

                console.log("-------Sending tx from frontend to network-------");

                // assetOptin(liquidity_asset_id);

                let response = (await algodClient.sendRawTransaction([signedTxn[0].blob, sign2.blob, signedTxn[1].blob, signedTxn[2].blob, sign5.blob]).do());


                alertPopUp(true)
                setLiquidityInput_1(0);
                setinputTwo(0);
                setShowInput(true);
                setTimeout(() => {
                    alertPopUp(false);
                    updateAccInfo();

                }, 7000);

                console.log("-------Sending logisig tx to network-------");
                console.log(response);

            } else {
                assetOptin(liquidityAsset1);
            }
        } else {
            assetOptin(token2);
        }
    }

    const withDrawLiquidity = async () => {
        let withdrawLiquidity = 0;
        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');

        let data = {};
        await axios(`${API_URL}swap/poolInfo?address=` + myAlgo_address + '&asset1=' + token2 + '&asset2=' + token1 + '&asset2_amount=' + liquidity_asset1_Amount + '&type=withdrawLiquidity' + withdrawLiquidity)
            .then(response => {


                if (response.status === 200) {
                    data = response.data;
                    console.log(response);

                }


            })
            .catch(error => {
                console.error("Error fatching data", error);

            })

        // const headers = {
        //     "X-API-Key": "1nYJyGUcqI4QNR7ChogoU2839CD3Osh7a6EVEBtv",
        // }
        // const algodClient = new algosdk.Algodv2(headers,'https://testnet-algorand.api.purestake.io/ps2', "");
        const validator_app_id = 62368684;
        const asset1_id = data.pool_info.asset1_id;
        const asset2_id = data.pool_info.asset2_id;
        const liquidity_asset_id = data.pool_info.liquidity_asset_id;
        // const asset_in_id = 0;
        const asset_out_id = data.asset_out_id;
        // const asset_in_amount = 0.000001;
        // const asset_out_amount = 0.000002;
        // const swap_type = "fixed-input";
        const sender = myAlgo_address;
        const suggested_params = await algodClient.getTransactionParams().do();
        const pool_address = data.pool_info.address;

        const note = new Uint8Array(Buffer.from('fee', 'utf8'));
        const note2 = new Uint8Array(Buffer.from('burn', 'utf8'));


        const txn1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: sender,
            suggestedParams: {
                ...suggested_params
            },
            to: pool_address,
            amount: 3000,
            note: note


        });



        const txn2 = algosdk.makeApplicationNoOpTxnFromObject({
            from: pool_address,
            suggestedParams: {
                ...suggested_params
            },
            appIndex: validator_app_id,
            appArgs: [note2],
            accounts: [sender],
            foreignAssets: [asset1_id, liquidity_asset_id],

        })


        const txn3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: pool_address,
            suggestedParams: {
                ...suggested_params
            },
            to: sender,
            amount: parseInt(liquidityInput2),
            assetIndex: asset1_id
        })

        const txn4 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: pool_address,
            suggestedParams: {
                ...suggested_params
            },
            to: sender,
            amount:parseInt(liquidityInput_1),



        });

        const txn5 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: sender,
            suggestedParams: {
                ...suggested_params
            },
            to: pool_address,
            amount: 540,
            assetIndex: liquidity_asset_id
        })
      
        const txns = [txn1, txn2, txn3, txn4, txn5];
        


        const groupID = algosdk.assignGroupID(txns)

        let lsig = algosdk.makeLogicSig(data.byteInfo);

        console.log(lsig.address())
        // if(lsig.address()==pool_address){
        //     console.log("address matched")
        // }

        let sign2 = algosdk.signLogicSigTransactionObject(txn2, lsig);
        let sign3 = algosdk.signLogicSigTransactionObject(txn3, lsig);

        let sign4 = algosdk.signLogicSigTransactionObject(txn4, lsig);

        console.log("-------logicsig signed trx-------");

        console.log(sign2);


        console.log(sign3);
        console.log(sign4);

        const myAlgoConnect = new MyAlgoConnect();
        let txns2 = [txn1, txn5]

        console.log("-------Sigining tx from frontend-------");
        const signedTxn = await myAlgoConnect.signTransaction(txns2.map(txn => txn.toByte()));

        console.log(signedTxn[0])
        console.log(signedTxn[1])

        console.log("-------Sending tx from frontend to network-------");



        let response = (await algodClient.sendRawTransaction([signedTxn[0].blob, sign2.blob, sign3.blob, sign4.blob, signedTxn[1].blob]).do());


        console.log("-------Sending logisig tx to network-------");
        console.log(response);



    }

    const assetOptin = async (asset_id) => {
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


        console.log(response);



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
            {walletConnectStatus ? <DesktopNav name={walletAddress} amount={walletAmount} /> :
                <DesktopNav name={algoAdd} amount={algoBalance} />
            }
            <Box w="100%" minH="90vh" bg={bgColor} py={50} backgroundImage={coinImage} backgroundRepeat="no-repeat" backgroundPosition="right 20px bottom 60px" backgroundSize="20%">
                <Box w="428px" borderRadius="25px" bg={bg} m="auto" px="20px" py="40px" marginBottom="20px">
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <HStack width="70%">
                            {showInput ? <ArrowBackIcon size='155px' cursor="pointer" onClick={toggleShow} /> : null}

                            <Text fontSize="23px" align="center" fontWeight="600" >Your Liquidity</Text>
                        </HStack>

                        <HStack width="30%">
                            <SettingModal color />
                            <IoReload size='25px' cursor="pointer" />
                        </HStack>
                    </Stack>
                    <Stack>
                        <Text fontSize="16px" textAlign="left" textColor={textColor}>Remove liquidity to receive tokens back</Text>
                    </Stack>


                    {showInput ? <>
                        <HStack paddingTop="10px">
                            <Text>Select a currency</Text>
                        </HStack>
                        <HStack paddingBottom={2}>
                            <LiquidityModal />
                        </HStack>
                        <HStack paddingBottom={3}>
                            <Input variant='filled' h="60px" textAlign="end" borderRadius="10px" name='money' type="number" value={liquidityInput_1} onChange={e => setInfoForApi(e)} />
                        </HStack>
                        <Stack py={2} align="center">
                            <AddIcon />
                        </Stack>
                        <HStack paddingTop="10px">
                            <Text>Select a currency</Text>
                        </HStack>
                        <HStack py={2}>
                            <LiquidityModal token2="token2" />
                        </HStack>

                        <HStack paddingBottom={3}>
                            <Input variant='filled' h="60px" textAlign="end" borderRadius="10px" name='money' type="number" value={liquidityInput2} onChange={e => handle_Input_Two} />
                        </HStack>
                        <Stack py="20px">
                            {/* <Button bg="#6FAA6B" color="whiteAlpha.900" leftIcon={<AddIcon />} _hover="#6FAA6B" variant='solid' py="25px" onClick={addLiquidity}>
                                Add Liquidity
                            </Button> */}
                            {mode ? <Button bg="#6FAA6B" color="whiteAlpha.900" leftIcon={<MinusIcon />} _hover={{ color: "#6FAA6B" }} variant='solid' py="25px" onClick={withDrawLiquidity}>
                                Withdraw Liquidity
                            </Button> :
                                <Button bg="#6FAA6B" color="whiteAlpha.900" leftIcon={<AddIcon />} _hover={{ color: "#6FAA6B" }} variant='solid' py="25px" onClick={addLiquidity}>
                                    Add Liquidity
                                </Button>
                            }
                            <Button p="8px" onClick={switchMode}>Switch to WITHDRAW</Button>
                        </Stack>
                    </> : null}


                    {showInput ? null : <Stack>
                        {walletConnectStatus || algoAdd ? null : <Text fontSize="16px" textAlign="center" textColor={textColor} bgColor={color} py="25px">Connect to a wallet to view your liquidity.</Text>
                        }

                        <Stack py="20px">
                            <Button bg="#6FAA6B" color="whiteAlpha.900" leftIcon={<AddIcon />} _hover={{ color: "#6FAA6B" }} variant='solid' py="25px" onClick={toggleShow}>
                                Add Liquidity
                            </Button>


                        </Stack>
                    </Stack>}

                    {/* <Stack py="20px">
                        <Button bg="#6FAA6B" color="whiteAlpha.900" leftIcon={<AddIcon />} _hover="#6FAA6B" variant='solid' py="25px" onClick={toggleShow}>
                            Add Liquidity
                        </Button>
                    </Stack> */}
                </Box>
                {
                    popUp ?
                        <Alert status='success'>
                            <AlertIcon />
                            Liquidity successful. Fire on!
                        </Alert>
                        :
                        null
                }
            </Box>
        </>
    )
}

export default Liquidity;




