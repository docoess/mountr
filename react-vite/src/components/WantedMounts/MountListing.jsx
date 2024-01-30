import { NavLink } from "react-router-dom"
import wowheadLogo from '../../wowhead-logo.png';
import './WantedMounts.css';

export default function MountListing({ mount }) {

  return (
    <div>
      <NavLink className="wowhead-mount-link" to={`https://www.wowhead.com/mount/${mount.blizzId}`}><img className="wowhead-logo" src={wowheadLogo} />{mount.name}</NavLink>
    </div>
  )
}
