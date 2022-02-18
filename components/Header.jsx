import React, { useState } from 'react'

import Toolbar from './Toolbar';
import SideDrawer from './SideDrawer';


const Header = () => {
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
    const drawerToggleClickHandler = () => {
        setSideDrawerOpen((sideDrawerOpen) => !sideDrawerOpen);
    }

    return (
        <>
        <Toolbar drawerToggleClickHandler={drawerToggleClickHandler} sideDrawerOpen={sideDrawerOpen}/>
        <SideDrawer show={sideDrawerOpen} drawerToggleClickHandler={drawerToggleClickHandler} />
        </>
    )
}

export default Header
