import React from 'react'
import { Box, HStack, Text, Image, VStack, Input } from '@chakra-ui/react';
import dummyImage from '../images/Draft.png';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NFTborrowAmountAction } from '../redux/actions';
import { IoIosRadioButtonOff, IoIosEgg } from "react-icons/io";


function SecondSlide(props) {
    // console.log("========secondSlide=========");
    // console.log(props);
    const [borrowAmount, setBorrowAmount] = useState();
    const dispatch = useDispatch();
    const borrowItemFromRedux = useSelector(state => state.token.borrow_item);
    const borrow_AppID = useSelector(state => state.token.borrow_app_id);
    const totalBorrowAmount = useSelector(state => state.token.total_borrow_amount);
    const totalDepositAmount = useSelector(state => state.token.total_deposit_amount);
    
    const item = useSelector(state => state.token.borrow_item);
    const price = item.price;
    console.log(price);
    const handleBorrowAmount = (e) => {
        console.log(e.target.value);
        setBorrowAmount(e.target.value);
        dispatch(NFTborrowAmountAction(e.target.value));
    }
    return (
        <>
            <HStack py="40px">
                <HStack w="35%">
                    <Image src={borrowItemFromRedux.url} w="250px" h="250px" objectFit="contain" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" borderRadius="12px" />
                </HStack>
                <VStack w="65%" h="250px" px="20px" spacing={10}>
                    <HStack justifyItems="center" justifyContent="space-between" width="100%">
                        <VStack align="left" w="67%">
                            <Text fontSize="14px" color="gray.400">Collection</Text>
                            <Text fontSize="18px" color="gray.900">{borrowItemFromRedux.name}</Text>
                        </VStack>
                        <VStack align="left" w="33%">
                            <Text fontSize="14px" color="gray.400">Token ID</Text>
                            <Text fontSize="18px" color="gray.900">{borrow_AppID}</Text>
                        </VStack>
                    </HStack>

                    <HStack justifyItems="center" justifyContent="space-between" width="100%">
                        <VStack align="left" w="33.33%">
                            <Text fontSize="14px" color="gray.400">Floor price
                            </Text>
                            <Text fontSize="18px" color="gray.900">{borrowItemFromRedux.price}</Text>
                        </VStack>
                        <VStack align="left" w="33.33%">
                            <Text fontSize="14px" color="gray.400">Utilization rate
                            </Text>
                            <Text fontSize="18px" color="gray.900">{(totalBorrowAmount/totalDepositAmount).toFixed(2)}
                                %</Text>
                        </VStack>
                        <VStack align="left" w="33.33%">
                            <Text fontSize="14px" color="gray.400">Health factor
                            </Text>
                            <HStack>
                                <IoIosEgg color='green' />
                                <Text fontSize="18px" color="gray.900">1.20</Text>
                            </HStack>

                        </VStack>
                    </HStack>

                    <HStack justifyItems="center" justifyContent="space-between" width="100%">
                        <VStack align="left" w="33.33%">
                            <Text fontSize="14px" color="gray.400">Available to borrow

                            </Text>
                            <Text fontSize="18px" color="gray.900">{(item.price * 0.4).toFixed(2)}</Text>
                        </VStack>
                        <VStack align="left" w="33.33%">
                            <Text fontSize="14px" color="gray.400">Borrow APR

                            </Text>
                            <Text fontSize="18px" color="gray.900">2.07
                                %</Text>
                        </VStack>
                        <VStack align="left" w="33.33%">
                            <Text fontSize="14px" color="gray.400">Liquidation price

                            </Text>
                            <Text fontSize="18px" color="gray.900">{(0.9 * item.price).toFixed(2)}</Text>
                        </VStack>
                    </HStack>
                </VStack>
            </HStack>

            <HStack justifyContent="space-between" justifyItems="center" px="20px" py="20px" width="100%" bgColor="gray.50" my="20px" borderRadius="15px">
                <VStack w="100%" align="left">
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
                        py="30px"
                        onChange={(e) => handleBorrowAmount(e)}
                    />
                </VStack>


            </HStack>
        </>
    )
}

export default SecondSlide