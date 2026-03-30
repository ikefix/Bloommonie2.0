import "./ForgetPassword.css";
import { FaEnvelope } from "react-icons/fa";
import logoImage from "../../assets/logo.png";

const ForgetPassword = () =>{
    return(
        <div className="forgetpassword-section">
            <div className="forgetpassword">
                <img src={logoImage} alt="logo" className="logo" />
                <h2>Reset Password</h2>
                <p>Enter your email to receive a password reset link.</p>
                <form>
                    <div className="input-group">
                        <FaEnvelope className="icon" />
                        <input type="text" placeholder="Email" />
                    </div>
                    <button type="submit" className="reset-btn">Send Reset Link</button>
                    <p><a href="/login" className="back-login">back to login</a></p>
                </form>
            </div>
        </div>
    )
}
export default ForgetPassword;