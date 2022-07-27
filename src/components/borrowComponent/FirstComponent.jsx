import { Box, Button, Center, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import FirstSlide from "./FirstSlide";
import SecondSlide from "./SecondSlide";
import TrirdSlide from "./TrirdSlide";
import { useSelector } from 'react-redux';
import algosdk, { bigIntToBytes, getApplicationAddress } from "algosdk";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query, where,
    update,
    Timestamp
} from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";



function FirstComponent() {
    const { nextStep, prevStep, reset, activeStep } = useSteps({
        initialStep: 0,
    })
    const steps = [{ label: "Select NFT", component: <FirstSlide /> }, { label: "Borrow Amount", component: <SecondSlide /> }, { label: "Approve Borrowing", component: <TrirdSlide /> }]
    const checkbox = useSelector(state => state.token.nft_checkbox);
    const borrow_Amount = useSelector(state => state.token.nft_borrow_amount);
    const borrowItemFromRedux = useSelector(state => state.token.borrow_item);
    const asset_id = borrowItemFromRedux.assetID;
    const nft_price = borrowItemFromRedux.price;
    const nft_id = borrowItemFromRedux.nft_id;
    const algoAdd = useSelector(state => state.token.myAlgoAddress);
    const [finalStep, setFinalStep] = useState(false);
    const navigate = useNavigate();
    const [item2, setItem2] = useState(false);
    const modal2 = useDisclosure();
    const nftCollectionRef = collection(db, "nfts");
    const nftBorrowtRef = collection(db, "borrow");
    const handleBorrow = () => {
        console.log("======================Borrow function=====================");
        //assetOptin(asset_id);
        borrow(asset_id);
    }
    const [nftDetails, setNftDetails] = useState();
    console.log('====== nft id=======')
    console.log(nft_id);
    console.log(asset_id);
    const [nfts, setNfts] = useState([]);

    useEffect(() => {
        const getNfts = async () => {

            const q = query(collection(db, "nfts"));
            const data = await getDocs(q);
            console.log("checking asset ID " + asset_id)
            const q2 = query(collection(db, "nfts"), where("assetID", "==", asset_id));
            console.log("========hello, i am here========")
            const data2 = await getDocs(q2);
            console.log("inside nft details")

            data2.forEach(async (doc) => {
                // doc.data() is never undefined for query doc snapshots
                let docData = doc.data();


                //   console.log(doc.id, " => ", doc.data());
                await setNftDetails({ ...nftDetails, nftDetails: docData, nftId: doc.id })




            });

            setNfts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));


        };

        getNfts();

        // const auctionAddress = async () => {
        //     const data = await getDocs(nftAuctionAddressRef);
        //     setAuctionAddress(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        // };

        // auctionAddress();


        // const closeAuctionDetail = async () => {
        //     const data = await getDocs(nftCloseAuctionRef);
        //     setCloseAuctionInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        // };

        // closeAuctionDetail();

    }, [borrowItemFromRedux.assetID]);
    console.log(nftDetails);

    const assetOptin = async (asset_id) => {
        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const params = await algodClient.getTransactionParams().do();
        var note = new Uint8Array([10]);
        // const txn = algosdk.makeApplicationOptInTxnFromObject({
        //     suggestedParams: {
        //         ...params,
        //     },
        //     from: "U6EHOPZ4KLDHZGUHIDUEHIXNMTOQGU5MKRJ4TLWWLWXKNNIFGZBABATDYM",
        //     appIndex: 62368684,
        //     note: arr
        // });

        // const myAlgoConnect = new MyAlgoConnect();
        // const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
        // const response = await algodClient.sendRawTransaction(signedTxn.blob).do();





        let sender = algoAdd;
        let recipient = sender;
        // We set revocationTarget to undefined as 
        // This is not a clawback operation
        let revocationTarget = undefined;
        // CloseReaminerTo is set to undefined as
        // we are not closing out an asset
        let closeRemainderTo = undefined;
        // We are sending 0 assets
        let amount = 0;
        let assetID = asset_id;
        // signing and sending "txn" allows sender to begin accepting asset specified by creator and index
        let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
            sender,
            recipient,
            closeRemainderTo,
            revocationTarget,
            amount,
            note,
            assetID,
            params);



        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();

        console.log(response);
        //setItem1(true);
        setTimeout(() => {
            //setPopUp(false);
            borrow(asset_id);
        }, 2000);
        console.log(response)

        // // Must be signed by the account wishing to opt in to the asset    
        // let rawSignedTxn = opttxn.signTxn(note);
        // let opttx = (await algodclient.sendRawTransaction(rawSignedTxn).do());
        // // Wait for confirmation
        // confirmedTxn = await algosdk.waitForConfirmation(algodclient, opttx.txId, 4);
        // //Get the completed Transaction
        // console.log("Transaction " + opttx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);

        // //You should now see the new asset listed in the account information
        // console.log("Account 3 = " + recoveredAccount3.addr);
        // await printAssetHolding(algodclient, recoveredAccount3.addr, assetID);

    }
    const borrow = async (asset_id) => {
        console.log(nftDetails.nftId);
        console.log(nft_price);
        console.log(asset_id);
        const appId = 100305128;
        console.log(asset_id, appId);
        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();
        const creator = algoAdd;
        const escrowAddress = await getApplicationAddress(appId);
        const borrow = new Uint8Array(Buffer.from('borrow', 'utf8'));

        const totalAmount = bigIntToBytes(borrow_Amount, 8)
        const nftPrice = bigIntToBytes(nft_price, 8)






        const txn1 = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
            from: algoAdd,
            suggestedParams: suggested_params,
            assetIndex: asset_id,
            manager: undefined,
            reserve: undefined,
            freeze: undefined,

            clawback: escrowAddress,
            strictEmptyAddressChecking: false
        })

        const txn2 = algosdk.makeApplicationCallTxnFromObject({
            from: creator,
            appIndex: appId,
            onComplete: 0,
            appArgs: [borrow, totalAmount, nftPrice],
            suggestedParams: suggested_params

        })

        const txns = [txn1, txn2];

        const groupID = algosdk.assignGroupID(txns)



        const myAlgoConnect = new MyAlgoConnect();

        const signedTxn = await myAlgoConnect.signTransaction(txns.map(txn => txn.toByte()));

        const response = await algodClient.sendRawTransaction([signedTxn[0].blob, signedTxn[1].blob]).do();

        await addDoc(nftBorrowtRef, { amount: borrow_Amount, account: algoAdd, app_id: appId, time: Timestamp.now() });

        console.log(response);

        const userDoc = doc(db, "nfts", nftDetails.nftId);
        await updateDoc(userDoc, { borrow: true });

        setItem2(true);
        modal2.onOpen();
        setTimeout(() => {
            //setPopUp(false);
            modal2.onClose();
        }, 6000);
        setTimeout(() => {
            //setPopUp(false);
            navigate('/dashboard');
        }, 2000);
    }

    return (
        <>
            <Flex flexDir="column" width="100%">
                <Steps activeStep={activeStep}>
                    {steps.map(({ label, component }, index) => (
                        <Step label={label} key={label}>
                            {/* <FirstSlide index={index} /> */}
                            {component}
                        </Step>
                    ))}
                </Steps>
                {activeStep === steps.length ? (
                    <Flex px={4} py={4} width="100%" flexDirection="column">
                        <Heading fontSize="xl" textAlign="center">
                            Woohoo! All steps completed!
                        </Heading>
                        <Flex width="100%" justify="space-between" py="20px">
                            <Button
                                isDisabled={activeStep === 0}
                                mr={4}
                                size="md"
                                variant="ghost"
                                width="50%"
                                bgColor="rgb(111,170,107)"
                                color="whiteAlpha.900"
                                _hover={{ bgColor: "rgb(111,160,100)" }}
                                onClick={reset}
                            >
                                Reset
                            </Button>
                            <Button
                                isDisabled={activeStep === 0}
                                mr={4}
                                size="md"
                                variant="ghost"
                                width="50%"
                                bgColor="rgb(111,170,107)"
                                color="whiteAlpha.900"
                                _hover={{ bgColor: "rgb(111,160,100)" }}
                                onClick={handleBorrow}
                            >
                                Borrow
                            </Button>
                        </Flex>
                    </Flex>



                ) : (
                    <Flex width="100%" justify="space-between">
                        <Button
                            isDisabled={activeStep === 0}
                            mr={4}
                            onClick={prevStep}
                            size="md"
                            variant="ghost"
                            width="50%"
                            bgColor="rgb(111,170,107)"
                            color="whiteAlpha.900"
                            _hover={{ bgColor: "rgb(111,160,100)" }}
                        >
                            Prev
                        </Button>
                        {checkbox ? <Button size="md" onClick={activeStep === steps.length ? handleBorrow : nextStep} width="50%" bgColor="rgb(111,170,107)" color="whiteAlpha.900" _hover={{ bgColor: "rgb(111,160,100)" }} >
                            {activeStep === steps.length - 1 ? "Next" : "Next"}
                        </Button>
                            :

                            <Button size="md" onClick={nextStep} width="50%" bgColor="rgb(111,170,107)" color="whiteAlpha.900" _hover={{ bgColor: "rgb(111,160,100)" }} disabled={true}>
                                {activeStep === steps.length - 1 ? "Next" : "Next"}
                            </Button>

                        }

                    </Flex>
                )}
            </Flex>

            {/* ==================successful Borrow offer modal start=================== */}
            <Modal isOpen={modal2.isOpen} onClose={modal2.onClose} isCentered>
                <ModalOverlay />
                <ModalContent width="340px" height="200px">
                    <ModalCloseButton />

                    <ModalBody borderRadius="15px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" >
                        <Center>
                            <VStack alignItems="center" justifyContent="space-between" py="20%">
                                <Text color="gray.800">Congratulations!!</Text>
                                <Text color="gray.800">You successfully made the BORROW OFFER.</Text>
                            </VStack>
                        </Center>

                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* ==================successful Borrow offer modal ends=================== */}
        </>
    )
}

export default FirstComponent