import SideNav from "../../components/sideNav";
import SearchBar from "../../components/SearchBar";
import SettingsSection from "../../components/SettingsSection";
import React from "react";

const Settings = (): React.ReactElement =>{
    return(
        <>
            <SideNav />
            <SearchBar />
            <SettingsSection />
        </>
    );
};

export default Settings;