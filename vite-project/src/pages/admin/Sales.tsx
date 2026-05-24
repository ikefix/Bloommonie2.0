import SideNav from "../../components/sideNav";
import SearchBar from "../../components/SearchBar";
import SalesSection from "../../components/SalesSection";
import React from "react";


const Sales = (): React.ReactElement =>{
    return(
        <>
            <SideNav />
            <SearchBar />
            <SalesSection />
        </>
    );
};

export default Sales;