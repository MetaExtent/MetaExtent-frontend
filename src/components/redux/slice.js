import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: "Token",
    initialState: {
        token1: "ALGO",
        token1_ID: 0,
        token1_image: 'assets/images/algoCoin.png',
        input1: 0,
        token2: "USDC",
        token2_ID: "10458941",
        token2_image: 'assets/images/usdc.png',
        input2: 0,
        //storing info for myAlgo & connectWallet
        myAlgoAddress: "",
        myAlgoBalance: 0,
        walletConnectAddress: "",
        walletConnectBalance: 0,
        walletConnectStatus: false,
        slippageTolerance: 1,
        liquidity_input1: 0,
        liquidity_input2: 0,
        serverName: "Testnet",
        nft_app_id: "",
        nft_asset_id: "",
        all_nfts: [],
        image_url: "",
        nft_checkbox: false,
        nft_borrow_amount: 0,
        borrow_item: [],
        borrow_app_id: "100305128",
        total_deposit_amount: 0,
        total_borrow_amount: 0,
        pool_amount: 0
    },
    reducers: {
        setToken: (state, action) => {
            state.token1 = action.payload.token1;
            state.token1_ID = action.payload.token1_ID;
            state.token1_image = action.payload.token1_image;
        },

        setInput: (state, action) => {
            state.input1 = action.payload;
        },
        setToken2: (state, action) => {
            state.token2 = action.payload.token2;
            state.token2_ID = action.payload.token2_ID;
            state.token2_image = action.payload.token2_image;
        },
        setInput2: (state, action) => {
            state.input2 = action.payload;
        },
        setMyAlgoInfo: (state, action) => {
            state.myAlgoAddress = action.payload.algoAddress;
            state.myAlgoBalance = action.payload.algoBalance;
        },
        setWalletConnectInfo: (state, action) => {
            state.walletConnectAddress = action.payload.walletConnectAddress;
            state.walletConnectBalance = action.payload.walletConnectBalance;
            state.walletConnectStatus = action.payload.walletConnectStatus;

        },
        setSlippageTolerance: (state, action) => {
            state.slippageTolerance = action.payload;

        },
        setLiquidity: (state, action) => {
            state.liquidity_input1 = action.payload;


        },
        setLiquidityInput2: (state, action) => {
            state.liquidity_input2 = action.payload;

        },
        setServerName: (state, action) => {
            state.serverName = action.payload;

        },
        setNftCredential: (state, action) => {
            state.nft_app_id = action.payload.nft_app_id;
            state.nft_asset_id = action.payload.nft_asset_id;
        },
        setAllNfts: (state, action) => {
            state.all_nfts = action.payload;
        },
        setImage_URL: (state, action) => {
            state.image_url = action.payload;
        },

        setNFTCheckbox: (state, action) => {
            state.nft_checkbox = action.payload;
        },

        setNFTborrowAmount: (state, action) => {
            state.nft_borrow_amount = action.payload;
        },
        setBorrowItem: (state, action) => {
            state.borrow_item = action.payload;
        },

        setBorrowAppId: (state, action) => {
            state.borrow_app_id = action.payload;
        },

        setDepositAmount: (state, action) => {
            state.total_deposit_amount = action.payload;
        },
        setBorrowAmount: (state, action) => {
            state.total_borrow_amount = action.payload;
        },
        setPoolAmount: (state, action) => {
            state.pool_amount = action.payload;
        }

    }
})
console.log(tokenSlice);