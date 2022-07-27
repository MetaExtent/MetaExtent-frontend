import React, { useState } from 'react';
import { Icon, Box, Button, Flex, HStack, Select, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Divider, Image, useColorModeValue } from '@chakra-ui/react';
import { Md3DRotation, MdAllOut } from 'react-icons/md';
import NavMenu from './NavMenuDesktop';
import { links, languages } from '../_data';
import SettingsModal from './ModalDesktop';
import metaExtentLogo from '../../../images/MetaExtent.png';
import coinImage from '../../../images/Pago-Coin.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Navbar(props) {
  // const algoAdd = useSelector(state => state.token.myAlgoAddress);
  // const algoBalance = useSelector(state => state.token.myAlgoBalance);
  // const walletAddress = useSelector(state => state.token.walletConnectAddress);
  // const walletAmount = useSelector(state => state.token.walletConnectBalance);
  // const walletConnectStatus = useSelector(state => state.token.walletConnectStatus);
  const serverName = useSelector(state => state.token.serverName);
  const address = props.name;
  const res = address.substring(0, 8);
  const [nameServer, setNameServer] = useState(serverName);
  const bg = useColorModeValue("#6faa6b", "whiteAlpha.50");

  return (
    <Flex
      color={'white'}
      pos="sticky"
      zIndex={'100'}
      px="4"
      py="4"
      bgColor={bg}
      d="flex"

      justifyContent={'space-between'}
    >
      <HStack alignItems={'center'} gap="6">
        <Flex alignItems={'center'} gap="2">
          <Link to='/swap'>
            <Box >
              <Image src={metaExtentLogo} alt='MetaExtent' h="40px" w="100px" />
            </Box>
          </Link>

        </Flex>
        <Flex
          display={{
            base: 'none',
            md: 'flex',

            //py: '10px'
          }}

        >
          {links.map(link => {
            return <NavMenu key={link.label} link={link} />;
          })}
        </Flex>
      </HStack>

      <HStack>
        <Button
          cursor="pointer"
          colorScheme={'whiteAlpha'}
          color="#eee"
          variant={'ghost'}
          _focus={{
            boxShadow: 'none',
          }}
        >
          {nameServer}
        </Button>
        {languages.map(link => {
          return <NavMenu key={String(Date.now())} link={link} />;
        })}

        {/* <LanguageModal /> */}
        <SettingsModal />
        <Link to="/dashboard">
          <Button
            display={{
              base: 'none',
              sm: 'flex',
            }}
            size={'sm'}
            width="220px"
            cursor="pointer"
            bgColor="#A2CFA6" color="blackAlpha.900"
            variant={'solid'}
            rounded="full"
            textTransform={'uppercase'}
            gap="10px"
          >
            {res} <Divider orientation='vertical' h="20px" /> <Image src={coinImage} />{props.amount}
          </Button>
        </Link>

      </HStack>
    </Flex>
  );
}

export default Navbar;
