import React from 'react';
import Header from './header';
import Footer from './Footer';

function Layout() {
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
}
export default Layout