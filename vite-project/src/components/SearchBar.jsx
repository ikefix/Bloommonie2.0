import { FaSearch } from 'react-icons/fa';
import { FaShoppingCart } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import '../Css/SearchBar.css'

const SearchBar = () =>{
    return(
<div className="searcharea">
  <div className="images-icon">
    <img src={null} alt="" />
    <img src={null} alt="" />
    <img src={null} alt="" />
  </div>
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
<div className="icons-searchbararea">
  <FaUser className="user-icon" />
  <FaShoppingCart className="cart-icon" />
  <FaBell className="notification-icon" />
 
  
</div>
</div>
    )
}
export default SearchBar;