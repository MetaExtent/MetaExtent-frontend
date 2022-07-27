import React, { useEffect, useRef, useState } from 'react';
import {
    Box, Center, VStack, Image, Heading, Button, Container, HStack, ButtonGroup, Stack, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Divider, AspectRatio, Alert, AlertIcon, AlertTitle,
} from "@chakra-ui/react";
//import dummyImage from '../components/images/Turtle-with-Scooter.png';
import dummyImage from '../components/images/homepage-image2.png';
import bgImage from '../components/images/bg.jpg';
import { ArrowRightIcon, PhoneIcon, SunIcon, ArrowForwardIcon, AtSignIcon, EmailIcon, LinkIcon } from '@chakra-ui/icons';
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { useNavigate } from 'react-router-dom';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { myAlgoWalletInfo, WalletConnecAction } from '../components/redux/actions';
import media from '../components/images/media.json';
import { API_URL } from '../url';
import algosdk from 'algosdk';
window.Buffer = window.Buffer || require("buffer").Buffer;

function Wallet(props) {
    const dispatch = useDispatch();
    //props.funcNav(false);
    const [algoAddress, setalgoAddress] = useState("");
    const [accAddress, setAccAddress] = useState("");
    const [error, setError] = useState(false);
    const [algoAmount, setalgoAmount] = useState("");
    const [walletCon, setWalletCon] = useState("");
    const [connector, setConnector] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const modal2 = useDisclosure();
    const myAlgoWallet = new MyAlgoConnect();
    const navigate = useNavigate();

    const myAlgo = async () => {
        modal2.onClose();
        try {
            var x = new Uint8Array(2);
            x[0] = 17;

            const headers = {
                "X-API-Key": "1nYJyGUcqI4QNR7ChogoU2839CD3Osh7a6EVEBtv",
            }
            const algodClient = new algosdk.Algodv2(headers, 'https://testnet-algorand.api.purestake.io/ps2', "");
            const params = await algodClient.getTransactionParams().do();
            const algoAdd = accAddress;
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
        catch (err) {
            setError(true);
            setTimeout(() => {
                setError(false);

            }, 5000);

            setTimeout(() => {
                onClose();
            }, 2000);
        }



    }

    async function connectToMyAlgo() {
        try {
            const accounts = await myAlgoWallet.connect();
            console.log(accounts);
            const address = accounts.map((account) => account.address);
            setAccAddress(address);


            var optinResult = "";
            // await axios('http://192.168.0.135:12000/swap/checkOptin?address=' + address)
            await axios(`${API_URL}swap/checkOptin?address=` + address)
                .then(response => {
                    if (response.status === 200) {

                        console.log(response);
                        optinResult = response.data;
                    }


                })
                .catch(error => {
                    console.error("Error fatching data", error);

                })


            if (optinResult.optinInResult) {
                console.log("optin hoise");
                const algoAddress = optinResult.clientInfo.address;
                setalgoAddress(algoAddress);
                const amount = optinResult.clientInfo.amount / 1000000;
                setalgoAmount(amount);
                console.log(algoAddress);
                console.log(amount);
                dispatch(myAlgoWalletInfo({
                    algoAddress: algoAddress,
                    algoBalance: amount
                }));
                onClose();
                //navigate("/swap", { state: { address: algoAddress, amount: amount } })
                navigate("/marketplace");
                //navigate("/home");
                // setTimeout(() => {
                //     navigate("/home", { state: { address: address, amount: amount } });
                // }, 1000);
                //navigate("/home", { state: { address: address, amount: amount } });

            }
            else {
                // <>
                //     console.log("Not opt-in");
                //    // <Error />
                // </>
                console.log("Please opt-in");
                modal2.onOpen();
                //navigate("/error", { state: { address: address } });



            }

        } catch (err) {
            console.error(err);
        }
    }

    // connect walletConnect

    let checkedConnection = 0;
    async function walletConnectInit() {
        const bridge = "https://bridge.walletconnect.org";
        const walletConnector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
        console.log(walletConnector);

        if (!walletConnector.connected) {

            if (checkedConnection > 0) {
                setTimeout(function () {
                    walletConnectInit();
                }, 2000);

            }
            else {
                let result = await walletConnector.createSession();
                checkedConnection++;
                walletConnectInit();
            }





            // console.log(result);

            // let url = 'http://192.168.0.135:12000/swap/checkOptin?address=' + walletConnector._accounts[0];
            // fetch(url)
            //     .then(response => response.json())
            //     .then((resData) => {


            //         console.log(resData);

            //         console.log(walletConnector._accounts[0]);
            //         console.log(resData.clientInfo.amount);
            //         //navigate("/home", { state: { address: connector, data: walletCon } });


            //     });

        } else {

            // let url = 'http://192.168.0.135:12000/swap/checkOptin?address=' + walletConnector._accounts[0];
            let url = `${API_URL}swap/checkOptin?address=` + walletConnector._accounts[0];
            fetch(url)
                .then(response => response.json())
                .then((resData) => {
                    console.log(resData);
                    console.log(walletConnector._accounts[0]);
                    console.log(resData.clientInfo.amount);
                    const wallettAddress = walletConnector._accounts[0];
                    const walletAmount = resData.clientInfo.amount;
                    const connectStatus = walletConnector._connected;
                    console.log(connectStatus);

                    dispatch(WalletConnecAction({
                        walletConnectAddress: wallettAddress,
                        walletConnectBalance: walletAmount,
                        walletConnectStatus: connectStatus
                    }))
                    //navigate("/swap", { state: { address: wallettAddress, amount: walletAmount } })
                    navigate("/marketplace")


                })

        }

    };
    // for playing video
    const videoEl = useRef(null);

    const attemptPlay = () => {
        videoEl &&
            videoEl.current &&
            videoEl.current.play().catch(error => {
                console.error("Error attempting to play", error);
            });
    };

    useEffect(() => {
        attemptPlay();
    }, []);

    // //load JSON file
    // async function loadJson() {
    //     const { default: jsonconfig2 } = await import('../components/images/media.json', {
    //         assert: {
    //             type: "json"
    //         }
    //     })
    //     console.log(jsonconfig2);
    // }

    return (
        <>
            <Center w="full" minHeight="100vh" color="whiteAlpha.800" backgroundImage={bgImage} backgroundPosition="center" backgroundRepeat="no-repeat" backgroundSize="cover">
                <Box>
                    <VStack spacing={[4, 6, 6]}>
                        <Heading fontSize="21px">MetaExtent - Algorand NFT Marketplace</Heading>
                        <Image h="300px" src={dummyImage} alt='cartoon' />
                        {/* applying video */}
                        {/* <video
                            style={{ maxWidth: "100%", width: "420px", margin: "0 auto" }}
                            playsInline
                            loop
                            muted
                            alt="All the devices"
                            src={video}
                            ref={videoEl}
                        /> */}
                        {/* loadJson(); */}
                        <Heading fontSize="21px">Please connect your wallet</Heading>
                        <Button bgColor="#A2CFA6" color="blackAlpha.900" width="300px" onClick={onOpen} borderRadius="12px" py="25px">
                            Connect wallet
                        </Button>
                        <Button leftIcon={<ArrowRightIcon />} bgColor="#A2CFA6" color="blackAlpha.900" py="25px" width="300px" onClick={(e) => walletConnectInit()} borderRadius="12px">
                            Connect with WalletConnect
                        </Button>
                    </VStack>
                </Box>

            </Center>
            <Box bg="gray.800" color="white">
                <Container maxW='1234' mx='auto' w='91%'>
                    <Stack
                        spacing={8}
                        direction={{ base: 'column', md: 'row' }}
                        justify='space-between'
                        py={{ base: '12', md: '8' }}
                        alignItems={{ base: 'center' }}
                    >
                        <HStack>
                            <Image h="120px" src={dummyImage} alt='cartoon' />
                            <Heading>Galapago</Heading>
                        </HStack>
                        <HStack>
                            <ButtonGroup variant='outline' spacing={{ base: '1', md: '6' }}>
                                <Button backgroundColor="#A2CFA6" variant='ghost' color="blackAlpha.800">
                                    User Docs
                                </Button>
                                <Button backgroundColor="#A2CFA6" variant='ghost' color="blackAlpha.800">
                                    Technical Docs
                                </Button>
                                <Button backgroundColor="#A2CFA6" variant='ghost' color="blackAlpha.800">
                                    Audit
                                </Button>
                            </ButtonGroup>
                        </HStack>
                        <HStack spacing={6}>
                            <IconButton
                                bgColor="#A2CFA6" color="blackAlpha.900"
                                aria-label='Call Segun'
                                size='lg'
                                icon={<PhoneIcon />}
                            />
                            <IconButton
                                bgColor="#A2CFA6" color="blackAlpha.900"
                                aria-label='Call Segun'
                                size='lg'
                                icon={<AtSignIcon />}
                            />
                            <IconButton
                                bgColor="#A2CFA6" color="blackAlpha.900"
                                aria-label='Call Segun'
                                size='lg'
                                icon={<EmailIcon />}
                            />
                            <IconButton
                                bgColor="#A2CFA6" color="blackAlpha.900"
                                aria-label='Call Segun'
                                size='lg'
                                icon={<LinkIcon />}
                            />
                        </HStack>
                    </Stack>
                </Container>

            </Box>

            {/* Modal code */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent width="340px" alignItems='center'>
                    <ModalHeader width="100%" bgGradient='linear(to-r, #345a9f, #6919da)' color="whiteAlpha.900">
                        Connect Wallet
                    </ModalHeader>

                    <ModalCloseButton />
                    <ModalBody backgroundColor="blackAlpha.200" width="100%" py={8}>
                        <VStack
                            direction={{ base: 'column', md: 'row' }}
                            py={{ base: '4', md: '2' }}
                            px="10px"
                        >
                            <Button leftIcon={<SunIcon />} bgColor="#A2CFA6" color="blackAlpha.900" _hover={{ color: "blackAlpha.700" }} variant='solid' py="30px" onClick={(e) => connectToMyAlgo()} width="100%">
                                MyAlgo
                            </Button>
                        </VStack>
                        <VStack
                            direction={{ base: 'column', md: 'row' }}
                            py={{ base: '4', md: '2' }}
                            px="10px"
                        >
                            <Button leftIcon={<SunIcon />} bgColor="#A2CFA6" color="blackAlpha.900" _hover={{ color: "blackAlpha.700" }} variant='solid' width="100%" py="30px">
                                Binance Wallet
                            </Button>
                        </VStack>

                        <VStack
                            direction={{ base: 'column', md: 'row' }}
                            py={{ base: '4', md: '2' }}
                            px="10px"
                        >
                            <Button rightIcon={<ArrowForwardIcon />} bgColor="#A2CFA6" color="blackAlpha.900" _hover={{ color: "blackAlpha.700" }} variant='solid' width="100%" py="30px">
                                More
                            </Button>
                        </VStack>


                        <VStack py={4} spacing={4}>
                            <Text color="gray.700">Haven’t got a crypto wallet yet?</Text>
                            <Button bgColor="#A2CFA6" color="blackAlpha.900" _hover={{ color: "blackAlpha.700" }} size='lg' py="30px">
                                Learn How to Connect ?
                            </Button>
                        </VStack>
                    </ModalBody>
                    {error ?
                        <Alert status='error'>
                            <AlertIcon />
                            <AlertTitle>Check your BACKEND!! It may not CONNECTED.</AlertTitle>
                        </Alert> : null
                    }
                </ModalContent>
            </Modal>

            {/* Opt-in Modal starts from here*/}
            <Modal isOpen={modal2.isOpen} onClose={modal2.onClose} isCentered>
                <ModalOverlay />
                <ModalContent width="340px" height="200px">
                    <ModalCloseButton />
                    <ModalBody borderRadius="15px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" >
                        <Center>
                            <VStack alignItems="center" justifyContent="space-between" py="20%">
                                <Text color="gray.800">Please OPT-IN your account</Text>
                                <Button bgColor="#A2CFA6" color="blackAlpha.900" onClick={myAlgo} w="200px">Please opt-in</Button>
                            </VStack>
                        </Center>
                    </ModalBody>

                </ModalContent>
            </Modal>
            {/* Opt-in Modal starts ends here*/}
        </>
    )
}

export default Wallet;
