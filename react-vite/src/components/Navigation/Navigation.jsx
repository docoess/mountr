import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import mountrLogo from '../../mountr-logo.jpeg';
import "./Navigation.css";

function Navigation() {
  const currentUser = useSelector((state) => state.session.user);

  return (
    <div className="navigation-container">
      <NavLink to="/" className='navigation-logo-container'>
        <img src={mountrLogo} className="navigation-logo" />
      </NavLink>
      <div className="right-navbar-container">
        {
          currentUser && <NavLink className="my-posts-button" to={`/feed/new`}>Make a Post</NavLink>
        }
        {
          currentUser && <NavLink className="my-posts-button" to={`/feed/user/${currentUser.id}`}>My Posts</NavLink>
        }
        <NavLink className="my-posts-button" to='/feed'>All Posts</NavLink>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
