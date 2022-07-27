import { Box, Container, HStack, useColorModeValue, VStack, Text, Image, Progress, Divider, Radio, Checkbox, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Alert, AlertIcon, useDisclosure, ModalCloseButton, Center, Input } from '@chakra-ui/react';
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
    Timestamp,
} from "firebase/firestore";
import { db } from '../components/firebase/FirebaseConfig';
import axios from 'axios';
import algosdk, { bigIntToBytes, decodeAddress, getApplicationAddress } from 'algosdk';
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { useNavigate } from 'react-router-dom';
import { PoolAmountAction } from '../components/redux/actions';



function Deposit() {
    const navigate = useNavigate();
    const algoAdd = useSelector(state => state.token.myAlgoAddress);
    const algoBalance = useSelector(state => state.token.myAlgoBalance);
    const walletAddress = useSelector(state => state.token.walletConnectAddress);
    const walletAmount = useSelector(state => state.token.walletConnectBalance);
    const walletConnectStatus = useSelector(state => state.token.walletConnectStatus);
    const bgColor = useColorModeValue("rgb(230, 253, 255)", "blackAlpha.200");
    const textColor = useColorModeValue("gray.600", "whiteAlpha.500");
    const [allNfts, setAllNfts] = useState([]);
    const nftCollectionRef = collection(db, "nfts");
    const nftBorrowRef = collection(db, "borrow");
    const [checkbox, setCheckBox] = useState(true);
    const [checkBoxItem, setCheckBoxItem] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const modal1 = useDisclosure();
    const modal2 = useDisclosure();
    const modal3 = useDisclosure();
    const [item1, setItem1] = useState(false);
    const [item2, setItem2] = useState(false);
    const [item3, setItem3] = useState(false);
    const [item4, setItem4] = useState(false);
    const [item5, setItem5] = useState(false);
    const [data, setData] = useState([]);
    const [borrowAmount, setAmount] = useState(0);
    const nftDepositRef = collection(db, "deposit");
    //const [depositAccAmount, setDepositAccAmount] = useState();
    const dispatch = useDispatch();
    const poolAmount = useSelector(state => state.token.pool_amount);

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

        getNfts();

        pool_amount_func();
       
    

    }, []);


    const pool_amount_func = async () =>{
        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');

        const escrowAddress = await getApplicationAddress(100305128);

 
        let accountInfo = await algodClient.accountInformation(escrowAddress).do();

        // console.log(accountInfo);return 0;

        console.log("Account balance: %d microAlgos", accountInfo.amount);

        let accountAmount = algosdk.microalgosToAlgos(accountInfo.amount)
        //setDepositAccAmount(accountAmount);
        dispatch(PoolAmountAction(accountAmount));
    }
    console.log(allNfts);
    console.log(data);
    //========= get users NFT ============================
    const userNFT = allNfts.filter((data) => data.owner_address === algoAdd);
    console.log(userNFT);
    //==============get users NFT ends here ==============



    const handleBorrowActions = () => {
        const appId = 100305128;
        const assetID = 1211212;
        if (borrowAmount <= 0) {
            modal3.onOpen();
        } else {
            onOpen();
            setTimeout(() => {
                fund_escrow_for_deposit(appId, assetID)
            }, 3000);
        }



    }
    const fund_escrow_for_deposit = async (appId, assetID) => {
        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();



        const escrowAddress = await getApplicationAddress(appId);

        const diposit = new Uint8Array(Buffer.from('diposit', 'utf8'));
        const fund = bigIntToBytes(borrowAmount, 8)



        // const escrowProgramBytes = new Uint8Array(
        //     Buffer.from(escrowAddress, 'base64')
        // );

        // let lsig = new algosdk.LogicSigAccount(escrowProgramBytes)





        const txn1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: algoAdd,
            suggestedParams: suggested_params,
            to: escrowAddress,
            amount: (borrowAmount * 1000000)
        })



        // const txn2 = algosdk.makeApplicationCallTxnFromObject({
        //     from : "XQUXRUK2XUNJDT22J5BKYUADZHRWE5K5R5M23SNYINHPUYXCE42V3OO27I",
        //     appIndex : app_id,
        //     onComplete:0,
        //     appArgs:[diposit,fund],
        //     suggestedParams:suggested_params,
        //     accounts:[escrowAddress]

        // })

        const txns = [txn1];

        const groupID = algosdk.assignGroupID(txns)


        const myAlgoConnect = new MyAlgoConnect();

        const signedTxn = await myAlgoConnect.signTransaction(txns.map(txn => txn.toByte()));

        const response = await algodClient.sendRawTransaction([signedTxn[0].blob]).do();

        console.log(response)


        setItem1(true);
        setTimeout(() => {
            //setPopUp(false);
            make_borrow_offer_for_deposit(appId, assetID);
        }, 4000);
        console.log(response);



    }
    const make_borrow_offer_for_deposit = async (appId, assetID) => {
        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();



        const escrowAddress = await getApplicationAddress(appId);

        const diposit = new Uint8Array(Buffer.from('diposit', 'utf8'));
        let accountInfo = await algodClient.accountInformation(escrowAddress).do();

        // console.log(accountInfo);return 0;

        console.log("Account balance: %d microAlgos", accountInfo.amount);

        let accountAmount = algosdk.microalgosToAlgos(accountInfo.amount)
        //setDepositAccAmount(accountAmount);
        dispatch(PoolAmountAction(accountAmount));
        console.log(accountAmount);

        const totalAmount = bigIntToBytes(accountAmount, 8)




        // const escrowProgramBytes = new Uint8Array(
        //     Buffer.from(escrowAddress, 'base64')
        // );

        // let lsig = new algosdk.LogicSigAccount(escrowProgramBytes)









        const txn2 = algosdk.makeApplicationCallTxnFromObject({
            from: algoAdd,
            appIndex: appId,
            onComplete: 0,
            appArgs: [diposit, totalAmount],
            suggestedParams: suggested_params,
            accounts: [escrowAddress]

        })

        const txns = [txn2];

        const groupID = algosdk.assignGroupID(txns)


        const myAlgoConnect = new MyAlgoConnect();

        const signedTxn = await myAlgoConnect.signTransaction(txns.map(txn => txn.toByte()));

        const response = await algodClient.sendRawTransaction([signedTxn[0].blob]).do();

        await addDoc(nftDepositRef, { amount: borrowAmount, account: algoAdd, app_id: appId, time: Timestamp.now() });

        console.log(response)


        setItem2(true);
        setTimeout(() => {
            onClose();
        }, 2000);
        modal2.onOpen();
        setTimeout(() => {
            modal2.onClose();
        }, 6000);
        setTimeout(() => {
            navigate("/dashboard");
        }, 3000);



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
                                <Text fontSize="30px" fontWeight="600" mb="-5px">Deposit</Text>
                                <HStack>
                                    <Text fontSize="18px" color={textColor}>Available in wallet :
                                    </Text>
                                    <Image src={pago} h="20px" w="20px" />
                                    <Text fontSize="18px" color={textColor} fontWeight="700">{algoBalance}
                                    </Text>
                                </HStack>

                            </VStack>

                            <Image src={pagoCoin} h="50px" w="50px" />
                        </HStack>

                        {/* <VStack spacing={7}>
                            <Progress hasStripe isAnimated value={25} w="100%" />
                            <Divider color="gray.500" p="1px" />
                        </VStack> */}
                        <HStack py="20px" width="100%" bgColor="gray.50" px="20px" my="20px" borderRadius="15px" justifyItems="center" justifyContent="space-between">
                            <VStack>
                                <Text fontSize="12px" color={textColor}>Utilization rate</Text>
                                <Text fontSize="18px" color={textColor} fontWeight="700" >21.12%</Text>
                            </VStack>

                            <VStack>
                                <Text fontSize="12px" color={textColor}>Pool balance</Text>
                                <Text fontSize="18px" color={textColor} fontWeight="700" >{poolAmount ? poolAmount : 0}</Text>
                            </VStack>

                            <VStack>
                                <Text fontSize="12px" color={textColor}>Deposit APR</Text>
                                <Text fontSize="18px" color={textColor} fontWeight="700" >0.66%</Text>
                            </VStack>
                        </HStack>



                        <HStack justifyContent="space-between" justifyItems="center" px="20px" py="20px" width="100%" bgColor="gray.50" my="20px" borderRadius="15px">
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
                            {/* <VStack w="40%" align="center">
                                <Text fontSize="16px" fontWeight="600">Total available borrow</Text>
                                <HStack>
                                    <Image src={pago} w="25px" h="25px" />
                                    <Text>{algoBalance}</Text>
                                </HStack>
                            </VStack> */}

                        </HStack>
                        <HStack justifyContent="space-between" justifyItems="center" px="20px" py="20px" width="100%" bgColor="rgb(230, 253, 255)" my="20px" borderRadius="15px">
                            <Text fontSize="16px" fontWeight="400" textAlign="center">Choose at least one NFT token which you want to deposit as collateral. The more collaterals you deposit, the higher PAGO amount you can borrow. </Text>

                        </HStack>

                        <Button width="100%" bgColor="rgb(111,170,107)" color="whiteAlpha.900" onClick={handleBorrowActions}>Deposit</Button>





                    </Container>
                </Box>
            </Box>

            {/* ===================Modal for borrow functionality====================== */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Deposit Action</ModalHeader>
                    <ModalBody py="30px">
                        <VStack>
                            {item1 ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Fund Escrow
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Fund Escrow
                                </Alert>
                            }
                            <Divider />
                            {item2 ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Make Deposit
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Make Deposit
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
            {/* <Modal isOpen={modal1.isOpen} onClose={modal1.onClose} isCentered>
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
            </Modal> */}
            {/* ==================item not found modal ends====================== */}
            {/* ==================successful Borrow offer modal start=================== */}
            <Modal isOpen={modal2.isOpen} onClose={modal2.onClose} isCentered>
                <ModalOverlay />
                <ModalContent width="400px" height="350px">
                    <ModalCloseButton />

                    <ModalBody borderRadius="15px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px">
                        <Center>
                            <VStack alignItems="center" justifyContent="space-between" py="20%">
                                <Text color="gray.800" textAlign="center" fontSize="30px" fontWeight="bold">Congratulations!!</Text>
                                <Text color="gray.800" textAlign="center" fontSize="25px" fontWeight="bold">You successfully made the DEPOSIT.</Text>
                                <Text textAlign="center" fontSize="25px" fontWeight="bold">Have fun.</Text>
                            </VStack>
                        </Center>

                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* ==================successful Borrow offer modal ends=================== */}

            <Modal isOpen={modal3.isOpen} onClose={modal3.onClose} isCentered>
                <ModalOverlay />
                <ModalContent width="340px" height="200px">
                    <ModalCloseButton />

                    <ModalBody borderRadius="15px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" >
                        <Center>
                            <VStack alignItems="center" justifyContent="space-between" py="20%">
                                <Text color="gray.800">Sorry!!</Text>
                                <Text color="gray.800">Please enter amount</Text>
                            </VStack>
                        </Center>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Deposit