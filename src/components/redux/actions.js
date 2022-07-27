import { tokenSlice } from "./slice";
const { actions: slice } = tokenSlice;


export const TokenAction = (token1, token1_ID, token1_image) => (dispatch) => {
    dispatch(slice.setToken(token1, token1_ID, token1_image))
}

export const InputAction = (input1) => (dispatch) => {
    dispatch(slice.setInput(input1))
}

export const TokenAction2 = (token2, token2_ID, token2_image) => (dispatch) => {
    dispatch(slice.setToken2(token2, token2_ID, token2_image))
}

export const InputAction2 = (input2) => (dispatch) => {
    dispatch(slice.setInput(input2))
}

export const myAlgoWalletInfo = (myAlgoAddress, myAlgoBalance) => (dispatch) => {
    dispatch(slice.setMyAlgoInfo(myAlgoAddress, myAlgoBalance))
}

export const WalletConnecAction = (walletConnectAddress, walletConnectBalance, walletConnectStatus) => (dispatch) => {
    dispatch(slice.setWalletConnectInfo(walletConnectAddress, walletConnectBalance, walletConnectStatus))
}

export const SlippageAction = (num) => (dispatch) => {
    dispatch(slice.setSlippageTolerance(num))
}

export const LiquidityAction = (input1) => (dispatch) => {
    dispatch(slice.setLiquidity(input1))
}
export const LiquidityActionInput2 = (input) => (dispatch) => {
    dispatch(slice.setLiquidity(input))
}

export const ServerNameAction = (name) => (dispatch) => {
    dispatch(slice.setServerName(name))
}

export const NftAction = (nft_app_id, nft_asset_id) => (dispatch) => {
    dispatch(slice.setNftCredential(nft_app_id, nft_asset_id));
}

export const AllNFTAction = (all_nfts) => (dispatch) => {
    dispatch(slice.setAllNfts(all_nfts));
}

export const ImageURLAction = (image_url) => (dispatch) => {
    dispatch(slice.setImage_URL(image_url));
}

export const NFTcheckBoxAction = (nft_checkbox) => (dispatch) => {
    dispatch(slice.setNFTCheckbox(nft_checkbox));
}

export const NFTborrowAmountAction = (nft_borrow_amount) => (dispatch) => {
    dispatch(slice.setNFTborrowAmount(nft_borrow_amount));
}

export const NFTborrowItemAction = (borrow_item) => (dispatch) => {
    dispatch(slice.setBorrowItem(borrow_item));
}

export const NFTborrowAppIDAction = (borrow_app_id) => (dispatch) => {
    dispatch(slice.setBorrowAppId(borrow_app_id));
}

export const NFTtotalDepositAmount = (total_deposit_amount) => (dispatch) => {
    dispatch(slice.setDepositAmount(total_deposit_amount));
}

export const NFTtotalBorrowAmount = (total_borrow_amount) => (dispatch) => {
    dispatch(slice.setBorrowAmount(total_borrow_amount));
}
export const PoolAmountAction = (pool_amount) => (dispatch) => {
    dispatch(slice.setPoolAmount(pool_amount));
}

