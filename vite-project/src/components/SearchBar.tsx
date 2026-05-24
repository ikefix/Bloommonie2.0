import { FaSearch, FaUser, FaShoppingCart, FaInfoCircle, FaCog } from 'react-icons/fa';
import '../Css/SearchBar.css'
import React from 'react';

const SearchBar = (): React.ReactElement =>{
    return(
<div className="searcharea">
<div className="search-axis">
    <div className="search-container">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
      />
    </div>
</div>
  <div className="images-icon">
    <FaUser size={25} color='#fff'/>
    <FaShoppingCart size={25} color='#fff'/>
    <FaInfoCircle size={25} color='#fff'/>
    <FaCog size={25} color='#fff'/>
  </div>
</div>
    )
}
export default SearchBar;