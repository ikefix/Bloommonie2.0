import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/authStore";
import AppButtons from "../../components/appButton";
import AppText from "../../components/appText";
import AppView from "../../components/appView";

import LogoImage from "../../assets/logo.png";
import splashImage from "../../assets/bloommonie_splah_image.jpeg";
import splashSound from "../../assets/sounds/splash_sound.mp3";
// loader styles (splashScreen.css) are global, import explicitly so the `.loader` class applies
import "../../styles/splashScreen.css";

export default function SplashPage() {
    const navigate = useNavigate();
    const { isAuthenticated, isInitializing } = useAuthStore();
    const [showOverlay, setShowOverlay] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Show overlay after 6 seconds and play sound
        const overlayTimer = setTimeout(() => {
            setShowOverlay(true);
            // Play splash sound when overlay appears
            if (audioRef.current) {
                audioRef.current?.play().catch((error: unknown) => {
                    console.log('Audio play failed:', error);
                });
            }
        }, 6000);

        // Navigate based on authentication state after 13 seconds
        const navTimer = setTimeout(() => {
            if (isAuthenticated) {
                navigate("/dashboard");
            } else {
                navigate("/login");
            }
        }, 13000); // Show splash screen for 13 seconds

        return () => {
            clearTimeout(overlayTimer);
            clearTimeout(navTimer);
        };
    }, [navigate, isAuthenticated, isInitializing]);

    return (
        <>
            <audio ref={audioRef} src={splashSound} preload="auto" />
            <AppView style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                background: `url(${splashImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
            }}>
                <div 
                    className={`overlay-image-slider ${showOverlay ? 'show' : ''}`}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        opacity: showOverlay ? 1 : 0,
                        transition: 'opacity 1s ease-in-out',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div style={{
                        animation: showOverlay ? 'slideIn 1s ease-out' : 'none'
                    }}>
                    </div>
                </div>
            </AppView>
        </>
    );
}