import { Box, Checkbox, HStack, Text, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

import { db } from '../firebase/FirebaseConfig';
import pago from '../images/Pago-Coin.png';
import { useDispatch, useSelector } from 'react-redux';
import { NFTcheckBoxAction, NFTborrowItemAction } from '../redux/actions';
import SecondSlide from './SecondSlide';

function FirstSlide({ index }) {
    const [allNfts, setAllNfts] = useState([]);
    const nftCollectionRef = collection(db, "nfts");
    const algoAdd = useSelector(state => state.token.myAlgoAddress);
    const [checkbox, setCheckBox] = useState(true);
    const [checkBoxItem, setCheckBoxItem] = useState([]);
    const [borrowItem, setBorrowItem] = useState();
    const dispatch = useDispatch();

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

    }, []);
    console.log(allNfts);
    //========= get users NFT ============================
    const userNFT = allNfts.filter((data) => data.owner_address === algoAdd && data.borrow != true);
    console.log(userNFT);
    //==============get users NFT ends here ==============

    const handleCheckBox = (item) => {
        console.log(item);
        setBorrowItem(item);
        setCheckBox(!checkbox);
        if (checkbox) {
            dispatch(NFTcheckBoxAction(true));
            dispatch(NFTborrowItemAction(item));
            setBorrowItem(item);
        } else {
            dispatch(NFTcheckBoxAction(false));
            dispatch(NFTborrowItemAction(''));
            setBorrowItem();
        }

    }
    console.log(checkBoxItem);
    return (
        <>
            <HStack py="20px" width="100%" bgColor="gray.50" px="20px" my="20px" borderRadius="15px">
                {/* <Radio colorScheme='red' value='1'>
                                <Text>NFT Name</Text>
                            </Radio> */}
                <Text fontSize="18px" fontWeight="400"> List of NFTs</Text>

            </HStack>

            {userNFT.map((item) => (
                <>
                    <HStack justifyContent="space-between" justifyItems="center" px="20px" py="20px" width="100%" bgColor="gray.50" my="20px" borderRadius="15px" key={item.id}>
                        <HStack>
                            <Checkbox
                                colorScheme='green'
                                value={checkbox}
                                onChange={() => handleCheckBox(item)}>
                                Checkbox
                            </Checkbox>
                            <Image src={item.url} width="80px" height="80px" objectFit="cover" borderRadius="50%" />
                            <Text fontSize="18px" fontWeight="600">{item.name}</Text>
                        </HStack>
                        <HStack>
                            <Image src={pago} w="25px" h="25px" />
                            <Text>{item.price}</Text>
                        </HStack>
                    </HStack>



                </>
            ))}

            <HStack justifyContent="space-between" justifyItems="center" px="20px" py="20px" width="100%" bgColor="rgb(230, 253, 255)" my="20px" borderRadius="15px">
                <Text fontSize="16px" fontWeight="600">Total available borrow</Text>
                <HStack>
                    <Image src={pago} w="25px" h="25px" />
                    <Text>{borrowItem ? borrowItem.price : 0.00}</Text>
                </HStack>
            </HStack>

            <HStack justifyContent="space-between" justifyItems="center" px="20px" py="20px" width="100%" bgColor="rgb(230, 253, 255)" my="20px" borderRadius="15px">
                <Text fontSize="16px" fontWeight="400" textAlign="center">Choose at least one NFT token which you want to deposit as collateral. The more collaterals you deposit, the higher ETH amount you can borrow. </Text>

            </HStack>
        </>
    )
}

export default FirstSlide