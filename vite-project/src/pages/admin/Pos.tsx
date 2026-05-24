import SideNav from "../../components/sideNav";
import SearchBar from "../../components/SearchBar";
import PosSection from "../../components/PosSection";
import React from "react";


const Pos = (): React.ReactElement =>{
    return(
        <>
            
            <SearchBar />
            <PosSection />
        </>
    )
}

export default Pos;