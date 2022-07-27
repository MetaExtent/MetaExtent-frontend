import { Box, Button, Container, Divider, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, SimpleGrid, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DesktopNav from '../components/layout/Navbar/DesktopNav/DesktopNav';
import coinImage from '../components/images/algoCoin.png';
import { IoIosWallet, IoIosBonfire } from "react-icons/io";
import { useState } from 'react';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore";
import { db } from '../components/firebase/FirebaseConfig';
import pago from '../components/images/Pago-Coin.png'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Dashboard() {
    const algoAdd = useSelector(state => state.token.myAlgoAddress);
    const algoBalance = useSelector(state => state.token.myAlgoBalance);
    const walletAddress = useSelector(state => state.token.walletConnectAddress);
    const walletAmount = useSelector(state => state.token.walletConnectBalance);
    const walletConnectStatus = useSelector(state => state.token.walletConnectStatus);
    const res = algoAdd.substring(0, 8);
    const lastFive = algoAdd.substr(algoAdd.length - 8);
    const [buyerInfo, setBuyerInfo] = useState([]);
    const [auctionInfo, setAuctionInfo] = useState([]);
    const nftCloseAuctionRef = collection(db, "closeAuction");
    const nftAuctionAddressRef = collection(db, "auctions");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const [nfts, setNfts] = useState([]);
    const nftCollectionRef = collection(db, "nfts");
    useEffect(() => {
        const getNfts = async () => {
            const data = await getDocs(nftCollectionRef);
            setNfts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getNfts();

        const auctionAddress = async () => {
            const data = await getDocs(nftAuctionAddressRef);
            setAuctionInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        auctionAddress();


        const closeAuctionDetail = async () => {
            const data = await getDocs(nftCloseAuctionRef);
            setBuyerInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        closeAuctionDetail();

    }, []);

    console.log(buyerInfo);
    console.log(auctionInfo);

    //=========== checking user's nft - how many he/she has ================
    const userNFT = nfts.filter((data) => data.owner_address === algoAdd);
    console.log(userNFT);
    //=========== checking user's nft - how many he/she has ends here==========


    //========= finding auction amount ===================
    let bidValue = 0;
    const auctions = auctionInfo.filter((data) => data.bidder_address === algoAdd);
    console.log(auctions);
    auctions.forEach(value => {
        bidValue += value.bidderAmount / 1000000;
    })
    console.log(bidValue);
    //========= finding auction amount end=================

    const handleShowNft = () => {
        onOpen();
    }
    const handleRedirect = (item) => {
        console.log(item);

        navigate("/single", { state: { data: item } })

    }

    return (
        <>
            {walletConnectStatus ? <DesktopNav name={walletAddress} amount={walletAmount} /> : <DesktopNav name={algoAdd} amount={algoBalance} />}

            <Box minH="100vh" >
                {/* first component start from here  */}

                <Box w="100%" >
                    <Container maxW={'5xl'} mt="80px">
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                            <Box minH='300px' borderRadius="15px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px">
                                <HStack justifyItems="center" justifyContent="space-between" py="20px" px="20px">
                                    <Image src={coinImage} w="50px" h="50px" objectFit="cover" />
                                    <Text fontSize="18px" fontWeight="600">{res}...{lastFive}</Text>
                                </HStack>
                                <Divider p="1px" color="gray.200" />
                                <HStack justifyItems="center" py="20px" align="left" px="20px">
                                    <Text fontSize="18px" fontWeight="600">Wallet balances</Text>
                                </HStack>
                                <HStack justifyItems="center" py="5px" align="left" px="20px" justifyContent="space-between" alignItems="center">
                                    <Image src={coinImage} w="50px" h="50px" objectFit="cover" />
                                    <Text fontSize="18px" fontWeight="600">{algoBalance}</Text>
                                </HStack>

                                {/* <Button w="70%" alignItems="center" mx="20px">Convert</Button> */}


                            </Box>
                            <Box minH='300px' borderRadius="15px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px">
                                <HStack justifyItems="center" justifyContent="space-between" py="17px" px="20px">
                                    <HStack>
                                        <Image src={coinImage} w="50px" h="50px" objectFit="cover" />
                                        <VStack align="left">
                                            <Text fontSize="22px" fontWeight="600" mb="-10px">My borrows</Text>
                                            <Text fontSize="16px" fontWeight="300">Total debt</Text>
                                        </VStack>
                                    </HStack>
                                    <HStack>
                                        <Image src={coinImage} w="25px" h="25px" objectFit="cover" />
                                        <Text fontWeight="bold">1</Text>
                                    </HStack>

                                </HStack>
                                <Divider p="1px" color="gray.200" />
                                <VStack align="left" px="20px" spacing={3} py="20px">
                                    <Text fontSize="21px" fontWeight="bold"> Borrow APR</Text>
                                    <Text fontSize="30px" fontWeight="bold">-3.24 %</Text>
                                    <HStack>
                                        <Image src={coinImage} w="25px" h="25px" objectFit="cover" />
                                        <Text fontWeight="bold">1</Text>
                                    </HStack>
                                </VStack>
                                <Divider p="1px" color="gray.200" />

                                <HStack py="40px" justifyItems="center" justifyContent="space-evenly">
                                    <Link to="/borrow">
                                        <Button p="30px" borderRadius="25px" bg="#6FAA6B" color="whiteAlpha.900" _hover={{ color: "whiteAlpha.900" }}>Borrow PAGO</Button>
                                    </Link>
                                    <Link to="/borrow">

                                        <Button p="30px" borderRadius="25px" bg="#6FAA6B" color="whiteAlpha.900" _hover={{ color: "whiteAlpha.900" }}> My Borrow</Button>
                                    </Link>
                                </HStack>


                            </Box>
                            {/* ==============showing owner NFTs ============================= */}
                            <Box minH='150px' borderRadius="15px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" onClick={handleShowNft} cursor="pointer">

                                <HStack justifyItems="center" justifyContent="space-between" py="17px" px="20px">
                                    <HStack>
                                        <Image src={coinImage} w="50px" h="50px" objectFit="cover" />
                                        <VStack align="left">
                                            <Text fontSize="22px" fontWeight="600" mb="-5px">My NFTs</Text>
                                            <Text fontSize="16px" fontWeight="300">Total NFTs</Text>
                                        </VStack>
                                    </HStack>
                                    <HStack>
                                        {/* <Image src={coinImage} w="15px" h="15px" objectFit="cover" /> */}
                                        <IoIosBonfire w="15px" h="15px" />
                                        <Text fontWeight="bold">{userNFT.length}</Text>
                                    </HStack>

                                </HStack>
                            </Box>
                            {/* ==============showing owner NFTs ends here============================= */}
                            <Box minH='150px' borderRadius="15px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px">

                                <HStack justifyItems="center" justifyContent="space-between" py="17px" px="20px">
                                    <HStack>
                                        <Image src={coinImage} w="50px" h="50px" objectFit="cover" />
                                        <VStack align="left">
                                            <Text fontSize="22px" fontWeight="600" mb="-5px">My auctions</Text>
                                            <Text fontSize="16px" fontWeight="300">Total bid value:</Text>
                                        </VStack>
                                    </HStack>
                                    <HStack>
                                        {/* <Image src={coinImage} w="15px" h="15px" objectFit="cover" /> */}
                                        <IoIosWallet w="15px" h="15px" />
                                        <Text fontWeight="bold">{bidValue}</Text>
                                    </HStack>

                                </HStack>
                            </Box>

                        </SimpleGrid>
                    </Container>
                </Box>
            </Box>
            {/* =======================showing NFTs modal======================== */}
            <Modal isOpen={isOpen} onClose={onClose} width="700px">
                <ModalOverlay />
                <ModalContent minH="300px">
                    <ModalHeader>Your NFTs</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <TableContainer >
                            <Table  >
                                <Thead>
                                    <Tr h="50px">
                                        <Th w="15%">Image</Th>
                                        <Th w="15%">Name</Th>
                                        <Th w="15%">Price</Th>

                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {userNFT != [] ? userNFT.map((item) => (
                                        <Tr h="80px" key={item.id}>
                                            <Td><Image src={item.url} h="30px" w="30px" /></Td>
                                            <Td><Text color="blue.400" cursor="pointer" onClick={() => handleRedirect(item)}>{item.name} </Text></Td>
                                            <Td isNumeric>{item.price}</Td>

                                        </Tr>
                                    )) : <><Text>There is no NFT to show</Text></>}


                                </Tbody>

                            </Table>
                        </TableContainer>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* =======================showing NFTs modal ends======================== */}
        </>
    )
}

export default Dashboard