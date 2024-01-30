import { DiGithubBadge } from "react-icons/di";
import { FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer-container">
      <span className="dev-links">
      Donald Roessler
        <NavLink className="dev-link" to='https://github.com/docoess'><DiGithubBadge className="git-badge" /></NavLink>
        <NavLink className="dev-link" to='https://www.linkedin.com/in/docoess/'><FaLinkedin className="linked-badge"/></NavLink>
      </span>
    </div>
  )
}
