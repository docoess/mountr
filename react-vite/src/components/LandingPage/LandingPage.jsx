import { NavLink } from "react-router-dom";
import mountrLogo from '../../mountr-logo.jpeg';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-page-container">
      <div className="logo-placeholder">
        <img src={mountrLogo} className="landing-logo"/>
      </div>
      <div>
        <h3>If you&apos;re ready to get your collection going, then...</h3>
        <NavLink to='/feed' className={'fake-button'}>Saddle Up!</NavLink>
      </div>
    </div>
  )
}
