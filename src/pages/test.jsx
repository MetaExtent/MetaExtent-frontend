import {
    Box, Container, Form, Input, Text, VStack, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Select,
    Stack,
    HStack,
    Flex,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    Divider,
    IconButton,
    Img,
    Alert,
    AlertIcon,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
import { CloseIcon, HamburgerIcon, SmallAddIcon } from '@chakra-ui/icons';
import { v4 } from 'uuid';
import MyAlgoConnect from "@randlabs/myalgo-connect";

import algosdk, { decodeAddress } from 'algosdk';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore";
import { db } from '../components/firebase/FirebaseConfig';
import { storage } from '../components/firebase/FirebaseConfig';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { NftAction } from '../components/redux/actions';
import { useNavigate } from 'react-router-dom';
import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");


const imageMimeType = /image\/(png|jpg|jpeg)/i;


function CreateItem() {
    const dispatch = useDispatch();
    const [popUp, alertPopUp] = useState(false);
    const navigate = useNavigate();
    const algoAdd = useSelector(state => state.token.myAlgoAddress);
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    const [name, setName] = useState();
    const [grpname, setGrpName] = useState();
    //const [userAddress, setuserAddress] = useState(algoAdd);
    const [owner, setOwner] = useState('');
    const [priceNft, setPrice] = useState();
    const [link, setLink] = useState("");
    const [description, setDescription] = useState("");
    const [option, setOption] = useState("");
    const [blockchain, setblockchain] = useState("");
    const [inputFields, setInputFields] = useState([
        { firstName: "", lastName: "" },
    ]);
    const [assetId, setAssetID] = useState();
    const [AppId, setAppId] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [progress, setProgress] = useState(0);
    const [imageURL, setImageURL] = useState();
    const handleChangeInput = (e, index) => {
        const values = [...inputFields];
        values[index][e.target.name] = e.target.value;
        setInputFields(values);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputFields);
    }
    const handleAdd = () => {
        setInputFields([...inputFields, { firstName: "", lastName: "" }])
    }
    const handleRemove = (index) => {
        const length = inputFields.length;
        if (length > 1) {
            const values = [...inputFields];
            values.splice(index, 1);
            setInputFields(values);
        } else return null;
    }
    const onImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }
        setFile(file);
    };
    // const handleFormSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(fileDataURL, name, grpname, link, description, option, blockchain, file);
    // }

    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);

    const nftCollectionRef = collection(db, "nfts");
    const [nfts, setNfts] = useState([]);

    const getNfts = async () => {
        const data = await getDocs(nftCollectionRef);
        setNfts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    //upload files
    const uploadFile = async (file) => {
        // if (!file) return;
        // //upload image
        // const storageRef = ref(storage, `/images/${file.name}`);
        // const uploadTask = uploadBytesResumable(storageRef, file);
        // // const imageLink = undefined;
        // uploadTask.on(
        //     "state_changed",
        //     (snapshot) => {
        //         const prog = Math.round(
        //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //         );
        //         setProgress(prog);
        //     },
        //     (error) => console.log(error),
        //     () => {
        //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //             console.log("File available at", downloadURL);
        //             setImageURL(downloadURL);
        //         });
        //     }
        // );

        try {
            const created = await client.add(file);
            const url = `https://ipfs.infura.io/ipfs/${created.path}`;
            setImageURL(url);
        } catch (error) {
            console.log(error.message);
        }


    }
    //create NFT function
    const createNft = async (e) => {
        e.preventDefault();
        console.log(name, grpname, link, description, option, blockchain);

        await uploadFile(file);
        //console.log("image url" + val);

        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();

        const creator = algoAdd;
        const defaultFrozen = false;
        const unitName = grpname;
        const assetName = name;
        const price = priceNft;
        //const url = "https://cliqtech.co/assets/images/about/cliqtech/ARVR.jpg";
        const url = await imageURL;
        const managerAddr = algoAdd;
        const reserveAddr = algoAdd;
        const freezeAddr = algoAdd;
        const clawbackAddr = algoAdd;
        const total = 1;                // NFTs have totalIssuance of exactly 1
        const decimals = 0;             // NFTs have decimals of exactly 0


        const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
            from: creator,
            total,
            decimals,
            assetName,
            unitName,
            assetURL: url,
            assetMetadataHash: undefined,
            defaultFrozen,
            freeze: freezeAddr,
            manager: managerAddr,
            clawback: clawbackAddr,
            reserve: reserveAddr,
            suggestedParams: suggested_params,
        });

        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());

        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
        let assetID = null;
        // wait for transaction to be confirmed
        const ptx = await algosdk.waitForConfirmation(algodClient, response.txId, 4);
        assetID = ptx["asset-index"];
        console.log(assetID);
        setAssetID(assetID);
        //app-initializer function
        console.log("-----------created NFT---------------")
        console.log(assetID);
        //app_initialization(assetID, assetName, unitName, price, url, total, owner, algoAdd, option, description, link);

        await addDoc(nftCollectionRef, { nft_id: 12345678, name: assetName, unit_name: unitName, price: price, url: imageURL, total: total, owner: owner, address: algoAdd, option: option, assetID: assetID, description: description, link: link });
        getNfts();
        console.log(response);
        // setFile();
        // setName();
        // setGrpName();
        // setPrice();
        // setLink();
        // setDescription();
        // setOption();
        // setblockchain();
        alertPopUp(true);
        setTimeout(() => {
            alertPopUp(false);
            navigate("/marketpalace");
        }, 3000);

    }

    const app_initialization = async (assetID, assetName, unitName, price, url, total, owner, algoAdd, option, description, link) => {

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
            foreignAssets: [assetID],
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

        await addDoc(nftCollectionRef, { nft_id: 12345678, name: assetName, unit_name: unitName, price: price, url: url, total: total, owner: owner, address: algoAdd, option: option, assetID: assetID, description: description, link: link, appID: null });
        getNfts();

        // sending addId & assetId to redux
        dispatch(NftAction({
            nft_app_id: appID,
            nft_asset_id: assetID
        }));

        setFile();
        setName();
        setGrpName();
        setPrice();
        setLink();
        setDescription();
        setOption();
        setblockchain();
        alertPopUp(true);
        setTimeout(() => {
            alertPopUp(false);
            navigate("/marketpalace");
        }, 3000);

        //////////////////////////////////////////////////////////////
        //change_nft_credentials_txn(appID, assetID)

    }

    const change_nft_credentials_txn = async (appID, assetID) => {

        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();

        const creator = algoAdd;

        const escrowAddress = await escrow_address(appID, assetID);

        let lsig = new algosdk.LogicSigAccount(escrowAddress)
        console.log(lsig.address())

        console.log("-----------changing NFT Credentials---------------")

        //const escrowAddressF   = new Uint8Array(Buffer.from(lsig.address(), 'utf8'));
        // let escrowAddressF   = getApplicationAddress(app_id)

        //let escrowAddressF = decodeAddress(lsig.address())
        const txn = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
            from: algoAdd,
            suggestedParams: suggested_params,
            assetIndex: assetID,
            manager: undefined,
            reserve: undefined,
            freeze: undefined,

            clawback: lsig.address(),
            strictEmptyAddressChecking: false
        })



        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());

        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();

        console.log(response);
        initialize_escrow(appID, assetID);
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

        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();

        console.log(response);
        fund_escrow(appID, assetId);
    }

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
            amount: 1000000
        })

        const myAlgoConnect = new MyAlgoConnect();
        const signedTxn = await myAlgoConnect.signTransaction(txn.toByte());

        const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
        console.log("==================== response from fund escrow ================");
        console.log(response);

        sell_offer(appID, assetId);

    }

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



        // txn = algo_txn.ApplicationCallTxn(sender=caller_address,
        //     sp=suggested_params,
        //     index=app_id,
        //     app_args=app_args,
        //     foreign_assets=foreign_assets,
        //     on_complete=on_complete)

    }
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

    return (
        <>
            <Box minH="100vh" >
                <Container maxW={'7xl'} paddingTop="100px">
                    <VStack gap={2} align="left">
                        <Text fontSize="35px" fontWeight="bold">Create New Item</Text>
                        <Text fontSize="15px" ><span color='red'>*</span> Required fields</Text>
                        <Text fontSize="21px" >Image, Video, Audio, or 3D Model</Text>
                        <Text fontSize="15px" paddingBottom="20px">File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
                        </Text>
                    </VStack>
                    {fileDataURL ?
                        <p className="img-preview-wrapper">
                            {
                                <img src={fileDataURL} alt="preview" />
                            }
                        </p> : null}
                    <form onSubmit={createNft}>
                        <Stack direction="column" gap={2}>
                            <FormControl>
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

                            </FormControl>

                            <FormControl>
                                <FormLabel >NFT Name</FormLabel>
                                <Input
                                    type="text"
                                    name='username'
                                    value={name ?? ""}
                                    onChange={(e) => setName(e.target.value)}
                                />

                            </FormControl>

                            <FormControl>
                                <FormLabel >NFT Group Name</FormLabel>
                                <Input
                                    type="text"
                                    name='grpName'
                                    value={grpname ?? ""}
                                    onChange={(e) => setGrpName(e.target.value)}
                                />

                            </FormControl>

                            <FormControl>
                                <FormLabel >Owner Name</FormLabel>
                                <Input
                                    type="text"
                                    name='address'
                                    value={owner ?? ""}
                                    onChange={(e) => setOwner(e.target.value)}
                                />

                            </FormControl>

                            <FormControl>
                                <FormLabel >Price</FormLabel>
                                <Input
                                    type="text"
                                    name='price'
                                    value={priceNft ?? ""}
                                    onChange={(e) => setPrice(e.target.value)}
                                />

                            </FormControl>


                            <FormControl>
                                <FormLabel >External Link</FormLabel>
                                <FormHelperText>OpenSea will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</FormHelperText>
                                <Input
                                    type="text"
                                    name='link'
                                    value={link ?? ""}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel >Description</FormLabel>
                                <FormHelperText>The description will be included on the item's detail page underneath its image. Markdown syntax is supported.</FormHelperText>
                                <Input
                                    type="text"
                                    name='description'
                                    value={description ?? ""}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel >Collection</FormLabel>
                                <FormHelperText>This is the collection where your item will appear.</FormHelperText>
                                <Select value={option ?? ""}
                                    onChange={(e) => setOption(e.target.value)}
                                >
                                    <option value='art'>Art</option>
                                    <option value='cartoon'>Cartoon</option>
                                    <option value='game'>Games</option>
                                    <option value='animal'>Animal</option>
                                </Select>
                            </FormControl>

                            <FormControl>

                                <Flex alignItems="center" justifyContent="space-between">
                                    <Box alignItems="center">
                                        <HStack justifyContent="center" alignItems="top" gap={2}>
                                            <HamburgerIcon w="25px" h="25px" />
                                            <VStack align="left" >
                                                <Text fontWeight="bold">Properties</Text>
                                                <Text>Textual traits that show up as rectangles</Text>
                                            </VStack>
                                        </HStack>
                                    </Box>
                                    <Box border="1px solid gray" p="10px">
                                        <SmallAddIcon w="25px" h="25px" onClick={onOpen} />
                                    </Box>
                                </Flex>
                            </FormControl>
                            <FormControl>
                                <FormLabel >Blockchain</FormLabel>
                                <Select value={blockchain}
                                    onChange={(e) => setblockchain(e.target.value)}
                                >
                                    <option value='ethereum'>Ethereum</option>
                                    <option value='algorand'>Algorand</option>
                                </Select>
                            </FormControl>
                            <Button bg="green.500" color="whiteAlpha.900" type="submit" > Submit</Button>
                            {/* <Button onClick={()=>initialize_escrow(AppId,assetId)}>Initilize app</Button> */}
                        </Stack>
                        {
                            popUp ?
                                <Alert status='success'>
                                    <AlertIcon />
                                    NFT Created successfully. Fire on!
                                </Alert>
                                :
                                null
                        }
                    </form>
                </Container>
                <Container maxW={'7xl'} h="400px" paddingTop="100px">

                </Container>
            </Box>
            {/* Modal for properties */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Properties</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Divider marginBottom="20px" />
                        <Text marginBottom="20px">Properties show up underneath your item, are clickable, and can be filtered in your collection's sidebar.
                        </Text>
                        {inputFields.map((inputField, index) => (
                            <Box key={index} alignItems="center" p={5}>
                                <HStack gap={3} >
                                    <Input
                                        name='firstName'
                                        label="First Name"
                                        variant='filled'
                                        onChange={(e, index) => handleChangeInput(e, index)}
                                        width="33%"
                                        placeholder='Name'
                                        value={inputField.firstName}


                                    />
                                    <Input
                                        name='lastName'
                                        label="Last Name"
                                        variant='filled'
                                        onChange={e => handleChangeInput(e, index)}
                                        width="33%"
                                        placeholder='Age'
                                        value={inputField.lastName}

                                    />
                                    <IconButton onClick={() => handleRemove(index)}>
                                        <CloseIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleAdd()}>
                                        <SmallAddIcon />
                                    </IconButton>
                                </HStack>
                            </Box>
                        ))}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateItem