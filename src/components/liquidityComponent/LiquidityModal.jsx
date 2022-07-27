import React from 'react';
import { tokens } from '../swapComponent/swapData';
import { TokenAction, TokenAction2 } from '../redux/actions';
import { useDispatch } from 'react-redux';

import {
    Icon,
    Box,
    Text,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Switch,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    List,
    ListItem,
    ListIcon,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    useColorModeValue,
    HStack,
    Image,
} from '@chakra-ui/react';
import { IoChevronDown, IoLogoAppleAr } from 'react-icons/io5';
import { useSelector } from 'react-redux';

function LiquidityModal(props) {
    //console.log(props.token2);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const textColor = useColorModeValue("gray.600", "whiteAlpha.500");

    // const swapTokenName = (token) => {
    //     // dispatch(TokenAction(token.label));
    //     // onClose();
    //     console.log(token);
    //}
    const token1 = useSelector(state => state.token.token1);
    const token1_image = useSelector(state => state.token.token1_image);
    const token2 = useSelector(state => state.token.token2);
    const token2_image = useSelector(state => state.token.token2_image);


    const swapToken = (token) => {

        //console.log(result);
        if (props.token2) {
            // if (!result) {
            //     console.log(result);
            //     dispatch(TokenAction2(token.label));
            //     onClose();
            //     //console.log("Matched");
            // } else {
            //     // dispatch(TokenAction2(token.label));
            //     // onClose();
            //     console.log("matched");

            // }
            dispatch(TokenAction2({
                token2: token.label,
                token2_ID: token.id,
                token2_image: token.icon
            }));
            onClose();

        }
        else {
            dispatch(TokenAction({
                token1: token.label,
                token1_ID: token.id,
                token1_image: token.icon,
            }));
            onClose();
        }
        // dispatch(TokenAction(token.label));
        // onClose();
    }

    //console.log(token2);

    return (
        <>
            <Button
                cursor="pointer"
                colorScheme={'whiteAlpha'}
                color={textColor}
                variant={'ghost'}
                px="2"
                onClick={onOpen}
                gap={1}
                _focus={{
                    boxShadow: 'none',
                }}
            >
                {props.token2 ?
                    <>  <Image src={token2_image} w="25px" h="25px" /> {token2}<Icon as={IoChevronDown} w={'6'} h={'6'} color="gray" /></>
                    :
                    <>  <Image src={token1_image} w="25px" h="25px" /> {token1}<Icon as={IoChevronDown} w={'6'} h={'6'} color="gray" /></>
                }
                {/* select a currency <IoChevronDown /> */}

            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent h="75vh" overflowY="auto">
                    <ModalHeader

                        color={textColor}
                        fontWeight={'black'}
                    >
                        Select a token
                    </ModalHeader>
                    <ModalCloseButton color={'black'} />
                    <ModalBody>
                        <Divider py="5px" color="blackAlpha.900" />
                        {tokens.map((token) => (
                            <Box key={token.id}>
                                <HStack gap={2} paddingBottom="10px" onClick={() => swapToken(token)} cursor="pointer">
                                    <Image w="25px" h="25px" src={token.icon} />
                                    <Text>{token.label}</Text>
                                </HStack>
                            </Box>
                        ))}
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default LiquidityModal;
