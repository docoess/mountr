import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import mountrLogo from '../../mountr-logo.jpeg';
import "./Navigation.css";

function Navigation() {
  return (
    <div className="navigation-container">
      <NavLink to="/" className='navigation-logo-container'>
        <img src={mountrLogo} className="navigation-logo" />
      </NavLink>
      <ProfileButton />
    </div>
  );
}

export default Navigation;
