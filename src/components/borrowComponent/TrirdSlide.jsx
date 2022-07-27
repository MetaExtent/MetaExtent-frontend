import React from 'react'
import { Box, Button, Divider, HStack, Image, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import pago from '../images/Pago-Coin.png';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

function TrirdSlide() {
    const borrowItemFromRedux = useSelector(state => state.token.borrow_item);
    //const asset_id = borrowItemFromRedux.assetID;
    const borrowAmountFromRedux = useSelector(state => state.token.nft_borrow_amount);

    return (
        <>
            <TableContainer py="30px">
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Image</Th>
                            <Th>Collection/NFT Token</Th>
                            <Th >Debt Token Approval</Th>
                            <Th >NFT Tokens Approval</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td><Image src={borrowItemFromRedux.url} width="50px" h="50px" objectFit="contain" /></Td>
                            <Td><Text>{borrowItemFromRedux.name}</Text></Td>
                            <Td><Button>Approved</Button></Td>
                            <Td><Button>Approved</Button></Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            <Divider />

            <HStack justifyContent="space-between" justifyItems="center" px="20px" py="20px" width="100%" bgColor="rgb(230, 253, 255)" my="20px" borderRadius="15px">
                <Text fontSize="16px" fontWeight="600">Total available borrow</Text>
                <HStack>
                    <Image src={pago} w="25px" h="25px" />
                    <Text>{borrowAmountFromRedux}</Text>
                </HStack>
            </HStack>
            <Divider />
            <VStack justifyContent="space-between" justifyItems="center" px="20px" py="20px" width="100%" bgColor="rgb(230, 253, 255)" my="20px" borderRadius="15px">
                <IoIosCheckmarkCircleOutline size="50" color='green' />
                <Text fontSize="12px" fontWeight="600" color="green.500">You approved all Debt Tokens and all NFT Tokens.</Text>
                <Text fontSize="12px" fontWeight="600" color="green.500">You can now continue and borrow your {borrowAmountFromRedux} ETH.</Text>

            </VStack>
        </>
    )
}

export default TrirdSlide