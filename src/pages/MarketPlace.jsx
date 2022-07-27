import { Box, Button, Container, Flex, Heading, HStack, Icon, IconButton, Image, Select, SimpleGrid, Stack, Text, useBreakpointValue, useColorModeValue, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CaptionCarousel from '../components/marketPalaceComponent/CaptionCarousel';
import TopCollectionComponent from '../components/marketPalaceComponent/TopCollectionComponent';
import TrendingInAllComponent from '../components/marketPalaceComponent/TrendingInAllComponent';
import { createAndSellNFT } from '../components/marketPalaceComponent/data/sliderData';
import { resourceForGettingStarted } from '../components/marketPalaceComponent/data/sliderData';
import bgImage from '../components/images/componentImages/bgDemo.png';
import { useSelector } from 'react-redux';
import DesktopNav from '../components/layout/Navbar/DesktopNav/DesktopNav';
import marketplaceHero from '../components/images/marketplace-hero.gif';
import image1 from '../components/images/Concept-4.png'
import { Link } from 'react-router-dom';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from '../components/firebase/FirebaseConfig';
import { useDispatch } from 'react-redux';
import { AllNFTAction } from '../components/redux/actions';
import { useNavigate } from 'react-router-dom';


function MarketPalace() {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("rgb(230, 253, 255)", "blackAlpha.200");
  const algoAdd = useSelector(state => state.token.myAlgoAddress);
  const algoBalance = useSelector(state => state.token.myAlgoBalance);
  const walletAddress = useSelector(state => state.token.walletConnectAddress);
  const walletAmount = useSelector(state => state.token.walletConnectBalance);
  const walletConnectStatus = useSelector(state => state.token.walletConnectStatus);

  const dispatch = useDispatch();

  const nftCollectionRef = collection(db, "nfts");
  const [nfts, setNfts] = useState([]);
  dispatch(AllNFTAction(nfts));
  useEffect(() => {

    const getNfts = async () => {
      const data = await getDocs(nftCollectionRef);
      setNfts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getNfts();

  }, []);

  console.log(nfts);
  return (
    <>

      {walletConnectStatus ? <DesktopNav name={walletAddress} amount={walletAmount} /> : <DesktopNav name={algoAdd} amount={algoBalance} />}
      <Box minH="100vh" >
        {/* first component start from here  */}

        <Box w="100%" bgColor={bgColor}>
          <Container maxW={'7xl'}>
            <Stack
              align={'center'}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 20, md: 28 }}
              direction={{ base: 'column', md: 'row' }}>
              <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                  <Text
                    as={'span'}
                    position={'relative'}
                    color="alphaBlack.900"
                    _after={{
                      content: "''",
                      width: 'full',
                      height: '30%',
                      position: 'absolute',
                      bottom: 1,
                      left: 0,

                      zIndex: -1,
                    }}>
                    MetaExtent
                  </Text>
                  <br />
                  <Text as={'span'} color="#76B947">
                    Home for NFTs!
                  </Text>
                </Heading>
                <Text color={'alphaBlack.600'}>
                  We are a web3 NFT marketplace that is fully decentralise and community centric.
                  Come here to discover, collect, and sell extraordinary NFTs.
                </Text>
                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={{ base: 'row', sm: 'row' }}>
                  <Link to='/collection'>
                    <Button

                      size={'lg'}
                      fontWeight={'normal'}
                      px={6}
                      colorScheme={'gray'}
                      bg="#76B947"
                      _hover={{ bg: '#76B947' }}
                      borderRadius="20px"
                      w="150px"
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    >
                      Explore
                    </Button>
                  </Link>
                  <Link to='/mint'>
                    <Button

                      size={'lg'}
                      fontWeight={'normal'}
                      px={6}
                      border="1px solid #76B947"
                      _hover={{ bg: '#76B947' }}
                      borderRadius="20px"
                      w="150px"
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    >
                      Create
                    </Button>
                  </Link>
                </Stack>
              </Stack>
              <Flex
                flex={1}
                justify={'center'}
                align={'center'}
                position={'relative'}
                w={'full'}>

                <Box
                  position={'relative'}
                  rounded={'2xl'}
                  boxShadow={'2xl'}
                  width={'full'}
                  overflow={'hidden'}>

                  <Image
                    alt={'Hero Image'}
                    fit={'cover'}
                    align={'center'}
                    w={'100%'}
                    h={'100%'}
                    src={marketplaceHero}
                  />
                </Box>
              </Flex>
            </Stack>
          </Container>
        </Box>
        {/* first component end here  */}


        {/* 2nd component starts from here  */}
        <Container maxW={'7xl'} py={{ base: "50px", md: "100px" }} >
          <HStack borderRadius="12px" h={{ base: "100px", md: "200px" }} p={{ base: "20px", md: "40px" }} border="1px solid gray" borderColor="blackAlpha.400" justifyContent="space-between" bgImage={image1} backgroundRepeat="no-repeat" backgroundPosition="center">
            <Box>
              <Text fontSize={{ base: "14px", md: "25px" }} color="whiteAlpha.900" fontWeight="bold">Lorem ipsum dolor sit amet.</Text>
            </Box>
            <Box>
              <Link to='/collection'>
                <Button _hover={{ bg: '#76B947' }} bgColor="#76B947" width="150px" borderRadius="20px">Explore</Button>
              </Link>
            </Box>
          </HStack>
        </Container>
        {/* 2nd component end here  */}

        <Box w="100%" bgColor={bgColor}>
          {/* 3rd component starts from here  */}
          <Container maxW={'7xl'} paddingTop="70px">
            <Text textAlign="center" fontSize={{ base: "18px", md: "32px" }} mb="30px" fontWeight="bold">Notable Drops</Text>
            <CaptionCarousel />
          </Container>
          {/* 3rd component end here  */}
          {/* 4th component starts from here  */}
          <Container maxW={'7xl'} mt={{ base: "5px", md: "100px" }}>
            <HStack alignItems="center" justifyContent="center" py={{ base: "40px", md: "40px" }}>
              <Text textAlign="center" fontSize={{ base: "14px", md: "25px" }} fontWeight="bold" >Top collections over</Text>
              <Select w="200px" border="none" fontSize={{ base: "14px", md: "25px" }} color="blue.800" fontWeight="bold" _focus={{ border: "none" }}>
                <option value='option1' >Last 24 hours</option>
                <option value='option2'>Last 7 days</option>
                <option value='option3'>Last 30 days</option>
              </Select>
            </HStack>
            <TopCollectionComponent />
          </Container>
          {/* 4th component end here  */}
          {/* 5th component starts from here  */}
          <Container maxW={'7xl'} mt={{ base: "5px", md: "60px" }} >
            <Text textAlign="center" fontSize={{ base: "18px", md: "32px" }} mb="50px" fontWeight="bold">Trending in
              all categories
            </Text>
            <TrendingInAllComponent />
          </Container>
          {/* 5th component end here  */}
        </Box>

        {/* 6th component starts from here  */}
        <Box w="100%" bgColor={bgColor} py="50px" textAlign="center">
          <Container maxW={'7xl'}  >
            <Text textAlign="center" fontSize={{ base: "18px", md: "32px" }} mb="50px" fontWeight="bold">Create and sell your NFTs
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} gap={5} >
              {createAndSellNFT.map((item) => (
                <VStack gap={3} align="center" justifyContent="center" w={{ base: "100%", md: "300px" }} p="20px" key={item.id} >
                  <Image src={item.icon} h="50px" w="50px" />
                  <Heading fontSize="21px">{item.name}</Heading>
                  <Text textAlign="center" fontSize="16px">{item.desc}</Text>
                </VStack>
              ))}

            </Stack>
          </Container>
        </Box>
        {/* 6th component end here  */}
        {/* 7th component starts from here  */}
        <Box w="100%" bgColor={bgColor}>
          <Container maxW={'7xl'} py="60px">
            <Text textAlign="center" fontSize={{ base: "18px", md: "32px" }} mb="50px" fontWeight="bold">Resources for getting started </Text>
            <Stack direction={{ base: 'column', md: 'row' }} gap={5} mb="60px" borderRadius="12px" background={bgColor}>

              {resourceForGettingStarted.map((item) => (
                <VStack gap={3} align="center" justifyContent="center" w={{ base: "100%", md: "400px" }} key={item.id} boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" borderRadius="12px" _hover={{ boxShadow: "xl" }}>
                  <Image src={item.image} width="100%" h="350px" borderTopLeftRadius="12px" borderTopRightRadius="12px" />
                  <Text fontSize="18px" fontWeight="600" paddingBottom="40px">{item.title}</Text>
                </VStack>
              ))}


            </Stack>
          </Container>
        </Box>

        {/* 7th component end here  */}
        {/* 8th component starts from here  */}
        <Box w="100%">
          <Image src={bgImage} w="100%" h={{ base: "250px", md: "100%" }} objectFit="cover" />
        </Box>
        {/* 8th component ends here  */}
        <Container maxW={'7xl'} h="200px">

        </Container>
      </Box>
    </>

  )
}

export default MarketPalace;
