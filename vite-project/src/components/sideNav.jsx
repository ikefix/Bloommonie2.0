import logoImage from '../assets/logo.png';
import '../Css/SideNav.css'

const SideNav = () => {
    return(
        <>        
            <div className="side-nav">
                <div className="logo-section">
                    <img src={logoImage} alt="" />
                    <span>Blommonie</span>
                    
                </div>

                <div className="side-menu">
                    <ul>
                        <li><a href="">Dashboard</a></li>
                        <li><a href="">POS</a></li>
                        <li><a href="">Inventry</a></li>
                        <li><a href="">Purchases</a></li>
                        <li><a href="">Sales</a></li>
                        <li><a href="">Expenses</a></li>
                        <li><a href="">Wallet</a></li>
                        <li><a href="">Internet</a></li>
                        <li><a href="">Bill Payment</a></li>
                        <li><a href="">Savings</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SideNav;