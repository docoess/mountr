import { NavLink } from "react-router-dom"
import './WantedMounts.css';

export default function MountListing({ mount }) {

  return (
    <div>
      <NavLink className="wowhead-mount-link" to={`https://www.wowhead.com/mount/${mount.blizzId}`}>{mount.name}</NavLink>
    </div>
  )
}
