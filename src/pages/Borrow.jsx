import { Box, Container, HStack, useColorModeValue, VStack, Text, Image, Progress, Divider, Radio, Checkbox, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Alert, AlertIcon, useDisclosure, ModalCloseButton, Center, Input, Flex, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DesktopNav from '../components/layout/Navbar/DesktopNav/DesktopNav';
import pagoCoin from '../components/images/pago-head.png';
import pago from '../components/images/Pago-Coin.png';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from '../components/firebase/FirebaseConfig';
import axios from 'axios';
import algosdk, { bigIntToBytes, decodeAddress, getApplicationAddress } from 'algosdk';
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { useNavigate } from 'react-router-dom';
import FirstComponent from '../components/borrowComponent/FirstComponent';
import { Step, Steps, useSteps } from "chakra-ui-steps";
import Stepper from 'react-stepper-horizontal';
import { NFTtotalBorrowAmount, NFTtotalDepositAmount } from '../components/redux/actions';


function Borrow() {
    const { nextStep, prevStep, reset, activeStep } = useSteps({
        initialStep: 0,
    })
    const steps = [{ label: "Step 1" },
    { label: "Step 2" },
    { label: "Step 3" }]
    const navigate = useNavigate();
    const algoAdd = useSelector(state => state.token.myAlgoAddress);
    const algoBalance = useSelector(state => state.token.myAlgoBalance);
    const walletAddress = useSelector(state => state.token.walletConnectAddress);
    const walletAmount = useSelector(state => state.token.walletConnectBalance);
    const walletConnectStatus = useSelector(state => state.token.walletConnectStatus);
    const bgColor = useColorModeValue("rgb(230, 253, 255)", "blackAlpha.200");
    const textColor = useColorModeValue("gray.600", "whiteAlpha.500");
    const [allNfts, setAllNfts] = useState([]);
    const [depositState, setDepositState] = useState([]);
    const nftCollectionRef = collection(db, "nfts");
    const nftDepositRef = collection(db, "deposit");
    const nftBorrowRef = collection(db, "borrow");

    const [checkbox, setCheckBox] = useState(true);
    const [checkBoxItem, setCheckBoxItem] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const modal1 = useDisclosure();
    const modal2 = useDisclosure();
    const [item1, setItem1] = useState(false);
    const [item2, setItem2] = useState(false);
    const [item3, setItem3] = useState(false);
    const [item4, setItem4] = useState(false);
    const [item5, setItem5] = useState(false);
    const [data, setData] = useState([]);
    const [borrowAmount, setAmount] = useState(0);
    const dispatch = useDispatch();


    let totalDipositAmount = 0;
    let totalBorrowAmount = 0;
    useEffect(() => {

        // const getNfts = async () => {
        //     const data = await getDocs(nftCollectionRef);
        //     // const queryName = data.where('owner_address', '==', algoAdd);
        //     // setData(queryName);
        //     setAllNfts(data.docs.map((doc) => ({ ...doc.data(), algoAdd: doc.owner_address })));
        // };

        // getNfts();
        const getNfts = async () => {
            const data = await getDocs(nftCollectionRef);
            // const queryName = data.where('owner_address', '==', algoAdd);
            // setData(queryName);
            setAllNfts(data.docs.map((doc) => ({ ...doc.data(), algoAdd: doc.owner_address })));
        };


        const depositAmount = async () => {

            const data = await getDocs(nftDepositRef);
            console.log(data)
            data.docs.map((doc) => {
                totalDipositAmount += parseInt(doc.data().amount)
                console.log(totalDipositAmount)
                dispatch(NFTtotalDepositAmount(totalDipositAmount));
            })
            // setDepositState(data.docs.map((doc) => ({ ...doc.data(), algoAdd: doc.owner_address })));
        };


        const borrowAmount = async () => {

            const data = await getDocs(nftBorrowRef);
            console.log(data)
            data.docs.map((doc) => {
                totalBorrowAmount += parseInt(doc.data().amount)
                console.log("total borrow amount")

                dispatch(NFTtotalBorrowAmount(totalBorrowAmount));
            })
            // setDepositState(data.docs.map((doc) => ({ ...doc.data(), algoAdd: doc.owner_address })));
        };
        
       
         
        depositAmount();
        borrowAmount();
        getNfts();

    }, []);
    console.log(allNfts);
    console.log(data);
    //========= get users NFT ============================
    const userNFT = allNfts.filter((data) => data.owner_address === algoAdd);
    console.log(userNFT);
    //==============get users NFT ends here ==============

    const handleCheckBox = (item) => {
        setCheckBox(!checkbox);
        if (checkbox) {
            setCheckBoxItem(item);
        }

    }
    console.log(checkBoxItem);

    const handleBorrowActions = () => {
        const asset_id = checkBoxItem.assetID;
        const appId = checkBoxItem.app_id;
        console.log(asset_id, appId);
        if (!checkbox) {
            onOpen();
            assetOptin(asset_id, appId);

        } else {
            modal1.onOpen();
            setTimeout(() => {
                modal1.onClose();
            }, 3000);

        }
    }


    const assetOptin = async (asset_id, appId) => {
        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const params = await algodClient.getTransactionParams().do();
        var note = new Uint8Array([10]);
        // const txn = algosdk.makeApplicationOptInTxnFromObject({
        //     suggestedParams: {
        //         ...params,
        //     },
        //     from: "U6EHOPZ4KLDHZGUHIDUEHIXNMTOQGU5MKRJ4TLWWLWXKNNIFGZBABATDYM",
        //     appIndex: 62368684,
        //     note: arr
        // });

        // const myAlgoConnect = new MyAlgoConnect();
        // const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
        // const response = await algodClient.sendRawTransaction(signedTxn.blob).do();





        let sender = algoAdd;
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
        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();

        console.log(response);
        setItem1(true);
        setTimeout(() => {
            //setPopUp(false);
            borrow(asset_id, appId);
        }, 2000);
        console.log(response)

        // // Must be signed by the account wishing to opt in to the asset    
        // let rawSignedTxn = opttxn.signTxn(note);
        // let opttx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
        // // Wait for confirmation
        // confirmedTxn = await algosdk.waitForConfirmation(algodclient, opttx.txId, 4);
        // //Get the completed Transaction
        // console.log("Transaction " + opttx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);

        // //You should now see the new asset listed in the account information
        // console.log("Account 3 = " + recoveredAccount3.addr);
        // await printAssetHolding(algodclient, recoveredAccount3.addr, assetID);

    }
    const borrow = async (asset_id, appId) => {
        appId = 99722776;
        console.log(asset_id, appId);
        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();
        const creator = algoAdd;
        const escrowAddress = await getApplicationAddress(appId);
        const borrow = new Uint8Array(Buffer.from('borrow', 'utf8'));


        const txn1 = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
            from: algoAdd,
            suggestedParams: suggested_params,
            assetIndex: asset_id,
            manager: undefined,
            reserve: undefined,
            freeze: undefined,

            clawback: escrowAddress,
            strictEmptyAddressChecking: false
        })

        const txn2 = algosdk.makeApplicationCallTxnFromObject({
            from: creator,
            appIndex: appId,
            onComplete: 0,
            appArgs: [borrow],
            suggestedParams: suggested_params

        })

        const txns = [txn1, txn2];

        const groupID = algosdk.assignGroupID(txns)



        const myAlgoConnect = new MyAlgoConnect();

        const signedTxn = await myAlgoConnect.signTransaction(txns.map(txn => txn.toByte()));

        const response = await algodClient.sendRawTransaction([signedTxn[0].blob, signedTxn[1].blob]).do();

        setItem2(true);
        modal2.onOpen();
        setTimeout(() => {
            //setPopUp(false);
            modal2.onClose();
        }, 4000);
        setTimeout(() => {
            //setPopUp(false);
            navigate('/collection');
        }, 2000);
    }

    return (
        <>
            {walletConnectStatus ? <DesktopNav name={walletAddress} amount={walletAmount} /> : <DesktopNav name={algoAdd} amount={algoBalance} />}

            <Box minH="100vh">
                {/* first component start from here  */}

                <Box w="100%" mt="70px">
                    <Container maxW={'3xl'} borderRadius="20px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" pb="20px">
                        <HStack alignItems="center" justifyContent="space-between" justifyItems="center" px="20px" py="30px">
                            <VStack align="left">
                                <Text fontSize="30px" fontWeight="600" mb="-5px">Borrow</Text>
                                <Text fontSize="18px" color={textColor}>Use multiple NFTs as collateral and borrow ETH in one transaction
                                </Text>
                            </VStack>

                            <Image src={pagoCoin} h="50px" w="50px" />
                        </HStack>

                        {/* <VStack spacing={7}>
                            <Progress hasStripe isAnimated value={25} w="100%" />
                            <Divider color="gray.500" p="1px" />
                        </VStack> */}

                        <FirstComponent />



                        {/* <HStack justifyContent="space-between" justifyItems="center" px="20px" py="20px" width="100%" bgColor="gray.50" my="20px" borderRadius="15px">
                            <VStack w="60%" align="left">
                                <Text fontSize="16px" fontWeight="600">Amount</Text>
                                <Input
                                    type="number"
                                    name='Amount'
                                    value={borrowAmount ?? ""}
                                    required={true}
                                    border="none"
                                    color="gray.500"
                                    bgColor="gray.100"
                                    placeholder='please enter borrow amount'
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </VStack>
                            <VStack w="40%" align="center">
                                <Text fontSize="16px" fontWeight="600">Total available borrow</Text>
                                <HStack>
                                    <Image src={pago} w="25px" h="25px" />
                                    <Text>1</Text>
                                </HStack>
                            </VStack>

                        </HStack> */}

                        {/* 
                        <Button width="100%" bgColor="rgb(111,170,107)" color="whiteAlpha.900" onClick={handleBorrowActions}>Borrow</Button> */}




                    </Container>
                </Box>
            </Box>

            {/* ===================Modal for borrow functionality====================== */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Borrow Action</ModalHeader>
                    <ModalBody py="30px">
                        <VStack>
                            {item1 ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Asset Opt-in
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Asset Opt-in
                                </Alert>
                            }
                            <Divider />
                            {item2 ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Borrow
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Borrow
                                </Alert>
                            }
                            {/* <Divider />
                            {item3 ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Make Borrow Offer
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Make Borrow Offer
                                </Alert>
                            }
                            <Divider />

                            {item4 ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Fund Escrow
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Fund Escrow
                                </Alert>
                            }

                            <Divider /> */}

                            {/* {item5 ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Sell Offer
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Sell Offer
                                </Alert>
                            } */}

                        </VStack>
                    </ModalBody>
                    <VStack>

                    </VStack>

                </ModalContent>
            </Modal>
            {/*========================== Modal for borrow functionality ends==================*/}

            {/* ==================item not found modal====================== */}
            <Modal isOpen={modal1.isOpen} onClose={modal1.onClose} isCentered>
                <ModalOverlay />
                <ModalContent width="340px" height="200px">
                    <ModalCloseButton />

                    <ModalBody borderRadius="15px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" >
                        <Center>
                            <VStack alignItems="center" justifyContent="space-between" py="20%">
                                <Text color="gray.800">Sorry!!</Text>
                                <Text color="gray.800">NFTs not found</Text>
                            </VStack>
                        </Center>

                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* ==================item not found modal ends====================== */}
            {/* ==================successful Borrow offer modal start=================== */}
            <Modal isOpen={modal2.isOpen} onClose={modal2.onClose} isCentered>
                <ModalOverlay />
                <ModalContent width="340px" height="200px">
                    <ModalCloseButton />

                    <ModalBody borderRadius="15px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" >
                        <Center>
                            <VStack alignItems="center" justifyContent="space-between" py="20%">
                                <Text color="gray.800">Congratulations!!</Text>
                                <Text color="gray.800">You successfully make the BORROW OFFER. Have fun.</Text>
                            </VStack>
                        </Center>

                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* ==================successful Borrow offer modal ends=================== */}
        </>
    )
}

export default Borrow