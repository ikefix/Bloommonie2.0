import React from 'react';
import SideNav from "../../components/sideNav";
import SearchBar from "../../components/SearchBar";
import InventorySection from "../../components/InventorySection";


const Inventory: React.FC = () =>{
    return(
        <>
            <SideNav />
            <SearchBar />
            <InventorySection />
        </>
    )
}

export default Inventory;
