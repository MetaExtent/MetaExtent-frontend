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
    Spinner,
    Checkbox,
    RadioGroup,
    Radio,
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
// import { FileUpload, ImageUpload } from 'react-ipfs-uploader';
import { ImageURLAction } from '../components/redux/actions';
import DesktopNav from '../components/layout/Navbar/DesktopNav/DesktopNav';

const client = create("https://ipfs.infura.io:5001/api/v0");

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function CreateItem() {
    const dispatch = useDispatch();
    const algoAdd = useSelector(state => state.token.myAlgoAddress);
    const algoBalance = useSelector(state => state.token.myAlgoBalance);
    const walletAddress = useSelector(state => state.token.walletConnectAddress);
    const walletAmount = useSelector(state => state.token.walletConnectBalance);
    const walletConnectStatus = useSelector(state => state.token.walletConnectStatus);
    const [popUp, alertPopUp] = useState(false);
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [otherFile, setOtherFile] = useState(null);
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
    const modal2 = useDisclosure();
    const [progress, setProgress] = useState(0);
    const [imageURL, setImageURL] = useState(null);
    const [check, setCheck] = useState(false);
    const [radioValue, setRadioValue] = useState();
    const [extension, setExtension] = useState();
    console.log(radioValue);
    const handleCheckBox = () => {
        setCheck(!check);
        console.log("hello")
    }
    console.log(check);
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
            alert("Image type is not valid");
            return;
        }
        setFile(file);
        console.log("Image link: " + file);
    };

    const onOtherImageChange = (e) => {
        const file = e.target.files[0];
        const name = e.target.files[0].name;
        const ext = name.split(".").pop();
        setExtension(ext);
        // if (!file.type.match(imageMimeType)) {
        //     alert("Image type is not valid");
        //     return;
        // }
        setOtherFile(file);
        console.log("Other Image link: " + file);
    };
    console.log("Image link: " + file);
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
    // const image_url = useSelector(state => state.token.image_url);
    // console.log(image_url);
    //upload files


    const uploadFile = async (e) => {
        e.preventDefault();

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
            let url2 = undefined;
            if (check) {
                const other_File = await client.add(otherFile);
                url2 = `https://ipfs.infura.io/ipfs/${other_File.path}`;
            }
            //console.log(url);
            //dispatch(ImageURLAction(url));
            createNft(url, url2);



        } catch (error) {
            console.log(error.message);
        }
        console.log("I am in file upload");

    }



    //create NFT function
    const createNft = async (image_URL, other_file) => {
        // e.preventDefault();
        console.log(name, link, description, option, blockchain);

        //uploadFile(file);
        //console.log("image url" + val);

        const algodClient = new algosdk.Algodv2("", 'https://node.testnet.algoexplorerapi.io', '');
        const suggested_params = await algodClient.getTransactionParams().do();

        const creator = algoAdd;
        const defaultFrozen = false;
        //const unitName = grpname;
        const assetName = name;
        const price = priceNft;
        //const url = "https://cliqtech.co/assets/images/about/cliqtech/ARVR.jpg";
        //const url = await imageURL;
        const url = image_URL;
        const otherFile = check ? other_file : null;
        const fileExt = check ? extension : null;
        const assetAttribute = check ? radioValue : null;
        console.log(url);
        console.log(otherFile);
        //console.log(imageURL);
        const managerAddr = algoAdd;
        const reserveAddr = algoAdd;
        const freezeAddr = algoAdd;
        const clawbackAddr = algoAdd;
        const total = 1;                // NFTs have totalIssuance of exactly 1
        const decimals = 0;             // NFTs have decimals of exactly 0
        const asset = check ? otherFile : url;


        const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
            from: creator,
            total,
            decimals,
            assetName,
            //unitName,
            assetURL: asset,
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
        modal2.onOpen();
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
        console.log(assetName, price, url, total, algoAdd, otherFile)
        await addDoc(nftCollectionRef, { nft_id: assetID, name: assetName, price: price, url: url, other_file: otherFile, other_file_extension: fileExt, total: total, address: algoAdd, owner_address: algoAdd, option: option, assetID: assetID, description: description, link: link, type: "", sell_status: false, assetAttribute: assetAttribute });
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
        /////////////////////
        // const this_nft = all_nfts.filter((data) => data.assetID === assetID);
        // console.log(this_nft);
        // console.log(this_nft.id);

        alertPopUp(true);
        modal2.onClose();
        setTimeout(() => {
            console.log("hello I am here")
            alertPopUp(false);
            navigate("/single", { state: { nft: true, name: assetName, price: price, url: url, total: total, address: algoAdd, option: option, assetID: assetID, description: description, link: link, type: "" } });
        }, 3000);
        // setTimeout(() => {
        //     alertPopUp(false);
        //     navigate("/marketpalace");
        // }, 3000);

    }



    return (
        <>
            {walletConnectStatus ? <DesktopNav name={walletAddress} amount={walletAmount} /> : <DesktopNav name={algoAdd} amount={algoBalance} />}
            <Box minH="100vh" >
                <Container maxW={'7xl'} paddingTop="100px">
                    <VStack gap={2} align="left">
                        <Text fontSize="35px" fontWeight="bold">Create New Item</Text>
                        <Text fontSize="15px" ><span style={{ color: "red" }}>*</span> Required fields</Text>
                        <Text fontSize="15px" paddingBottom="20px">File types supported: JPG, PNG, JPEG
                        </Text>
                    </VStack>
                    {fileDataURL ?
                        <p className="img-preview-wrapper">
                            {
                                <img src={fileDataURL} alt="preview" height="300px" width="500px" />
                            }
                        </p> : null}
                    {/* <Box>
                        <ImageUpload setUrl={setFile} />
                        ImageUrl :{" "}
                        <a href={file} target="_blank" rel="noopener noreferrer">
                            {file}
                        </a>
                    </Box> */}
                    <form onSubmit={uploadFile}>
                        <Stack direction="column" gap={2}>
                            <FormControl>
                                <FormLabel >Picture</FormLabel>

                                <FormHelperText>Upload image for your asset</FormHelperText>
                                <Input
                                    type="file"
                                    name='photo'
                                    //value={img}
                                    border="none"
                                    p={1}
                                    mt={2}
                                    required={true}
                                    onChange={(e) => onImageChange(e)}

                                />

                            </FormControl>
                            <Checkbox defaultChecked={false} onChange={handleCheckBox}>Upload 3D asset</Checkbox>
                            {/* upload other files starts*/}


                            {check ?
                                <>
                                    <FormControl>
                                        {/* <FormLabel >Other File</FormLabel> */}
                                        <FormHelperText>Upload your file</FormHelperText>
                                        <Input
                                            type="file"
                                            name='photo'
                                            //value={img}
                                            border="none"
                                            p={1}
                                            mt={2}
                                            required={true}
                                            onChange={(e) => onOtherImageChange(e)}

                                        />
                                    </FormControl>

                                    <RadioGroup onChange={setRadioValue} value={radioValue}>
                                        <Stack direction='row'>
                                            <Radio value='Compatible with Unity engine'>Compatible with Unity engine</Radio>
                                            <Radio value='Compatible with Unreal engine'>Compatible with Unreal engine</Radio>
                                            <Radio value='Compatible with both Unity and Unreal'>Compatible with both Unity and Unreal</Radio>
                                        </Stack>
                                    </RadioGroup>

                                </> : null

                            }


                            {/* upload other files ends*/}

                            <FormControl>
                                <FormLabel >NFT Name <span style={{ color: "red" }}>*</span></FormLabel>
                                <Input
                                    type="text"
                                    name='username'
                                    value={name ?? ""}
                                    required={true}
                                    onChange={(e) => setName(e.target.value)}
                                />

                            </FormControl>

                            {/* <FormControl>
                                <FormLabel >NFT Group Name</FormLabel>
                                <Input
                                    type="text"
                                    name='grpName'
                                    value={grpname ?? ""}
                                    onChange={(e) => setGrpName(e.target.value)}
                                />

                            </FormControl> */}

                            {/* <FormControl>
                                <FormLabel >Owner Name</FormLabel>
                                <Input
                                    type="text"
                                    name='address'
                                    value={owner ?? ""}
                                    onChange={(e) => setOwner(e.target.value)}
                                />

                            </FormControl> */}

                            <FormControl>
                                <FormLabel >Price <span style={{ color: "red" }}>*</span></FormLabel>
                                <Input
                                    type="number"
                                    name='price'
                                    value={priceNft ?? ""}
                                    required={true}
                                    onChange={(e) => setPrice(e.target.value)}
                                />

                            </FormControl>


                            <FormControl>
                                <FormLabel >External Link</FormLabel>
                                <FormHelperText> Include a link to this URL on this item’s detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</FormHelperText>
                                <Input
                                    type="text"
                                    name='link'
                                    value={link ?? ""}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel >Description <span style={{ color: "red" }}>*</span></FormLabel>
                                <FormHelperText>The description will be included on the item's detail page underneath its image. Markdown syntax is supported.</FormHelperText>
                                <Input
                                    type="text"
                                    name='description'
                                    value={description ?? ""}
                                    required={true}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel >Collection <span style={{ color: "red" }}>*</span></FormLabel>
                                <FormHelperText>This is the collection where your item will appear.</FormHelperText>
                                <Select placeholder='Select option' value={option ?? ""}
                                    onChange={(e) => setOption(e.target.value)}
                                >
                                    <option value='art'>Art</option>
                                    <option value='cartoon'>Cartoon</option>
                                    <option value='game'>Games</option>
                                    <option value='animal'>Animal</option>
                                    <option value='metaverse'>Metaverse</option>
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
                                <FormLabel >Blockchain <span style={{ color: "red" }}>*</span></FormLabel>
                                <Select value={blockchain}
                                    onChange={(e) => setblockchain(e.target.value)}
                                    required={true}
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

            {/* ==================Loader Modal====================== */}
            <Modal isOpen={modal2.isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Creating NFT.....</ModalHeader>

                    <ModalBody alignItems="center" py="20px">
                        <HStack alignItems="center" justifyContent="space-evenly">
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                h="120px"
                                w="120px"
                            />
                        </HStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* ==================Loader Modal ends================= */}
        </>
    )
}

export default CreateItem