import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Wallet from "./pages/Wallet";
import Home from './pages/Home';
import MobileNav from './components/layout/Navbar/MobileNav/MobileNav';
import Error from './pages/Error';
import Swap from './pages/Swap';
import DesktopNav from './components/layout/Navbar/DesktopNav/DesktopNav';
import { Suspense, useState } from 'react';
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import Liquidity from './pages/Liquidity';
import MarketPalace from './pages/MarketPlace';
import CreateItem from './pages/CreateItem';
import SinglePage from './pages/SinglePage';
import NFTProfile from './pages/NFTProfile';
import CollectionNFT from './pages/CollectionNFT';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Borrow from './pages/Borrow';
import Desosit from './pages/Deposit'

function App() {
  const [showNav, setShowNav] = useState(true);
  // getting wallet info from redux
  // const algoAdd = useSelector(state => state.token.myAlgoAddress);
  // const algoBalance = useSelector(state => state.token.myAlgoBalance);
  // const walletAddress = useSelector(state => state.token.walletConnectAddress);
  // const walletAmount = useSelector(state => state.token.walletConnectBalance);
  // const walletConnectStatus = useSelector(state => state.token.walletConnectStatus);
  return (
    <>


      {/* hiding navbar in main page */}
      {/* {showNav &&
          <nav>
            <DesktopNav />
          </nav>
        } */}

      <Router>
        {/* <Routes>
            <Route path='/' element={<Wallet funcNav={setShowNav} />} />
            <Route path='/error' element={<Error />} />
          </Routes> */}


        <Routes>
          <Route path='/' element={<Wallet />} />
          <Route path='/error' element={<Error />} />
          <Route path='/*' element={<PrivateRoute />} >
            <Route path='home' element={<Home />} />
            <Route path='swap' element={<Swap />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='marketplace' element={<MarketPalace />} />
            <Route path='collection' element={<CollectionNFT />} />
            <Route path='borrow' element={<Borrow />} />
            <Route path='deposit' element={<Desosit />} />
            <Route path='mint' element={<CreateItem />} />
            <Route path='nft-profile' element={<NFTProfile />} />
            <Route path='single' element={<SinglePage />} />
            <Route path='liquidity' element={<Liquidity />} />
          </Route>



        </Routes>
      </Router>
      <MobileNav />


    </>

  );
}

export default App;