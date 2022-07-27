import React from 'react'
import DesktopNav from '../components/layout/Navbar/DesktopNav/DesktopNav';
import Body from '../components/Body';
import { useLocation } from "react-router-dom";


function Home() {
    const location = useLocation();
    return (
        <>
            <DesktopNav name={location.state.address} amount={location.state.amount} />
            <Body />

        </>

    )
}

export default Home