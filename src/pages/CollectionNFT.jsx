import { Box, Button, Container, Divider, Flex, FormControl, FormHelperText, FormLabel, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, SimpleGrid, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoIosHeartEmpty } from 'react-icons/io'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import algo from '../components/images/Icons/algo.svg';
import DesktopNav from "../components/layout/Navbar/DesktopNav/DesktopNav";
import { db } from '../components/firebase/FirebaseConfig';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore";
import { connectStorageEmulator } from 'firebase/storage';
import { HamburgerIcon } from '@chakra-ui/icons';

function CollectionNFT() {
    const all_nft_data = useSelector(state => state.token.all_nfts);
    // const [nfts, setNfts] = useState(all_nft_data);
    const [nftData, setNftData] = useState([]);
    console.log(nftData);
    const algoAdd = useSelector(state => state.token.myAlgoAddress);
    const algoBalance = useSelector(state => state.token.myAlgoBalance);
    const walletAddress = useSelector(state => state.token.walletConnectAddress);
    const walletAmount = useSelector(state => state.token.walletConnectBalance);
    const walletConnectStatus = useSelector(state => state.token.walletConnectStatus);

    const [indivualDataNft, setIndividualDataNft] = useState(all_nft_data);
    console.log(indivualDataNft);
    const navigate = useNavigate();
    const nftCollectionRef = collection(db, "nfts");
    const handleSell = (item) => {
        if (item.address === algoAdd) {
            ////////////
            navigate("/single", { state: { person: true, data: item } });
        } else {
            navigate("/single", { state: { data: item } })
        }
    }

    useEffect(() => {
        const getNfts = async () => {
            const data = await getDocs(nftCollectionRef);
            setNftData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getNfts();
    }, []);

    console.log("========nfts from firebase===========");
    console.log(nftData);


    const handleFilterData = (e) => {
        console.log("==========explore=============")
        console.log(e);
        //setIndividualDataNft(nftData);
        let targetValue = e.target.value;
        if (e.target.value === "all") {
            const getNfts = async () => {
                const data = await getDocs(nftCollectionRef);
                setIndividualDataNft(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            };
            getNfts();
        } else {
            const indivudual_nft_data = nftData.filter((data) => data.option === targetValue);
            setIndividualDataNft(indivudual_nft_data);
        }

        //console.log(targetValue);

    }
    //==============Modal content =======================
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editItem, setEditItem] = useState({
        description: "",
        name: "",
        price: "",
        option: "",
    });
    const {
        description,
        name,
        price,
        option
    } = editItem;
    const handleEditNFT = (item) => {
        setEditItem(item);

        console.log(editItem);
        //console.log(NFTitem);
        onOpen();
    }
    const obj = {
        description: editItem.description,
        name: editItem.name,
        price: editItem.price,
        option: editItem.option,
    }
    //console.log(obj);
    //==============Modal content end here===============
    // ============updateNFT through Modal===============
    const handleNFTUpdate = async (e) => {
        e.preventDefault();
        //console.log(name, priceNft, description, option);
        const firebaseId = editItem.id;
        const userDoc = doc(db, "nfts", firebaseId);
        await updateDoc(userDoc, { name: obj.name, description: obj.description, price: obj.price, option: obj.option });
        const getNfts = async () => {
            const data = await getDocs(nftCollectionRef);
            setIndividualDataNft(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getNfts();
        onClose();
    }
    //============updateNFT through modal end===========
    return (
        <>
            {walletConnectStatus ? <DesktopNav name={walletAddress} amount={walletAmount} /> : <DesktopNav name={algoAdd} amount={algoBalance} />}
            <Box w="100%">

                <Container maxW={'7xl'} mt="50px">
                    <Text fontSize="40px" fontWeight="bold" py={5} textAlign="center">Explore Collection</Text>

                    <HStack alignItems="center" gap={{ base: 1, md: 2 }} justifyContent="center">

                        <Button colorScheme='teal' variant='ghost' fontSize={{ base: "14px", md: "19px" }} value="all" onClick={(e) => handleFilterData(e)}>
                            All
                        </Button>
                        {/* <Button colorScheme='teal' variant='ghost' fontSize="19px" value="trending" onClick={(e) => handleFilterData(e)}>
                            Trending
                        </Button>
                        <Button colorScheme='teal' variant='ghost' fontSize="19px" value="top" onClick={(e) => handleFilterData(e)}>
                            Top
                        </Button>
                        <Button colorScheme='teal' variant='ghost' fontSize="19px" value="music" onClick={(e) => handleFilterData(e)}>
                            Music
                        </Button>
                        <Button colorScheme='teal' variant='ghost' fontSize="19px" value="photo" onClick={(e) => handleFilterData(e)}>
                            Photography
                        </Button> */}
                        <Button colorScheme='teal' variant='ghost' fontSize={{ base: "14px", md: "19px" }} value="art" onClick={(e) => handleFilterData(e)}>
                            Art
                        </Button>
                        <Button colorScheme='teal' variant='ghost' fontSize={{ base: "14px", md: "19px" }} value="game" onClick={(e) => handleFilterData(e)}>
                            Game
                        </Button>
                        <Button colorScheme='teal' variant='ghost' fontSize={{ base: "14px", md: "19px" }} value="cartoon" onClick={(e) => handleFilterData(e)}>
                            Cartoon
                        </Button>
                        <Button colorScheme='teal' variant='ghost' fontSize={{ base: "14px", md: "19px" }} value="animal" onClick={(e) => handleFilterData(e)}>
                            Animal
                        </Button>
                        <Button colorScheme='teal' variant='ghost' fontSize={{ base: "14px", md: "19px" }} value="metaverse" onClick={(e) => handleFilterData(e)}>
                            Metaverse
                        </Button>
                        {/* <Button colorScheme='teal' variant='ghost' fontSize="19px" value="utility" onClick={(e) => handleFilterData(e)}>
                            Utility
                        </Button>
                        <Button colorScheme='teal' variant='ghost' fontSize="19px" value="virtual" onClick={(e) => handleFilterData(e)}>
                            Virtual Worlds
                        </Button> */}
                    </HStack>
                </Container>

                <Container maxW={'7xl'} mt="50px">
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
                        {indivualDataNft.map((item) => (
                            <>
                                <Box h="480px" border="1px solid gray" borderColor="gray.300" borderRadius="12px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" key={item.id}>
                                    <Box onClick={() => handleSell(item)} cursor="pointer">
                                        <Image src={item.url} h="300px" w="100%" borderTopRightRadius="12px" borderTopLeftRadius="12px" objectFit="cover" />
                                        <HStack alignItems="center" justifyContent="space-between" p="12px 12px 0px 12px" marginBottom="-10px">
                                            <Text fontSize="14px" color="gray.500">{item.name}</Text>
                                            <Text fontSize="14px" color="gray.500">Price</Text>
                                        </HStack>
                                        <HStack alignItems="center" justifyContent="space-between" p="12px 12px 0px 12px" marginBottom="-10px">
                                            <Text fontSize="14px" >{item.id}</Text>
                                            <HStack>
                                                <Image src={algo} w="25px" h="25px" />
                                                <Text fontSize="14px" >{item.price}</Text>
                                            </HStack>

                                        </HStack>
                                        <HStack justifyContent="flex-end" p="12px">
                                            <Text fontSize="11px" >Last</Text>
                                            <Image src={algo} w="18px" h="18px" />
                                            <Text fontSize="11px" >{item.old_price}</Text>
                                        </HStack>
                                        <Divider color="gray.300" />
                                    </Box>


                                    <Box h="100px">
                                        <HStack justifyContent="space-between" p="12px">
                                            {item.address === algoAdd ?
                                                <Button onClick={() => handleEditNFT(item)}>Edit</Button> : null
                                            }
                                            <IoIosHeartEmpty />
                                        </HStack>
                                    </Box>
                                </Box>

                            </>

                        ))}

                        <Modal isOpen={isOpen} onClose={onClose} isCentered>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Edit your NFT</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <form >
                                        <Stack direction="column" gap={2}>
                                            {/* <FormControl>
                                    <FormLabel >Profile Picture</FormLabel>

                                    <FormHelperText>Upload your photo.</FormHelperText>
                                    <Input
                                        type="file"
                                        name='photo'
                                        //value={img}
                                        border="none"
                                        p={1}
                                        mt={2}
                                        onChange={(e) => onImageChange(e)}

                                    />

                                </FormControl> */}

                                            <FormControl>
                                                <FormLabel >NFT Name</FormLabel>
                                                <Input
                                                    type="text"
                                                    name='username'
                                                    Value={editItem.name}
                                                    onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                                                />

                                            </FormControl>

                                            {/* <FormControl>
                                                        <FormLabel >NFT Group Name</FormLabel>
                                                        <Input
                                                            type="text"
                                                            name='grpName'
                                                            value={item.unit_name}
                                                            onChange={(e) => setGrpName(e.target.value)}
                                                        />

                                                    </FormControl> */}
                                            <FormControl>
                                                <FormLabel >Price</FormLabel>
                                                <Input
                                                    type="text"
                                                    name='price'
                                                    Value={editItem.price}
                                                    onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                                                />

                                            </FormControl>


                                            <FormControl>
                                                <FormLabel >Description</FormLabel>
                                                <Input
                                                    type="text"
                                                    name='description'
                                                    Value={editItem.description}
                                                    onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                                                />
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel >Collection</FormLabel>
                                                <FormHelperText>This is the collection where your item will appear.</FormHelperText>
                                                <Select placeholder='Select option' value={editItem.option}
                                                    onChange={(e) => setEditItem({ ...editItem, option: e.target.value })}
                                                >
                                                    <option value='art'>Art</option>
                                                    <option value='cartoon'>Cartoon</option>
                                                    <option value='game'>Games</option>
                                                    <option value='animal'>Animal</option>
                                                </Select>
                                            </FormControl>
                                            {/* <FormControl>
                                                        <FormLabel >Blockchain</FormLabel>
                                                        <Select value={blockchain}
                                                            onChange={(e) => setblockchain(e.target.value)}
                                                        >
                                                            <option value='ethereum'>Ethereum</option>
                                                            <option value='algorand'>Algorand</option>
                                                        </Select>
                                                    </FormControl> */}
                                            <Button bg="green.500" color="whiteAlpha.900" type="submit" onClick={handleNFTUpdate}> Submit</Button>
                                            {/* <Button onClick={()=>initialize_escrow(AppId,assetId)}>Initilize app</Button> */}
                                        </Stack>
                                        {/* {
                                popUp ?
                                    <Alert status='success'>
                                        <AlertIcon />
                                        NFT Created successfully. Fire on!
                                    </Alert>
                                    :
                                    null
                            } */}
                                    </form>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </SimpleGrid>

                </Container>
            </Box>

        </>
    )
}

export default CollectionNFT
