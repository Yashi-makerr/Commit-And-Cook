import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing-wrapper">

      <div className="landing-content">

        <h1 className="landing-title">
          FlavouRx
        </h1>

        <p className="landing-subtitle">
          We don’t change the prescription.
          <br />
          <span>We change how it tastes.</span>
        </p>

        <div className="landing-buttons">
          <Link to="/register">
            <button className="primary-btn">Get Started</button>
          </Link>

          <Link to="/login">
            <button className="secondary-btn">Login</button>
          </Link>
        </div>

        <div className="pipeline-section">
          <h2>⚙ 4-Layer Computational Pipeline</h2>
          <p>
            Prescription Parsing → Safety Filtering → 
            Flavor Intelligence → Palatable Recipe Generation
          </p>
        </div>

      </div>

    </div>
  );
}
