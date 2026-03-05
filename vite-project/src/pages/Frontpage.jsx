
import heroImage from "../assets/restaurant.png";

export default function FrontPage() {
  return (
    <div className="page">
      <header className="navbar">
        <h2 className="logo">Bloom Restaurant</h2>
        <button className="login-btn">Login</button>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>Smart Restaurant Management System</h1>
          <p>
            Manage orders, sales, inventory, and staff effortlessly with our
            all-in-one solution.
          </p>

          <div className="hero-buttons">
            <button className="primary">Get Started</button>
            <button className="secondary">Live Demo</button>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Restaurant" />
        </div>
      </section>
    </div>
  );
}
