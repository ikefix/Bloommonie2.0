import logoImage from '../assets/restaurant.jpeg';
import '../Css/SideNav.css'
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import {
  FaDollarSign,
  FaUser,
} from 'react-icons/fa';

const SideNav = (): React.ReactElement => {

    const { user, logout, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    // Function to truncate name to maximum 2 words
    const truncateName = (name: string) => {
        if (!name) return '';
        const words: string[] = name.trim().split(' ');
        if (words.length <= 1) return name;
        return words.slice(0, 1.4).join(' ');
    };

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
                    <FaUser size={25} />
                    <span>Welcome, {truncateName(user.name)}</span>
                </div>

                <div className="side-menu">
                    <ul>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="">POS</a></li>
                        <li><a href="/Inventory">Inventry</a></li>
                        <li><a href="">Purchases</a></li>
                        <li><a href="">Sales</a></li>
                        <li><a href="">Expenses</a></li>
                        <li><a href="/wallet">Wallet</a></li>
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