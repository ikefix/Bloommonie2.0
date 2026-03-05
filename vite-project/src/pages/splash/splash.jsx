import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppButtons from "../../components/appButton";
import AppText from "../../components/appText";
import AppView from "../../components/appView";

import LogoImage from "../../assets/logo.png";
// loader styles (splashScreen.css) are global, import explicitly so the `.loader` class applies
import "../../styles/splashScreen.css";

export default function SplashPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login");
        }, 3000); // Show splash screen for 3 seconds
        return () => clearTimeout(timer);
    }, [navigate]);

    // note: no local state needed; we simply navigate after timeout

    return (
        <AppView style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #e43232, #2c2c2c)'
    }}>
            <img src={LogoImage} alt="App Logo" style={{ width: '200px', marginBottom: '20px' }} />
            <AppText style={{ fontSize: '48px', color: '#fff' }}>Welcome to My App</AppText>
            <AppText style={{ fontSize: '24px', color: '#eee' }}>Your gateway to amazing experiences</AppText>

            <div className="loader"></div>
        </AppView>
    );
}