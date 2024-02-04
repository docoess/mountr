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
        <p>Welcome! This is Mountr, a place for World of Warcraft mount enthusiasts to show off their collections!</p>
        <p>Sign up and share some screenshots of your favorites!</p>
        <p>Coming soon: Import your whole collection from Battle.net!</p>
      </div>
      <div>
        <h3>If you&apos;re ready to get your collection going, then...</h3>
        <NavLink to='/feed' className={'fake-button'}>Saddle Up!</NavLink>
      </div>
    </div>
  )
}
