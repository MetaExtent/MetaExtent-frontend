import { Box, Button, Checkbox, Container, Divider, Flex, HStack, Icon, Image, Input, InputGroup, InputLeftElement, Radio, RadioGroup, Select, SimpleGrid, Stack, Text, Tooltip, useColorModeValue, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import coverPhoto from '../components/images/cover.webp';
import pp from '../components/images/Turtle-with-Scooter.png';
import { IoIosGrid, IoMdGrid, IoIosHeartEmpty } from "react-icons/io";
import { AtSignIcon, BellIcon, EmailIcon, InfoIcon, LinkIcon, SearchIcon, ArrowUpDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { IoIosPulse, IoMdArrowDropdown } from "react-icons/io";
import turtle from '../components/images/componentImages/Turtle.jpg';
import algo from '../components/images/algoCoin.png';
import { profileData } from '../components/marketPalaceComponent/data/sliderData';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DesktopNav from '../components/layout/Navbar/DesktopNav/DesktopNav';


function NFTProfile(props) {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state);
    const [openBox, setOpenBox] = useState(false);
    const [price, setPrice] = useState(false);
    const [item, setItem] = useState(false);
    const [value, setValue] = useState('1');
    const [onSale, setOnSale] = useState(false);
    const bgColor = useColorModeValue("rgb(230, 253, 255)", "blackAlpha.200");
    const textColor = useColorModeValue("gray.600", "whiteAlpha.500");
    const all_nft_data = useSelector(state => state.token.all_nfts);

    /////
    const algoAdd = useSelector(state => state.token.myAlgoAddress);
    const algoBalance = useSelector(state => state.token.myAlgoBalance);
    const walletAddress = useSelector(state => state.token.walletConnectAddress);
    const walletAmount = useSelector(state => state.token.walletConnectBalance);
    const walletConnectStatus = useSelector(state => state.token.walletConnectStatus);


    // console.log("==========showing nfts dara==========");
    // console.log(nfts);
    // const indivudual_nft_data = nfts.filter((data) => data.address === algoAdd);
    // console.log(indivudual_nft_data);
    const handleBox = () => {
        setOpenBox(!openBox);
    }
    const handlePrice = () => {
        setPrice(!price);
    }
    const handleItem = () => {
        setItem(!item);
    }
    const handleSale = () => {
        setOnSale(!onSale);
    }

    let indivudual_nft_data = [];
    if (location.state.data) {
        indivudual_nft_data = all_nft_data.filter((data) => data.option === location.state.data.value);

    }

    console.log(indivudual_nft_data);
    const handleSell = (item) => {
        console.log(item);
        if (item.address === algoAdd) {
            ////////////
            navigate("/single", { state: { person: true, data: item } });
        } else {
            navigate("/single", { state: { data: item } })
        }
    }



    return (
        <>
            {walletConnectStatus ? <DesktopNav name={walletAddress} amount={walletAmount} /> : <DesktopNav name={algoAdd} amount={algoBalance} />}
            <Box minH="100vh" w="100%" >
                {/* profile pic section */}
                <Box width="100%" >
                    <VStack alignItems="flex-start">
                        <Image src={coverPhoto} w="100%" h="300px" marginBottom="-150px" objectFit="cover" />
                        <Box paddingLeft={{ base: "40px", md: "60px" }} >
                            <Image src={pp} h="200px" w="200px" border="10px solid gray" borderColor="whiteAlpha.900" bg="gray.400" />
                        </Box>
                    </VStack>
                </Box>
                <Container maxW={'8xl'} px={{ base: "20px", md: "25px" }}>
                    <Stack alignItems="start" justifyContent="space-between" paddingBottom="15px" direction={{ base: 'column', md: 'row' }}>
                        <Text fontSize="25px" fontWeight="600">The call of maximalism</Text>
                        <Flex gap={5}>
                            <Tooltip hasArrow label='Search places' bg='gray.300' color='black'>
                                <SearchIcon h="25px" w="25px" color="gray.500" />
                            </Tooltip>
                            <Tooltip hasArrow label='Tag' bg='gray.300' color='black'>
                                <AtSignIcon h="25px" w="25px" color="gray.500" />
                            </Tooltip>
                            <Tooltip hasArrow label='Notification' bg='gray.300' color='black'>
                                <BellIcon h="25px" w="25px" color="gray.500" />
                            </Tooltip>

                            <Divider orientation='vertical' h="20px" size="30px" />
                            <Tooltip hasArrow label='Link' bg='gray.300' color='black'>
                                <LinkIcon h="25px" w="25px" color="gray.500" />
                            </Tooltip>
                            <Tooltip hasArrow label='Info' bg='gray.300' color='black'>
                                <InfoIcon h="25px" w="25px" color="gray.500" />
                            </Tooltip>
                        </Flex>
                    </Stack>
                    <VStack w={{ base: "100%", md: "70%" }} align="left" paddingBottom="30px">
                        <Text fontSize="21px">By Person1</Text>
                        <Text fontSize="18px" color={textColor}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita molestias explicabo aperiam adipisci saepe repellat. Nostrum illum sequi incidunt possimus officia ullam obcaecati rem illo, voluptas quae! Eum vero porro neque nulla maiores fuga nemo voluptates quae saepe iste! Beatae expedita ullam neque odio minus ut nemo veniam, velit aperiam.</Text>
                    </VStack>
                    <HStack gap={{ base: 4, md: 8 }}>
                        <VStack alignItems="left">
                            <Text fontSize="21px" fontWeight="bold" marginBottom="-10px">10</Text>
                            <Text fontSize={{ base: "14px", md: "21px" }} color={textColor} fontWeight="600">items</Text>
                        </VStack>
                        <VStack alignItems="center">
                            <Text fontSize="21px" fontWeight="bold" marginBottom="-10px">2</Text>
                            <Text fontSize={{ base: "14px", md: "21px" }} color={textColor} fontWeight="600">owners</Text>
                        </VStack>
                        <VStack alignItems="center">
                            <HStack marginBottom="-10px">
                                <ArrowUpDownIcon />
                                <Text fontSize="21px" fontWeight="bold" marginBottom="-10px">0.35</Text>
                            </HStack>
                            <Text fontSize={{ base: "14px", md: "21px" }} color={textColor} fontWeight="600">floor price</Text>
                        </VStack>
                        <VStack alignItems="center">
                            <HStack marginBottom="-10px">
                                <ArrowUpDownIcon />
                                <Text fontSize="21px" fontWeight="bold" marginBottom="-10px">0.45</Text>
                            </HStack>
                            <Text fontSize={{ base: "14px", md: "21px" }} color={textColor} fontWeight="600">total volume</Text>
                        </VStack>
                    </HStack>
                    <HStack p="40px 0px 20px 0px" gap={10}>
                        <Box>
                            <Text fontSize="21px" paddingBottom="" fontWeight="400" _hover={{ borderBottom: "1px solid black", fontWeight: "700" }}>Items</Text>
                        </Box>
                        <Box>
                            <Text fontSize="21px" paddingBottom="" fontWeight="400" _hover={{ borderBottom: "1px solid black", fontWeight: "700" }}>Activity</Text>
                        </Box>
                    </HStack>
                    <HStack py="20px">
                        <Box p="8px" _hover={{ shadow: 'lg' }} w="5%" textAlign="center">
                            <HamburgerIcon w="25px" h="25px" />
                        </Box>
                        <Box w="70%" >
                            <InputGroup>
                                <InputLeftElement children={<Icon name="Search2Icon" color="gray.300" />} />
                                <Input type="search" placeholder="Search by name or attribute" />
                            </InputGroup>
                        </Box>
                        <Box w="20%" _hover={{ shadow: 'xl' }}>
                            <Select>
                                <option value='option1'>Recently Listed</option>
                                <option value='option2'>Recently Created</option>
                                <option value='option3'>Recently Sold</option>
                            </Select>
                        </Box>
                        <Box w="5%" border="1px solid gray" p="6px" borderRadius="8px" borderColor="gray.200">
                            <HStack >
                                <IoIosGrid size="25px" cursor="pointer" />
                                <Divider orientation='vertical' h="20px" />
                                <IoMdGrid size="25px" cursor="pointer" />
                            </HStack>
                        </Box>
                    </HStack>
                    <Stack direction={{ base: 'column', md: "row" }}>
                        <Box w="25%">
                            {/* Status component starts*/}
                            <VStack borderRadius="8px" border="1px solid gray" borderColor="gray.300" p="15px" marginBottom="20px">
                                <Flex justifyContent="space-between" width="100%" >
                                    <HStack>
                                        <Text onClick={handleBox} cursor="pointer" fontSize="18px" fontWeight="500">Status</Text>
                                    </HStack>
                                    <HStack><IoMdArrowDropdown onClick={handleBox} cursor="pointer" size="25px" /></HStack>

                                </Flex>
                                {openBox ? <>
                                    <HStack w="100%" alignItems="left" paddingTop="15px" justifyContent="space-between">
                                        <Text fontSize="18px">Buy Now</Text>
                                        <Checkbox colorScheme='green' size="lg" />
                                    </HStack>
                                    <HStack w="100%" alignItems="left" paddingTop="15px" justifyContent="space-between">
                                        <Text fontSize="18px">On Auction</Text>
                                        <Checkbox colorScheme='green' size="lg" />
                                    </HStack>
                                </> : <></>}

                            </VStack>
                            {/* Status component ends here*/}
                            {/* Price component starts*/}
                            <VStack borderRadius="8px" border="1px solid gray" borderColor="gray.300" p="15px" marginBottom="20px">
                                <Flex justifyContent="space-between" width="100%" >
                                    <HStack>
                                        <Text onClick={handlePrice} cursor="pointer" fontSize="18px" fontWeight="500">Price</Text>
                                    </HStack>
                                    <HStack><IoMdArrowDropdown onClick={handlePrice} cursor="pointer" size="25px" /></HStack>

                                </Flex>
                                {price ? <>
                                    <HStack w="100%" alignItems="left" paddingTop="15px" justifyContent="space-between">
                                        <Select w="40%">
                                            <option value='usdc'>USDC</option>
                                            <option value='algo'>Algo</option>
                                            <option value='pago'>Pago</option>
                                        </Select>
                                        <Input w="25%" type="number" placeholder='Min' />
                                        <Text w="10%" fontSize="21px" fontWeight="500">to</Text>
                                        <Input w="25%" type="number" placeholder='Max' />
                                    </HStack>
                                    <HStack w="100%" alignItems="left" paddingTop="15px" justifyContent="space-between">
                                        <Button w="100%" bgColor="#A2CFA6">Apply</Button>
                                    </HStack>
                                </> : <></>}

                            </VStack>
                            {/* Price component ends here*/}
                            {/* Item quantity component starts*/}
                            <VStack borderRadius="8px" border="1px solid gray" borderColor="gray.300" p="15px" marginBottom="20px">
                                <Flex justifyContent="space-between" width="100%" >
                                    <HStack>
                                        <Text onClick={handleItem} cursor="pointer" fontSize="18px" fontWeight="500">Item Quannity</Text>
                                    </HStack>
                                    <HStack><IoMdArrowDropdown onClick={handleItem} cursor="pointer" size="25px" /></HStack>

                                </Flex>
                                {item ? <>
                                    <HStack w="100%" alignItems="left" paddingTop="15px" justifyContent="space-between">
                                        <RadioGroup onChange={setValue} value={value}>
                                            <Stack direction='column'>
                                                <Radio value='1'>All Items</Radio>
                                                <Radio value='2'>Single Item</Radio>
                                                <Radio value='3'>Bundles</Radio>
                                            </Stack>
                                        </RadioGroup>
                                    </HStack>
                                </> : <></>}

                            </VStack>
                            {/* Item quantity ends here*/}
                            {/* On sale component starts*/}
                            <VStack borderRadius="8px" border="1px solid gray" borderColor="gray.300" p="15px" marginBottom="20px">
                                <Flex justifyContent="space-between" width="100%" >
                                    <HStack>
                                        <Text onClick={handleSale} cursor="pointer" fontSize="18px" fontWeight="500">On Sale in</Text>
                                    </HStack>
                                    <HStack><IoMdArrowDropdown onClick={handleSale} cursor="pointer" size="25px" /></HStack>

                                </Flex>
                                {onSale ? <>
                                    <HStack w="100%" alignItems="left" paddingTop="15px" justifyContent="space-between">
                                        <Text fontSize="18px">SQL</Text>
                                        <Checkbox colorScheme='green' size="lg" />
                                    </HStack>

                                </> : <></>}

                            </VStack>
                            {/* On sale component ends here*/}
                        </Box>
                        <Box w="75%" h="200px">
                            <SimpleGrid columns={3} spacing={5}>
                                {indivudual_nft_data.map((item) => (
                                    <Box h="450px" border="1px solid gray" borderColor="gray.300" borderRadius="12px" boxShadow="md" onClick={() => handleSell(item)} cursor="pointer" key={item.id}>
                                        <Image src={item.url} h="300px" w="100%" borderTopRightRadius="12px" borderTopLeftRadius="12px" />
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
                                        <HStack justifyContent="flex-end" p="12px">

                                            <IoIosHeartEmpty />
                                        </HStack>
                                    </Box>
                                ))}


                            </SimpleGrid>
                        </Box>
                    </Stack>
                    <HStack paddingTop="40px" gap={10} h="400px">

                    </HStack>
                </Container>
            </Box>
        </>
    )
}

export default NFTProfile