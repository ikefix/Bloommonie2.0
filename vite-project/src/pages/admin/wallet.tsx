import React from 'react';
import SideNav from "../../components/sideNav";
import SearchBar from "../../components/SearchBar";
import WalletSection from '../../components/WalletSection';

const Wallet: React.FC = () =>{
    return(
        <>
            <SideNav />
            <SearchBar />
            <WalletSection />
        </>
    );
};

export default Wallet;