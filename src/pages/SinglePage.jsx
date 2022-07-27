import { Alert, AlertIcon, Box, Button, Center, Container, Divider, Flex, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Select, Stack, Switch, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { IoIosMenu, IoIosHeartEmpty, IoIosShareAlt, IoMdRefresh, IoIosEye, IoIosWallet, IoIosSend } from "react-icons/io";
import image1 from '../components/images/Series1.jpg';
import algoCoin from '../components/images/algoCoin.png';
import { IoIosPulse, IoMdArrowDropdown, IoMdPricetag, IoIosList, IoIosStats, IoIosCube, IoIosCreate, IoIosExpand } from "react-icons/io";
import DesktopNav from '../components/layout/Navbar/DesktopNav/DesktopNav';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import axios from 'axios';
import algosdk, { bigIntToBytes, decodeAddress, getApplicationAddress } from 'algosdk';
import { useNavigate } from 'react-router-dom';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query, where,
    update
} from "firebase/firestore";


import { db } from '../components/firebase/FirebaseConfig';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import DatePicker from "react-datepicker";
import { setMinutes, setHours } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

function SinglePage(props) {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state);
    const [AppId, setAppId] = useState();
    const [openBox, setOpenBox] = useState(false);
    const [listing, setListing] = useState(false);
    const [offer, setOffer] = useState(false);
    const [Properties, setProperties] = useState(false);
    const [about, setAbout] = useState(false);
    const [details, setDetails] = useState(false);
    const [ItemActivity, setItemActivity] = useState(false);
    const [MoreInfo, setMoreInfo] = useState(false);
    const algoAdd = useSelector(state => state.token.myAlgoAddress);
    const algoBalance = useSelector(state => state.token.myAlgoBalance);
    const walletAddress = useSelector(state => state.token.walletConnectAddress);
    const walletAmount = useSelector(state => state.token.walletConnectBalance);
    const walletConnectStatus = useSelector(state => state.token.walletConnectStatus);
    const [appIdForAuction, setAppIDForAuction] = useState();
    const bgColor = useColorModeValue("rgb(230, 253, 255)", "blackAlpha.200");
    const nftCollectionRef = collection(db, "nfts");
    const [buyError, setBuyError] = useState(false);
    const [priceHistoey, setPriceHistory] = useState(false);
    const [Listing, setListingSIngle] = useState(false);
    const [offers, setOffers] = useState(false);
    const [propertiesItem, setPropertiesItems] = useState(false);
    const [aboutUsItem, setAboutUsItem] = useState(false);
    const [detailsItem, setDetailItem] = useState(false);
    const [moreItem, setMoreItem] = useState(false);
    const [biddingCoin, setBiddingCoin] = useState();
    const [biddingAmount, setBiddingAmount] = useState();
    const [borrowAmount, setBorrowAmount] = useState();
    const [item1, setItem1] = useState(false);
    const [item2, setItem2] = useState(false);
    const [item3, setItem3] = useState(false);
    const [item4, setItem4] = useState(false);
    //const nftAuctionRef = collection(db, "auctionInfo");
    //========= get Auction address=============
    const [auction_Address, setAuctionAddress] = useState([]);
    const nftAuctionAddressRef = collection(db, "auctions");
    const nftBorrowRef = collection(db, "borrow");
    const [nftDetails, setNftDetails] = useState();
    // const auctionAddress = async () => {
    //     const data = await getDocs(nftAuctionAddressRef);
    //     setAuctionAddress(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // };
    console.log(auction_Address);
    //========= get Auction address end=============

    //======== get close bidd info =================
    const [closeAuctionInfo, setCloseAuctionInfo] = useState([]);
    const [checkOwner, setCheckOwner] = useState(false);
    const [gotOwner, setGotOwner] = useState(false);
    const nftCloseAuctionRef = collection(db, "closeAuction");
    console.log(closeAuctionInfo);
    const nftAssetID = location.state.nft ? location.state.assetID : location.state.data.assetID;
    const nftAuction = closeAuctionInfo.filter((data) => data.assetID === nftAssetID);
    //console.log(nftAuction);
    let allAuctionData = [];
    nftAuction.forEach(function (add) {
        allAuctionData.push(add);
    })
    console.log(nftAuction);

    //let buyingUser = [];
    // if (checkOwner) {
    //     const buyingUser = closeAuctionInfo.filter((data) => data.assetID === location.state.data.assetID && data.buyer_address === algoAdd);
    //     const address = buyingUser[].buyer_address;
    //     console.log(buyingUser);
    //     console.log(address);
    //     if (address === algoAdd) {
    //         setGotOwner(true)
    //         setCheckOwner(false);

    //     }
    //     console.log(checkOwner);
    //     console.log(gotOwner);
    // }






    //======== get close bidd info end =============

    const { isOpen, onOpen, onClose } = useDisclosure();
    const modal2 = useDisclosure();
    const modal3 = useDisclosure();
    const modal4 = useDisclosure();
    const modal5 = useDisclosure();
    const modal6 = useDisclosure();
    const modal7 = useDisclosure();
    const modal8 = useDisclosure();
    const modal9 = useDisclosure();
    const modal10 = useDisclosure();
    const modal11 = useDisclosure();
    const modal12 = useDisclosure();
    const modal13 = useDisclosure();
    //const [successfullBuyMessage, setSuccessfullBuyMessage] = useState(false);
    const [bidOption, setBidOption] = useState();
    const [coin, setCoin] = useState();
    const [reserveCoin, setReserveCoin] = useState();
    const [amount, setAmount] = useState();
    const [reserveAmount, setReserveAmount] = useState();
    const [auctionClose, setAuctionClose] = useState(false);
    const [closeSuccessful, setCloseSuccessful] = useState(false);
    const handleBox = () => {
        setOpenBox(!openBox);
    }
    const handleListing = () => {
        setListing(!listing);
    }
    const handleOffer = () => {
        setOffer(!offer);
    }
    const handleProperties = () => {
        setProperties(!Properties);
    }
    const handleAbout = () => {
        setAbout(!about);
    }
    const handleDetail = () => {
        setDetails(!details);
    }
    const handleItemActivity = () => {
        setItemActivity(!ItemActivity);
    }
    const handleMoreInfo = () => {
        setMoreInfo(!MoreInfo);
    }
    const handleAuctionModal = () => {
        onClose();
        modal2.onOpen();
    }
    // ===================== get NFT from firebase===================

    const [nfts, setNfts] = useState([]);
    console.log(nfts);

    useEffect(() => {
        const getNfts = async () => {

            const q = query(collection(db, "nfts"));
            const data = await getDocs(q);

            const q2 = query(collection(db, "nfts"), where("assetID", "==", nftAssetID));

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

        const auctionAddress = async () => {
            const data = await getDocs(nftAuctionAddressRef);
            setAuctionAddress(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        auctionAddress();


        const closeAuctionDetail = async () => {
            const data = await getDocs(nftCloseAuctionRef);
            setCloseAuctionInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        closeAuctionDetail();

    }, []);

    console.log(nftDetails);
    console.log(auction_Address);

    const handleDownloadAsset = (e) => {
        e.preventDefault();
        console.log("Clicked");
        console.log(nftDetails.nftDetails.other_file);
        window.open(nftDetails.nftDetails.other_file, "_blank", "sample")

        // window.location.href = nftDetails.other_file;

    }

    // ==============================get NFT from firebase ends here===============

    //============= check for duplicate buying ===================
    const checkForCloseAuction = closeAuctionInfo.filter((data) => data.buyer_address === algoAdd && data.auctionType === "buy");

    const checkUserforBuyingNFTAgain = checkForCloseAuction.find(user => user.buyer_address === algoAdd);

    //============= check for duplicate buying ends here===========

    // //===== checking if the user bought this NFT or not
    let buyingUser = auction_Address.filter((data) => data.assetID === nftAssetID && data.bidder_address === algoAdd);
    const getResult = buyingUser.find(fruit => fruit.bidder_address === algoAdd);

    //console.log(result);
    //===== checking if the user bought this NFT or not

    //========= check for close NFT functionality===========
    const checkCloseAuction = nfts.filter((data) => data.assetID === nftAssetID && data.type === "auction");
    const checkForCloseAuctionFunctionality = checkCloseAuction.find(userAuction => userAuction.type === "auction");

    //========= check for close NFT functionality ends here====

    // ===============check if the user made sell offer of this NFT ===================
    const checkSaleOffer = nfts.filter((data) => data.assetID === nftAssetID && data.type === "sale");
    const saleOfferForUser = checkSaleOffer.find(userType => userType.type === "sale");

    // ===============check if the user made sell offer of this NFT ends===================
    // pop up for sell & buy offer
    const [popup, setPopUp] = useState(false);
    const [init_escrow, setInit_escrow] = useState(false);
    const [escrow, setFund_scrow] = useState(false);
    const [sellOffer, setSellOffer] = useState(false);
    const [info, setInfo] = useState(false);
    const [opt, setOpt] = useState(false);
    const [buyOffer, setBuyOffer] = useState(false);
    const [complete, setComplete] = useState(false);
    const [auctionState, setAuctionState] = useState(false);

    //pop up for auction
    const [popupForAuction, setPopupAuction] = useState(false);
    const [auctionApp, setAuctionApp] = useState(false);
    const [completeAppSetup, setCompleteApp] = useState(false);
    const [bidOffer, setBidOffer] = useState(false);
    const [placeAuctionBid, setPlaceAuctionBid] = useState(false);
    const [successfulBid, setSuccessfulBid] = useState(false);
    const [switchbtn, setSwitchBtn] = useState(false);

    const handleSwich = (e) => {

        setSwitchBtn(!switchbtn);
    }
    //============= Auction date & Time selection ==========================
    const [selected, setSelected] = useState(new Date());
    const [selected2, setSelected2] = useState(new Date());
    const [start_Time, setStartTime] = useState();
    const [end_Time, setEndTime] = useState();
    const convert = (str) => {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2),
            hour = date.getHours();
        var m_date = [date.getFullYear(), mnth, day].join("-");
        var m_time = [hour, "00", "00"].join(":");
        var td = m_date + " " + m_time;
        return td;
    };
    const [now, setNow] = useState(new Date());
    const [future, setFuture] = useState(new Date("2030-12-31"));
    const dateChange = (e) => {
        var date = convert(e);
        setStartTime(date);

        setSelected(e);
        //setData({ ...data, date: date });
    };

    const dateChange1 = (e) => {
        var date = convert(e);
        setEndTime(date);

        setSelected2(e);
        //setData({ ...data, date: date });
    };


    //============= Auction date & Time selection end ==========================

    //====================================functions for auction starts from here===============================
    const handleAuction = () => {
        console.log(location.state);
        onClose();
        modal2.onClose();
        //const this_nft = nfts.filter((data) => data.assetID === location.state.assetID);
        // const firebaseId = location.state.nft ? this_nft.id : location.state.data.id;
        //const this_nft = nfts.filter((data) => data.assetID === location.state.assetID || location.state.data.assetID );
        const firebaseId = location.state.nft ? location.state.id : location.state.data.id || location.state.data.item.id;
        console.log(firebaseId);

        //const app_id = location.state.data.appID;
        //console.log(app_id)
        const asset_id = location.state.nft ? location.state.assetID : location.state.data.assetID;

        modal7.onOpen();
        // setTimeout(() => {
        //     modal7.onClose();
        // }, 3000);

        setTimeout(() => {
            createAuctionApp(asset_id, firebaseId);
        }, 2000);


    }
    const createAuctionApp = async (asset_id, firebaseId) => {

        let approval_program_compiled = undefined
        let clear_program_compiled = undefined
        let numLocalByteSlices = undefined
        let numGlobalInts = undefined
        let numGlobalByteSlices = undefined
        let numLocalInts = undefined
        const creator = algoAdd;

        console.log("User is creating an auction that lasts 30 seconds to auction off the NFT...")

        await axios(`http://127.0.0.1:12000/swap/auctionProgram`)
            .then(response => {


                if (response.status === 200) {

                    let data = response.data;
                    approval_program_compiled = data.approval_program_compiled
                    clear_program_compiled = data.clear_program_compiled
                    numLocalInts = data.local_schema.num_uints
                    numLocalByteSlices = data.local_schema.num_byte_slices
                    numGlobalInts = data.global_schema.num_byte_slices
                    numGlobalByteSlices = data.global_schema.num_uints


                    // console.log(data)
                }


            })
            .catch(error => {
                console.error("Error fatching data", error);

            })

        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();


        const approvalcompiledProgram = await algodClient.compile(approval_program_compiled).do();
        const clearcompiledProgram = await algodClient.compile(clear_program_compiled).do();



        const approvalProgramBytes = new Uint8Array(
            Buffer.from(approvalcompiledProgram.result, 'base64')
        );

        const clearlProgramBytes = new Uint8Array(
            Buffer.from(clearcompiledProgram.result, 'base64')
        );
        let start = Math.round((new Date(start_Time)).getTime() / 1000);
        console.log("=========start time=========")
        console.log(start);
        //let end = start + 300;
        let end = Math.round((new Date(end_Time)).getTime() / 1000);

        console.log(end);
        let startTime = bigIntToBytes(1655178702, 8)
        let endTime = bigIntToBytes(1655178822, 8)
        let reserve = bigIntToBytes(1000000, 8)
        let increment = bigIntToBytes(100000, 8)
        let nft = bigIntToBytes(asset_id, 8)

        // var length = nft.length;

        // let buffer = Buffer.from(nft);
        // var result = buffer.readUIntBE(0, length);




        let sellerAddress = decodeAddress(creator)
        let txn = algosdk.makeApplicationCreateTxnFromObject({
            from: creator,
            suggestedParams: suggested_params,
            approvalProgram: approvalProgramBytes,
            clearProgram: clearlProgramBytes,
            numLocalInts: numLocalInts,
            numLocalByteSlices: numLocalByteSlices,
            numGlobalInts: numGlobalInts,
            numGlobalByteSlices: numGlobalByteSlices,
            appArgs: [sellerAddress.publicKey, nft, startTime, endTime, reserve, increment],

            onComplete: 0
        })


        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());

        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();

        console.log("==================initializing setupAuctionApp==============");
        const ptx = await algosdk.waitForConfirmation(algodClient, response.txId, 4);
        // console.log(ptx);
        let appID = ptx["application-index"];
        console.log("=====AppID===");
        console.log(appID);
        setAppIDForAuction(appID);
        console.log(nftDetails.nftId);

        //================================= update appId to firebase ======================================
        const userDoc = doc(db, "nfts", nftDetails.nftId);
        await updateDoc(userDoc, { appID: appID, type: "auction" });
        //================================= update appId to firebase ends here ======================================
        setAuctionApp(true);
        // modal7.onOpen();
        // setTimeout(() => {
        //     modal7.onClose();
        // }, 3000);

        setTimeout(() => {
            setupAuctionApp(appID, asset_id);
        }, 2000);

        console.log(response);
        console.log(
            "Done. The auction app has been created"
        )


    }


    const setupAuctionApp = async (app_id, asset_id) => {
        const creator = algoAdd;

        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();
        const setup = new Uint8Array(Buffer.from('setup', 'utf8'));

        const appAddr = getApplicationAddress(app_id);

        const min_bid_amount = algosdk.algosToMicroalgos(amount);
        console.log(min_bid_amount);

        console.log("User is setting up and funding NFT auction...")

        let fundAppTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: creator,
            to: appAddr,
            amount: (min_bid_amount + 100_000 + 3 * 1_000),
            //amount :1000000,
            suggestedParams: suggested_params

        })

        let setupTxn = algosdk.makeApplicationCallTxnFromObject({
            from: creator,

            appIndex: app_id,
            appArgs: [setup],
            foreignAssets: [asset_id],
            suggestedParams: suggested_params,
            onComplete: 0
        })

        let fundNftTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: creator,
            to: appAddr,
            assetIndex: asset_id,
            amount: 1,
            suggestedParams: suggested_params
        })


        const changeCred = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
            from: algoAdd,
            suggestedParams: suggested_params,
            assetIndex: asset_id,
            manager: appAddr,
            reserve: undefined,
            freeze: undefined,

            clawback: appAddr,
            strictEmptyAddressChecking: false
        })

        const txns = [fundAppTxn, setupTxn, fundNftTxn, changeCred];



        const groupID = algosdk.assignGroupID(txns)
        const myAlgoConnect = new MyAlgoConnect();


        const signedTxn = await myAlgoConnect.signTransaction(txns.map(txn => txn.toByte()));

        // console.log(signedTxn[0])
        // console.log(signedTxn[1])
        // console.log(signedTxn[2])

        // console.log("-------Sending tx from frontend to network-------");
        let response = (await algodClient.sendRawTransaction([signedTxn[0].blob, signedTxn[1].blob, signedTxn[2].blob, signedTxn[3].blob]).do());
        setCompleteApp(true);
        //modal7.onOpen();
        setTimeout(() => {
            modal7.onClose();
        }, 3000);

        setTimeout(() => {
            navigate("/marketplace");
        }, 2000);




        // console.log("-------Sending logisig tx to network-------");

        console.log(response)


        let accInfo = algodClient.accountInformation(creator);
        console.log("Users Balance is :")

        console.log(accInfo);
        //placeBid(app_id, asset_id);


    }
    //====================================functions for auction ends here======================================

    // =============================================placeBid function start from here==========================
    const handleBiddingProcedure = (e) => {
        e.preventDefault();
        modal9.onClose();
        console.log(biddingCoin);
        console.log(biddingAmount);
        handlePlaceBid();
    }

    const handlePlaceBid = () => {
        const asset_id = location.state.data.assetID;
        // const appID = appIdForAuction;
        const appID = location.state.data.appID;
        const buyer_address = location.state.data.address;
        // placeBid(appID, asset_id, buyer_address);
        modal6.onOpen();
        // setTimeout(() => {
        //     modal6.onClose();
        // }, 3000);

        setTimeout(() => {
            assetOptinForAuction(appID, asset_id, buyer_address);
        }, 2000);


    }



    //asset optin for auction
    const assetOptinForAuction = async (appId, assetId, buyer_address) => {
        console.log("=============Initialize asset-optin===================")
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
        let assetID = assetId;
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



        console.log("=============response from asset-optin===================");

        setPlaceAuctionBid(true);
        // modal6.onOpen();
        // setTimeout(() => {
        //     modal6.onClose();
        // }, 3000);

        setTimeout(() => {
            placeBid(appId, assetId, buyer_address);
        }, 2000);

        console.log(response);


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
    const placeBid = async (app_id, asset_id, seller_address) => {


        const creator = algoAdd;

        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();
        const bid = new Uint8Array(Buffer.from('bid', 'utf8'));

        const appAddr = getApplicationAddress(app_id);


        const prevBidLeader = [];

        console.log("Auction escrow balances:")
        console.log(algodClient.accountInformation(appAddr))

        console.log("User is opting into NFT with ID:" + asset_id)

        const bidAmount = algosdk.algosToMicroalgos(biddingAmount);
        console.log(bidAmount);
        // const bidAmount = 1_000_000
        let payTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: algoAdd,
            to: appAddr,
            amount: bidAmount,
            suggestedParams: suggested_params
        })

        let appCallTxn = algosdk.makeApplicationCallTxnFromObject({
            from: algoAdd,
            appIndex: app_id,
            onComplete: 0,
            appArgs: [bid],
            foreignAssets: [asset_id],
            accounts: [],
            suggestedParams: suggested_params

        })


        const txns = [payTxn, appCallTxn];



        const groupID = algosdk.assignGroupID(txns)






        const myAlgoConnect = new MyAlgoConnect();


        console.log("-------Sigining tx from frontend-------");
        const signedTxn = await myAlgoConnect.signTransaction(txns.map(txn => txn.toByte()));

        console.log(signedTxn[0])
        console.log(signedTxn[1])

        console.log("-------Sending tx from frontend to network-------");



        let response = (await algodClient.sendRawTransaction([signedTxn[0].blob, signedTxn[1].blob]).do());


        //// ===============storing address of bidder working here===================
        await addDoc(nftAuctionAddressRef, { app_id: app_id, assetID: asset_id, bidder_address: algoAdd, bidderAmount: bidAmount });
        //auctionAddress();
        console.log("-------Sending logisig tx to network-------");

        console.log(response)

        setSuccessfulBid(true);
        //modal6.onOpen();
        setTimeout(() => {
            modal6.onClose();
        }, 3000);

        modal10.onOpen();
        setTimeout(() => {
            modal10.onClose();
        }, 4000);

        setTimeout(() => {
            navigate("/marketplace");
        }, 2000);

        console.log("Bid placed successfully");
        //assetOptin(app_id, asset_id, algoAdd);



    }
    // =============================================placeBid function ends here===============================

    //==================== function for close Auction starts from here===============================

    const handleCloseAuction = () => {
        const asset_id = location.state.data.assetID;
        //const appID = appIdForAuction;
        const appID = location.state.data.appID;
        const firebaseID = location.state.data.id;
        modal5.onOpen();
        // setTimeout(() => {
        //     modal5.onClose();
        // }, 3000);

        setTimeout(() => {
            closeAuction(appID, asset_id, firebaseID);
        }, 2000);

    }
    const closeAuction = async (app_id, asset_id, firebaseID) => {
        console.log(firebaseID);


        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();

        const creator = algoAdd;
        const allBidders = auction_Address.filter((item) => item.app_id === app_id);
        console.log(allBidders);
        //console.log(allBidders[0].bidder_address);
        let address = [];
        address.push(creator);
        allBidders.forEach(function (add) {
            address.push(add.bidder_address);
        })

        const deleteTxn = algosdk.makeApplicationDeleteTxnFromObject({
            from: creator,
            appIndex: app_id,
            accounts: address,
            foreignAssets: [asset_id],
            suggestedParams: suggested_params
        })

        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(deleteTxn.toByte());
        const buyer_address = allBidders[0].bidder_address;
        console.log(buyer_address);
        //return 0;
        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();


        await address.forEach(async (account) => {
            console.log("I am inside close auction step 1")
            let accountInfo = await algodClient.accountInformation(account).do();

            for (let idx = 0; idx < accountInfo['assets'].length; idx++) {
                console.log("I am inside close auction step 2")

                console.log(accountInfo)
                let scrutinizedAsset = accountInfo['assets'][idx];
                console.log(scrutinizedAsset['asset-id'])
                console.log(asset_id)
                console.log(scrutinizedAsset.amount)
                if (scrutinizedAsset['asset-id'] == asset_id) {
                    // let myassetholding = JSON.stringify(scrutinizedAsset, undefined, 2);
                    // console.log("assetholdinginfo = " + scrutinizedAsset.amount);
                    //if (scrutinizedAsset.amount > 0) {
                    console.log("account :" + account);

                    // ====== sending close-auction info to firebase ====================
                    addDoc(nftCloseAuctionRef, { owner_address: account, appID: app_id, assetID: asset_id, buyer_address: account, auctionType: 'sold' });

                    const userDoc = doc(db, "nfts", nftDetails.nftId);
                    updateDoc(userDoc, { sell_status: false, owner_address: account, address: account, type: "" });


                    console.log("I am inside close auction")
                    break;
                    // }

                }
            }

        });






        setCloseSuccessful(true);
        modal5.onOpen();
        setTimeout(() => {
            modal5.onClose();
        }, 3000);

        setTimeout(() => {
            navigate("/marketplace");
        }, 2000);
        console.log("================ bid close successfully =========================");
        console.log(response);


    }

    //==================== function for close Auction ends here===============================
    //=======================functions for auction ends here=================================


    //====================================functions for buy NFT starts from here=============
    const handleBuyOption = () => {
        const app_id = location.state.data.appID;
        const asset_id = location.state.data.assetID;
        const buyer_address = location.state.data.address;
        const price = location.state.data.price;
        const name = location.state.data.name;
        const image = location.state.data.url;
        console.log(price);
        //setOpt(true);
        modal4.onOpen();
        // setTimeout(() => {
        //     //setPopUp(false);
        //     modal4.onClose();
        // }, 3000);


        setTimeout(() => {
            assetOptin(app_id, asset_id, buyer_address, price, name, image);
        }, 2000);

    }
    //asset optin for buying
    const assetOptin = async (appId, assetId, buyer_address, price, name, image) => {
        console.log("=============Initialize asset-optin===================")
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
        let assetID = assetId;
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
        setBuyOffer(true);
        // modal4.onOpen();
        // setTimeout(() => {
        //     modal4.onClose();
        // }, 3000);

        setTimeout(() => {
            buy_nft(appId, assetId, buyer_address, price, name, image);
        }, 2000);


        console.log("=============response from asset-optin===================")
        console.log(response);


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



    // buying function
    const buy_nft = async (appId, assetId, buyer_address, price, name, image) => {
        try {
            const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
            const suggested_params = await algodClient.getTransactionParams().do();
            const sender = algoAdd;
            const buy = new Uint8Array(Buffer.from('buy', 'utf8'));
            const escrowAddress = await escrow_address(appId, assetId);
            const nftPrice = algosdk.algosToMicroalgos(price);
            console.log("===========nft price in microAlgo");
            console.log(nftPrice);
            console.log("=========escrow address=======");
            console.log(escrowAddress);

            let lsig = new algosdk.LogicSigAccount(escrowAddress)


            const txn1 = algosdk.makeApplicationCallTxnFromObject({
                from: sender,
                suggestedParams: suggested_params,
                appIndex: appId,
                appArgs: [buy],
                foreignAssets: undefined,
                onComplete: 0
            })

            const txn2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
                from: sender,
                suggestedParams: suggested_params,
                to: buyer_address,
                amount: nftPrice
            })



            const txn3 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: lsig.address(),
                suggestedParams: suggested_params,
                to: sender,
                amount: 1,
                // revocationTarget: "XQUXRUK2XUNJDT22J5BKYUADZHRWE5K5R5M23SNYINHPUYXCE42V3OO27I",
                revocationTarget: buyer_address,
                assetIndex: assetId,

            });

            const txn4 = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
                from: lsig.address(),
                suggestedParams: suggested_params,
                assetIndex: assetId,
                manager: sender,
                reserve: undefined,
                freeze: undefined,

                clawback: sender,
                strictEmptyAddressChecking: false
            })





            const txns = [txn1, txn2, txn3, txn4];



            const groupID = algosdk.assignGroupID(txns)

            let sign2 = algosdk.signLogicSigTransactionObject(txn3, lsig);
            let sign3 = algosdk.signLogicSigTransactionObject(txn4, lsig);








            const myAlgoConnect = new MyAlgoConnect();
            let txns2 = [txn1, txn2]

            console.log("-------Sigining tx from frontend-------");
            const signedTxn = await myAlgoConnect.signTransaction(txns2.map(txn => txn.toByte()));

            console.log(signedTxn[0])
            console.log(signedTxn[1])

            console.log("-------Sending tx from frontend to network-------");



            let response = (await algodClient.sendRawTransaction([signedTxn[0].blob, signedTxn[1].blob, sign2.blob, sign3.blob]).do());
            // ============ sending buy NFT information to firebase ===========================
            await addDoc(nftCloseAuctionRef, { owner_address: buyer_address, appID: appId, assetID: assetId, buyer_address: algoAdd, auctionType: 'buy', price: price, name: name, image: image });
            // ============ sending buy NFT information to firebase ends here=================
            const userDoc = doc(db, "nfts", nftDetails.nftId);
            updateDoc(userDoc, { sell_status: false, owner_address: algoAdd, address: algoAdd });

            setComplete(true);
            // modal4.onOpen();
            setTimeout(() => {
                modal4.onClose();
            }, 5000);
            modal8.onOpen();
            setTimeout(() => {
                modal8.onClose();
            }, 4000);
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);


            console.log("-------Sending logisig tx to network-------");

            console.log(response)

        }
        catch (err) {
            console.log("Not enough Fund");
            setBuyError(true);
            setTimeout(() => {
                setBuyError(false);
            }, 3000);
        }

    }

    //====================================functions for buy NFT ends here===================

    // =============================================Sell NFT functions start from here==========================
    const handleSaleOption = () => {
        //call change_nft_credentials_txn function
        onClose();
        modal3.onOpen();
        console.log("===========calling change_nft_credentials_txn function===============");
        //const app_id = location.state.data.appID;
        const this_nft = nfts.filter((data) => data.assetID === location.state.assetID);
        console.log(this_nft);
        //console.log(this_nft[0].id);
        const asset_id = location.state.nft ? location.state.assetID : location.state.data.assetID;
        const firebaseId = location.state.nft ? this_nft[0].id : location.state.data.id;
        console.log(asset_id);
        console.log(firebaseId);
        //console.log("firebaseID: " + firebaseId);

        // ;        // popup toggle
        // console.log(asset_id);
        // console.log(firebaseId);
        // return 0;
        // setTimeout(() => {
        //     //setPopUp(false);
        //     modal3.onClose();
        // }, 3000);

        setTimeout(() => {
            app_initialization(asset_id, firebaseId);
          
            //change_nft_credentials_txn(app_id, asset_id);


        }, 2000);


    }
    const app_initialization = async (asset_id, firebaseId) => {
        console.log(asset_id);
        console.log(firebaseId);
        let approval_program_compiled = undefined
        let clear_program_compiled = undefined
        let numLocalByteSlices = undefined
        let numGlobalInts = undefined
        let numGlobalByteSlices = undefined
        let numLocalInts = undefined
        const creator = algoAdd;


        await axios(`http://127.0.0.1:12000/swap/marketplace`)
            .then(response => {


                if (response.status === 200) {

                    let data = response.data;
                    approval_program_compiled = data.approval_program_compiled
                    clear_program_compiled = data.clear_program_compiled
                    numLocalInts = data.local_schema.num_uints
                    numLocalByteSlices = data.local_schema.num_byte_slices
                    numGlobalInts = data.global_schema.num_byte_slices
                    numGlobalByteSlices = data.global_schema.num_uints


                    console.log(data)
                }


            })
            .catch(error => {
                console.error("Error fatching data", error);

            })

        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();


        const approvalcompiledProgram = await algodClient.compile(approval_program_compiled).do();
        const clearcompiledProgram = await algodClient.compile(clear_program_compiled).do();



        const approvalProgramBytes = new Uint8Array(
            Buffer.from(approvalcompiledProgram.result, 'base64')
        );

        const clearlProgramBytes = new Uint8Array(
            Buffer.from(clearcompiledProgram.result, 'base64')
        );

        // let ownerAddresss = new Uint8Array(Buffer.from(creator, 'base64'))
        // let adminAddress  = new Uint8Array(Buffer.from(creator, 'base64'))
        let ownerAddresss = decodeAddress(creator)
        console.log(ownerAddresss)

        let txn = algosdk.makeApplicationCreateTxnFromObject({
            from: creator,
            suggestedParams: suggested_params,
            approvalProgram: approvalProgramBytes,
            clearProgram: clearlProgramBytes,
            numLocalInts: numLocalInts,
            numLocalByteSlices: numLocalByteSlices,
            numGlobalInts: numGlobalInts,
            numGlobalByteSlices: numGlobalByteSlices,
            appArgs: [ownerAddresss.publicKey, ownerAddresss.publicKey],
            foreignAssets: [asset_id],
            onComplete: 0
        })


        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());

        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();

        console.log(response);
        let appID = null;
        const ptx = await algosdk.waitForConfirmation(algodClient, response.txId, 4);
        // console.log(ptx);
        appID = ptx["application-index"];
        setAppId(appID);
        //escrow address function 

        console.log("------------initialize app--------------")
        console.log(appID);
        const userDoc = doc(db, "nfts", firebaseId);
        await updateDoc(userDoc, { appID: appID, type: "sale" });

        //////////////////////////////////////////////////////////////
        setPopUp(true);
        // modal3.onOpen();
        // setTimeout(() => {
        //     //setPopUp(false);
        //     modal3.onClose();
        // }, 3000);
        setTimeout(() => {
            //setPopUp(false);
          //  change_nft_credentials_txn(appID, asset_id);

            groupedTransaction(appID, asset_id);
        }, 2000);


    }

    const change_nft_credentials_txn = async (appID, assetID) => {

        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();

        const creator = algoAdd;

        const escrowAddress = await escrow_address(appID, assetID);

        let lsig = new algosdk.LogicSigAccount(escrowAddress)
        console.log(lsig.address())

        console.log("-----------changing NFT Credentials---------------")


        const txn = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
            from: algoAdd,
            suggestedParams: suggested_params,
            assetIndex: assetID,
            manager: lsig.address(),
            reserve: undefined,
            freeze: undefined,

            clawback: lsig.address(),
            strictEmptyAddressChecking: false
        })



        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());

        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
        console.log("-----------response from changing NFT Credentials---------------")
        console.log(response);

        setInit_escrow(true);

        setTimeout(() => {
            initialize_escrow(appID, assetID);
        }, 2000);


    }
    const initialize_escrow = async (appID, assetId) => {

        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();

        const creator = algoAdd;
        console.log("-----------Initializaing ESCROW---------------")
        const escrowAddress = await escrow_address(appID, assetId);

        let lsig = new algosdk.LogicSigAccount(escrowAddress)
        let finalAddress = decodeAddress(lsig.address())




        const initializeEscrow = new Uint8Array(Buffer.from('1', 'utf8'));

        const txn = algosdk.makeApplicationCallTxnFromObject({
            from: algoAdd,
            suggestedParams: suggested_params,
            appIndex: appID,
            appArgs: [initializeEscrow, finalAddress.publicKey],
            foreignAssets: [assetId],
            onComplete: 0


        })

        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());
        console.log("----------- response from Initializaing ESCROW---------------");
        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();

        console.log(response);
        setFund_scrow(true);
        // modal3.onOpen()
        // setTimeout(() => {
        //     modal3.onClose();
        // }, 3000);

        setTimeout(() => {
            fund_escrow(appID, assetId);
        }, 2000);

    }

    //calling fund_escrow function
    const fund_escrow = async (appID, assetId) => {
        console.log("==================== func escrow function starts================");
        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();
        const escrowAddress = await escrow_address(appID, assetId);

        let lsig = new algosdk.LogicSigAccount(escrowAddress)
        console.log(lsig.address())

        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: algoAdd,
            suggestedParams: suggested_params,
            to: lsig.address(),
            amount: 4000000
        })

        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());

        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
        console.log("==================== response from fund escrow ================");
        console.log(response);

        setSellOffer(true);
        // modal3.onOpen()
        // setTimeout(() => {
        //     modal3.onClose();
        // }, 3000);


        setTimeout(() => {
            sell_offer(appID, assetId);
        }, 2000);



    }

    //calling sell_offer function
    const sell_offer = async (appID, assetId) => {
        console.log("==================== sell offer function start ================");
        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();

        const creator = algoAdd;

        // const escrowAddress = await escrow_address(94243116);
        const makeSellOffer = new Uint8Array(Buffer.from('makeSellOffer', 'utf8'));
        const sell_price = new Uint8Array(1);
        sell_price[0] = 10

        const txn = algosdk.makeApplicationCallTxnFromObject({
            from: algoAdd,
            suggestedParams: suggested_params,
            appIndex: appID,
            appArgs: [makeSellOffer, sell_price],
            foreignAssets: [assetId]

        })


        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());

        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
        console.log("==================== response from sell offer ================");
        console.log(response);
        setInfo(true);

        //modal3.onOpen();
        setTimeout(() => {
            modal3.onClose();
        }, 3000);

        const userDoc = doc(db, "nfts", nftDetails.nftId);
        updateDoc(userDoc, { sell_status: true });


        setTimeout(() => {
            navigate("/marketplace");
        }, 2000);


        // txn = algo_txn.ApplicationCallTxn(sender=caller_address,
        //     sp=suggested_params,
        //     index=app_id,
        //     app_args=app_args,
        //     foreign_assets=foreign_assets,
        //     on_complete=on_complete)

    }
    // =============================================Sell NFT functions end here==========================


    const escrow_address = async (appID, assetId) => {

        //  const escrow_address = getApplicationAddress(app_id)
        //  return escrow_address

        // let app_id = 93977532
        // let nft_id = nft_id
        let escrow_fund_program_compiled = undefined
        let escrow_address = undefined
        await axios(`http://127.0.0.1:12000/swap/escrow_program?app_id=` + appID + `&nft_id=` + assetId)
            .then(response => {


                if (response.status === 200) {

                    let data = response.data;

                    escrow_fund_program_compiled = data.escrow_fund_program_compiled
                    escrow_address = data.escrow_address
                    console.log(escrow_fund_program_compiled)

                }


            })
            .catch(error => {
                console.error("Error fatching data", error);

            })

        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');

        const escrowlcompiledProgram = await algodClient.compile(escrow_fund_program_compiled).do();



        const escrowProgramBytes = new Uint8Array(
            Buffer.from(escrowlcompiledProgram.result, 'base64')
        );

        console.log(escrowProgramBytes);

        return escrowProgramBytes;
        //declare fund_escrow function

    }

    const res = algoAdd.substring(0, 8);
    const lastFive = algoAdd.substr(algoAdd.length - 8);


    const printAssetHolding = async (accounts, assetid) => {
        // note: if you have an indexer instance available it is easier to just search accounts for an asset

        const algodClient = await new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();
        // const accounts = ["XQUXRUK2XUNJDT22J5BKYUADZHRWE5K5R5M23SNYINHPUYXCE42V3OO27I","RRO7OHROIWSOA7YXJBACWXOTCG4BWX3XLNSJLTJUSPRI5KHP3JXUTDM63Q","ZUHGIQOWQYBOUPRLFSYY6CBKN7GUFR4JIYHR3GMKZXZRUIKJGA5ZZOVHSY"];
        // const assetid = 99569009;


        await accounts.forEach(async (account) => {

            let accountInfo = await algodClient.accountInformation(account).do();

            for (let idx = 0; idx < accountInfo['assets'].length; idx++) {
                let scrutinizedAsset = accountInfo['assets'][idx];
                if (scrutinizedAsset['asset-id'] == assetid) {
                    // let myassetholding = JSON.stringify(scrutinizedAsset, undefined, 2);
                    // console.log("assetholdinginfo = " + scrutinizedAsset.amount);
                    if (scrutinizedAsset.amount > 0) {
                        console.log("account :" + account);
                        return account;
                        break;
                    }

                }
            }

        });

    };



    const groupedTransaction = async (app_id,asset_id) =>{

        let appID     = app_id;
        let assetID   = asset_id;
        const creator = algoAdd;

        const algodClient = await new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();
        

        
        const escrowAddress = await escrow_address(appID, assetID);

        let lsig = new algosdk.LogicSigAccount(escrowAddress)
        console.log(lsig.address())

        console.log("----------- I am inside changing NFT Credentials---------------")


        const txn2 = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
            from: algoAdd,
            suggestedParams: suggested_params,
            assetIndex: assetID,
            manager: lsig.address(),
            reserve: undefined,
            freeze: undefined,

            clawback: lsig.address(),
            strictEmptyAddressChecking: false
        })

        let finalAddress = decodeAddress(lsig.address())




        const initializeEscrow = new Uint8Array(Buffer.from('1', 'utf8'));

        const txn3 = algosdk.makeApplicationCallTxnFromObject({
            from: algoAdd,
            suggestedParams: suggested_params,
            appIndex: appID,
            appArgs: [initializeEscrow, finalAddress.publicKey],
            foreignAssets: [assetID],
            onComplete: 0


        })

  

        console.log("==================== func escrow function starts================");

        console.log(lsig.address())

        const txn4 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: algoAdd,
            suggestedParams: suggested_params,
            to: lsig.address(),
            amount: 4000000
        })

        console.log("==================== response from fund escrow ================");
       

        // const escrowAddress = await escrow_address(94243116);
        const makeSellOffer = new Uint8Array(Buffer.from('makeSellOffer', 'utf8'));
        const sell_price = new Uint8Array(1);
        sell_price[0] = 10

        const txn5 = algosdk.makeApplicationCallTxnFromObject({
            from: algoAdd,
            suggestedParams: suggested_params,
            appIndex: appID,
            appArgs: [makeSellOffer, sell_price],
            foreignAssets: [assetID]

        })

        const txns = [ txn2, txn3, txn4, txn5];

        const groupID = algosdk.assignGroupID(txns);
      
        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txns.map(txn => txn.toByte()));

        const response = await algodClient.sendRawTransaction([signedTxn[0].blob, signedTxn[1].blob , signedTxn[2].blob , signedTxn[3].blob] ).do();
        console.log("==================== response from sell offer ================");
        console.log(response);

        await setInit_escrow(true);
        await setFund_scrow(true);
        await setSellOffer(true);
        await setInfo(true);

        //modal3.onOpen();
        setTimeout(() => {
            modal3.onClose();
        }, 3000);

        const userDoc = doc(db, "nfts", nftDetails.nftId);
        updateDoc(userDoc, { sell_status: true });

        setTimeout(() => {
            navigate("/marketplace");
        }, 2000);

        // setInfo(true);

        // //modal3.onOpen();
        // setTimeout(() => {
        //     modal3.onClose();
        // }, 3000);

        // const userDoc = doc(db, "nfts", nftDetails.nftId);
        // updateDoc(userDoc, { sell_status: true });


        // setTimeout(() => {
        //     navigate("/marketplace");
        // }, 2000);


    }



    // ==================borrow offer functionality start from here ======================

    const handleBorrowOffer = (e) => {
        e.preventDefault();
        modal11.onClose();
        const asset_id = location.state.nft ? location.state.assetID : location.state.data.assetID;
        const price = location.state.nft ? location.state.price : location.state.data.price;
        const name = location.state.nft ? location.state.name : location.state.data.name;
        const image = location.state.nft ? location.state.url : location.state.data.url;
        modal12.onOpen();
        app_initialization_for_borrow(asset_id, name, price, image);
    }
    const app_initialization_for_borrow = async (asset_id, name, price, image) => {
        //console.log(asset_id, appId);
        let approval_program_compiled = undefined
        let clear_program_compiled = undefined
        let numLocalByteSlices = undefined
        let numGlobalInts = undefined
        let numGlobalByteSlices = undefined
        let numLocalInts = undefined
        const creator = algoAdd;


        await axios(`http://127.0.0.1:12000/swap/lendingProgram`)
            .then(response => {


                if (response.status === 200) {

                    let data = response.data;
                    approval_program_compiled = data.approval_program_compiled
                    clear_program_compiled = data.clear_program_compiled
                    numLocalInts = data.local_schema.num_uints
                    numLocalByteSlices = data.local_schema.num_byte_slices
                    numGlobalInts = data.global_schema.num_byte_slices
                    numGlobalByteSlices = data.global_schema.num_uints


                    // console.log(data)
                }


            })
            .catch(error => {
                console.error("Error fatching data", error);

            })

        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();


        const approvalcompiledProgram = await algodClient.compile(approval_program_compiled).do();
        const clearcompiledProgram = await algodClient.compile(clear_program_compiled).do();



        const approvalProgramBytes = new Uint8Array(
            Buffer.from(approvalcompiledProgram.result, 'base64')
        );

        const clearlProgramBytes = new Uint8Array(
            Buffer.from(clearcompiledProgram.result, 'base64')
        );

        // let ownerAddresss = new Uint8Array(Buffer.from(creator, 'base64'))
        // let adminAddress  = new Uint8Array(Buffer.from(creator, 'base64'))
        let ownerAddresss = decodeAddress(creator)
        // console.log(ownerAddresss)
        let division = bigIntToBytes(1, 8);

        let txn = algosdk.makeApplicationCreateTxnFromObject({
            from: creator,
            suggestedParams: suggested_params,
            approvalProgram: approvalProgramBytes,
            clearProgram: clearlProgramBytes,
            numLocalInts: numLocalInts,
            numLocalByteSlices: numLocalByteSlices,
            numGlobalInts: numGlobalInts,
            numGlobalByteSlices: numGlobalByteSlices,
            appArgs: [ownerAddresss.publicKey, ownerAddresss.publicKey, division],
            foreignAssets: [asset_id],

            onComplete: 0
        })


        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());

        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
        console.log(response);
        let appID = null;
        const ptx = await algosdk.waitForConfirmation(algodClient, response.txId, 4);
        console.log(ptx);
        appID = ptx["application-index"];
        console.log("===appID===")
        console.log(appID);
        await addDoc(nftBorrowRef, { app_id: appID, assetID: asset_id, name: name, price: price, url: image, ownerAddresss: algoAdd });
        setItem1(true);
        setTimeout(() => {
            //setPopUp(false);
            initialize_escrow_for_borrow(asset_id, appID);
        }, 2000);


    }
    const initialize_escrow_for_borrow = async (asset_id, appId) => {
        console.log(asset_id, appId);
        console.log("========= I aam in initialize escrow========")
        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();

        const creator = algoAdd;

        // const escrowAddress    = await escrow_address();

        const escrowAddress = await getApplicationAddress(appId);
        //console.log(escrowAddress);

        // const escrowProgramBytes = new Uint8Array(
        //     Buffer.from(escrowAddress, 'base64')
        // );

        // let lsig = new algosdk.LogicSigAccount(escrowProgramBytes)



        let finalAddress = decodeAddress(escrowAddress)


        const initializeEscrow = new Uint8Array(Buffer.from('initializeEscrow', 'utf8'));


        const txn = algosdk.makeApplicationCallTxnFromObject({
            from: algoAdd,
            suggestedParams: suggested_params,
            appIndex: appId,
            appArgs: [initializeEscrow, finalAddress.publicKey],
            // foreignAssets:[nft_id],
            onComplete: 0


        })

        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());

        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
        setItem2(true);
        setTimeout(() => {
            //setPopUp(false);
            fund_escrow_for_borrow(asset_id, appId);
        }, 2000);
        console.log(response);
    }

    const fund_escrow_for_borrow = async (asset_id, appId) => {
        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();



        const escrowAddress = await getApplicationAddress(appId);

        const diposit = new Uint8Array(Buffer.from('diposit', 'utf8'));
        const fund = bigIntToBytes(4000000, 8)



        // const escrowProgramBytes = new Uint8Array(
        //     Buffer.from(escrowAddress, 'base64')
        // );

        // let lsig = new algosdk.LogicSigAccount(escrowProgramBytes)





        const txn1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: algoAdd,
            suggestedParams: suggested_params,
            to: escrowAddress,
            amount: 4000000
        })



        const txn2 = algosdk.makeApplicationCallTxnFromObject({
            from: algoAdd,
            appIndex: appId,
            onComplete: 0,
            appArgs: [diposit, fund],
            suggestedParams: suggested_params,
            accounts: [escrowAddress]

        })

        const txns = [txn1, txn2];

        const groupID = algosdk.assignGroupID(txns)


        const myAlgoConnect = new MyAlgoConnect();

        const signedTxn = await myAlgoConnect.signTransaction(txns.map(txn => txn.toByte()));

        const response = await algodClient.sendRawTransaction([signedTxn[0].blob, signedTxn[1].blob]).do();
        setItem3(true);
        setTimeout(() => {
            //setPopUp(false);
            make_borrow_offer(asset_id, appId);
        }, 2000);
        console.log(response);



    }
    const make_borrow_offer = async (asset_id, appId) => {
        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();

        const creator = algoAdd;

        const escrowAddress = await getApplicationAddress(appId);


        // const escrowAddress = await escrow_address(94243116);
        const makeSellOffer = new Uint8Array(Buffer.from('makeBorrowOffer', 'utf8'));
        // const sell_price = bigIntToBytes(100000, 8)
        const sell_price = bigIntToBytes(borrowAmount, 8)
        console.log(borrowAmount);
        console.log(sell_price);

        //Check your balance
        let accountInfo = await algodClient.accountInformation(escrowAddress).do();

        // console.log(accountInfo);return 0;

        console.log("Account balance: %d microAlgos", accountInfo.amount);

        const deposit = bigIntToBytes(accountInfo.amount, 8)




        const txn = algosdk.makeApplicationCallTxnFromObject({
            from: algoAdd,
            suggestedParams: suggested_params,
            appIndex: appId,
            appArgs: [makeSellOffer, sell_price, deposit],
            foreignAssets: [asset_id]

        })


        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());

        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();

        ///////////////////////
        setItem4(true);
        setTimeout(() => {
            onClose();
        }, 2000);
        modal13.onOpen();
        setTimeout(() => {
            modal13.onClose();
        }, 4000);
        setTimeout(() => {
            navigate("/borrow");
        }, 2000);


        // txn = algo_txn.ApplicationCallTxn(sender=caller_address,
        //     sp=suggested_params,
        //     index=app_id,
        //     app_args=app_args,
        //     foreign_assets=foreign_assets,
        //     on_complete=on_complete)

    }
    // ==================borrow offer functionality ends here ======================
    return (
        <>
            {walletConnectStatus ? <DesktopNav name={walletAddress} amount={walletAmount} /> : <DesktopNav name={algoAdd} amount={algoBalance} />}
            <Box minH="100vh" bgColor={bgColor}>

                <Container maxW={'7xl'} paddingTop="100px">
                    <Stack gap={5} justifyContent="space-between" direction={{ base: 'column', md: 'row' }} >
                        <VStack w={{ base: "100%", md: "40%" }} borderRadius="12px">
                            <HStack justifyContent="space-between" w="100%" p="20px" bgColor={bgColor} marginBottom="-10px" borderTopLeftRadius="12px" borderTopRightRadius="12px" border="1px solid gray" borderColor="gray.300">
                                <IoIosMenu />
                                <IoIosHeartEmpty />
                            </HStack>

                            <Image src={location.state.nft ? location.state.url : location.state.data.url || location.state.data.image} w="100%" h="520px" paddingTop="0px" borderBottomRightRadius="12px" borderBottomLeftRadius="12px" objectFit="cover" />
                            <Box w="100%" border="1px solid gray" borderRadius="8px" borderColor="gray.300" p="20px">
                                <HStack gap={3}>
                                    <IoIosStats size="32px" />
                                    <Text fontSize={{ base: "14px", md: "21px" }} fontWeight="bold">Description</Text>
                                </HStack>


                                <TableContainer width="100%" >
                                    <Table variant='simple' size="lg" >

                                        <Thead>
                                            <Tr>


                                                <Th>Owner</Th>
                                                <Th>Buyer</Th>

                                            </Tr>
                                        </Thead>
                                        <Tbody>

                                            {allAuctionData.length != 0 ? allAuctionData.map((data) => (

                                                <Tr key={data.id}>


                                                    <Td >{data.owner_address.substring(0, 8) + "..." + data.owner_address.substr(data.owner_address.length - 8)}</Td>
                                                    <Td >{data.buyer_address.substring(0, 8) + "..." + data.buyer_address.substr(data.buyer_address.length - 8)}</Td>

                                                </Tr>

                                            )) :
                                                <Tr >


                                                    <Td >Null</Td>
                                                    <Td >Null</Td>

                                                </Tr>
                                            }
                                        </Tbody>
                                    </Table>
                                </TableContainer>

                                <Text fontSize="18px">
                                    {location.state.nft ? location.state.description : location.state.data.description}
                                </Text>
                                <Text fontSize="18px">
                                    {location.state.nft ? location.state.link : location.state.data.link}
                                </Text>

                                {/* Properties component starts*/}
                                <VStack borderRadius="8px" border="1px solid gray" borderColor="gray.300" p="15px" marginBottom="20px" marginTop="20px">
                                    <Flex justifyContent="space-between" width="100%" >
                                        <HStack>
                                            <IoIosCube size="25px" />
                                            <Text onClick={handleProperties} cursor="pointer" fontSize="18px" fontWeight="500">Properties</Text>
                                        </HStack>
                                        <HStack><IoMdArrowDropdown onClick={handleProperties} cursor="pointer" size="25px" /></HStack>

                                    </Flex>
                                    {Properties ? <>
                                        <HStack w="100%" alignItems="left" paddingTop="15px" justifyContent="space-between">
                                            {propertiesItem ? <>
                                                <Box w="33%" h="90px" border="1px solid gray" borderRadius="8px" textAlign="center" p="10px" bgColor="blue.200" m="auto">
                                                    <Text fontSize="12px">Background</Text>
                                                    <Text fontSize="12px">Pink</Text>
                                                    <Text fontSize="12px">6% have this trade</Text>
                                                </Box>
                                                <Box w="33%" h="90px" border="1px solid gray" borderRadius="8px" textAlign="center" p="10px" bgColor="blue.200" m="auto">
                                                    <Text fontSize="12px">Background</Text>
                                                    <Text fontSize="12px">Pink</Text>
                                                    <Text fontSize="12px">6% have this trade</Text>
                                                </Box>
                                                <Box w="33%" h="90px" border="1px solid gray" borderRadius="8px" textAlign="center" p="10px" bgColor="blue.200" m="auto">
                                                    <Text fontSize="12px">Background</Text>
                                                    <Text fontSize="12px">Pink</Text>
                                                    <Text fontSize="12px">6% have this trade</Text>
                                                </Box>
                                            </> : <><Text>There are currently no details.</Text></>}

                                        </HStack>
                                    </> : <></>}

                                </VStack>
                                {/* Properties component ends here*/}
                                {/* about us component starts*/}
                                <VStack borderRadius="8px" border="1px solid gray" borderColor="gray.300" p="15px" marginBottom="20px">
                                    <Flex justifyContent="space-between" width="100%" >
                                        <HStack>
                                            <IoIosCreate size="25px" />
                                            <Text onClick={handleAbout} cursor="pointer" fontSize="18px" fontWeight="500">About Us</Text>
                                        </HStack>
                                        <HStack><IoMdArrowDropdown onClick={handleAbout} cursor="pointer" size="25px" /></HStack>

                                    </Flex>
                                    {about ? <>
                                        <HStack w="100%" alignItems="left" paddingTop="15px" justifyContent="space-between">
                                            {aboutUsItem ? <>
                                                <Box w="50%" _focus={{ boxShadow: "lg" }} >
                                                    <Select >
                                                        <option value='option1' >Last 7 Days</option>
                                                        <option value='option2'>Last 14 Days</option>
                                                        <option value='option3'>Last 30 Days</option>
                                                    </Select>
                                                </Box>
                                                <Box w="50%" border="1px solid gray" borderColor="gray.300" borderRadius="8px">
                                                    <Text p="10px" >Chart</Text>
                                                </Box>
                                            </> : <><Text>There are currently no details.</Text></>}

                                        </HStack>
                                    </> : <></>}

                                </VStack>
                                {/* about us component ends here*/}
                                {/* details component starts*/}
                                <VStack borderRadius="8px" border="1px solid gray" borderColor="gray.300" p="15px" marginBottom="20px">
                                    <Flex justifyContent="space-between" width="100%" >
                                        <HStack>
                                            <IoIosExpand size="25px" />
                                            <Text onClick={handleDetail} cursor="pointer" fontSize="18px" fontWeight="500">Details</Text>
                                        </HStack>
                                        <HStack><IoMdArrowDropdown onClick={handleDetail} cursor="pointer" size="25px" /></HStack>

                                    </Flex>
                                    {details ? <>
                                        <HStack w="100%" alignItems="left" paddingTop="15px" justifyContent="space-between">
                                            {detailsItem ? <>
                                                <Box w="50%" _focus={{ boxShadow: "lg" }} >
                                                    <Select >
                                                        <option value='option1' >Last 7 Days</option>
                                                        <option value='option2'>Last 14 Days</option>
                                                        <option value='option3'>Last 30 Days</option>
                                                    </Select>
                                                </Box>
                                                <Box w="50%" border="1px solid gray" borderColor="gray.300" borderRadius="8px">
                                                    <Text p="10px" >Chart</Text>
                                                </Box>
                                            </> : <><Text>There are currently no details.</Text></>}

                                        </HStack>
                                    </> : <></>}

                                </VStack>
                                {/* details component ends here*/}
                            </Box>
                        </VStack>
                        <VStack w={{ base: "100%", md: "60%" }} alignItems="left">
                            <HStack justifyContent="space-between" w="100%" p="20px">
                                <HStack>
                                    <Text fontSize="22px" fontWeight="700">{location.state.nft ? location.state.name : location.state.data.name}</Text>

                                    {/* <Text fontSize="22px" fontWeight="700">{location.state.nft ? location.state.type : location.state.data.type}</Text> */}
                                </HStack>
                                <Box>
                                    <IconButton icon={<IoMdRefresh />} marginRight="10px" />
                                    <IconButton icon={<IoIosShareAlt />} />
                                </Box>
                            </HStack>
                            <Text fontSize="30px" fontWeight="bold" textAlign="left" paddingLeft="20px">{location.state.nft ? location.state.unit_name : location.state.data.unit_name}</Text>
                            <HStack p="20px">
                                <Text fontSize={{ base: "12px", md: "16px" }}>Owned by {location.state.nft ? location.state.owner : location.state.data.owner}</Text>
                                <IoIosEye size="25px" />
                                <Text fontSize={{ base: "12px", md: "16px" }}>22 views</Text>
                                <IoIosHeartEmpty size="25px" />
                                <Text fontSize={{ base: "12px", md: "16px" }}>1 favourite</Text>
                            </HStack>
                            <VStack alignItems="left" p="20px" border="1px solid gray" borderRadius="12px" bgColor={bgColor} borderColor="whiteAlpha.500">
                                <Text>Current price</Text>
                                <HStack>
                                    <Image src={algoCoin} w="32px" h="32px" />
                                    <Text fontSize={{ base: "21px", md: "25px" }} fontWeight="bold">{location.state.nft ? location.state.price : location.state.data.price}</Text>
                                    {/* <Text>($300)</Text> */}
                                </HStack>
                                <HStack>

                                    {nftDetails ? nftDetails.nftDetails.owner_address === algoAdd ?

                                        <>

                                            <Button leftIcon={<IoIosWallet />} size="lg" colorScheme='teal' variant='solid' w="150px" onClick={onOpen}>
                                                List for Sale
                                            </Button>

                                            {checkForCloseAuctionFunctionality === undefined ?
                                                <Button leftIcon={<IoIosWallet />} size="lg" colorScheme='teal' variant='solid' w="150px" onClick={handleCloseAuction} disabled={true}>
                                                    Close Auction
                                                </Button> :
                                                <Button leftIcon={<IoIosWallet />} size="lg" colorScheme='teal' variant='solid' w="150px" onClick={handleCloseAuction} >
                                                    Close Auction
                                                </Button>
                                            }

                                            {/* <Button leftIcon={<IoIosSend />} size="lg" colorScheme='teal' variant='outline' w="150px" onClick={modal11.onOpen}>
                                                Borrow Offer
                                            </Button> */}

                                            <Button leftIcon={<IoIosSend />} size="lg" colorScheme='teal' variant='outline' w="200px" onClick={(e) => handleDownloadAsset(e)}>
                                                Download Asset
                                            </Button>


                                        </>
                                        :

                                        <>

                                            {nftDetails ? nftDetails.nftDetails.sell_status === true ? <Button leftIcon={<IoIosWallet />} size="lg" colorScheme='teal' variant='solid' w="150px" onClick={handleBuyOption}>
                                                Buy Now
                                            </Button>

                                                : <Button leftIcon={<IoIosWallet />} size="lg" colorScheme='teal' variant='solid' w="150px" onClick={handleBuyOption} disabled={true}>
                                                    Buy Now
                                                </Button>
                                                :
                                                null
                                            }



                                            {nftDetails ? nftDetails.nftDetails.type === 'auction' && getResult === undefined ?

                                                <Button leftIcon={<IoIosSend />} size="lg" colorScheme='teal' variant='outline' w="150px" onClick={modal9.onOpen}>
                                                    Place Bid
                                                </Button>
                                                :


                                                <Button leftIcon={<IoIosSend />} size="lg" colorScheme='teal' variant='outline' w="150px" onClick={handlePlaceBid} disabled={true}>
                                                    Place Bid
                                                </Button>
                                                : null
                                            }

                                        </>
                                        : null
                                    }

                                    {/* <Button leftIcon={<IoIosWallet />} size="lg" colorScheme='teal' variant='solid' w="150px" onClick={() => printAssetHolding(['SADLEWVPWLPJVC3RH67STMD2GIHYD63MTWMDQQX4SGDZWURJEE2PIQGL4I', 'L6FNTRRD6VS2CRGODQCEWU2FC5TEYY6RUD5HRODIZD4TEUGPZVWKXBLBFM'], 99597775)}>
                                        List for Sale
                                    </Button> */}



                                </HStack>
                                {buyError ?
                                    <Alert status='error'>
                                        <AlertIcon />
                                        Not enough fund.
                                    </Alert> : null
                                }
                                <VStack>
                                    {/* {
                                        popup ?
                                            <Alert status='success'>
                                                <AlertIcon />
                                                We are going to initialize NFT credential. Stay with us.
                                            </Alert>
                                            :
                                            null
                                    }
                                    {
                                        init_escrow ?
                                            <>
                                                <Alert status='success'>
                                                    <AlertIcon />
                                                    NFT credential created successfully.
                                                </Alert>
                                                <Alert status='success'>
                                                    <AlertIcon />
                                                    We are going to initialize ESCROW. Stay with us.
                                                </Alert>
                                                <Progress hasStripe value={25} />
                                            </>
                                            : null
                                    }
                                    {
                                        escrow ?
                                            <>
                                                <Alert status='success'>
                                                    <AlertIcon />
                                                    Ezcrow Initialize successfully.
                                                </Alert>
                                                <Alert status='success'>
                                                    <AlertIcon />
                                                    We are going to fund escrow. Stay with us!
                                                </Alert>
                                                <Progress hasStripe value={50} />
                                            </>
                                            : null
                                    }
                                    {
                                        sellOffer ?
                                            <>
                                                <Alert status='success'>
                                                    <AlertIcon />
                                                    Excrow funded successfully.
                                                </Alert>
                                                <Alert status='success'>
                                                    <AlertIcon />
                                                    We are going to make a sell offer. Stay with us!
                                                </Alert>
                                                <Progress hasStripe value={75} />
                                            </>
                                            : null
                                    }
                                    {
                                        info ?
                                            <>
                                                <Alert status='success'>
                                                    <AlertIcon />
                                                    Successfully made the sell offer!!
                                                </Alert>
                                                <Progress hasStripe value={100} />
                                            </>
                                            : null
                                    } */}

                                    {/* {
                                        popupForAuction ?
                                            <>
                                                <Alert status='success'>
                                                    <AlertIcon />
                                                    We are going to start Create Auction App.
                                                </Alert>
                                                <Progress hasStripe value={100} />
                                            </>
                                            : null
                                    }
                                    {
                                        auctionApp ?
                                            <>
                                                <Alert status='success'>
                                                    <AlertIcon />
                                                    We are going to setup Auction App.
                                                </Alert>
                                                <Progress hasStripe value={100} />
                                            </>
                                            : null
                                    }
                                    {
                                        completeAppSetup ?
                                            <>
                                                <Alert status='success'>
                                                    <AlertIcon />
                                                    Auction App setup Successful.
                                                </Alert>
                                                <Progress hasStripe value={100} />
                                            </>
                                            : null
                                    } */}

                                    {/* {
                                        auctionClose ?
                                            <>
                                                <Alert status='success'>
                                                    <AlertIcon />
                                                    Closing the auction
                                                </Alert>
                                                <Progress hasStripe value={100} />
                                            </>
                                            : null
                                    }
                                    {
                                        closeSuccessful ?
                                            <>
                                                <Alert status='success'>
                                                    <AlertIcon />
                                                    Auction closed successfully
                                                </Alert>
                                                <Progress hasStripe value={100} />
                                            </>
                                            : null
                                    } */}

                                    {/* {
                                        bidOffer ?
                                            <>
                                                <Alert status='success'>
                                                    <AlertIcon />
                                                    We are going Opt-in the asset.
                                                </Alert>
                                                <Progress hasStripe value={100} />
                                            </>
                                            : null
                                    }
                                    {
                                        placeAuctionBid ?
                                            <>
                                                <Alert status='success'>
                                                    <AlertIcon />
                                                    We are going place the BID.
                                                </Alert>
                                                <Progress hasStripe value={100} />
                                            </>
                                            : null
                                    }
                                    {
                                        successfulBid ?
                                            <>
                                                <Alert status='success'>
                                                    <AlertIcon />
                                                    Bid place successfully.
                                                </Alert>
                                                <Progress hasStripe value={100} />
                                            </>
                                            : null
                                    } */}


                                </VStack>

                            </VStack>
                            {/* Price history component starts*/}
                            <VStack borderRadius="8px" border="1px solid gray" borderColor="gray.300" p="15px">
                                <Flex justifyContent="space-between" width="100%" >
                                    <HStack>
                                        <IoIosPulse size="25px" />
                                        <Text onClick={handleBox} cursor="pointer" fontSize="18px" fontWeight="700">Price History</Text>
                                    </HStack>
                                    <HStack><IoMdArrowDropdown onClick={handleBox} cursor="pointer" size="25px" /></HStack>

                                </Flex>
                                {openBox ? <>
                                    <HStack w="100%" alignItems="left" paddingTop="15px" justifyContent="space-between">
                                        <Box w="50%" _focus={{ boxShadow: "lg" }} >
                                            {priceHistoey ? <>
                                                <Select >
                                                    <option value='option1' >Last 7 Days</option>
                                                    <option value='option2'>Last 14 Days</option>
                                                    <option value='option3'>Last 30 Days</option>
                                                </Select>
                                            </> : <><Text>There are currently no details.</Text></>}

                                        </Box>
                                        {/* <Box w="50%" border="1px solid gray" borderColor="gray.300" borderRadius="8px">
                                            <Text p="10px" >Chart</Text>
                                        </Box> */}
                                    </HStack>
                                </> : <></>}

                            </VStack>
                            {/* Price history component ends here*/}
                            {/* Listing component starts*/}
                            <VStack borderRadius="8px" border="1px solid gray" borderColor="gray.300" p="15px" mt="30px">
                                <Flex justifyContent="space-between" width="100%" >
                                    <HStack>
                                        <IoMdPricetag size="25px" />
                                        <Text onClick={handleListing} cursor="pointer" fontSize="18px" fontWeight="700">Listings</Text>
                                    </HStack>
                                    <HStack><IoMdArrowDropdown onClick={handleListing} cursor="pointer" size="25px" /></HStack>

                                </Flex>
                                {listing ? <>
                                    <HStack w="100%" alignItems="left" paddingTop="15px" justifyContent="space-between">
                                        <Box w="50%" _focus={{ boxShadow: "lg" }} >
                                            {Listing ? <>
                                                <Select >
                                                    <option value='option1' >Last 7 Days</option>
                                                    <option value='option2'>Last 14 Days</option>
                                                    <option value='option3'>Last 30 Days</option>
                                                </Select>
                                            </> : <><Text>There are currently no details.</Text></>}
                                        </Box>
                                        {/* <Box w="50%" border="1px solid gray" borderColor="gray.300" borderRadius="8px">
                                            <Text p="10px" >Chart</Text>
                                        </Box> */}
                                    </HStack>
                                </> : <></>}

                            </VStack>
                            {/* Listing component ends here*/}
                            {/* Offers component starts*/}
                            <VStack borderRadius="8px" border="1px solid gray" borderColor="gray.300" p="15px" mt="30px">
                                <Flex justifyContent="space-between" width="100%" >
                                    <HStack>
                                        <IoIosList size="25px" />
                                        <Text onClick={handleOffer} cursor="pointer" fontSize="18px" fontWeight="700">Offers</Text>
                                    </HStack>
                                    <HStack><IoMdArrowDropdown onClick={handleOffer} cursor="pointer" size="25px" /></HStack>

                                </Flex>
                                {offer ? <>
                                    <HStack w="100%" alignItems="left" paddingTop="15px" justifyContent="space-between">
                                        <Box w="50%" _focus={{ boxShadow: "lg" }} >
                                            {offers ? <>
                                                <Select >
                                                    <option value='option1' >Last 7 Days</option>
                                                    <option value='option2'>Last 14 Days</option>
                                                    <option value='option3'>Last 30 Days</option>
                                                </Select>
                                            </> : <><Text>There are currently no details.</Text></>}
                                        </Box>
                                        {/* <Box w="50%" border="1px solid gray" borderColor="gray.300" borderRadius="8px">
                                            <Text p="10px" >Chart</Text>
                                        </Box> */}
                                    </HStack>
                                </> : <></>}

                            </VStack>
                            {/* Offers component ends here*/}
                        </VStack>

                    </Stack>
                    <Stack gap={5} direction={{ base: 'column', md: 'row' }} w="100%" >
                        <VStack w="100%" alignItems="left" py="20px">
                            {/* Item Activity component starts*/}
                            <VStack borderRadius="8px" border="1px solid gray" borderColor="gray.300" p="15px" marginBottom="20px">
                                <Flex justifyContent="space-between" width="100%" >
                                    <HStack>
                                        <IoIosCube size="25px" />
                                        <Text onClick={handleItemActivity} cursor="pointer" fontSize="18px" fontWeight="500">Item Activity</Text>
                                    </HStack>
                                    <HStack><IoMdArrowDropdown onClick={handleItemActivity} cursor="pointer" size="25px" /></HStack>

                                </Flex>
                                {ItemActivity ? <>

                                    <TableContainer width="100%" >
                                        <Table variant='simple' size="lg" >

                                            <Thead>
                                                <Tr>
                                                    <Th>Event</Th>
                                                    <Th>Price</Th>
                                                    <Th>From</Th>
                                                    <Th>To</Th>
                                                    <Th >Date</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {allAuctionData.map((data) => (
                                                    <Tr key={data.appID}>
                                                        <Td>{data.auctionType}</Td>
                                                        <Td>{location.state.data.price}</Td>
                                                        <Td >{data.owner_address.substring(0, 8) + "..." + data.owner_address.substr(data.owner_address.length - 8)}</Td>
                                                        <Td >{data.buyer_address.substring(0, 8) + "..." + data.buyer_address.substr(data.buyer_address.length - 8)}</Td>
                                                        <Td >N/A</Td>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>


                                </> : <></>}

                            </VStack>
                            {/* Item Activity component ends here*/}

                            {/* More from this component starts*/}
                            <VStack borderRadius="8px" border="1px solid gray" borderColor="gray.300" p="15px" marginBottom="20px">
                                <Flex justifyContent="space-between" width="100%" >
                                    <HStack>
                                        <IoIosCube size="25px" />
                                        <Text onClick={handleMoreInfo} cursor="pointer" fontSize="18px" fontWeight="500">More From This Collection</Text>
                                    </HStack>
                                    <HStack><IoMdArrowDropdown onClick={handleMoreInfo} cursor="pointer" size="25px" /></HStack>

                                </Flex>
                                {MoreInfo ? <>
                                    <HStack w="100%" alignItems="left" paddingTop="15px" justifyContent="space-between">
                                        {moreItem ? <>
                                            <Box w="50%" _focus={{ boxShadow: "lg" }} >
                                                <Select >
                                                    <option value='option1' >Last 7 Days</option>
                                                    <option value='option2'>Last 14 Days</option>
                                                    <option value='option3'>Last 30 Days</option>
                                                </Select>
                                            </Box>
                                            <Box w="50%" border="1px solid gray" borderColor="gray.300" borderRadius="8px">
                                                <Text p="10px" >Chart</Text>
                                            </Box>
                                        </> : <><Text>Nothing to show</Text></>}

                                    </HStack>
                                </> : <></>}

                            </VStack>
                            {/* More from this component ends here*/}
                        </VStack>
                    </Stack>



                </Container>
            </Box>
            {/* sell offer & Auction modal starts from here */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent height="180px" shadow="md">
                    <ModalHeader>Choose your offer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <HStack alignItems="center" justifyContent="space-around">

                            {
                                nftDetails ? nftDetails.nftDetails.sell_status === false ?
                                    <>

                                        <Button leftIcon={<IoIosWallet />} size="lg" colorScheme='teal' variant='solid' w="150px" onClick={handleSaleOption}>
                                            Sell Offer
                                        </Button>

                                        {nftDetails.nftDetails.type != 'auction' ?
                                            <Button leftIcon={<IoIosSend />} size="lg" colorScheme='teal' variant='outline' w="150px" onClick={handleAuctionModal}>
                                                Make Auction
                                            </Button>
                                            :
                                            <Button leftIcon={<IoIosSend />} size="lg" colorScheme='teal' variant='outline' w="150px" onClick={handleAuctionModal} disabled={true}>
                                                Make Auction
                                            </Button>
                                        }



                                    </>

                                    :
                                    <>
                                        <Button leftIcon={<IoIosWallet />} size="lg" colorScheme='teal' variant='solid' w="150px" onClick={handleSaleOption} disabled={true}>
                                            Sell Offer
                                        </Button>
                                        <Button leftIcon={<IoIosSend />} size="lg" colorScheme='teal' variant='outline' w="150px" onClick={handleAuctionModal} disabled={true}>
                                            Make Auction
                                        </Button>


                                    </>

                                    :
                                    null

                            }



                        </HStack>
                    </ModalBody>


                </ModalContent>
            </Modal>

            {/* sell offer & Auction modal ends here */}

            {/* auction property modal starts from here */}
            <Modal isOpen={modal2.isOpen} onClose={modal2.onClose}>

                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Auction for the highest bidder</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack gap={2}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text fontSize="18px" fontWeight="600">Method</Text>
                                <Tooltip label='Sell to the highest bidder or sell with a declining price, which allows the listing to reduce in price until a buyer is found' fontSize='md'>
                                    <WarningIcon />
                                </Tooltip>
                            </HStack>
                            <Select value={bidOption ?? ""}
                                onChange={(e) => setBidOption(e.target.value)}
                            >
                                <option value='highest' py="20px">  Sell to highest bidder</option>
                                <option value='decline'>Sell with declining price</option>

                            </Select>
                            <Text>Starting price</Text>
                            <HStack>
                                <Box w="35%">
                                    <Select value={coin ?? ""}
                                        onChange={(e) => setCoin(e.target.value)}
                                    >
                                        <option value='algo'> Algo</option>

                                    </Select>
                                </Box>
                                <Box w="65%">
                                    <Input type='number'
                                        name='amount'
                                        value={amount ?? ""}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </Box>
                            </HStack>
                            <HStack>
                                <Text>Duration</Text>
                            </HStack>

                            <HStack>
                                <Box border="1px solid gray" p="10px" borderRadius="8px">
                                    <DatePicker
                                        selected={selected}
                                        onChange={(date) => dateChange(date)}
                                        minDate={now}
                                        maxDate={future}
                                        showTimeSelect
                                        timeIntervals={60}
                                        minTime={setHours(setMinutes(new Date(), 0), 8)}
                                        maxTime={setHours(setMinutes(future, 45), 23)}
                                        dateFormat="MMMM d, yyyy hhaa"

                                    />
                                </Box>

                                <Box border="1px solid gray" p="10px" borderRadius="8px">
                                    <DatePicker
                                        selected={selected2}
                                        onChange={(date) => dateChange1(date)}
                                        minDate={now}
                                        maxDate={future}
                                        showTimeSelect
                                        timeIntervals={60}
                                        minTime={setHours(setMinutes(new Date(), 0), 8)}
                                        maxTime={setHours(setMinutes(future, 45), 23)}
                                        dateFormat="MMMM d, yyyy hhaa"
                                    />
                                </Box>
                            </HStack>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text>Include Reserve price</Text>
                                <Switch size='md' value={switchbtn} onChange={handleSwich} />
                            </HStack>
                            {
                                switchbtn ? <>
                                    <Text>Starting price</Text>
                                    <HStack>
                                        <Box w="35%">
                                            <Select value={reserveCoin ?? ""}
                                                onChange={(e) => setReserveCoin(e.target.value)}
                                            >
                                                <option value='algo'> Algo</option>

                                            </Select>
                                        </Box>
                                        <Box w="65%">
                                            <Input type='number'
                                                name='amount'
                                                value={reserveAmount ?? ""}
                                                onChange={(e) => setReserveAmount(e.target.value)}
                                            />
                                        </Box>
                                    </HStack>

                                </> : null
                            }
                        </Stack>
                    </ModalBody>

                    <ModalFooter>

                        <Button colorScheme='blue' mr={3} onClick={handleAuction}>
                            Auction
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/* auction property modal starts from here */}

            {/* pop up Modal for Sell NFT*/}
            <Modal isOpen={modal3.isOpen} onClose={modal3.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>NFT Sell Action</ModalHeader>
                    <ModalBody py="30px">
                        <VStack>
                            {popup ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    App Initialize
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    App Initialize
                                </Alert>
                            }
                            <Divider />
                            {init_escrow ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Change NFT Credentials
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Change NFT Credentials
                                </Alert>
                            }
                            <Divider />
                            {escrow ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Initialize Escrow
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Initialize Escrow
                                </Alert>
                            }
                            <Divider />

                            {sellOffer ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Fund Escrow
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Fund Escrow
                                </Alert>
                            }

                            <Divider />

                            {info ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Sell Offer
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Sell Offer
                                </Alert>
                            }

                        </VStack>
                    </ModalBody>
                    <VStack>

                    </VStack>

                </ModalContent>
            </Modal>
            {/* pop up Modal ends */}

            {/* pop up modal buy NFT */}
            <Modal isOpen={modal4.isOpen} onClose={modal4.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>NFT Buy Action</ModalHeader>
                    <ModalBody py="30px">
                        <VStack>
                            {buyOffer ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Asset Optin
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Asset Optin
                                </Alert>
                            }
                            <Divider />
                            {complete ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Buy NFT
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Buy NFT
                                </Alert>
                            }

                        </VStack>
                    </ModalBody>
                    <VStack>

                    </VStack>

                </ModalContent>
            </Modal>
            {/* pop up modal end for buy NFT */}

            {/* pop up for CLOSE AUCTION */}
            <Modal isOpen={modal5.isOpen} onClose={modal5.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Close Action</ModalHeader>
                    <ModalBody py="30px">
                        <VStack>
                            {closeSuccessful ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Auction Closed
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Auction Closed
                                </Alert>
                            }
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* pop up modal end for CLOSE AUCTION */}

            {/* popup for Biding start */}
            <Modal isOpen={modal6.isOpen} onClose={modal6.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>NFT Bidding</ModalHeader>
                    <ModalBody py="30px">
                        <VStack>
                            {placeAuctionBid ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Asset opt-in
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Asset opt-in
                                </Alert>
                            }

                            {successfulBid ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Place Bid
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Place Bid
                                </Alert>
                            }
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* popup for Biding ends */}

            {/* popup for AUCTION start from here */}
            <Modal isOpen={modal7.isOpen} onClose={modal7.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Auction</ModalHeader>
                    <ModalBody py="30px">
                        <VStack>
                            {auctionApp ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Create Auction App
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Create Auction App
                                </Alert>
                            }

                            {completeAppSetup ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Setup Auction APP
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Setup Auction APP
                                </Alert>
                            }
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* popup for AUCTION end here */}

            {/* buy successfull Modal */}
            <Modal isOpen={modal8.isOpen} onClose={modal8.onClose} isCentered>
                <ModalOverlay />
                <ModalContent width="340px" height="200px">
                    <ModalCloseButton />

                    <ModalBody borderRadius="15px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" >
                        <Center>
                            <VStack alignItems="center" justifyContent="space-between" py="20%">
                                <Text color="gray.800">Congratulations!!</Text>
                                <Text color="gray.800">You successfully bought the NFT. Have fun.</Text>
                            </VStack>
                        </Center>

                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* buy successfull modal ends here */}

            {/* Modal for Bidder Amount */}
            <Modal isOpen={modal9.isOpen} onClose={modal9.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Bidding Amount</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleBiddingProcedure}>
                            <HStack py="30px">

                                <Box w="35%">
                                    <Select placeholder='Select option' value={biddingCoin ?? ""}
                                        onChange={(e) => setBiddingCoin(e.target.value)} required={true}
                                    >
                                        <option value='algo'> Algo</option>

                                    </Select>
                                </Box>
                                <Box w="65%">
                                    <Input type='number'
                                        name='amount'
                                        placeholder='Insert bid amount'
                                        value={biddingAmount ?? ""}
                                        required={true}
                                        onChange={(e) => setBiddingAmount(e.target.value)}
                                    />
                                </Box>


                            </HStack>
                            <Button type='submit' width="100%" bg="#6FAA6B" color="whiteAlpha.900" _hover={{ color: "whiteAlpha.900" }} py="25px" my="15px">Proceed</Button>
                        </form>
                    </ModalBody>

                    {/* <ModalFooter>

                       
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
            {/* Modal for Bidder Amount ends */}

            {/* =================Modal for successfull bid =============== */}
            <Modal isOpen={modal10.isOpen} onClose={modal10.onClose} isCentered>
                <ModalOverlay />
                <ModalContent width="340px" height="200px">
                    <ModalCloseButton />

                    <ModalBody borderRadius="15px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" >
                        <Center>
                            <VStack alignItems="center" justifyContent="space-between" py="20%">
                                <Text color="gray.800">Congratulations!!</Text>
                                <Text color="gray.800">Bid Successfull. Have fun.</Text>
                            </VStack>
                        </Center>

                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* =================Modal for successfull bid ends===========*/}
            {/* =======================modal for borrow amount starts=================== */}
            <Modal isOpen={modal11.isOpen} onClose={modal11.onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Borrow Amount</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleBorrowOffer}>
                            <HStack py="30px">

                                <Box w="35%">
                                    <Select placeholder='Select option' value={biddingCoin ?? ""}
                                        onChange={(e) => setBiddingCoin(e.target.value)} required={true}
                                    >
                                        <option value='algo'> Algo</option>

                                    </Select>
                                </Box>
                                <Box w="65%">
                                    <Input type='number'
                                        name='amount'
                                        placeholder='Insert borrow amount'
                                        value={borrowAmount ?? ""}
                                        required={true}
                                        onChange={(e) => setBorrowAmount(e.target.value)}
                                    />
                                </Box>


                            </HStack>
                            <Button type='submit' width="100%" bg="#6FAA6B" color="whiteAlpha.900" _hover={{ color: "whiteAlpha.900" }} py="25px" my="15px">Proceed</Button>
                        </form>
                    </ModalBody>

                    {/* <ModalFooter>

                       
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
            {/* =======================modal for borrow amount ends=================== */}
            {/* ===================Modal for borrow functionality====================== */}
            <Modal isOpen={modal12.isOpen} onClose={modal12.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Borrow Action</ModalHeader>
                    <ModalBody py="30px">
                        <VStack>
                            {item1 ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    App Initialize
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    App Initialize
                                </Alert>
                            }
                            <Divider />
                            {item2 ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Initialize Escrow
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Initialize Escrow
                                </Alert>
                            }
                            <Divider />
                            {item3 ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Make Borrow Offer
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Make Borrow Offer
                                </Alert>
                            }
                            <Divider />

                            {item4 ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Fund Escrow
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Fund Escrow
                                </Alert>
                            }

                            <Divider />

                            {/* {item5 ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    Sell Offer
                                </Alert> :
                                <Alert status='info'>
                                    <AlertIcon />
                                    Sell Offer
                                </Alert>
                            } */}

                        </VStack>
                    </ModalBody>
                    <VStack>

                    </VStack>

                </ModalContent>
            </Modal>
            {/*========================== Modal for borrow functionality ends==================*/}
            {/* ==================successful Borrow offer modal start=================== */}
            <Modal isOpen={modal13.isOpen} onClose={modal13.onClose} isCentered>
                <ModalOverlay />
                <ModalContent width="340px" height="200px">
                    <ModalCloseButton />

                    <ModalBody borderRadius="15px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" >
                        <Center>
                            <VStack alignItems="center" justifyContent="space-between" py="20%">
                                <Text color="gray.800">Congratulations!!</Text>
                                <Text color="gray.800">You successfully make the BORROW OFFER. Have fun.</Text>
                            </VStack>
                        </Center>

                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* ==================successful Borrow offer modal ends=================== */}
        </>
    )
}

export default SinglePage