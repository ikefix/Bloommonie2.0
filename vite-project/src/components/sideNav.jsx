import logoImage from '../assets/logo.png';
import '../Css/SideNav.css'
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

const SideNav = () => {

    const { user, logout, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (confirm("Are you sure you want to logout?")) {
            logout();
            navigate('/login');
        }
    };
    return (
        <>
            <div className="side-nav">
                <div className="logo-section">
                    <img src={logoImage} alt="" />
                    <span>Blommonie</span>

                </div>

                <div className="side-menu">
                    <ul>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="">POS</a></li>
                        <li><a href="/Inventory">Inventry</a></li>
                        <li><a href="">Purchases</a></li>
                        <li><a href="">Sales</a></li>
                        <li><a href="">Expenses</a></li>
                        <li><a href="">Wallet</a></li>
                        <li><a href="">Internet</a></li>
                        <li><a href="">Bill Payment</a></li>
                        <li><a href="">Savings</a></li>
                        <li><a href="" className="logout-link" onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SideNav;